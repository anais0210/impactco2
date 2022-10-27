import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'

import { formatNumber, formatPercent } from 'utils/formatters'
import RulesContext from 'components/numerique/RulesProvider'
import StackedChart from 'components/charts/StackedChart'

const Wrapper = styled.div`
  flex: 1;
`
const ConstructionPercent = styled.p`
  margin: 0 0.5rem;
  color: ${(props) => props.theme.colors.main};
`
const UsagePercent = styled.p`
  margin: 0 0.5rem;
  text-align: right;
  color: #adc4c5;
`
const Number = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`
const StyledStackedChart = styled(StackedChart)`
  margin: 0;
  height: 1.25rem;
`
export default function Construction(props) {
  const { engine, situation } = useContext(RulesContext)

  const construction = useMemo(
    () =>
      (engine.evaluate('email . terminaux . construction').nodeValue *
        props.numberEmails +
        engine.evaluate('streaming . terminaux . construction').nodeValue +
        engine.evaluate('visio . terminaux . construction').nodeValue) /
      1000,
    [engine, situation]
  )
  const total = useMemo(
    () =>
      (engine.evaluate('email').nodeValue * props.numberEmails +
        engine.evaluate('streaming').nodeValue +
        engine.evaluate('visio').nodeValue) /
      1000,
    [engine, situation]
  )
  const usage = useMemo(
    () =>
      (engine.evaluate('email').nodeValue * props.numberEmails +
        engine.evaluate('streaming').nodeValue +
        engine.evaluate('visio').nodeValue) /
        1000 -
      construction,
    [construction, total]
  )

  return engine ? (
    <Wrapper>
      <ConstructionPercent>
        <Number>{formatPercent(construction, total)} %</Number> construction
      </ConstructionPercent>
      <StyledStackedChart
        items={[
          { id: 'Construction', value: construction },
          { id: 'Usage', value: usage, color: '#ADC4C5' },
        ]}
        total={total}
      />
      <UsagePercent>
        <Number>{formatPercent(usage, total)} %</Number> usage
      </UsagePercent>
    </Wrapper>
  ) : null
}
