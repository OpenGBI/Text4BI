// SelectorTime.tsx
import React, { useEffect } from "react"
import { DatePickerProps, DatePicker, Space } from "antd"
import dayjs from "dayjs"
import { useSelector, useDispatch } from "react-redux"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { Metadata, systemStateType } from "../../types"
import { ChangeSystemSetting } from "../../actions/systemAction"
import { AppState } from "../../store"

dayjs.extend(customParseFormat)
const dateFormat = "YYYY-MM-DD"

type typeSelectorTimeProps = {
  defaultSelection: string
  metadata: Metadata
}
const SelectorTime: React.FC<typeSelectorTimeProps> = ({ defaultSelection, metadata }) => {
  const { fontsize } = useSelector((state: AppState) => state.globalSetting)
  // 提取 fontsize 中的数字部分，并确保它在 5 到 25 的范围内
  const fontSizeNumber = Math.max(5, Math.min(parseInt(fontsize, 10), 25))
  // 根据 fontsize 计算 padding 和 border 的大小
  const paddingSize = `${Math.max(0, fontSizeNumber / 10)}px` // 示例：padding 为 fontsize 的一半，但至少 3px
  const height = `${Math.max(10, fontSizeNumber * 1.6)}px` // 根据fontsize计算width

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
  const dispatch = useDispatch()
  const systemStateSetting: systemStateType = useSelector((state: AppState) => state.system)
  const handleOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    // if (metadata.paramFilter !== "startTime" && metadata.paramFilter !== "endTime") return
    // if (metadata.paramFilter === "startTime") {
    //   setParamFunc.setStartTime(dateString as string)
    //   fetch("http://localhost:5000/distribution", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ startTime: dateString, endTime: param4Filter.endTime }), // 将name参数转换为JSON字符串
    //   })
    //     .then((response) => {
    //       console.log(response)
    //       return response.json()
    //     })
    //     .then((data) => {
    //       console.log(data)
    //       dispatch(
    //         ChangeSystemSetting({
    //           ...systemStateSetting,
    //           dataset: data,
    //         }),
    //       )
    //     })
    //     .catch((error) => console.error("Error:", error))
    // }
    // if (metadata.paramFilter === "endTime") {
    //   setParamFunc.setEndTime(dateString as string)
    // }
  }
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
