// SelectorTime.tsx
import React, { useEffect } from "react"
import { DatePickerProps, DatePicker, Space } from "antd"
import dayjs from "dayjs"
import { useSelector } from "react-redux"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { AppState } from "../../store"

dayjs.extend(customParseFormat)
const dateFormat = "YYYY-MM-DD"
const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  // console.log(date, dateString)
}
type typeSelectorTimeProps = {
  defaultSelection: string
}
interface SelectorTimeProps {
  defaultSelection: string
}

const SelectorTime: React.FC<SelectorTimeProps> = ({ defaultSelection }) => {
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

  return (
    <Space direction="vertical">
      <DatePicker
        defaultValue={dayjs(defaultSelection, dateFormat)}
        format={dateFormat}
        onChange={onChange}
        style={{ padding: paddingSize, fontSize: "var(--dynamic-font-size)", height }}
      />
    </Space>
  )
}

export default SelectorTime
