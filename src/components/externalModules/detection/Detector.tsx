import classNames from 'classnames'
import React, { MouseEvent, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { track } from 'utils/matomo'
import RefreshIcon from 'components/osezchanger/icons/refresh'
import Logo from '../Logo'
import SimpleValue from '../SimpleValue'
import styles from './Detector.module.css'

export const regex =
  /([0-9]+(,|\.|\s|&nbsp;)*[0-9]*)(\s|&nbsp;)*(millier(s)?|mille(s)?|million(s)?|milliard(s)?|giga(s)?)?(\s|&nbsp;)*(de\s|&nbsp;)?(kg(s)?|kilo(s)?|kilo(&shy;|­)?gramme(s)?|g|t|tonne(s)?)(\s|&nbsp;)*(d'émissions\s|&nbsp;)?(de\s|&nbsp;)*(d(’|')équivalent\s|&nbsp;)?(eq)?(\s|&nbsp;)*(c(o|0)(2|₂|<sub>2(\s|&nbsp;)*<\/sub>)|dioxyde de carbone)(eq|((\s|&nbsp;)*équivalent)|e)?/i

const getComputedStyle = (el: Element, property: string) => {
  if (document.defaultView) {
    const computedStyle = document.defaultView.getComputedStyle(el, null)
    return computedStyle.getPropertyValue(property)
  }
  return ''
}
const isOverflowHidden = (el: Element) => getComputedStyle(el, 'overflow') === 'hidden'
const getOverflow = (element: HTMLDivElement) => {
  const elPositioning = element.getBoundingClientRect()
  if (elPositioning.left < 0) {
    return 'left'
  }

  let parent = element.parentNode as Element
  while (parent) {
    if (parent.nodeType !== 9 && isOverflowHidden(parent)) {
      const parentElPositioning = parent.getBoundingClientRect()

      if (elPositioning.x < parentElPositioning.x) {
        return 'left'
      }

      if (elPositioning.x + elPositioning.width > parentElPositioning.x + parentElPositioning.width) {
        return 'right'
      }
    }
    parent = parent.parentNode as Element
  }

  return ''
}

const getUnitFactor = (unit: string) => {
  if (unit === 't' || unit.includes('tonne')) {
    return 1000000
  }

  if (unit === 'kg' || unit === 'kgs' || unit.includes('kilo')) {
    return 1000
  }

  return 1
}

const getFactor = (unit: string) => {
  if (!unit) {
    return 1
  }

  if (unit.includes('milliard') || unit.includes('giga')) {
    return 1000000000
  }
  if (unit.includes('million')) {
    return 1000000
  }
  if (unit.includes('millier') || unit.includes('mille')) {
    return 1000
  }

  return 1
}

export const getValue = (regexResult: string[]) =>
  Number(regexResult[1].replaceAll(',', '.').replaceAll(' ', '').replaceAll('&nbsp;', '')) *
  getFactor(regexResult[4]) *
  getUnitFactor(regexResult[12])

const Detector = ({ impact }: { impact: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const etiquetteRef = useRef<HTMLDivElement>(null)

  // inspired from https://usehooks-ts.com/react-hook/use-intersection-observer
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [observed, setObserved] = useState(false)

  useEffect(() => {
    const node = ref.current // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver
    if (!hasIOSupport || !node) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => setEntry(entry))
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref])

  useEffect(() => {
    if (!observed && entry && entry.isIntersecting) {
      setObserved(true)
      track('Detecteur carbone', 'View', window.location.href)
    }
  }, [entry, observed])

  const [display, setDisplay] = useState('')
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  const value = useMemo(() => {
    const values = regex.exec(impact)
    if (values) {
      return getValue(values)
    }
    return 0
  }, [impact])

  const onClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()
      track('Detecteur carbone', 'Click', impact)
      if (etiquetteRef.current && !display) {
        const distances = etiquetteRef.current.getBoundingClientRect()
        const xOverflow = getOverflow(etiquetteRef.current)
        setDisplay(`${distances.top < 0 ? 'bottom' : ''}-${xOverflow}`)
      }

      if (display) {
        setDisplay('')
      }
    },
    [display, impact]
  )

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setDisplay('')
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <div className={styles.container} ref={ref}>
      <button
        className={classNames(styles.value, 'impactCO2-etiquette-detected-value')}
        onClick={onClick}
        dangerouslySetInnerHTML={{
          __html: impact,
        }}
      />
      <div
        className={classNames(styles.etiquette, {
          [styles.hide]: !display,
          [styles.bottom]: display.includes('bottom'),
          [styles.right]: display.includes('right'),
          [styles.left]: display.includes('left'),
        })}
        ref={etiquetteRef}>
        <Logo value={value} onClick={() => track('Detecteur carbone', 'Logo', 'logo')} />
        <div className={styles.simpleValue}>
          <SimpleValue value={value} comparison='random' />
        </div>
        <button
          className={styles.random}
          title='Obtenir une nouvelle comparaison'
          onClick={() => {
            forceUpdate()
            track('Detecteur carbone', 'Reload', 'reload')
          }}>
          <RefreshIcon />
        </button>
      </div>
    </div>
  )
}

export default Detector
