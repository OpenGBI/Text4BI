import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { entityIconType, Metadata } from "../types"
import { AppState } from "../store"

type svgIconProps = {
  svgContent: string
}
export const SvgIcon: React.FC<svgIconProps> = ({ svgContent }) => (
  <span dangerouslySetInnerHTML={{ __html: svgContent }} />
)

type NoneDataIconProps = {
  entityIcon: entityIconType
  curMetadata: Metadata
}
export const NoneDataIcon: React.FC<NoneDataIconProps> = ({ entityIcon, curMetadata }) => {
  const [curSelectedSymbol, setCurSelectedSymbol] = useState<string>("a")
  const { selectedSymbol2, semanticBindingEntityType } = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )

  // 使用 useEffect 避免在渲染过程中更新状态
  useEffect(() => {
    if (semanticBindingEntityType === curMetadata.entityType) {
      setCurSelectedSymbol(selectedSymbol2)
      // useState的set函数必须写在useEffect里面，因为写在主逻辑中，主逻辑修改state，state更改处罚重渲染，重渲染又触发修改state 死循环
      // useEffect的逻辑是，组件先忽略useEffect，先执行主逻辑进行渲染，渲染完成后执行useEffect，进行操作但是不触发重渲染
    }
    // 依赖项数组中包括所有可能引起副作用变化的变量
  }, [selectedSymbol2, semanticBindingEntityType, curMetadata.entityType])
  // console.log("debug NoneData", entityIcon, selectedSymbol2)
  if (!curMetadata.entityType) return null
  if (!entityIcon[curMetadata.entityType]) return null
  if (entityIcon[curMetadata.entityType][selectedSymbol2] === "") return null
  let svgContent
  if (semanticBindingEntityType === curMetadata.entityType) {
    svgContent = entityIcon[curMetadata.entityType][selectedSymbol2]
  } else {
    svgContent = entityIcon[curMetadata.entityType][curSelectedSymbol]
  }
  //   const svgContent = entityIcon[curMetadata.entityType][selectedSymbol2]
  return <SvgIcon svgContent={svgContent} />
}
