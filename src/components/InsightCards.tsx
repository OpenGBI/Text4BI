import React, { useRef, useEffect, CSSProperties, useState } from 'react'
import { Layout } from 'antd'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux'
import { InsightCard } from './InsightCard'
import { AppState } from '../store'

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
// const CardsDataset: Card[] = [
//   {
//     key: 'Card1',
//     type: 'PieChart',
//     BigChartData: [2, 4, 55, 77, 99],
//     phrases: [
//       { type: 'entity', value: 'DAU', metadata: { entityType: 'metric_name' } },
//       { type: 'text', value: ' ' },
//       {
//         type: 'entity',
//         value: '1.23亿',
//         metadata: { entityType: 'metric_value', origin: 123077.34 },
//       },
//       { type: 'text', value: '，环比昨日 ' },
//       {
//         type: 'entity',
//         value: '80万',
//         metadata: { entityType: 'delta_value', assessment: 'positive' },
//       },
//       { type: 'text', value: '（' },
//       {
//         type: 'entity',
//         value: '2.3%',
//         metadata: { entityType: 'ratio_value', assessment: 'positive' },
//       },
//       { type: 'text', value: '）。' },
//       { type: 'text', value: '最近 3 个动态 7 天' },
//       {
//         type: 'entity',
//         value: '趋势上涨',
//         metadata: {
//           entityType: 'trend_desc',
//           detail: [1, 2, 6, 18, 24, 48],
//         },
//       },
//       { type: 'text', value: '。' },
//       { type: 'text', value: '按垂直行业分：' },
//     ],
//   },
//   {
//     key: 'Card2',
//     type: 'PieChart',
//     BigChartData: [2, 4, 55, 7, 99],
//     phrases: [
//       { type: 'entity', value: 'DAU', metadata: { entityType: 'metric_name' } },
//       { type: 'text', value: ' ' },
//       {
//         type: 'entity',
//         value: '22.23亿',
//         metadata: { entityType: 'metric_value', origin: 123077.34 },
//       },
//       { type: 'text', value: '，环比昨日 ' },
//       {
//         type: 'entity',
//         value: '80万',
//         metadata: { entityType: 'delta_value', assessment: 'positive' },
//       },
//       { type: 'text', value: '（' },
//       {
//         type: 'entity',
//         value: '2.3%',
//         metadata: { entityType: 'ratio_value', assessment: 'positive' },
//       },
//       { type: 'text', value: '）。' },
//       { type: 'text', value: '最近 3 个动态 7 天' },
//       {
//         type: 'entity',
//         value: '趋势上涨',
//         metadata: {
//           entityType: 'trend_desc',
//           detail: [1, 2, 6, 18, 24, 48],
//         },
//       },
//       { type: 'text', value: '。' },
//       { type: 'text', value: '按垂直行业分：' },
//     ],
//   },
//   {
//     key: 'Card3',
//     type: 'PieChart',
//     BigChartData: [2, 2, 2, 2, 99],
//     phrases: [
//       { type: 'entity', value: 'DAU', metadata: { entityType: 'metric_name' } },
//       { type: 'text', value: ' ' },
//       {
//         type: 'entity',
//         value: '22.23亿',
//         metadata: { entityType: 'metric_value', origin: 123077.34 },
//       },
//       { type: 'text', value: '，环比昨日 ' },
//       {
//         type: 'entity',
//         value: '80万',
//         metadata: { entityType: 'delta_value', assessment: 'positive' },
//       },
//       { type: 'text', value: '（' },
//       {
//         type: 'entity',
//         value: '2.3%',
//         metadata: { entityType: 'ratio_value', assessment: 'positive' },
//       },
//       { type: 'text', value: '）。' },
//       { type: 'text', value: '最近 3 个动态 7 天' },
//       {
//         type: 'entity',
//         value: '趋势上涨',
//         metadata: {
//           entityType: 'trend_desc',
//           detail: [1, 2, 6, 18, 24, 48],
//         },
//       },
//       { type: 'text', value: '。' },
//       { type: 'text', value: '按垂直行业分：' },
//     ],
//   },
//   {
//     key: 'Card4',
//     type: 'PieChart',
//     BigChartData: [333, 4, 55, 7, 99],
//     phrases: [
//       { type: 'entity', value: 'DAU', metadata: { entityType: 'metric_name' } },
//       { type: 'text', value: ' ' },
//       {
//         type: 'entity',
//         value: '22.23亿',
//         metadata: { entityType: 'metric_value', origin: 123077.34 },
//       },
//       { type: 'text', value: '，环比昨日 ' },
//       {
//         type: 'entity',
//         value: '80万',
//         metadata: { entityType: 'delta_value', assessment: 'positive' },
//       },
//       { type: 'text', value: '（' },
//       {
//         type: 'entity',
//         value: '2.3%',
//         metadata: { entityType: 'ratio_value', assessment: 'positive' },
//       },
//       { type: 'text', value: '）。' },
//       { type: 'text', value: '最近 3 个动态 7 天' },
//       {
//         type: 'entity',
//         value: '趋势上涨',
//         metadata: {
//           entityType: 'trend_desc',
//           detail: [1, 2, 6, 18, 24, 48],
//         },
//       },
//       { type: 'text', value: '。' },
//       { type: 'text', value: '按垂直行业分：' },
//     ],
//   },
//   {
//     key: 'Card5',
//     type: 'PieChart',
//     BigChartData: [2, 222, 55, 222, 99],
//     phrases: [
//       { type: 'entity', value: 'DAU', metadata: { entityType: 'metric_name' } },
//       { type: 'text', value: ' ' },
//       {
//         type: 'entity',
//         value: '22.23亿',
//         metadata: { entityType: 'metric_value', origin: 123077.34 },
//       },
//       { type: 'text', value: '，环比昨日 ' },
//       {
//         type: 'entity',
//         value: '80万',
//         metadata: { entityType: 'delta_value', assessment: 'positive' },
//       },
//       { type: 'text', value: '（' },
//       {
//         type: 'entity',
//         value: '2.3%',
//         metadata: { entityType: 'ratio_value', assessment: 'positive' },
//       },
//       { type: 'text', value: '）。' },
//       { type: 'text', value: '最近 3 个动态 7 天' },
//       {
//         type: 'entity',
//         value: '趋势上涨',
//         metadata: {
//           entityType: 'trend_desc',
//           detail: [1, 2, 6, 18, 24, 48],
//         },
//       },
//       { type: 'text', value: '。' },
//       { type: 'text', value: '按垂直行业分：' },
//     ],
//   },
// ]
const InsightCards: React.FC = () => {
  const { dataset, showBigGraph, showSparkLine, selectedCards } = useSelector(
    (state: AppState) => state.system,
  )
  // console.log('datasetttttttttttttt', dataset)
  const CardNum: number = dataset.length
  const CardsId: string[] = dataset.map((card) => card.key)
  // cards是卡片id的列表，是[Card1,Card2]
  const [cards, setCards] = useState(CardsId)

  const swapCards = (dragIndex: string, hoverIndex: string) => {
    const dragCard = cards.find((card) => card === dragIndex)!
    const hoverCard = cards.find((card) => card === hoverIndex)!
    const newCards = cards.map((card) => {
      if (card === dragCard) return hoverCard
      if (card === hoverCard) return dragCard
      return card
    })
    setCards(newCards)
  }
  const Cards = cards
    .map((cardId) => {
      const card = dataset.find((d) => d.key === cardId)
      return {
        ...card,
        id: cardId,
      }
    })
    .filter((card) => selectedCards.includes(card.id))

  return (
    <div id='ShowInsightCards'>
      <DndProvider backend={HTML5Backend}>
        {Cards.map((curDataset) => {
          if (!curDataset.type) {
            throw new Error(`No data found for the date: ${curDataset.type}`)
          }
          return (
            <Content key={curDataset.key}>
              <InsightCard {...(curDataset as InsightCardProps)} onDrop={swapCards} />
            </Content>
          )
        })}
      </DndProvider>
    </div>
  )
}

export default InsightCards
