import React, { useEffect, useState, useRef } from "react"
import { ConfigProvider, Select, Space } from "antd"
import { useSelector } from "react-redux"
import { setState } from "@antv/s2"
import { AppState } from "../../store" // 确保路径正确
import styles from "./SelectorInText.module.css"
import { Metadata4Configuration, highLightMessage, Metadata } from "../../types"
// import { fontWeight } from "html2canvas/dist/types/css/property-descriptors/font-weight"
// import { doc } from "prettier"

type setParamFunc4FilterType = {
  setTimeSelection: (timeSelection: string[]) => void
  setDrillDownSelect: (drillDownSelect: string) => void
  setDrillDownGroup: (drillDownGroup: string) => void
  setTimeSegmentationCondition: (timeSegmentationCondition: string) => void
  setTopK: (topK: string) => void
}
interface SelectorProps {
  defaultSelection: string
  selections: string[]
  metadata: Metadata
  setHighlightMessage: (message: highLightMessage) => void
  chartType: string
  backEndType: string
  params4BackEnd: Metadata4Configuration
  paramsFuncs4BackEnd: setParamFunc4FilterType
}

const SelectorInText: React.FC<SelectorProps> = ({
  defaultSelection,
  selections,
  metadata,
  setHighlightMessage,
  chartType,
  backEndType,
  params4BackEnd,
  paramsFuncs4BackEnd,
}) => {
  const { fontsize } = useSelector((state: AppState) => state.globalSetting)
  const fontSizeNumber = Math.max(5, Math.min(parseInt(fontsize, 10), 25))
  const width = `${Math.max(40, fontSizeNumber * 10)}px` // 根据fontsize计算width
  const height = `${Math.max(10, fontSizeNumber * 1.6)}px` // 根据fontsize计算width
  const paddingSize = `${Math.max(5, fontSizeNumber)}px` // 根据fontsize计算padding
  const dropdownTextSize = fontsize // 设置下拉框中文本的大小与fontsize一致
  const [curTopK, setCurTopK] = useState("3")
  // const curTopKRef = useRef<string>(curTopK)
  // useEffect(() => {
  //   if (params4BackEnd.topK) {
  //     setCurTopK(params4BackEnd.topK)
  //     // curTopKRef.current = params4BackEnd.topK
  //   }
  // }, [params4BackEnd])

  const { selectedEntityType, entityStyles } = useSelector((state: AppState) => state.typographySetting)
  // console.log("检查样式值", selectedEntityType, entityStyles[selectedEntityType].boldness)
  const fontWeightValue = entityStyles.filter_cate.boldness ? "bold" : "normal"
  const fontStyleValue = entityStyles.filter_cate.italics ? "italic" : "normal"
  const textDecorationValue = entityStyles.filter_cate.underline ? "underline" : "none"
  const colorValue = entityStyles.filter_cate.color
  const backgroundColorValue = entityStyles.filter_cate.backgroundColor
  const textContourValue = entityStyles.filter_cate.contour ? "1px solid black" : "none" // 举例: 黑色轮廓

  const handleHover = () => {
    const highlightMessage: highLightMessage = { hoverOrNot: true, message: "" }
    if (curTopK) {
      highlightMessage.message = curTopK
    }

    if (metadata.interactionType) {
      highlightMessage.interactionType = metadata.interactionType
    }
    setHighlightMessage(highlightMessage)
  }
  const handleLeave = () => {
    setHighlightMessage({ message: "", hoverOrNot: false })
  }

  useEffect(() => {
    // const fontsize = fontSizeNumber
    // 更新 CSS 变量以匹配 fontsize
    document.documentElement.style.setProperty("--dynamic-font-size", fontsize)
  }, [fontsize])

  useEffect(() => {
    // 设置初始的 CSS 变量值为 "bold"
    const fontWeightValue2 = entityStyles.filter_cate.boldness ? "bold" : "normal"
    document.documentElement.style.setProperty("--dynamic-font-weight", fontWeightValue2)
    // document.documentElement.style.setProperty("--dynamic-font-color", "#000") // 这里设置初始文本颜色为黑色
    // 其他必要的初始化操作...
  }, [])

  useEffect(() => {
    const fontWeightValue1 = entityStyles.filter_cate.boldness ? "bold" : "normal"
    const fontStyleValue1 = entityStyles.filter_cate.italics ? "italic" : "normal"
    const textDecorationValue1 = entityStyles.filter_cate.underline ? "underline" : "none"
    // const textContourValue1 = entityStyles.filter_cate.contour ? "0 0 1px #000" : "none" // 举例: 黑色轮廓
    const colorValue1 = entityStyles.filter_cate.color
    const backgroundColorValue1 = entityStyles.filter_cate.backgroundColor
    // 设置 CSS 变量
    document.documentElement.style.setProperty("--dynamic-font-weight", fontWeightValue1)
    document.documentElement.style.setProperty("--dynamic-font-style", fontStyleValue1)
    document.documentElement.style.setProperty("--dynamic-text-decoration", textDecorationValue1)
    // document.documentElement.style.setProperty("--dynamic-text-contour", textContourValue1)
    document.documentElement.style.setProperty("--dynamic-font-color", colorValue1)
    document.documentElement.style.setProperty("--dynamic-background-color", backgroundColorValue1)
  }, [selectedEntityType, entityStyles])

  useEffect(() => {
    // 计算 padding-top 和 padding-bottom
    const paddingTop = "0"
    const paddingBottom = "0"

    document.documentElement.style.setProperty("--select-padding-left", paddingSize)
    document.documentElement.style.setProperty("--select-padding-right", paddingSize)
    document.documentElement.style.setProperty("--select-padding-top", paddingTop)
    document.documentElement.style.setProperty("--select-padding-bottom", paddingBottom)
  }, [fontsize])
  const callBackEnd = () => {
    console.log()
  }

  const handleChange = (value: string) => {
    // if (backEndType === "timeSelection") {
    //   console.log()
    // }
    // if (backEndType === "drillDownSelect") {
    //   console.log()
    // }
    if (backEndType === "drillDownGroup") {
      console.log()
    }
    if (backEndType === "timeSegmentationCondition") {
      console.log()
    }
    if (backEndType === "topK") {
      paramsFuncs4BackEnd.setTopK(value)
      setCurTopK(value)
      console.log("debug-3-hover", params4BackEnd)
    }
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            fontSize: fontSizeNumber,
          },
        },
      }}
    >
      <Space direction="vertical">
        <span onMouseEnter={handleHover} onMouseLeave={handleLeave}>
          <Select
            defaultValue={defaultSelection}
            className={styles.customDropdown}
            style={{
              width,
              height,
              // fontWeight: entityStyles[selectedEntityType].boldness ? "bold" : "normal",
              // color: entityStyles[selectedEntityType].color,
              // fontSize: fontsize,
              padding: `0 ${paddingSize}`, // 应用计算后的padding
            }}
            // dropdownClassName={styles.customDropdown} // 使用模块化CSS类
            onChange={handleChange}
          >
            {selections.map((selection: string) => (
              <Select.Option
                key={selection}
                value={selection}
                style={{
                  fontSize: fontsize,
                  fontWeight: fontWeightValue,
                  fontStyle: fontStyleValue,
                  textDecoration: textDecorationValue,
                  textShadow: textContourValue,
                  color: colorValue,
                  backgroundColor: backgroundColorValue,
                }}
              >
                {selection}
              </Select.Option>
            ))}
          </Select>
        </span>
      </Space>
    </ConfigProvider>
  )
}

export default SelectorInText
