import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import Highlighter from 'react-highlight-words'
import styled from 'styled-components'
import { Address } from 'types/address'

const displayAddress = (address: Address) => {
  // an address can have multiple postcode, display the first
  const postcode = (address.properties.postcode || '').split(';')
  const { name, housenumber, street, city, country } = address.properties
  return [name, housenumber, street, city, postcode[0], country].filter((value) => value).join(' ')
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 0 0 1.375rem 1.375rem;
  max-height: 20rem;
  overflow-y: auto;

  position: relative;
`
const Suggestion = styled.div<{ $current: boolean; $isFetching: boolean }>`
  background-color: ${(props) => props.theme.colors[props.$current ? 'mainLight' : 'background']};
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.mainLight};
  }

  mark {
    background-color: transparent;
    color: ${(props) => props.theme.colors.text};
    opacity: 0.8;
  }
`
const Suggestions = ({
  search,
  current,
  setCurrent,
  isFetching,
  results,
  handleSuggestionClick,
}: {
  search: string
  current: number
  setCurrent: Dispatch<SetStateAction<number>>
  isFetching: boolean
  results: Address[]
  handleSuggestionClick: (address: Address) => void
}) => {
  const maxSuggestions = 7

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'ArrowDown') {
        e.preventDefault()
        current < maxSuggestions - 1 ? setCurrent((prevCurrent) => prevCurrent + 1) : setCurrent(0)
      }
      if (e.code === 'ArrowUp') {
        e.preventDefault()
        current > 0 && setCurrent((prevCurrent) => prevCurrent - 1)
      }
    },
    [current, setCurrent]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  return (
    <Wrapper data-testid='transportSuggest'>
      {results
        .map((result) => ({ ...result, display: displayAddress(result) }))
        .filter((result, index, array) => array.findIndex((adress) => adress.display === result.display) === index)
        .map((result, index) => {
          return (
            index < maxSuggestions && (
              <Suggestion
                $current={index === current}
                $isFetching={isFetching}
                key={result.properties.osm_id}
                onClick={() => handleSuggestionClick(result)}
                onMouseDown={(e) => e.preventDefault()}>
                <Highlighter
                  searchWords={search.split(' ')}
                  autoEscape={true}
                  textToHighlight={displayAddress(result)}
                />
              </Suggestion>
            )
          )
        })}
    </Wrapper>
  )
}

export default Suggestions