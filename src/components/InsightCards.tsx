import React, { useRef, useEffect, CSSProperties, useState } from 'react'
import { Layout } from 'antd'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux'
import { InsightCard } from './InsightCard'
import { AppState } from '../store'
import { Card } from '../types'

const { Header, Footer, Sider, Content } = Layout

interface InsightCardProps extends Card {
  id: string
  onDrop: (id: string, targetId: string) => void
}

const InsightCards: React.FC = () => {
  const { dataset, showBigGraph, showSparkLine, selectedCards } = useSelector(
    (state: AppState) => state.system,
  )
  // console.log('datasetttttttttttttt', dataset)
  const CardNum: number = dataset.length
  const CardsId: string[] = dataset.map((card) => card.CardName)
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
      const card = dataset.find((d) => d.CardName === cardId)
      return {
        ...card,
        id: cardId,
      }
    })
    .filter((card) => selectedCards.includes(card.id))

  return (
    <div id='ShowInsightCards'>
      <DndProvider backend={HTML5Backend}>
        {Cards.map((curDataset) => (
          <Content key={curDataset.CardName}>
            <InsightCard {...(curDataset as InsightCardProps)} onDrop={swapCards} />
          </Content>
        ))}
      </DndProvider>
    </div>
  )
}

export default InsightCards
