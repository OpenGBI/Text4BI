import React from "react"
import { Select, Space } from "antd"

type typeSelectorProps = {
  defaultSelection: string
  selections: string[]
  onTopkChange: (value: number) => void
}
const SelectorInText: React.FC<typeSelectorProps> = ({
  defaultSelection,
  selections,
  onTopkChange,
}) => {
  const handleChange = (value: string) => {
    // console.log(`selected ${value}`)
    // 尝试将 value 转换为数字
    const numericValue = parseFloat(value)

    // 检查转换后的值是否是有效数字
    if (!Number.isNaN(numericValue)) {
      // 如果是有效数字，调用 onTopkChange
      onTopkChange(numericValue)
    }
  }

  return (
    <Space wrap>
      <Select
        defaultValue={defaultSelection}
        style={{ width: 75 }}
        onChange={handleChange}
        options={selections.map((selection: string) => ({ value: selection, label: selection }))}
      />
    </Space>
  )
}

export default SelectorInText
