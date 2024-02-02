import React, { useRef, useEffect, CSSProperties, useState } from "react"
import { Layout, Tooltip, Modal, Button } from "antd"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useSelector, useDispatch } from "react-redux"
import { ExportOutlined } from "@ant-design/icons"
import { InsightCard } from "./InsightCard"
import { AppState } from "../store"
import { Card } from "../types"
// import { fetchDataset } from '../actions/systemAction'

const { Header, Footer, Sider, Content } = Layout
interface InsightCardsProps {
  cardRefs: React.RefObject<HTMLDivElement>[]
  cardsExchange: (newCardsIDs: string[]) => void
}
interface InsightCardProps extends Card {
  id: string
  onDrop: (id: string, targetId: string) => void
}

const InsightCards: React.FC<InsightCardsProps> = ({ cardRefs, cardsExchange }) => {
  const { dataset, selectedCards } = useSelector((state: AppState) => state.system)
  const { showBigGraph, showSparkLine } = useSelector((state: AppState) => state.globalSetting)
  // console.log('datasetttttttttttttt', selectedCards)
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
    cardsExchange(newCards)
  }
  const exportSelectedCardsAsHtml = () => {
    let htmlContent =
      "<!DOCTYPE html><html lang='en'><head><title>Exported Cards</title></head><body>"
    selectedCards.forEach((cardId) => {
      const cardElement = document.getElementById(cardId)
      // console.log('cardElement', cardId)
      if (cardElement) {
        htmlContent += cardElement.outerHTML
      }
    })
    htmlContent += "</body></html>"
    const newWindow = window.open("", "_blank")
    if (newWindow) {
      newWindow.document.write(htmlContent)
      newWindow.document.close()
    } else {
      console.error("Unable to open a new window. Perhaps it has been blocked by a popup blocker.")
    }
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
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div className="panel3">
      <div className="header">
        <Tooltip title="Export This Card">
          <div style={{ position: "absolute", top: 20, right: 30 }}>
            <ExportOutlined
              onClick={showModal}
              style={{ cursor: "pointer", fontSize: "20px" }} // 调整图标的大小
            />
            <Modal
              title="Export Options"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>
                <Button onClick={exportSelectedCardsAsHtml}>Download HTML</Button>
              </p>
              <p>
                <Button onClick={exportSelectedCardsAsHtml}>Download Image</Button>
              </p>
            </Modal>
          </div>
        </Tooltip>
      </div>
      <div style={{ height: 800, overflow: "auto" }}>
        <DndProvider backend={HTML5Backend}>
          <div className="card-container">
            {Cards.map((curDataset, index) => (
              <Content id={curDataset.CardName} key={curDataset.CardName}>
                <InsightCard
                  {...(curDataset as InsightCardProps)}
                  onDrop={swapCards}
                  cardRef={cardRefs[index]}
                />
              </Content>
            ))}
          </div>
        </DndProvider>
      </div>
    </div>
  )
}

export default InsightCards
