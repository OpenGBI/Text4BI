import React, { useRef, useEffect, useState } from "react"
import { Tooltip, Space, Button, message, Modal } from "antd"
import { DndProvider, useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import html2canvas from "html2canvas"
import { useSelector, useDispatch } from "react-redux"
// import { NarrativeTextSpec, NarrativeTextVis } from "@antv/ava-react"
// import { copyToClipboard, NarrativeTextVis, NtvPluginManager, TextExporter } from "@antv/ava-react"
import { copyToClipboard } from "@antv/ava-react"
import { CopyOutlined, ExportOutlined } from "@ant-design/icons"
import { Chart } from "@antv/g2"
import { getNarrativeHtml, getNarrativeHtml4Export } from "../utils/TextExporter"
import { AppState } from "../store"
import PhraseComponent from "./PhraseComponent"
import BigChart from "./BigChart"
import { Card, sentence, highLightMessage } from "../types"

const CARD_DRAG_TYPE = "CARD"

interface InsightCardProps extends Card {
  id: string
  onDrop: (id: string, targetId: string) => void
  cardRef: React.RefObject<HTMLDivElement>
}

export const InsightCard: React.FC<InsightCardProps> = ({
  CardName,
  paragraph,
  id,
  onDrop,
  cardRef,
}) => {
  // 给数据筛选留的若干state
  const [startTime, setStartTime] = React.useState("")
  const [endTime, setEndTime] = React.useState("")

  //
  // 给大图交互留的 old
  const [curBigChart, setCurBigChart] = React.useState<Chart | null>(null)
  // ref = useRef() ref => React.MutableRefObject<Chart | null>
  // ref.current -> Chart | null

  // ref.current
  const handleCurBigChart = (curBigChart1: Chart | null) => {
    setCurBigChart(curBigChart1)
  }

  // 给大图交互留的 new
  const [highlightMessage, setHighlightMessage] = React.useState<highLightMessage | null>(null)

  const ref = useRef<HTMLDivElement>(null)

  const [cardInsightType, setCardInsightType] = useState<string>("")
  // const [startTime, setStartTime] = useState<string>("")
  // const [endTime, setEndTime] = useState<string>("")

  const {
    showBigGraph,
    textPosition,
    showSparkLine,
    fontsize,
    lineHeight,
    bulletPoint,
    isLineBreakOn,
    bulletPointStyle,
  } = useSelector((state: AppState) => state.globalSetting)
  const { selectedEntityType, boldness, underline, italics, contour, color, backgroundColor } =
    useSelector((state: AppState) => state.typographySetting)
  const { sparkLinePosition, aspectRatio } = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )

  const [topk, setTopk] = useState<number>(-1) // 控制数据集中的哪几项用于绘图
  let bulletPointIndex = 0 // 记录当前的bulletPoint的位置

  useEffect(() => {
    if (!paragraph[0]) {
      return
    }
    if ("phrases" in paragraph[0]) {
      if (paragraph[0].phrases[0] && !paragraph[0].phrases[0].value) return
      setCardInsightType(paragraph[0].phrases[0].value)
    }
  }, [paragraph])

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
    if (cardRef?.current) {
      // const textExporter = new TextExporter()
      const html = await getNarrativeHtml(cardRef.current)
      const plainText = "plainText"
      copyToClipboard(html, plainText, onCopySuccess)
      // onCopy?.(currentInsightInfo, ref.current)
    }
  }

  const onClickExportAsHtml = async () => {
    if (cardRef?.current) {
      const html = await getNarrativeHtml(cardRef.current)
      // const html = await getNarrativeHtml(cardRef.current)
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
  const onClickExportAsImage = async () => {
    if (cardRef?.current) {
      // 使用 html2canvas 将元素渲染为画布
      const canvas = await html2canvas(cardRef.current)
      // 创建一个图片 URL
      const image = canvas.toDataURL("image/png", 1.0)
      // 创建一个链接元素
      const link = document.createElement("a")
      // 设置下载属性和文件名
      link.download = "insight-card.png"
      // 将图片 URL 设置为链接的 href
      link.href = image
      // 触发下载
      link.click()
    }
  }
  // 这个代码内容是可以将富文本内容作为一个html下载到本地
  // const onClickExportButton = async () => {
  //   if (containerRef?.current) {
  //     const textExporter = new TextExporter()
  //     const html = await textExporter.getNarrativeHtml(containerRef.current)
  //     const blob = new Blob([html], { type: "text/html" })
  //     const url = URL.createObjectURL(blob)
  //     const link = document.createElement("a")
  //     link.href = url
  //     link.download = "exported-content.html"
  //     document.body.appendChild(link)
  //     link.click()
  //     document.body.removeChild(link)
  //     URL.revokeObjectURL(url)
  //   }
  // }
  // useEffect(() => {
  //   const handleKeyPress = async (event: KeyboardEvent) => {
  //     if (event.ctrlKey && event.key === "c") {
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

  //   document.addEventListener("keydown", handleKeyPress)

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress)
  //   }
  // }, [])
  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     // 检查是否按下了Ctrl+C（或Cmd+C在Mac上）
  //     if ((event.ctrlKey || event.metaKey) && event.key === "c") {
  //       onClickCopy()
  //     }
  //   }

  //   // 添加事件监听器
  //   document.addEventListener("keydown", handleKeyDown)

  //   // 清除事件监听器
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown)
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
    if (isLineBreakOn && curSentence.type === "bullet") {
      if (bulletPointStyle === "#") {
        // Render a numbered list item
        bulletPointIndex += 1
        return <span style={{ fontSize: fontsize }}>{bulletPointIndex}.</span>
      }
      // Render the original bullet point style
      return <span style={{ fontSize: fontsize }}>{bulletPointStyle}</span>
    }
    return null
  }
  // Usage: renderBulletPoint(sentence, index) where `index` is the position of the current item in the list
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
          italics={italics}
          contour={contour}
          underline={underline}
          lineHeight={lineHeight}
          aspectRatio={aspectRatio}
          sparkLinePosition={sparkLinePosition}
          onTopkChange={handleDataChange}
          outChart={curBigChart}
          setHighlightMessage={setHighlightMessage}
          param4Filter={{
            startTime,
            endTime,
          }}
          setParamFuncs={{
            setStartTime,
            setEndTime,
          }}
        />
      ))
    }
    if (curSentence.type === "normal" || curSentence.type === "bullet") {
      return curSentence.phrases.map((phrase, index) => (
        // if (phrase.type === "entity") {
        //   console.log("debug parent", phrase.metadata)
        // }
        <PhraseComponent
          key={index}
          {...phrase}
          fontsize={fontsize}
          color={color}
          backgroundColor={backgroundColor}
          boldness={boldness}
          italics={italics}
          contour={contour}
          underline={underline}
          lineHeight={lineHeight}
          aspectRatio={aspectRatio}
          sparkLinePosition={sparkLinePosition}
          onTopkChange={handleDataChange}
          outChart={curBigChart}
          setHighlightMessage={setHighlightMessage}
          param4Filter={{
            startTime,
            endTime,
          }}
          setParamFuncs={{
            setStartTime,
            setEndTime,
          }}
        />
      ))
    }

    // if (showBigGraph && "chartType" in curSentence) {
    //   return <BigChart ChartType={curSentence.chartType} BigChartData={curSentence.metadata} />
    // }
  }

  // Local state for textPosition
  // const [textPosition, setTextPosition] = useState("left")
  // // Handlers for layout change
  // const handleLeftRightLayout = () => setTextPosition("left")
  // const handleTopBottomLayout = () => setTextPosition("top")
  // 根据 textPosition 来决定如何渲染内容
  const renderContent = () => {
    // console.log("打印当前文本布局", textPosition)
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
            {paragraph.map((curSentence, outIndex) => {
              // 动态确定使用 div 还是 span
              // console.log("确定此时的样式", isLineBreakOn, curSentence.type)
              const Element = isLineBreakOn || curSentence.type !== "bullet" ? "div" : "span"
              return (
                <Element
                  key={outIndex}
                  className={outIndex === 0 ? "draggable" : ""}
                  ref={outIndex === 0 ? ref : null}
                >
                  {renderBulletPoint(curSentence)}
                  {renderPhrases(curSentence)}
                  {/* 其他渲染内容 */}
                </Element>
              )
            })}
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
                    handleCurBigChart={handleCurBigChart}
                    highlightMessage={highlightMessage}
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
            // display: "flex",
            // flexDirection: "row",
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
          {paragraph.map((curSentence, outIndex) => {
            // 动态确定使用 div 还是 span
            // console.log("确定此时的样式", isLineBreakOn, curSentence.type)
            const Element = isLineBreakOn || curSentence.type !== "bullet" ? "div" : "span"
            return (
              <Element
                key={outIndex}
                className={outIndex === 0 ? "draggable" : ""}
                ref={outIndex === 0 ? ref : null}
              >
                {renderBulletPoint(curSentence)}
                {renderPhrases(curSentence)}
                {/* 其他渲染内容 */}
              </Element>
            )
          })}
          {/* 渲染图表 */}
          {paragraph.map((curSentence, outIndex) => {
            if (showBigGraph && "chartType" in curSentence) {
              return (
                <BigChart
                  ChartType={curSentence.chartType}
                  BigChartData={curSentence.metadata}
                  topk={topk}
                  handleCurBigChart={handleCurBigChart}
                  highlightMessage={highlightMessage}
                />
              )
            }
            return null
          })}
        </div>
      )
    }
  }
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 })
  const buttonRef = useRef<HTMLElement>(null) // 用于引用按钮的位置

  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const showModal = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setButtonPosition({
        top: rect.top + rect.height, // 按钮下方
        right: window.innerWidth - rect.left - rect.width, // 保持与按钮右对齐
      })
    }
    // 设置 Modal 的 visible 状态为 true
    setIsModalVisible(true)
  }

  return (
    <div ref={cardRef} style={{ position: "relative" }}>
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
        <ExportOutlined
          ref={buttonRef} // 将 ref 关联到按钮
          onClick={showModal}
          style={{ cursor: "pointer", fontSize: "20px", position: "absolute", top: 20, right: 30 }}
        />
      </Tooltip>
      <Modal
        title="Export Options"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        mask={false}
        maskClosable
        style={{
          position: "fixed", // 使用 fixed 保证 Modal 可以根据视口定位
          top: `${buttonPosition.top}px`, // 使用 state 中的位置
          right: `${buttonPosition.right}px`,
        }}
        getContainer={false} // 将 Modal 渲染到当前组件内
      >
        <p>
          <Button onClick={onClickExportAsHtml}>Download HTML</Button>
        </p>
        <p>
          <Button onClick={onClickExportAsImage}>Download Image</Button>
        </p>
      </Modal>
    </div>
  )
}

export default InsightCard
