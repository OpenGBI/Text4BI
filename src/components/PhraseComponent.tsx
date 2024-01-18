import React, { useRef, useEffect, useState } from "react"
import { RiseOutlined } from "@ant-design/icons"
import { Tooltip } from "antd"
import { useDispatch, useSelector } from "react-redux"
import SelectorInText from "./LineHeightComponents/SelectorInText"
import SelectorTime from "./LineHeightComponents/SelectionTime"
import Icon from "../utils/Icon"
import { ChangeGlobalSetting } from "../actions/GlobalSettingAction"
import { AppState } from "../store"
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
import { Phrase, Metadata, Point, cateAndValue, GlobalSettingStateType } from "../types"

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
  italics: boolean
  contour: boolean
  underline: boolean
  lineHeight: number
  aspectRatio: string
  sparkLinePosition: string
  onTopkChange: (newData: number) => void
}
interface Style {
  color?: string
  backgroundColor?: string
  fontSize?: string
  fontWeight?: string
  fontStyle?: string
  border?: string
  textDecoration?: string
}
const PhraseComponent: React.FC<PhraseComponentProps> = ({
  type,
  value,
  metadata = {},
  fontsize,
  color,
  backgroundColor,
  boldness,
  italics,
  contour,
  underline,
  lineHeight,
  aspectRatio,
  sparkLinePosition,
  onTopkChange,
}) => {
  const { showSparkLine } = useSelector((state: AppState) => state.globalSetting)
  const { selectedEntityType } = useSelector((state: AppState) => state.typographySetting)
  // console.log("确认entitytype值的改变", selectedEntityType)
    // 初始时为特定entityType设置的自定义样式
  // 现在 currentStyles 有了明确的索引签名
// 初始样式对象
  const initialStyles: { [key: string]: Style } = {
    metric_value: { color: "#4B91FF" },
    delta_value: { color: "#13A8A8" },
    delta_value_ratio: { color: "#13A8A8" },
    insight_desc: {
      color: metadata.assessment === "positive" || metadata.assessment === "increase" || metadata.assessment === "significant" || metadata.assessment === "left-skewed"
        ? "#13A8A8"
        : "#FA541C",
    },
    metric_name: { fontWeight: "bold" },
    dim_cate: { fontWeight: "bold" },
    algorithm: { textDecoration: "underline dashed" },
    // ... 其他实体类型
  }
  const [currentStyles, setCurrentStyles] = useState(initialStyles)
  // const [entityTypeStyles, setCustomStyles] = useState(initialEntityStyles)
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
  const sparkLineRef = useRef<HTMLSpanElement | null>(null)
  // useEffect(() => {
  //   // 当 showBigGraph 为 true 时，ref 保持不变。
  //   // 当 showBigGraph 为 false 时，将 ref.current 设置为 null。
  //   if (!showSparkLine) {
  //     sparkLineRef.current = null
  //   }
  // }, [showSparkLine])
  // 接收一个词，生成一个这个词的可视化效果和行内小图
  // const italicsValue = italics ? "italic" : "normal"
  // const contourValue = contour ? "1px solid black" : "none"
  const wordRef = useRef<HTMLSpanElement | null>(null)
  // console.log("测试输出color", wordColor)
  // const svgRef = useRef<SVGSVGElement | null>(null)
  // const tooltipRef = useRef<HTMLDivElement | null>(null)

  // useEffect(() => {
  //   if (
  //     type === "entity" &&
  //     metadata?.entityType === "trend_desc" &&
  //     svgRef.current &&
  //     tooltipRef.current
  //   ) {
  //     renderLineChart(svgRef.current, metadata.detail, tooltipRef.current, aspectRatio)
  //   }
  // }, [type, metadata, aspectRatio])
  // useEffect(() => {
  //   // 创建新的样式对象
  //   const newStyle = { ...currentStyles[selectedEntityType] } // 复制当前选中实体类型的既有样式
  //   // 根据需要更新样式
  //   if (newStyle.color !== color) newStyle.color = color
  //   if (newStyle.backgroundColor !== backgroundColor) newStyle.backgroundColor = backgroundColor
  //   if (newStyle.fontSize !== fontsize) newStyle.fontSize = fontsize
  //   if ((newStyle.fontWeight === "bold") !== boldness) newStyle.fontWeight = boldness ? "bold" : "normal"
  //   if ((newStyle.fontStyle === "italic") !== italics) newStyle.fontStyle = italics ? "italic" : "normal"
  //   if ((newStyle.border === "1px solid black") !== contour) newStyle.border = contour ? "1px solid black" : "none"
  //   if ((newStyle.textDecoration === "underline") !== underline) newStyle.textDecoration = underline ? "underline" : "none"
  //   // 更新状态
  //   setCurrentStyles((prevStyles) => ({
  //     ...prevStyles,
  //     [selectedEntityType]: newStyle,
  //   }))
  // }, [color, backgroundColor, fontsize, boldness, italics, contour, underline])

  // 针对 color 的 useEffect
  useEffect(() => {
    if (currentStyles[selectedEntityType]?.color !== color) {
      setCurrentStyles((prevStyles) => ({
        ...prevStyles,
        [selectedEntityType]: {
          ...prevStyles[selectedEntityType],
          color,
        },
      }))
    }
  }, [color])

  // 针对 backgroundColor 的 useEffect
  useEffect(() => {
    if (currentStyles[selectedEntityType]?.backgroundColor !== backgroundColor) {
      setCurrentStyles((prevStyles) => ({
        ...prevStyles,
        [selectedEntityType]: {
          ...prevStyles[selectedEntityType],
          backgroundColor,
        },
      }))
    }
  }, [backgroundColor])

  // 针对 fontsize 的 useEffect
  useEffect(() => {
    if (currentStyles[selectedEntityType]?.fontSize !== fontsize) {
      setCurrentStyles((prevStyles) => ({
        ...prevStyles,
        [selectedEntityType]: {
          ...prevStyles[selectedEntityType],
          fontSize: fontsize,
        },
      }))
    }
  }, [fontsize])

  // 针对 boldness 的 useEffect
  useEffect(() => {
    const newFontWeight = boldness ? "bold" : "normal"
    if (currentStyles[selectedEntityType]?.fontWeight !== newFontWeight) {
      setCurrentStyles((prevStyles) => ({
        ...prevStyles,
        [selectedEntityType]: {
          ...prevStyles[selectedEntityType],
          fontWeight: newFontWeight,
        },
      }))
    }
  }, [boldness])

  // 针对 italics 的 useEffect
  useEffect(() => {
    const newFontStyle = italics ? "italic" : "normal"
    if (currentStyles[selectedEntityType]?.fontStyle !== newFontStyle) {
      setCurrentStyles((prevStyles) => ({
        ...prevStyles,
        [selectedEntityType]: {
          ...prevStyles[selectedEntityType],
          fontStyle: newFontStyle,
        },
      }))
    }
  }, [italics])

  // 针对 contour 的 useEffect
  useEffect(() => {
    const newBorder = contour ? "1px solid black" : "none"
    if (currentStyles[selectedEntityType]?.border !== newBorder) {
      setCurrentStyles((prevStyles) => ({
        ...prevStyles,
        [selectedEntityType]: {
          ...prevStyles[selectedEntityType],
          border: newBorder,
        },
      }))
    }
  }, [contour])

  // 针对 underline 的 useEffect
  useEffect(() => {
    const newTextDecoration = underline ? "underline" : "none"
    if (currentStyles[selectedEntityType]?.textDecoration !== newTextDecoration) {
      setCurrentStyles((prevStyles) => ({
        ...prevStyles,
        [selectedEntityType]: {
          ...prevStyles[selectedEntityType],
          textDecoration: newTextDecoration,
        },
      }))
    }
  }, [underline])

  const renderWord = (curMetadata: Metadata) => {
    // 确保 entityType 不是 undefined
    const entityType = curMetadata.entityType || "default" // "default" 是一个占位值

    // 现在可以安全地使用 entityType 作为索引
    const style = currentStyles[entityType] || {}

    return (
      <Tooltip title={curMetadata.origin}>
        <span
          ref={wordRef}
          style={{
            color: style.color || "#000000",
            backgroundColor: style.backgroundColor || "#FFFFFF",
            fontSize: style.fontSize || "medium",
            fontWeight: style.fontWeight || "normal",
            fontStyle: style.fontStyle || "normal",
            border: style.border || "none",
            textDecoration: style.textDecoration || "none",
            lineHeight,
            position: "relative",
          }}
          className={curMetadata.entityType}
        >
          {value}
        </span>
      </Tooltip>
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
        // curMetadata.detail.every((element) => typeof element === "number")
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
        // curMetadata.detail.every((element) => typeof element === "number")
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
        // curMetadata.detail.every((element) => typeof element === "number")
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
        // curMetadata.detail.every((element) => typeof element === "number")
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
        // curMetadata.detail.every((element) => typeof element === "number")
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
        // curMetadata.detail.every((element) => typeof element === "number")
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
          metadata.tagData as Point[],
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (!defaultChoice && isPointArray(curMetadata.detail)) {
        renderAssociation2(
          curMetadata.detail as Point[],
          curAspectRatio,
          curSparkLinePosition,
          metadata.tagData as Point[],
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
        // curMetadata.detail.every((element) => typeof element === "number")
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
        // curMetadata.detail.every((element) => typeof element === "number")
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
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        console.log(
          "renderTemporalityDifference1renderTemporalityDifference1renderTemporalityDifference1renderTemporalityDifference1",
        )
        renderTemporalityDifference1(
          curMetadata.detail as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          metadata.tagData as number[],
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !defaultChoice
        //  &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        renderTemporalityDifference2(
          curMetadata.detail as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          metadata.tagData as number[],
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
        // curMetadata.detail.every((element) => typeof element === "number")
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
        // curMetadata.detail.every((element) => typeof element === "number")
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
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        renderTemporalitySeasonality1(
          curMetadata.detail as cateAndValue[],
          metadata.tagData as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        renderTemporalitySeasonality2(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          metadata.tagData as number[],
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
  }
  // if (!metadata) {
  //   throw new Error("No data found for the date")
  // }
  useEffect(() => {
    // showSparkLine 为 true 时，重新显示或创建小图
    if (showSparkLine) {
      // 如果之前隐藏了小图，现在重新显示它
      if (sparkLineRef.current) {
        sparkLineRef.current.style.display = "" // 或者 "block", 取决于你的布局需求
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
      // 或者移除内容：sparkLineRef.current.innerHTML = ""
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
    // // 下面是对颜色进行设置
    // // 确保 entityType 不是 undefined
    // const entityType = metadata.entityType || "default" // "default" 是一个占位值
    // const newStyle = { ...currentStyles[entityType] }
    // // 判断和设置特定的样式
    // if (entityType === "delta_value" || entityType === "delta_value_ratio" || entityType === "insight_desc") {
    //   // 确保 assessment 不是 undefined
    //   const assessment = metadata.assessment || ""
    //   if (["positive", "increase", "significant", "left-skewed"].includes(assessment)) {
    //     newStyle.color = "#13A8A8"
    //   } else {
    //     newStyle.color = "#FA541C"
    //   }
    // }
    // // 更新 currentStyles 状态
    // setCurrentStyles((prevStyles) => ({
    //   ...prevStyles,
    //   [entityType]: newStyle,
    // }))
    // if (metadata.entityType === "dim_value") {
    //   contourValue = "1px solid black"
    // }
    // const getSvgWidth = (curAspectRatio: string) => {
    //   if (curAspectRatio === "tiny") {
    //     return "20"
    //   }
    //   if (curAspectRatio === "medium") {
    //     return "27"
    //   }
    //   if (curAspectRatio === "big") {
    //     return "100"
    //   }
    //   return "100"
    // }

    return (
      <>
        {
          metadata?.entityType === "insight" && sparkLinePosition === "left" ? (
            <span id="sparkLineElement" ref={sparkLineRef} className="sparkLineSpan">
              {/* <svg ref={svgRef} width={getSvgWidth(aspectRatio)} height="20" /> */}
              {/* 在此处把变量svgRef和真实的dom元素绑定起来，当组件被渲染后，svgRef.current将会指向这个SVG元素 */}
              {/* <div ref={tooltipRef} className="tooltip" /> */}
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
            position: "relative",
          }}
          className="trend_desc"
        >
          {value}
        </span> */}
        {renderWord(metadata)}

        {
          metadata?.entityType === "insight" && sparkLinePosition === "right" ? (
            <span ref={sparkLineRef} className="sparkLineSpan">
              {/* <svg ref={svgRef} width={getSvgWidth(aspectRatio)} height="20" /> */}
              {/* 在此处把变量svgRef和真实的dom元素绑定起来，当组件被渲染后，svgRef.current将会指向这个SVG元素 */}
              {/* <div ref={tooltipRef} className="tooltip" /> */}
            </span>
          ) : null // 这是一个三目运算符 ？：
        }
        {metadata?.entityType === "insight_desc" ? (
          // <RiseOutlined style={{ fontSize: "16px", color: "#FA541C" }} />
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
        {value}{""}
      </span>
    )
  }
  return <span style={{ fontSize: fontsize, lineHeight }}>{value}</span>
}
// PhraseComponent.defaultProps={
//   onDataChange
// }
export default PhraseComponent
