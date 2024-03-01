import React, { useRef, useEffect, CSSProperties, useState } from "react"
import { Layout, Tooltip, Modal, Button, message } from "antd"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import html2canvas from "html2canvas"
import { useSelector, useDispatch } from "react-redux"
import { copyToClipboard } from "@antv/ava-react"
import { CopyOutlined, ExportOutlined } from "@ant-design/icons"
import { InsightCard } from "./InsightCard"
import { AppState } from "../store"
import { Card } from "../types"
// import { fetchDataset } from "../actions/systemAction"

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
  const { dataset, selectedCards, allCards } = useSelector((state: AppState) => state.system)
  // console.log("检查第二处的cardids", selectedCards)
  const { showBigGraph, showSparkLine } = useSelector((state: AppState) => state.globalSetting)
  // console.log("datasetttttttttttttt", selectedCards)
  const CardNum: number = dataset.length
  const CardsId: string[] = dataset.map((card) => card.CardName)
  // cards是卡片id的列表，是[Card1,Card2]
  const [cards, setCards] = useState(CardsId)
  const [showButtons, setShowExportButton] = useState(true)

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
      // console.log("cardElement", cardId)
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
  const onCopySuccess = () => {
    console.log("success")
  }
  const copySelectedCardsAsRichText = async () => {
    // 创建一个空的 HTML 字符串来拼接所有卡片的 HTML
    let htmlContent = ""

    // 遍历所有选中的卡片 ID
    selectedCards.forEach((cardId) => {
      // 获取卡片元素
      const cardElement = document.getElementById(cardId)
      if (cardElement) {
        // 将卡片的外部 HTML 加到 htmlContent 字符串
        htmlContent += cardElement.outerHTML
      }
    })
    // // 使用 Clipboard API 写入拼接好的 HTML
    // try {
    //   await navigator.clipboard.writeText(htmlContent)
    //   console.log("富文本内容已复制到剪贴板。")
    // } catch (err) {
    //   console.error("复制富文本内容失败: ", err)
    // }
    const plainText = "plainText"
    copyToClipboard(htmlContent, plainText, onCopySuccess)
  }

  const exportSelectedCardsAsImage = async () => {
    // 隐藏导出按钮
    setShowExportButton(false)
    // 稍微延迟以确保按钮的显示状态更新
    setTimeout(async () => {
      // 你的截图逻辑...
      // 创建卡片元素数组
      const cardElements = selectedCards
        .map((cardId) => document.getElementById(cardId))
        .filter(Boolean) as HTMLElement[]

      // 并行获取每个卡片的高度，并计算总高度
      const heights = await Promise.all(
        cardElements.map((cardElement) => html2canvas(cardElement).then((canvas) => canvas.height)),
      )
      const totalHeight = heights.reduce((sum, height) => sum + height, 0)

      // 并行获取每个卡片的宽度，并计算最大宽度
      const widths = await Promise.all(
        cardElements.map((cardElement) => html2canvas(cardElement).then((canvas) => canvas.width)),
      )
      const maxWidth = Math.max(...widths)

      // 创建单个画布元素
      const combinedCanvas = document.createElement("canvas")
      combinedCanvas.width = maxWidth
      combinedCanvas.height = totalHeight
      const context = combinedCanvas.getContext("2d")

      if (context) {
        // 首先，创建一个 promise 数组来并行处理所有 html2canvas 调用
        const canvasPromises = cardElements.map((cardElement) => html2canvas(cardElement))

        // 使用 Promise.all 等待所有 canvas 准备就绪
        const canvases = await Promise.all(canvasPromises)

        // 初始化 yOffset 用于累计每个 canvas 的高度
        let yOffset = 0

        // 现在可以不在循环中使用 await 了
        canvases.forEach((canvas) => {
          context.drawImage(canvas, 0, yOffset)
          yOffset += canvas.height
        })

        // 将画布转换为数据URL
        const image = combinedCanvas.toDataURL("image/png", 1.0)

        // 创建链接并设置图片URL为href属性
        const link = document.createElement("a")
        link.href = image
        link.download = "exported-cards.png"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
      // 确保按钮在截图之后显示
      setShowExportButton(true)
    }, 100)
  }

  const Cards = allCards
    .map((cardId) => {
      const card = dataset.find((d) => d.CardName === cardId)
      return {
        ...card,
        id: cardId,
      }
    })
    .filter((card) => allCards.includes(card.id))
  // console.log("Cards", Cards)
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
        <Tooltip title="Copy Rich Text">
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 190,
              display: showButtons ? "block" : "none",
            }}
          >
            <CopyOutlined
              onClick={copySelectedCardsAsRichText}
              style={{ cursor: "pointer", fontSize: "20px" }} // 调整图标的大小
            />
          </div>
        </Tooltip>
        <Tooltip title="Export This Card">
          <div style={{ position: "absolute", top: 20, right: 165 }}>
            <ExportOutlined onClick={showModal} style={{ cursor: "pointer", fontSize: "20px" }} />
            <Modal
              title="Export Options"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              mask={false}
              maskClosable
              style={{ position: "absolute", top: 50, right: 180 }} // Adjust the position of the modal here
              getContainer={false} // This makes the modal render inline without a portal
            >
              <p>
                <Button onClick={exportSelectedCardsAsHtml}>Download HTML</Button>
              </p>
              <p>
                <Button onClick={exportSelectedCardsAsImage}>Download Image</Button>{" "}
                {/* Corrected function name */}
              </p>
            </Modal>
          </div>
        </Tooltip>
      </div>
      <div style={{ height: "100%", overflow: "auto" }}>
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
