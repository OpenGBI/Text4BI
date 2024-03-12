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
import { Card, sentence, highLightMessage, ConfigurationSentence } from "../types"
// import ConfigurationSentence
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
  const [timeSelection, setTimeSelection] = useState([""]) // Difference需要四个时刻来确定
  const [drillDownSelect, setDrillDownSelect] = useState("")
  const [drillDownGroup, setDrillDownGroup] = useState("")
  const [timeSegmentationCondition, setTimeSegmentationCondition] = useState("")
  const [topK, setTopK] = useState("-1")
  const [chartType, setChartType] = useState("")
  const [params4BackEnd, setParams4BackEnd] = useState({}) // 这样，在InsightCard中修改params4BackEnd才能传下去
  const [flag, setFlag] = useState(0)
  // let params4BackEnd = {} // 把参数打包起来
  const paramsFuncs4BackEnd = {
    setTimeSelection,
    setDrillDownSelect,
    setDrillDownGroup,
    setTimeSegmentationCondition,
    setTopK,
  }
  // let flag = 0
  useEffect(() => {
    // 从paragraph中找到类型为'configuration'的对象，对当前状态进行初始化
    if (flag === 0) {
      setFlag(1)

      const configuration = paragraph.find((p) => p.type === "configuration")

      if (configuration && "metadata" in configuration) {
        if ("chartType" in configuration) {
          setChartType(configuration.chartType)
        }
        if ("timeSelection" in configuration.metadata) {
          setTimeSelection(configuration.metadata.timeSelection as string[])
        }
        if ("drillDownSelect" in configuration.metadata) {
          setDrillDownSelect(configuration.metadata.drillDownSelect as string)
        }
        if ("drillDownGroup" in configuration.metadata) {
          setDrillDownGroup(configuration.metadata.drillDownGroup as string)
        }
        if ("timeSegmentationCondition" in configuration.metadata) {
          setTimeSegmentationCondition(configuration.metadata.timeSegmentationCondition as string)
        }
        if ("topK" in configuration.metadata) {
          setTopK(configuration.metadata.topK as string)
        }
      }
    }
  }, [paragraph])
  useEffect(() => {
    // 重新设置了Params4BackEnd

    // 这个 useEffect 会在 timeSelection 等状态更新后运行
    setParams4BackEnd({
      timeSelection,
      drillDownSelect,
      drillDownGroup,
      timeSegmentationCondition,
      topK,
    })
    // 假设你需要在这里将 params4BackEnd 发送给后端
  }, [timeSelection, drillDownSelect, drillDownGroup, timeSegmentationCondition, topK])
  //
  // 给大图交互留的 old
  const [curBigChart, setCurBigChart] = useState<Chart | null>(null)
  // ref = useRef() ref => React.MutableRefObject<Chart | null>
  // ref.current -> Chart | null
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 })
  const [showButtons, setShowButtons] = useState(true)
  const buttonRef = useRef<HTMLElement>(null) // 用于引用按钮的位置

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

  // const [topk, setTopk] = useState<number>(-1) // 控制数据集中的哪几项用于绘图
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
    // setTopK(newData)\
  }

  if (!CardName || !paragraph || !id || !onDrop) {
    console.log("No data found for the date", CardName, paragraph, id)
    throw new Error("No data found for the date")
  }
  const onCopySuccess = () => {
    console.log("success")
  }

  const onClickExportAsHtml = async () => {
    // 检查 cardRef.current 是否存在
    if (cardRef.current) {
      // 添加一个临时类来隐藏边框
      cardRef.current.classList.add("hide-border")
      setTimeout(async () => {
        try {
          // 现在我们可以确信 cardRef.current 不为 null
          const html = await getNarrativeHtml(cardRef.current!)
          // 移除临时添加的类，以便边框在页面上能再次显示
          cardRef.current!.classList.remove("hide-border")
          // 创建并打开新窗口
          const newWindow = window.open("", "_blank")
          if (newWindow) {
            newWindow.document.write(html)
            newWindow.document.title = "Exported Content"
          } else {
            alert("Unable to open a new window. Please check your popup settings.")
          }
        } catch (error) {
          console.error("Error exporting as HTML:", error)
          // 在这里处理错误
        }
      }, 100) // 根据需要可能要调整延时
    } else {
      // cardRef.current 是 null 的情况处理
      console.error("The card element is not available.")
      // 在这里处理错误或显示消息
    }
  }
  // const onClickExportAsHtml = async () => {
  //   // 隐藏模态对话框
  //   setIsModalVisible(false)

  //   // 给 React 时间来更新视图
  //   setTimeout(async () => {
  //     if (cardRef.current) {
  //       // 移除模态对话框的内容，假设它有一个特定的类名或ID
  //       const modalContent = cardRef.current.querySelector(".modal-class")
  //       // if (modalContent) {
  //       //   modalContent.style.display = "none"
  //       // }

  //       try {
  //         // 确保时间筛选框和图表在导出的HTML中显示
  //         const htmlContent = cardRef.current.innerHTML
  //         // 创建 Blob
  //         const blob = new Blob([htmlContent], { type: "text/html" })
  //         const link = document.createElement("a")
  //         link.href = URL.createObjectURL(blob)
  //         link.download = "export.html"
  //         document.body.appendChild(link)
  //         link.click()
  //         document.body.removeChild(link)
  //         URL.revokeObjectURL(link.href)

  //         // 重新显示模态对话框内容
  //         // if (modalContent) {
  //         //   modalContent.style.display = "block"
  //         // }
  //       } catch (error) {
  //         console.error("Error while exporting HTML:", error)
  //       }
  //     }
  //   }, 100)
  // }
  const onClickCopyButton = async () => {
    if (cardRef?.current) {
      // const textExporter = new TextExporter()
      const html = await getNarrativeHtml(cardRef.current)
      const plainText = "plainText"
      copyToClipboard(html, plainText, onCopySuccess)
      // onCopy?.(currentInsightInfo, ref.current)
    }
  }
  const onClickExportAsImage = async () => {
    // Ensure the modal is not visible when the screenshot is taken
    setIsModalVisible(false)
    // We give React some time to apply the visibility change.
    // 隐藏按钮
    setShowButtons(false)
    setTimeout(async () => {
      if (cardRef?.current) {
        // Using html2canvas to render the cardRef element into a canvas
        const canvas = await html2canvas(cardRef.current, {
          // Optionally, you can specify additional options for html2canvas here
        })
        // Create an image URL
        const image = canvas.toDataURL("image/png", 1.0)
        // Create a link element
        const link = document.createElement("a")
        // Set the download attribute and filename
        link.download = "insight-card.png"
        // Set the image URL as the href of the link
        link.href = image
        // Trigger the download
        link.click()
        // 恢复显示按钮
        setShowButtons(true)
        // 恢复按钮的显示
        // if (buttonRef.current) {
        //   buttonRef.current.style.display = "block"
        // }
      }
    }, 100) // You might need to adjust this timeout based on how quickly your modal hides
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
          chartType={chartType}
          params4BackEnd={params4BackEnd}
          paramsFuncs4BackEnd={paramsFuncs4BackEnd}
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
          italics={italics}
          contour={contour}
          underline={underline}
          lineHeight={lineHeight}
          aspectRatio={aspectRatio}
          sparkLinePosition={sparkLinePosition}
          onTopkChange={handleDataChange}
          outChart={curBigChart}
          setHighlightMessage={setHighlightMessage}
          chartType={chartType}
          params4BackEnd={params4BackEnd}
          paramsFuncs4BackEnd={paramsFuncs4BackEnd}
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
              if (showBigGraph && curSentence.type === "plot") {
                return (
                  <BigChart
                    ChartType={curSentence.chartType}
                    BigChartData={curSentence.metadata}
                    // topk={topK}
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
            if (showBigGraph && curSentence.type === "plot") {
              return (
                <BigChart
                  ChartType={curSentence.chartType}
                  BigChartData={curSentence.metadata}
                  // topk={topK}
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
    <div className="insight-card-container" ref={cardRef} style={{ position: "relative" }}>
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
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 60,
            display: showButtons ? "block" : "none",
          }}
        >
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
          style={{
            cursor: "pointer",
            fontSize: "20px",
            position: "absolute",
            top: 10,
            right: 35,
            display: showButtons ? "block" : "none",
          }}
        />
      </Tooltip>
      <Modal
        title="Export Options"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        mask={false} // 不显示遮罩
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
