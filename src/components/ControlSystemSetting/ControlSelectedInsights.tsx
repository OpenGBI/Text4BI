import React from "react"
import { Select, Tag } from "antd"
import { SelectProps } from "antd/lib/select"

interface TagRenderProps {
  label: React.ReactNode
  value: string
  closable: boolean
  onClose: () => void
}

const ControlSelectedInsights: React.FC = () => {
  const defaultValue = ["gold", "cyan"]
  const options = [
    { value: "cyan", label: "Distribution of Sales" },
    { value: "lime", label: "Difference of total Profit by Year" },
    { value: "magenta", label: "Sum of Sales by City" },
    { value: "volcano", label: "Proportion Analysis of Sales Volume by Different Countries" },
    { value: "orange", label: "Association between Sales and Profit" },
    { value: "gold", label: "Trend of Sales" },
    { value: "green", label: "Anomaly detection of Sales" },
    { value: "yellow", label: "Periodicity of Sales" },
  ]

  const tagRender = ({ label, value, closable, onClose }: TagRenderProps) => {
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault()
      event.stopPropagation()
    }
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
          maxWidth: 200, // 这里可以设置一个最大宽度
          maxHeight: 30,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Tag>
    )
  }

  const defaultValuesLabels = defaultValue.map(
    (val) => options.find((option) => option.value === val)?.label,
  )

  return (
    <div style={{ width: 300, display: "inline-block" }}> {/* 设置外部容器的固定宽度 */}
      <Select
        mode="multiple"
        showArrow
        tagRender={tagRender}
        defaultValue={defaultValuesLabels}
        style={{ width: "100%" }} // 设置Select组件的宽度为100%
        dropdownMatchSelectWidth={false} // 确保下拉菜单的宽度不会改变
        dropdownStyle={{ width: 300 }} // 设置下拉菜单的固定宽度
        options={options}
      />
    </div>
  )
}

export default ControlSelectedInsights
