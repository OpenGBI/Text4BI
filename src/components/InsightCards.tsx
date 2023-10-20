import React, { useRef, useEffect, CSSProperties, useState } from 'react'
import { Layout } from 'antd'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { InsightCard } from './InsightCard'

const { Header, Footer, Sider, Content } = Layout
type Phrase = {
  type: string
  value: string
  metadata?: any
}
type Card = {
  key: string
  type: string
  BigChartData: number[]
  phrases: Phrase[]
}
interface InsightCardProps {
  type: string
  BigChartData: number[]
  phrases: Phrase[]
  id: string
}
const CardsDataset: Card[] = [
  {
    key: 'Card1',
    type: 'LineChart',
    BigChartData: [2, 4, 55, 77, 99],
    phrases: [
      { type: 'entity', value: 'DAU', metadata: { entityType: 'metric_name' } },
      { type: 'text', value: ' ' },
      {
        type: 'entity',
        value: '1.23亿',
        metadata: { entityType: 'metric_value', origin: 123077.34 },
      },
      { type: 'text', value: '，环比昨日 ' },
      {
        type: 'entity',
        value: '80万',
        metadata: { entityType: 'delta_value', assessment: 'positive' },
      },
      { type: 'text', value: '（' },
      {
        type: 'entity',
        value: '2.3%',
        metadata: { entityType: 'ratio_value', assessment: 'positive' },
      },
      { type: 'text', value: '）。' },
      { type: 'text', value: '最近 3 个动态 7 天' },
      {
        type: 'entity',
        value: '趋势上涨',
        metadata: {
          entityType: 'trend_desc',
          detail: [1, 2, 6, 18, 24, 48],
        },
      },
      { type: 'text', value: '。' },
      { type: 'text', value: '按垂直行业分：' },
    ],
  },
  {
    key: 'Card2',
    type: 'LineChart',
    BigChartData: [2, 4, 55, 7, 99],
    phrases: [
      { type: 'entity', value: 'DAU', metadata: { entityType: 'metric_name' } },
      { type: 'text', value: ' ' },
      {
        type: 'entity',
        value: '22.23亿',
        metadata: { entityType: 'metric_value', origin: 123077.34 },
      },
      { type: 'text', value: '，环比昨日 ' },
      {
        type: 'entity',
        value: '80万',
        metadata: { entityType: 'delta_value', assessment: 'positive' },
      },
      { type: 'text', value: '（' },
      {
        type: 'entity',
        value: '2.3%',
        metadata: { entityType: 'ratio_value', assessment: 'positive' },
      },
      { type: 'text', value: '）。' },
      { type: 'text', value: '最近 3 个动态 7 天' },
      {
        type: 'entity',
        value: '趋势上涨',
        metadata: {
          entityType: 'trend_desc',
          detail: [1, 2, 6, 18, 24, 48],
        },
      },
      { type: 'text', value: '。' },
      { type: 'text', value: '按垂直行业分：' },
    ],
  },
]
const InsightCards: React.FC = () => {
  const CardNum: number = CardsDataset.length
  const CardsId: string[] = CardsDataset.map((card) => card.key)
  const [cards, setCards] = useState(CardsId)

  const swapCards = (dragIndex: string, hoverIndex: string) => {
    const dragCard = cards.find((card) => card === dragIndex)!
    const hoverCard = cards.find((card) => card === hoverIndex)!
    const newCards = cards.map((card) => {
      if (card === dragCard) return hoverCard
      if (card === hoverCard) return dragCard
      return card
    })
    console.log(newCards)
    setCards(newCards)
  }
  const Cards = cards.map((cardId) => {
    const card = CardsDataset.find((d) => d.key === cardId)
    return {
      ...card,
      id: cardId,
    }
  })
  console.log(Cards)

  return (
    <div id='ShowInsightCards'>
      <DndProvider backend={HTML5Backend}>
        {Cards.map((dataset) => {
          if (!dataset.type) {
            throw new Error(`No data found for the date: ${dataset.type}`)
          }
          return (
            <Content key={dataset.key}>
              <InsightCard {...(dataset as InsightCardProps)} onDrop={swapCards} />
            </Content>
          )
        })}
      </DndProvider>
    </div>
  )
}

export default InsightCards
