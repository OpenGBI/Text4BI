import React, { useRef, useEffect, useState } from "react"
import { RiseOutlined } from "@ant-design/icons"
import { Tooltip } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { Chart } from "@antv/g2"
import SelectorInText from "./LineHeightComponents/SelectorInText"
import SelectorTime from "./LineHeightComponents/SelectionTime"
import Icon from "../utils/Icon"
import { ChangeGlobalSetting } from "../actions/GlobalSettingAction"
import { AppState } from "../store"
import {
  highLightMessage,
  Phrase,
  Metadata,
  Point,
  cateAndValue,
  GlobalSettingStateType,
} from "../types"
import {
  renderAssociation1,
  renderAssociation2,
  renderCategorization1,
  renderCategorization2,
  renderDistribution1,
  renderDistribution2,
  renderProportion1,
  renderProportion2,
  renderTemporalityAnomaly1,
  renderTemporalityAnomaly2,
  renderTemporalityDifference1,
  renderTemporalityDifference2,
  renderTemporalitySeasonality1,
  renderTemporalitySeasonality2,
  renderTemporalityTrend1,
  renderTemporalityTrend2,
} from "../utils/SparkLineFuncs"

const globalBoolean = true
// interface Phrase {
//   type: string
//   value: string
//   metadata?: any
// }
function isPointArray(value: any): value is Point[] {
  if (!Array.isArray(value)) {
    return false
  }

  return value.every(
    (point) =>
      typeof point === "object" &&
      point !== null &&
      "x" in point &&
      "y" in point &&
      typeof point.x === "number" &&
      typeof point.y === "number",
  )
}
interface PhraseComponentProps extends Phrase {
  color: string
  backgroundColor: string
  fontsize: string
  boldness: boolean
  contour: boolean
  underline: boolean
  lineHeight: number
  aspectRatio: string
  sparkLinePosition: string
  onTopkChange: (newData: number) => void // 往子组件传递回调函数
  outChart: Chart | null
  setHighlightMessage: (message: highLightMessage) => void
  // React.MutableRefObject<Chart | null> ref
}
const PhraseComponent: React.FC<PhraseComponentProps> = ({
  type,
  value,
  metadata = {},
  fontsize,
  color,
  backgroundColor,
  boldness,
  contour,
  underline,
  lineHeight,
  aspectRatio,
  sparkLinePosition,
  onTopkChange,
  outChart,
  setHighlightMessage,
}) => {
  const { showSparkLine } = useSelector((state: AppState) => state.globalSetting)
  const {
    distributionType,
    rankType,
    proportionType,
    associationType,
    trendType,
    differenceType,
    anomalyType,
    seasonalityType,
  } = useSelector((state: AppState) => state.wordScaleGraphicsSetting)
  const [showSparkLineGraphic, setShowSparkLineGraphic] = useState(showSparkLine)

  // const [hoverState, setHoverState] = useState({ message: "", hoverOrNot: false })

  const sparkLineRef = useRef<HTMLSpanElement | null>(null)
  // useEffect(() => {
  //   // 当 showBigGraph 为 true 时，ref 保持不变。
  //   // 当 showBigGraph 为 false 时，将 ref.current 设置为 null。
  //   if (!showSparkLine) {
  //     sparkLineRef.current = null
  //   }
  // }, [showSparkLine])
  // 接收一个词，生成一个这个词的可视化效果和行内小图
  let fontWeightValue = boldness ? "bold" : "normal"
  const contourValue = contour ? "1px solid black" : "none"
  let underlineValue = underline ? "underline" : "none"
  let wordColor: string = color
  const backgroundColorValue: string = backgroundColor
  const wordRef = useRef<HTMLSpanElement | null>(null)
  // console.log('测试输出color', wordColor)
  // const svgRef = useRef<SVGSVGElement | null>(null)
  // const tooltipRef = useRef<HTMLDivElement | null>(null)

  // useEffect(() => {
  //   if (
  //     type === 'entity' &&
  //     metadata?.entityType === 'trend_desc' &&
  //     svgRef.current &&
  //     tooltipRef.current
  //   ) {
  //     renderLineChart(svgRef.current, metadata.detail, tooltipRef.current, aspectRatio)
  //   }
  // }, [type, metadata, aspectRatio])
  const renderWord = (curMetadata: Metadata) => {
    const handleHover = () => {
      if (curMetadata.origin) {
        console.log("message: curMetadata.origin", curMetadata.origin)
        setHighlightMessage({ message: curMetadata.origin, hoverOrNot: true })
      } else {
        setHighlightMessage({ message: value, hoverOrNot: true })
      }

      // 使用setHighlightMessage(hoverState)是不对的，因为setHoverState({ message: curValue, hoverOrNot: true })是异步的，执行setHighlightMessage时，hoverState还没被修改 zyx
      // outChart.emit("brush:remove", {})
    }
    const handleLeave = () => {
      // 这里可以添加你希望在鼠标离开时执行的代码
      // 例如，可以取消高亮显示
      setHighlightMessage({ message: "", hoverOrNot: false })
    }
    if (curMetadata.entityType) {
      // console.log('测试输出curMetadata', curMetadata.entityType) //这个地方就是用来调整entity的样式的！
      return (
        <Tooltip title={curMetadata.origin}>
          <span
            ref={wordRef}
            style={{
              color: wordColor,
              backgroundColor: backgroundColorValue,
              fontSize: fontsize,
              fontWeight: fontWeightValue,
              border: contourValue,
              textDecoration: underlineValue,
              lineHeight,
              position: "relative",
            }}
            className={curMetadata.insightType}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            {value}
          </span>
        </Tooltip>
      )
    }
    return (
      <span
        ref={wordRef}
        style={{
          color: wordColor,
          backgroundColor: backgroundColorValue,
          fontSize: fontsize,
          fontWeight: fontWeightValue,
          border: contourValue,
          textDecoration: underlineValue,
          lineHeight,
          position: "relative",
        }}
        className={curMetadata.entityType}
        // onMouseEnter={handleHover}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        {value}
      </span>
    )
  }
  const renderSparkLine = (
    curMetadata: Metadata,
    curAspectRatio: string,
    curSparkLinePosition: string,
    curWordSpan: HTMLSpanElement,
    curSparkLineSpan: HTMLSpanElement | undefined,
    defaultChoice: boolean, // 是否选择函数1
  ) => {
    if (!curMetadata.detail) {
      throw new Error("no curMetadata")
    }
    if (curMetadata.insightType === "Distribution") {
      if (
        defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderDistribution1(
          curMetadata.detail as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderDistribution2(
          curMetadata.detail as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === "Categorization") {
      if (
        defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderCategorization1(
          curMetadata.detail as cateAndValue[],
          curMetadata.tagData as number,
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderCategorization2(
          curMetadata.detail as cateAndValue[],
          curMetadata.tagData as number,
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === "Proportion") {
      if (
        defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderProportion1(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderProportion2(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === "Association") {
      if (defaultChoice && isPointArray(curMetadata.detail)) {
        renderAssociation1(
          curMetadata.detail as Point[],
          curAspectRatio,
          curSparkLinePosition,
          curMetadata.tagData as Point[],
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (!defaultChoice && isPointArray(curMetadata.detail)) {
        renderAssociation2(
          curMetadata.detail as Point[],
          curAspectRatio,
          curSparkLinePosition,
          curMetadata.tagData as Point[],
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === "TemporalityTrend") {
      if (
        defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        const valuesFromData = curMetadata.detail.map((item) => (item as cateAndValue).value)
        let valuesFromPredictData: number[] = []

        if (curMetadata.tagData) {
          // Now valuesFromPredictData is accessible within this block
          valuesFromPredictData = (curMetadata.tagData as cateAndValue[]).map((item) => item.value)
        }

        const combinedValues = [...valuesFromData, ...valuesFromPredictData]

        renderTemporalityTrend1(
          combinedValues as number[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !defaultChoice
        //  &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        const valuesFromData = curMetadata.detail.map((item) => (item as cateAndValue).value)
        let valuesFromPredictData: number[] = []

        if (curMetadata.tagData) {
          // Now valuesFromPredictData is accessible within this block
          valuesFromPredictData = (curMetadata.tagData as cateAndValue[]).map((item) => item.value)
        }

        const combinedValues = [...valuesFromData, ...valuesFromPredictData]
        renderTemporalityTrend2(
          combinedValues as number[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === "TemporalDifference") {
      if (
        defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderTemporalityDifference1(
          curMetadata.detail as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          curMetadata.tagData as number[],
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !defaultChoice
        //  &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderTemporalityDifference2(
          curMetadata.detail as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          curMetadata.tagData as number[],
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === "TemporalityAnomaly") {
      if (
        defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderTemporalityAnomaly1(
          curMetadata.detail as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderTemporalityAnomaly2(
          curMetadata.detail as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === "TemporalitySeasonality" && curMetadata.tagData) {
      if (
        defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderTemporalitySeasonality1(
          curMetadata.detail as cateAndValue[],
          curMetadata.tagData as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderTemporalitySeasonality2(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          curMetadata.tagData as number[],
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
  }
  // if (!metadata) {
  //   throw new Error('No data found for the date')
  // }
  useEffect(() => {
    // showSparkLine 为 true 时，重新显示或创建小图
    if (showSparkLine) {
      // 如果之前隐藏了小图，现在重新显示它
      if (sparkLineRef.current) {
        sparkLineRef.current.style.display = "" // 或者 'block', 取决于你的布局需求
      }
      // 以下是原有的逻辑，用于创建小图
      if (
        wordRef.current &&
        metadata.detail &&
        (sparkLinePosition === "up" || sparkLinePosition === "down")
      ) {
        renderSparkLine(
          metadata,
          aspectRatio,
          sparkLinePosition,
          wordRef.current,
          undefined,
          globalBoolean,
        )
      }
      if (
        wordRef.current &&
        sparkLineRef.current &&
        metadata.detail &&
        (sparkLinePosition === "left" || sparkLinePosition === "right")
      ) {
        renderSparkLine(
          metadata,
          aspectRatio,
          sparkLinePosition,
          wordRef.current,
          sparkLineRef.current,
          globalBoolean,
        )
      }
    } else if (sparkLineRef.current) {
      // showSparkLine 为 false 时，隐藏或移除小图
      sparkLineRef.current.style.display = "none"
      // 或者移除内容：sparkLineRef.current.innerHTML = ''
    }
  }, [type, metadata, aspectRatio, sparkLinePosition, showSparkLine]) // 确保 showSparkLine 在依赖项中

  if (type === "entity") {
    if (metadata.entityType === "filter_cate" && metadata.selections) {
      return (
        <SelectorInText
          selections={metadata.selections}
          defaultSelection={metadata.selections[0]}
          onTopkChange={onTopkChange}
        />
      )
    }
    if (metadata.entityType === "filter_time" && metadata.selections) {
      return <SelectorTime defaultSelection={metadata.selections[0]} />
    }
    if (metadata.entityType === "metric_value") {
      wordColor = "#4B91FF"
    }
    if (
      metadata.entityType === "delta_value" ||
      metadata.entityType === "delta_value_ratio" ||
      metadata.entityType === "insight_desc"
    ) {
      if (
        metadata.assessment === "positive" ||
        metadata.assessment === "increase" ||
        metadata.assessment === "significant" ||
        metadata.assessment === "left-skewed"
      ) {
        wordColor = "#13A8A8"
      } else {
        wordColor = "#FA541C"
      }
    }
    if (metadata.entityType === "metric_name" || metadata.entityType === "dim_cate") {
      fontWeightValue = "bold"
    }
    // if (metadata.entityType === 'dim_value') {
    //   contourValue = '1px solid black'
    // }
    if (metadata.entityType === "algorithm") {
      underlineValue = "underline dashed"
    }

    return (
      <>
        {
          metadata?.entityType === "insight" && sparkLinePosition === "left" ? (
            <span id="sparkLineElement" ref={sparkLineRef} className="sparkLineSpan">
              {/* <svg ref={svgRef} width={getSvgWidth(aspectRatio)} height='20' /> */}
              {/* 在此处把变量svgRef和真实的dom元素绑定起来，当组件被渲染后，svgRef.current将会指向这个SVG元素 */}
              {/* <div ref={tooltipRef} className='tooltip' /> */}
            </span>
          ) : null // 这是一个三目运算符 ？：
        }
        {/* <span
          ref={wordRef}
          style={{
            fontSize: fontsize,
            fontWeight: fontWeightValue,
            textDecoration: underlineValue,
            lineHeight,
            position: 'relative',
          }}
          className='trend_desc'
        >
          {value}
        </span> */}
        {renderWord(metadata)}

        {
          metadata?.entityType === "insight" && sparkLinePosition === "right" ? (
            <span ref={sparkLineRef} className="sparkLineSpan">
              {/* <svg ref={svgRef} width={getSvgWidth(aspectRatio)} height='20' /> */}
              {/* 在此处把变量svgRef和真实的dom元素绑定起来，当组件被渲染后，svgRef.current将会指向这个SVG元素 */}
              {/* <div ref={tooltipRef} className='tooltip' /> */}
            </span>
          ) : null // 这是一个三目运算符 ？：
        }
        {metadata?.entityType === "insight_desc" ? (
          // <RiseOutlined style={{ fontSize: '16px', color: '#FA541C' }} />
          <Icon assessment={metadata.assessment as string} />
        ) : null}
      </>
    )
  }
  if (type === "CardTitle") {
    return (
      <span
        style={{
          fontSize: fontsize,
          lineHeight,
          position: "relative",
          fontWeight: "bold",
          backgroundColor: "#87CEFA",
          padding: "5px",
          borderRadius: "5px",
        }}
        className="CardTitle"
      >
        {value}
      </span>
    )
  }
  return <span style={{ fontSize: fontsize, lineHeight }}>{value}</span>
}
// PhraseComponent.defaultProps={
//   onDataChange
// }
export default PhraseComponent
