import React from 'react'
import styled from 'styled-components'
import Select from 'components/base/Select'
import ReuseBulb from 'components/livraison/ReuseBulb'
import IflCode from './IflCode'

const getLabel = () => {
  return (
    <span>
      1) Choisissez le <strong>thème</strong> de votre iframe.
    </span>
  )
}

export default function IflConfigurator(props) {
  return (
    <Wrapper>
      <Select onChange={({ value }) => props.setTheme(value)} getLabel={getLabel} name='theme'>
        <option value='default'>Clair</option>
        <option value='night'>Sombre</option>
      </Select>
      <IflCode type={props.path} theme={props.theme} />
      <br />
      <ReuseBulb />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-right: 2rem;
  padding: 1.5rem;
  padding-bottom: 0;
  ${(props) => props.theme.mq.medium} {
    margin-bottom: 1.5rem;
    width: 100%;
  }
`