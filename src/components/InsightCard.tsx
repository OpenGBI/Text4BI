import React, { useRef, useEffect, useState } from "react"
import { Tooltip, Space, Button, message } from "antd"
import { DndProvider, useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useSelector, useDispatch } from "react-redux"
// import { NarrativeTextSpec, NarrativeTextVis } from '@antv/ava-react'
import { copyToClipboard, NarrativeTextVis, NtvPluginManager, TextExporter } from "@antv/ava-react"
import { CopyOutlined, ExportOutlined } from "@ant-design/icons"
import { AppState } from "../store"
import PhraseComponent from "./PhraseComponent"
import BigChart from "./BigChart"
import { Card, sentence } from "../types"

const CARD_DRAG_TYPE = "CARD"
// interface Phrase {
//   type: string
//   value: string
//   metadata?: any
// }

interface InsightCardProps extends Card {
  id: string
  onDrop: (id: string, targetId: string) => void
}
// type RenderContent
// const RenderContent = ({
//   sentence,
//   bulletPoint,
//   fontsize,
//   boldness,
//   underline,
//   lineHeight,
//   aspectRatio,
//   sparkLinePosition,
//   showBigGraph,
//   type,
//   BigChartData,
// }) => {
//   if ('phrases' in sentence) {
//     return sentence.phrases.map((phrase, index) => (
//       <PhraseComponent
//         key={index}
//         {...phrase}
//         fontsize={fontsize}
//         boldness={boldness}
//         underline={underline}
//         lineHeight={lineHeight}
//         aspectRatio={aspectRatio}
//         sparkLinePosition={sparkLinePosition}
//       />
//     ))
//   }
//   if (showBigGraph) {
//     return <BigChart ChartType={type} BigChartData={BigChartData} />
//   }
//   return null
// }

export const InsightCard: React.FC<InsightCardProps> = ({ CardName, paragraph, id, onDrop }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { dataset, selectedCards } = useSelector((state: AppState) => state.system)
  const { showBigGraph, textPosition, showSparkLine, fontsize, lineHeight, bulletPoint } =
    useSelector((state: AppState) => state.globalSetting)

  const { boldness, underline, contour, color, backgroundColor } = useSelector(
    (state: AppState) => state.typographySetting,
  )

  const { sparkLinePosition, aspectRatio } = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )

  const [topk, setTopk] = useState<number>(-1) // 控制数据集中的哪几项用于绘图

  const handleDataChange = (newData: number) => {
    setTopk(newData)
  }

  if (!CardName || !paragraph || !id || !onDrop) {
    throw new Error("No data found for the date")
  }
  const onCopySuccess = () => {
    console.log("success")
  }

  const onClickCopyButton = async () => {
    if (containerRef?.current) {
      const textExporter = new TextExporter()
      const html = await textExporter.getNarrativeHtml(containerRef.current)
      const plainText = "plainText"
      copyToClipboard(html, plainText, onCopySuccess)
      // onCopy?.(currentInsightInfo, ref.current)
    }
  }

  const onClickExportButton = async () => {
    if (containerRef?.current) {
      const textExporter = new TextExporter()
      const html = await textExporter.getNarrativeHtml(containerRef.current)
      // 创建一个新窗口
      const newWindow = window.open("", "_blank")
      if (newWindow) {
        // 如果新窗口存在，则向其写入HTML内容
        newWindow.document.write(html)
        // 更新新窗口的文档标题
        newWindow.document.title = "Exported Content"
      } else {
        // 如果新窗口不存在，可以在这里处理错误，比如通知用户
        alert("Unable to open a new window. Please check your popup settings.")
      }
    }
  }
  // 这个代码内容是可以将富文本内容作为一个html下载到本地
  // const onClickExportButton = async () => {
  //   if (containerRef?.current) {
  //     const textExporter = new TextExporter()
  //     const html = await textExporter.getNarrativeHtml(containerRef.current)
  //     const blob = new Blob([html], { type: 'text/html' })
  //     const url = URL.createObjectURL(blob)
  //     const link = document.createElement('a')
  //     link.href = url
  //     link.download = 'exported-content.html'
  //     document.body.appendChild(link)
  //     link.click()
  //     document.body.removeChild(link)
  //     URL.revokeObjectURL(url)
  //   }
  // }
  // useEffect(() => {
  //   const handleKeyPress = async (event: KeyboardEvent) => {
  //     if (event.ctrlKey && event.key === 'c') {
  //       // 按下 Ctrl+C
  //       const selection = window.getSelection()
  //       if (!selection) {
  //         throw new Error(`No data found for the date: ${type}`)
  //       }
  //       if (selection.toString().length > 0) {
  //         // 如果选中了文本
  //         event.preventDefault() // 阻止默认复制行为
  //         await onClickCopy() // 调用复制函数
  //       }
  //     }
  //   }

  //   document.addEventListener('keydown', handleKeyPress)

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyPress)
  //   }
  // }, [])
  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     // 检查是否按下了Ctrl+C（或Cmd+C在Mac上）
  //     if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
  //       onClickCopy()
  //     }
  //   }

  //   // 添加事件监听器
  //   document.addEventListener('keydown', handleKeyDown)

  //   // 清除事件监听器
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown)
  //   }
  // }, [onClickCopy])
  const [, drop] = useDrop({
    accept: CARD_DRAG_TYPE,
    hover: (item: any, monitor: DropTargetMonitor) => {
      const clientY = monitor.getClientOffset()?.y
      if (!ref.current) return
      if (item.id === id) return

      // 以下是新增的滚动逻辑
      const rect = ref.current.getBoundingClientRect()
      const scrollSpeed = 5
      const scrollThreshold = 20
      if (!clientY) {
        throw new Error(`No data found for the date: ${clientY}`)
      }
      if (clientY < rect.top + scrollThreshold) {
        ref.current.scrollTop -= scrollSpeed
      } else if (clientY > rect.bottom - scrollThreshold) {
        ref.current.scrollTop += scrollSpeed
      }

      onDrop(item.id, id)
      item.id = id
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: CARD_DRAG_TYPE,
    item: { id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  // 将drag注册到卡片的上边栏。
  drag(ref)

  drag(drop(ref))
  // 函数Dataset接收一个参数，而不是三个函数，预期这个参数是一个对象，并且这个对象应该具有type、BigChartData和phrases这三个属性。
  const renderBulletPoint = (curSentence: sentence) => {
    if (bulletPoint && curSentence.type === "bullet") {
      return <span style={{ fontSize: "20px" }}>• </span>
    }
    return null
  }
  const renderPhrases = (curSentence: sentence) => {
    if (curSentence.type === "topic") {
      return curSentence.phrases.map((phrase, index) => (
        <PhraseComponent
          key={index}
          {...phrase}
          fontsize={fontsize}
          color={color}
          backgroundColor={backgroundColor}
          boldness={boldness}
          contour={contour}
          underline={underline}
          lineHeight={lineHeight}
          aspectRatio={aspectRatio}
          sparkLinePosition={sparkLinePosition}
          onTopkChange={handleDataChange}
        />
      ))
    }
    if (curSentence.type === "normal" || curSentence.type === "bullet") {
      return curSentence.phrases.map((phrase, index) => (
        <PhraseComponent
          key={index}
          {...phrase}
          fontsize={fontsize}
          color={color}
          backgroundColor={backgroundColor}
          boldness={boldness}
          contour={contour}
          underline={underline}
          lineHeight={lineHeight}
          aspectRatio={aspectRatio}
          sparkLinePosition={sparkLinePosition}
          onTopkChange={handleDataChange}
        />
      ))
    }

    // if (showBigGraph && 'chartType' in curSentence) {
    //   return <BigChart ChartType={curSentence.chartType} BigChartData={curSentence.metadata} />
    // }
  }

  // Local state for textPosition
  // const [textPosition, setTextPosition] = useState('left')
  // // Handlers for layout change
  // const handleLeftRightLayout = () => setTextPosition('left')
  // const handleTopBottomLayout = () => setTextPosition('top')
  // 根据 textPosition 来决定如何渲染内容
  const renderContent = () => {
    // console.log('打印当前文本布局', textPosition)
    if (textPosition === "parallel") {
      // 文本在左，图表在右
      return (
        <div
          className="avar-ntv-container"
          style={{
            display: "flex",
            flexDirection: "row",
            border: "1px solid #ccc", // 添加边框
            borderRadius: "8px", // 添加圆角
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)", // 添加阴影
            padding: "12px", // 可根据需要调整内边距
            marginTop: "12px", // 可根据需要调整上边距
            marginBottom: "12px", // 可根据需要调整下边距
            marginLeft: "12px", // 可根据需要调整左边距
            marginRight: "20px", // 可根据需要调整右边距
          }}
        >
          <div style={{ flex: 1 }}>
            {/* 渲染文本 */}
            {paragraph.map((curSentence, outIndex) => (
              <div
                key={outIndex}
                className={outIndex === 0 ? "draggable" : ""}
                ref={outIndex === 0 ? ref : null}
              >
                {renderBulletPoint(curSentence)}
                {renderPhrases(curSentence)}
                {/* 其他渲染内容 */}
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            {/* 渲染图表 */}
            {paragraph.map((curSentence, outIndex) => {
              if (showBigGraph && "chartType" in curSentence) {
                return (
                  <BigChart
                    ChartType={curSentence.chartType}
                    BigChartData={curSentence.metadata}
                    topk={topk}
                  />
                )
              }
              return null
            })}
          </div>
        </div>
      )
    }
    if (textPosition === "vertical") {
      // 文本在上，图表在下
      return (
        <div
          className="avar-ntv-container"
          style={{
            // display: 'flex',
            // flexDirection: 'row',
            border: "1px solid #ccc", // 添加边框
            borderRadius: "8px", // 添加圆角
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)", // 添加阴影
            padding: "12px", // 可根据需要调整内边距
            marginTop: "12px", // 可根据需要调整上边距
            marginBottom: "12px", // 可根据需要调整下边距
            marginLeft: "12px", // 可根据需要调整左边距
            marginRight: "20px", // 可根据需要调整右边距
          }}
        >
          {/* 渲染文本 */}
          {paragraph.map((curSentence, outIndex) => (
            <div
              key={outIndex}
              className={outIndex === 0 ? "draggable" : ""}
              ref={outIndex === 0 ? ref : null}
            >
              {renderBulletPoint(curSentence)}
              {renderPhrases(curSentence)}
              {/* 其他渲染内容 */}
            </div>
          ))}
          {/* 渲染图表 */}
          {paragraph.map((curSentence, outIndex) => {
            if (showBigGraph && "chartType" in curSentence) {
              return (
                <BigChart
                  ChartType={curSentence.chartType}
                  BigChartData={curSentence.metadata}
                  topk={topk}
                />
              )
            }
            return null
          })}
        </div>
      )
    }
  }

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {" "}
      {/* 确保父容器相对定位 */}
      {/* 添加布局切换按钮 */}
      {/* <Space>
        <Button onClick={() => handleLeftRightLayout}>Left-Right</Button>
        <Button onClick={() => handleTopBottomLayout}>Top-Bottom</Button>
      </Space> */}
      {/* 渲染内容 */}
      {renderContent()}
      {/* 将 CopyOutlined 图标放在绝对定位的容器中 */}
      <Tooltip title="Copy Rich Text">
        <div style={{ position: "absolute", top: 20, right: 55 }}>
          <CopyOutlined
            onClick={onClickCopyButton}
            style={{ cursor: "pointer", fontSize: "20px" }} // 调整图标的大小
          />
        </div>
      </Tooltip>
      <Tooltip title="Export This Card">
        <div style={{ position: "absolute", top: 20, right: 30 }}>
          <ExportOutlined
            onClick={onClickExportButton}
            style={{ cursor: "pointer", fontSize: "20px" }} // 调整图标的大小
          />
        </div>
      </Tooltip>
    </div>
  )
}

export default InsightCard
