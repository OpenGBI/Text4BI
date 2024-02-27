import React, { useEffect } from "react"
import { ConfigProvider, Select, Space } from "antd"
import { useSelector } from "react-redux"
import { AppState } from "../../store" // 确保路径正确
import styles from "./SelectorInText.module.css"

interface SelectorProps {
  defaultSelection: string
  selections: string[]
  handleTopKChange: (value: string) => void
  handleHover: () => void
  handleLeave: () => void
}

const SelectorInText: React.FC<SelectorProps> = ({
  defaultSelection,
  selections,
  handleTopKChange,
  handleHover,
  handleLeave,
}) => {
  const { fontsize } = useSelector((state: AppState) => state.globalSetting)
  const fontSizeNumber = Math.max(5, Math.min(parseInt(fontsize, 10), 25))
  const width = `${Math.max(40, fontSizeNumber * 10)}px` // 根据fontsize计算width
  const height = `${Math.max(10, fontSizeNumber * 1.6)}px` // 根据fontsize计算width
  const paddingSize = `${Math.max(5, fontSizeNumber)}px` // 根据fontsize计算padding
  const dropdownTextSize = fontsize // 设置下拉框中文本的大小与fontsize一致

  useEffect(() => {
    // const fontsize = fontSizeNumber
    // 更新 CSS 变量以匹配 fontsize
    document.documentElement.style.setProperty("--dynamic-font-size", fontsize)
  }, [fontsize])

  useEffect(() => {
    // 计算 padding-top 和 padding-bottom
    const paddingTop = "0"
    const paddingBottom = "0"

    document.documentElement.style.setProperty("--select-padding-left", paddingSize)
    document.documentElement.style.setProperty("--select-padding-right", paddingSize)
    document.documentElement.style.setProperty("--select-padding-top", paddingTop)
    document.documentElement.style.setProperty("--select-padding-bottom", paddingBottom)
  }, [fontsize])

  const handleChange = (value: string) => {
    handleTopKChange(value)
    // const numericValue = parseFloat(value)
    // if (!Number.isNaN(numericValue)) {
    //   onTopkChange(numericValue)
    // }
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
        <Select
          defaultValue={defaultSelection}
          className={styles.customDropdown}
          style={{
            width,
            height,
            // fontSize: fontsize,
            padding: `0 ${paddingSize}`, // 应用计算后的padding
          }}
          // dropdownClassName={styles.customDropdown} // 使用模块化CSS类
          onChange={handleChange}
        >
          {selections.map((selection: string) => (
            <Select.Option key={selection} value={selection} style={{ fontSize: fontsize }}>
              {selection}
            </Select.Option>
          ))}
        </Select>
      </Space>
    </ConfigProvider>
  )
}

export default SelectorInText
