import React, { useContext } from 'react'
import styled from 'styled-components'

import { colors, mq } from 'utils/styles'
import CO2NumberContext from 'utils/CO2NumberContext'

const Wrapper = styled.div`
  width: calc(33.333% - 1em);
  margin: 0.5em;

  ${mq.small} {
    width: calc(50% - 1em);
  }
`
const Content = styled.div`
  height: 100%;
  width: 100%;
  padding: 1em;
  border-radius: 1em;
  text-align: center;
  color: ${colors.main};
  background-color: ${colors.text};
`
const Emoji = styled.div`
  font-size: 4em;
`
const Number = styled.div`
  font-size: 2.5em;
  font-weight: 700;
`
const Name = styled.div``
export default function Equivalent(props) {
  const { CO2 } = useContext(CO2NumberContext)

  return (
    <Wrapper>
      <Content>
        <Emoji>{props.equivalent.emoji}</Emoji>
        <Number>{Math.round((CO2 / props.equivalent.total) * 10) / 10}</Number>
        <Name>{props.equivalent.name.fr}</Name>
      </Content>
    </Wrapper>
  )
}
