import React, { useEffect, useState, useRef } from "react"
import { ConfigProvider, Select, Space } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { setState } from "@antv/s2"
import { AppState } from "../../store" // 确保路径正确
import styles from "./SelectorInText.module.css"
import { Metadata4Configuration, highLightMessage, Metadata, systemStateType } from "../../types"
import { ChangeSystemSetting } from "../../actions/systemAction"

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
  // console.log("debug-SelectorInText", params4BackEnd)
  // const systemSetting: systemStateType = useSelector((state: AppState) => state.system)
  const { fontsize } = useSelector((state: AppState) => state.globalSetting)
  const fontSizeNumber = Math.max(5, Math.min(parseInt(fontsize, 10), 25))
  const width = `${Math.max(30, fontSizeNumber * 10)}px` // 根据fontsize计算width
  const height = `${Math.max(10, fontSizeNumber * 1.6)}px` // 根据fontsize计算width
  const paddingSize = `${Math.max(5, fontSizeNumber)}px` // 根据fontsize计算padding
  const dropdownTextSize = fontsize // 设置下拉框中文本的大小与fontsize一致
  const [curTopK, setCurTopK] = useState("3")
  const dispatch = useDispatch()
  const systemStateSetting: systemStateType = useSelector((state: AppState) => state.system)
  // console.log("数据集", systemStateSetting.datasetId)
  // console.log("下拉框", params4BackEnd.drillDownGroup)
  // console.log("数据集", systemStateSetting.resetDataset)
  // console.log("选项", defaultSelection)
  // const curTopKRef = useRef<string>(curTopK)
  // useEffect(() => {
  //   if (params4BackEnd.topK) {
  //     setCurTopK(params4BackEnd.topK)
  //     // curTopKRef.current = params4BackEnd.topK
  //   }
  // }, [params4BackEnd])

  const { selectedEntityType, entityStyles } = useSelector(
    (state: AppState) => state.typographySetting,
  )
  // console.log("检查样式值", selectedEntityType, entityStyles[selectedEntityType].boldness)
  const fontWeightValue = entityStyles.filter_cate.boldness ? "bold" : "normal"
  const fontStyleValue = entityStyles.filter_cate.italics ? "italic" : "normal"
  const textDecorationValue = entityStyles.filter_cate.underline ? "underline" : "none"
  const colorValue = entityStyles.filter_cate.color
  const backgroundColorValue = entityStyles.filter_cate.backgroundColor
  const textContourValue = entityStyles.filter_cate.contour ? "1px solid black" : "none" // 举例: 黑色轮廓
  const [selectedValue, setSelectedValue] = useState(defaultSelection)
  // 监听defaultSelection的变化，当变化时更新selectedValue
  useEffect(() => {
    setSelectedValue(defaultSelection)
  }, [defaultSelection])
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
    document.documentElement.style.setProperty("--dynamic-font-weight", fontWeightValue)
  }, [fontWeightValue])

  useEffect(() => {
    // 设置初始的 CSS 变量值为 "bold"
    const fontWeightValue2 = entityStyles.filter_cate.boldness ? "bold" : "normal"
    document.documentElement.style.setProperty("--dynamic-font-weight", fontWeightValue2)
    // document.documentElement.style.setProperty("--dynamic-font-color", "#000") // 这里设置初始文本颜色为黑色
    // 其他必要的初始化操作...
  }, [])
  // useEffect(() => {
  //   // ...
  //   document.documentElement.style.setProperty("--dynamic-text-contour", "1px solid black")
  //   // ...
  // }, [textContourValue])

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
    // 创建一个 style 元素
    const style = document.createElement("style")
    // 设置 style 内容
    style.innerHTML = `
        .ant-select .ant-select-arrow {
        inset-inline-end: 20px !important
      }
    `
    // 将 style 元素添加到 head 中
    document.head.appendChild(style)

    // 在组件卸载时，清理添加的 style 元素
    return () => {
      document.head.removeChild(style)
    }
  }, []) // 空依赖数组确保这段代码只在组件首次渲染时运行

  useEffect(() => {
    // 计算 padding-top 和 padding-bottom
    const paddingTop = "0"
    const paddingBottom = "0"

    document.documentElement.style.setProperty("--select-padding-left", paddingSize)
    document.documentElement.style.setProperty("--select-padding-right", paddingSize)
    document.documentElement.style.setProperty("--select-padding-top", paddingTop)
    document.documentElement.style.setProperty("--select-padding-bottom", paddingBottom)
  }, [fontsize])

  const backComm = (curParams: Metadata4Configuration, curChartType: string) => {
    // console.log("debug-11", curParams)
    const curSelectedData = systemStateSetting.datasetId
    // console.log(
    //   "debug-backComm",
    //   "http://localhost:5000/".concat(curSelectedData).concat("/").concat(curChartType),
    // )
    fetch("http://localhost:5000/".concat(curSelectedData).concat("/").concat(curChartType), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chartType,
        timeSelection: curParams.timeSelection,
        drillDownSelect: curParams.drillDownSelect,
        drillDownGroup: curParams.drillDownGroup,
        timeSegmentationCondition: curParams.timeSegmentationCondition,
        topK: curParams.topK,
      }), // 将name参数转换为JSON字符串
    })
      .then((response) => response.json())
      .then((data) => {
        paramsFuncs4BackEnd.setTimeSelection(curParams.timeSelection as string[])
        paramsFuncs4BackEnd.setDrillDownSelect(curParams.drillDownSelect as string)
        paramsFuncs4BackEnd.setDrillDownGroup(curParams.drillDownGroup as string)
        paramsFuncs4BackEnd.setTimeSegmentationCondition(
          curParams.timeSegmentationCondition as string,
        )
        paramsFuncs4BackEnd.setTopK(curParams.topK as string)
        // console.log("debug-data", data)
        dispatch(
          ChangeSystemSetting({
            ...systemStateSetting,
            dataset: data,
          }),
        )
      })
      .catch((error) => console.error("Error:", error))
  }

  const handleChange = (value: string) => {
    setSelectedValue(value)
    let curParams
    console.log("debug-handleChange", backEndType)
    if (backEndType === "drillDownGroup") {
      curParams = { ...params4BackEnd, drillDownGroup: value }
      paramsFuncs4BackEnd.setDrillDownGroup(value)
    }

    if (backEndType === "timeSegmentationCondition") {
      curParams = { ...params4BackEnd, timeSegmentationCondition: value }
    }
    if (backEndType === "topK") {
      curParams = { ...params4BackEnd, topK: value }
      paramsFuncs4BackEnd.setTopK(value)
      setCurTopK(value)
    }
    if (curParams) {
      backComm(curParams, chartType)
    }
    // console.log("当前值", curParams)
  }
  // console.log("debug-selections", selections, defaultSelection)
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
          key={defaultSelection} // 添加key属性
          value={selectedValue}
          className={styles.customDropdown}
          style={{
            width,
            height,
            padding: `0 ${paddingSize}`,
          }}
          onChange={handleChange}
        >
          {selections.map((selection) => (
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
