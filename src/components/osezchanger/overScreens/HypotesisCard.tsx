import React from 'react'
import formatName from 'utils/formatName'
import { computedEquivalents } from 'components/providers/equivalents'
import EquivalentIcon from 'components/base/EquivalentIcon'
import { Bar, Card, Value, Values } from './HypotesisCard.styles'

const HypotesisCard = ({ slug }: { slug: string }) => {
  const values = computedEquivalents.find((equivalent) => equivalent.slug === slug)
  if (!values) {
    return null
  }

  return (
    <Card href={`/habillement/${slug}`} target='_blank' rel='noreferrer noopener'>
      <EquivalentIcon height={2.5} equivalent={values} />
      <div>
        <div>
          {formatName(values.name, 1, true)} {values.subtitle?.toLowerCase()}
        </div>
        <Values>
          <Bar $width={(125 * values.value) / 19} />
          <div>
            <Value>{Math.round(values.value)}</Value> kg CO<sub>2</sub>e
          </div>
        </Values>
      </div>
    </Card>
  )
}

export default HypotesisCard
