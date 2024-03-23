import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { entityIconType, Metadata, absoluteIconType } from "../types"
import { AppState } from "../store"

type svgIconProps = {
  svgContent: string
}
export const SvgIcon: React.FC<svgIconProps> = ({ svgContent }) => (
  <span dangerouslySetInnerHTML={{ __html: svgContent }} />
)

type NoneDataIconProps = {
  entityIcon: entityIconType
  absoluteIcon: absoluteIconType
  curMetadata: Metadata
  type: string
}
export const NoneDataIcon: React.FC<NoneDataIconProps> = ({
  entityIcon,
  absoluteIcon,
  curMetadata,
  type,
}) => {
  // console.log("debug-entityIcon", entityIcon, absoluteIcon, curMetadata, type)
  const [curSelectedSymbol1, setCurSelectedSymbol1] = useState<string>("null") // 句子首尾的icon
  const [curSelectedSymbol2, setCurSelectedSymbol2] = useState<string>("null") // entity的icon
  const {
    selectedSymbol1,
    semanticsAbsolutePosition,
    selectedSymbol2,
    semanticBindingEntityType,
    beginPositionSymbol,
    endPositionSymbol,
    generalSymbol,
    plusSymbol,
    minusSymbol,
    measureSymbol,
    methodSymbol,
    filterSymbol,
  } = useSelector((state: AppState) => state.wordScaleGraphicsSetting)

  // useEffect(() => {
  //   if (type === "IconPadding" && semanticsAbsolutePosition === curMetadata.entityType) {
  //     setCurSelectedSymbol1(selectedSymbol1)
  //   }
  // }, [selectedSymbol1, semanticsAbsolutePosition, curMetadata.entityType])

  // 使用 useEffect 避免在渲染过程中更新状态
  useEffect(() => {
    if (type === "entity" && semanticBindingEntityType === curMetadata.entityType) {
      setCurSelectedSymbol2(selectedSymbol2)
      // useState的set函数必须写在useEffect里面，因为写在主逻辑中，主逻辑修改state，state更改处罚重渲染，重渲染又触发修改state 死循环
      // useEffect的逻辑是，组件先忽略useEffect，先执行主逻辑进行渲染，渲染完成后执行useEffect，进行操作但是不触发重渲染
    }
    // 依赖项数组中包括所有可能引起副作用变化的变量
  }, [selectedSymbol2, semanticBindingEntityType, curMetadata.entityType])
  // console.log("debug NoneData", entityIcon, selectedSymbol2)
  let svgContent
  console.log("debug-entityIcon", entityIcon, curMetadata.entityType)
  if (type === "IconPadding") {
    if (!curMetadata.entityType) return null
    // if (semanticsAbsolutePosition === curMetadata.entityType) {
    //   svgContent = absoluteIcon[curMetadata.entityType][selectedSymbol1]
    // } else {
    //   svgContent = absoluteIcon[curMetadata.entityType][curSelectedSymbol1]
    // }
    if (curMetadata.entityType === "sentenceStart") {
      svgContent = absoluteIcon[curMetadata.entityType][beginPositionSymbol]
    } else {
      svgContent = absoluteIcon[curMetadata.entityType][endPositionSymbol]
    }
  } else {
    // console.log("debug-entityIcon", entityIcon, curMetadata.entityType)
    console.log("debug-entityIcon1", entityIcon, curMetadata.entityType)
    if (!curMetadata.entityType) return null
    if (!entityIcon[curMetadata.entityType] && !curMetadata.entityType.startsWith("filter")) {
      return null
    }
    // if (entityIcon[curMetadata.entityType][selectedSymbol2] === "") return null

    // if (semanticBindingEntityType === curMetadata.entityType) {
    //   svgContent = entityIcon[curMetadata.entityType][selectedSymbol2]
    // } else {
    //   svgContent = entityIcon[curMetadata.entityType][curSelectedSymbol2]
    // }

    if (curMetadata.entityType === "metric_value") {
      svgContent = entityIcon[curMetadata.entityType][generalSymbol]
    } else if (curMetadata.entityType === "binary_value_positive") {
      svgContent = entityIcon[curMetadata.entityType][plusSymbol]
    } else if (curMetadata.entityType === "binary_value_negative") {
      svgContent = entityIcon[curMetadata.entityType][minusSymbol]
    } else if (curMetadata.entityType === "metric_names") {
      svgContent = entityIcon[curMetadata.entityType][measureSymbol]
    } else if (curMetadata.entityType === "algorithm") {
      svgContent = entityIcon[curMetadata.entityType][methodSymbol]
    } else {
      console.log("debug-entityIcon1", entityIcon, curMetadata.entityType)
      svgContent = entityIcon.filter[filterSymbol]
    }
  }

  //   const svgContent = entityIcon[curMetadata.entityType][selectedSymbol2]

  return <SvgIcon svgContent={svgContent} />
}
