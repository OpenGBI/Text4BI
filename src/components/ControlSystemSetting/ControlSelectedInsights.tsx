import React, { useState } from "react"
import { Select, Tag } from "antd"
import { SelectProps } from "antd/lib/select"
import { useDispatch, useSelector } from "react-redux"
import { systemStateType } from "../../types"
import { AppState } from "../../store"
import { ChangeSystemSetting } from "../../actions/systemAction"

interface TagRenderProps {
  label: React.ReactNode
  value: string
  closable: boolean
  onClose: () => void
}

interface OptionType {
  label: string
  value: string
}

const ControlSelectedInsights: React.FC = () => {
  const dispatch = useDispatch()
  const systemSetting: systemStateType = useSelector((state: AppState) => state.system)
  const [curSelectedCards, setSelectedCards] = useState([
    "Card1",
    "Card2",
    "Card3",
    "Card4",
    "Card5",
    "Card6",
    "Card7",
    "Card8",
  ])

  const defaultValue = ["gold", "cyan"]
  const COLOR_PALETTE = [
    "#fbb4ae",
    "#b3cde3",
    "#ccebc5",
    "#decbe4",
    "#fed9a6",
    "#ffffcc",
    "#e5d8bd",
    "#fddaec",
  ] // Pastel1 色板

  const options = [
    { value: COLOR_PALETTE[0], label: "Distribution of Sales", cardid: "Card1" },
    { value: COLOR_PALETTE[1], label: "Difference of total Profit by Year", cardid: "Card2" },
    { value: COLOR_PALETTE[2], label: "Sum of Sales by City", cardid: "Card3" },
    { value: COLOR_PALETTE[3], label: "Proportion Analysis of Sales Volume by Different Countries", cardid: "Card4" },
    { value: COLOR_PALETTE[4], label: "Association between Sales and Profit", cardid: "Card5" },
    { value: COLOR_PALETTE[5], label: "Trend of Sales", cardid: "Card6" },
    { value: COLOR_PALETTE[6], label: "Anomaly detection of Sales", cardid: "Card7" },
    { value: COLOR_PALETTE[7], label: "Periodicity of Sales", cardid: "Card8" },
  ]
  const formatOptionLabel = ({ label, value }: OptionType) => {
    console.log("检查formatOptionLabel的参数", label, value)
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <span
          style={{ color: value, fontSize: "20px", fontWeight: "bold" }}
        > · </span> */}
        <span
          style={{
          height: "10px",
          width: "10px",
          backgroundColor: value, // 使用option中的颜色值
          borderRadius: "50%",
          display: "inline-block",
          marginRight: "8px", // 和文本保持一定间距
          flexShrink: 0, // 防止圆点被压缩
          }}
        >
          {/* 这里是颜色圆点 */}
        </span>
        <span style={{ color: "black" }}>{label}</span>
      </div>
    )
  }

  const tagRender = ({ label, value, closable, onClose }: TagRenderProps) => {
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault()
      event.stopPropagation()
    }

    return (
      <Tag
        color={value} // 这里设置 Tag 的颜色，如果你想保留背景色的话
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
          maxWidth: 200,
          maxHeight: 30,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          lineHeight: "30px",
          // 这里移除了 backgroundColor，因为我们不显示颜色圆点
          // 如果你不希望 Tag 有任何颜色，也可以移除 color 属性
        }}
      >
        {label}
      </Tag>
    )
  }

  const defaultValuesLabels = defaultValue.map(
    (val) => options.find((option) => option.value === val)?.label,
  )

  const [selectedValues, setSelectedValues] = React.useState<string[]>([])
  const handleChange = (selectedItems: string[]) => {
    // console.log("检查第一次的selectedItems", selectedItems)
    setSelectedValues(selectedItems)
    // 将对应的cardid存起来
    const selectedIds = selectedItems.map(
      (value) => options.find((option) => option.value === value)?.cardid,
    ).filter((cardid): cardid is string => !!cardid) // 过滤掉undefined
    // console.log("检查第一次的selectedvalues", selectedValues)
    // console.log("检查第一次的selectedIds", selectedIds)
    setSelectedCards(selectedIds)
    dispatch(
      ChangeSystemSetting({
        ...systemSetting,
        selectedCards: selectedIds,
      }),
    )
  }

  return (
    <div className="custom-select-dropdown" style={{ width: 300, display: "inline-block" }}> {/* 设置外部容器的固定宽度 */}
      <Select
        // dropdownClassName="custom-dropdown"
        mode="multiple"
        showArrow
        tagRender={tagRender}
        value={selectedValues}
        onChange={handleChange}
        style={{ width: "100%" }} // 设置Select组件的宽度为100%
        dropdownMatchSelectWidth={false} // 确保下拉菜单的宽度不会改变
        dropdownStyle={{ width: 300 }} // 设置下拉菜单的固定宽度
        // 移除 options={options}
      >
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {formatOptionLabel(option)}
          </Select.Option>
        ))}
      </Select>
    </div>
  )
}

export default ControlSelectedInsights
