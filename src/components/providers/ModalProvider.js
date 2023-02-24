import React, { useState } from 'react'

import Co2eModal from 'components/modals/Co2eModal'
import ContactModal from 'components/modals/ContactModal'
import DetailsUsagesNumModal from 'components/modals/DetailsUsagesNumModal'
import DevicesModal from 'components/modals/DevicesModal'
import EcvModal from 'components/modals/EcvModal'
import ShareModal from 'components/modals/ShareModal'
import TilesModal from 'components/modals/TilesModal'

const ModalContext = React.createContext({})

export function ModalProvider(props) {
  const [Co2e, setCo2e] = useState(false)
  const [tiles, setTiles] = useState(false)
  const [share, setShare] = useState(false)
  const [ecv, setEcv] = useState(false)
  const [devices, setDevices] = useState(false)
  const [hypothesis, setHypothesis] = useState(false)
  const [survey, setSurvey] = useState(false)

  return (
    <ModalContext.Provider
      value={{
        Co2e,
        setCo2e: (value) => {
          window?._paq?.push(['trackEvent', 'Interaction', 'Modal', 'CO2e'])
          setCo2e(value)
        },
        tiles,
        setTiles: (value) => {
          window?._paq?.push(['trackEvent', 'Interaction', 'Modal', 'Tuiles'])
          setTiles(value)
        },
        share,
        setShare: (value) => {
          window?._paq?.push(['trackEvent', 'Interaction', 'Modal', 'Partage'])
          setShare(value)
        },

        ecv,
        setEcv: (value) => {
          window?._paq?.push(['trackEvent', 'Interaction', 'Modal', 'ECV'])
          setEcv(value)
        },
        devices,
        setDevices: (value) => {
          window?._paq?.push(['trackEvent', 'Interaction', 'Modal', 'Devices'])
          setDevices(value)
        },
        hypothesis,
        setHypothesis: (value) => {
          window?._paq?.push([
            'trackEvent',
            'Interaction',
            'Modal',
            'Hypothèses usages numériques',
          ])
          setHypothesis(value)
        },
        survey,
        setSurvey: (value) => {
          window?._paq?.push([
            'trackEvent',
            'Interaction',
            'Modal',
            'Enquête livraison',
          ])
          setSurvey(value)
        },
      }}
    >
      {props.children}
      <Co2eModal />
      <TilesModal />
      <ShareModal />
      <EcvModal />
      <DevicesModal />
      <DetailsUsagesNumModal />
      <ContactModal />
    </ModalContext.Provider>
  )
}

export default ModalContext
