import React, { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
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
import {
  highLightMessage,
  Phrase,
  Metadata,
  Point,
  cateAndValue,
  GlobalSettingStateType,
} from "../types"

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
const renderSparkLine = (
  curMetadata: Metadata,
  curAspectRatio: string,
  curSparkLinePosition: string,
  curWordSpan: HTMLSpanElement,
  curSparkLineSpan: HTMLSpanElement | undefined,
  defaultChoice: boolean, // 是否选择函数1
  value: string | number,
) => {
  if (!curMetadata.detail) {
    throw new Error("no curMetadata")
  }
  if (curMetadata.insightType === "Distribution") {
    if (defaultChoice) {
      renderDistribution1(
        curMetadata.detail as cateAndValue[],
        curAspectRatio,
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    } else if (!defaultChoice) {
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
    if (defaultChoice) {
      renderCategorization1(
        curMetadata.detail as cateAndValue[],
        curMetadata.tagData as number,
        curAspectRatio,
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    } else if (!defaultChoice) {
      renderCategorization2(
        curMetadata.detail as cateAndValue[],
        curMetadata.tagData as number,
        curAspectRatio,
        curSparkLinePosition,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    }
  }
  if (curMetadata.insightType === "Proportion") {
    if (defaultChoice) {
      renderProportion1(
        curMetadata.detail as number[],
        curAspectRatio,
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    } else if (!defaultChoice) {
      renderProportion2(
        curMetadata.detail as number[],
        curAspectRatio,
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
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
    if (defaultChoice) {
      const valuesFromData = curMetadata.detail.map((item) => (item as cateAndValue).value)
      let valuesFromPredictData: number[] = []

      if (curMetadata.tagData) {
        valuesFromPredictData = (curMetadata.tagData as cateAndValue[]).map((item) => item.value)
      }

      const combinedValues = [...valuesFromData, ...valuesFromPredictData]

      renderTemporalityTrend1(
        combinedValues as number[],
        curAspectRatio,
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    } else if (!defaultChoice) {
      const valuesFromData = curMetadata.detail.map((item) => (item as cateAndValue).value)
      let valuesFromPredictData: number[] = []

      if (curMetadata.tagData) {
        valuesFromPredictData = (curMetadata.tagData as cateAndValue[]).map((item) => item.value)
      }

      const combinedValues = [...valuesFromData, ...valuesFromPredictData]
      renderTemporalityTrend2(
        combinedValues as number[],
        curAspectRatio,
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    }
  }
  if (curMetadata.insightType === "TemporalDifference") {
    if (defaultChoice) {
      renderTemporalityDifference1(
        curMetadata.detail as cateAndValue[],
        curAspectRatio,
        curSparkLinePosition,
        curMetadata.tagData as number[],
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    } else if (!defaultChoice) {
      renderTemporalityDifference2(
        curMetadata.detail as cateAndValue[],
        curAspectRatio,
        curSparkLinePosition,
        curMetadata.tagData as number[],
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    }
  }
  if (curMetadata.insightType === "TemporalityAnomaly") {
    if (defaultChoice) {
      renderTemporalityAnomaly1(
        curMetadata.detail as cateAndValue[],
        curAspectRatio,
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    } else if (!defaultChoice) {
      renderTemporalityAnomaly2(
        curMetadata.detail as cateAndValue[],
        curAspectRatio,
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    }
  }
  if (curMetadata.insightType === "TemporalitySeasonality" && curMetadata.tagData) {
    if (defaultChoice) {
      renderTemporalitySeasonality1(
        curMetadata.detail as cateAndValue[],
        curMetadata.tagData as cateAndValue[],
        curAspectRatio,
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    } else if (!defaultChoice) {
      renderTemporalitySeasonality2(
        curMetadata.detail as cateAndValue[],
        curMetadata.tagData as cateAndValue[],
        curAspectRatio,
        curSparkLinePosition,
        curWordSpan,
        curSparkLineSpan,
      )
    }
  }
}
type NavigationSparkLineProp = {
  metadata: Metadata
  aspectRatio: string
  sparkLinePosition: string
  globalBoolean: boolean
  navigationClick: (cardID: number) => void
  cardIndex: number
  value: string | number
}
const NavigationSparkLine: React.FC<NavigationSparkLineProp> = ({
  metadata,
  aspectRatio,
  sparkLinePosition,
  globalBoolean,
  navigationClick,
  cardIndex,
  value,
}) => {
  // const stringID = CardID.match(/\d+/)?.[0]
  // let id = 0
  // if (stringID) {
  //   id = parseInt(stringID, 10) - 1
  // }
  const wordRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (wordRef.current && metadata.detail) {
      renderSparkLine(
        metadata,
        aspectRatio,
        sparkLinePosition,
        wordRef.current,
        wordRef.current,
        globalBoolean,
        value,
      )
    }
  }, [metadata, aspectRatio, sparkLinePosition, globalBoolean])
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // 检查是否按下了回车键或空格键
    if (event.key === "Enter" || event.key === " ") {
      navigationClick(cardIndex)
    }
  }

  return (
    <div
      ref={wordRef}
      onClick={() => navigationClick(cardIndex)}
      onKeyDown={handleKeyDown}
      role="button" // 添加角色
      tabIndex={0}
      aria-label="描述按钮功能的文本"
    />
  )
}
export default NavigationSparkLine
