// SelectorTime.tsx
import React, { useEffect } from "react"
import { DatePickerProps, DatePicker, Space } from "antd"
import dayjs from "dayjs"
import { useSelector, useDispatch } from "react-redux"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { Metadata, systemStateType, Metadata4Configuration } from "../../types"
import { ChangeSystemSetting } from "../../actions/systemAction"
import { AppState } from "../../store"

dayjs.extend(customParseFormat)
const dateFormat = "YYYY-MM-DD"
type setParamFunc4FilterType = {
  setTimeSelection: (timeSelection: string[]) => void
  setDrillDownSelect: (drillDownSelect: string) => void
  setDrillDownGroup: (drillDownGroup: string) => void
  setTimeSegmentationCondition: (timeSegmentationCondition: string) => void
  setTopK: (topK: string) => void
}
type typeSelectorTimeProps = {
  defaultSelection: string
  metadata: Metadata
  chartType: string
  paramIndex: number // 时间的下标
  params4BackEnd: Metadata4Configuration
  paramsFuncs4BackEnd: setParamFunc4FilterType
}
const SelectorTime: React.FC<typeSelectorTimeProps> = ({
  defaultSelection,
  metadata,
  chartType,
  paramIndex,
  params4BackEnd,
  paramsFuncs4BackEnd,
}) => {
  const { fontsize } = useSelector((state: AppState) => state.globalSetting)
  const dispatch = useDispatch()
  const systemStateSetting: systemStateType = useSelector((state: AppState) => state.system)
  // 提取 fontsize 中的数字部分，并确保它在 5 到 25 的范围内
  const fontSizeNumber = Math.max(5, Math.min(parseInt(fontsize, 10), 25))
  // 根据 fontsize 计算 padding 和 border 的大小
  const paddingSize = `${Math.max(0, fontSizeNumber / 10)}px` // 示例：padding 为 fontsize 的一半，但至少 3px
  const height = `${Math.max(10, fontSizeNumber * 1.6)}px` // 根据fontsize计算width
  const backComm = (curParams: Metadata4Configuration, curChartType: string) => {
    fetch("http://localhost:5000/".concat(curChartType), {
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

        dispatch(
          ChangeSystemSetting({
            ...systemStateSetting,
            dataset: data,
          }),
        )
      })
      .catch((error) => console.error("Error:", error))
  }
  const handleOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    // curParams = { ...params4BackEnd, drillDownGroup: value }
    const curTimeSelection = { ...params4BackEnd }.timeSelection
    if (curTimeSelection) {
      curTimeSelection[paramIndex] = dateString
      paramsFuncs4BackEnd.setTimeSelection(curTimeSelection)
    }
    const curParams = { ...params4BackEnd, timeSelection: curTimeSelection }

    // console.log("debug-chartType", chartType)
    // console.log("debug-params4BackEnd", curParams.timeSelection)
    backComm(curParams, chartType)
  }
  useEffect(() => {
    // 设置 CSS 变量
    document.documentElement.style.setProperty("--dynamic-font-size", fontsize)
    // 覆盖 Ant Design DatePicker 下拉部分的字体大小
    const styleTag = document.createElement("style")
    styleTag.innerHTML = `
      .ant-picker-dropdown {
        font-size: var(--dynamic-font-size) !important
      }
    `
    document.head.appendChild(styleTag)

    // 在组件卸载时移除添加的样式
    return () => {
      document.head.removeChild(styleTag)
    }
  }, [fontsize])

  return (
    <Space direction="vertical">
      <DatePicker
        className="date-picker"
        defaultValue={dayjs(defaultSelection, dateFormat)}
        onChange={handleOnChange}
        style={{ height }}
      />
    </Space>
  )
}

export default SelectorTime
