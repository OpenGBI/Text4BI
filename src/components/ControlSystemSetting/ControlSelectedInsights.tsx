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
  const options = [
    { value: "cyan", label: "Distribution of Sales", cardid: "Card1" },
    { value: "lime", label: "Difference of total Profit by Year", cardid: "Card2" },
    { value: "magenta", label: "Sum of Sales by City", cardid: "Card3" },
    { value: "volcano", label: "Proportion Analysis of Sales Volume by Different Countries", cardid: "Card4" },
    { value: "orange", label: "Association between Sales and Profit", cardid: "Card5" },
    { value: "gold", label: "Trend of Sales", cardid: "Card6" },
    { value: "green", label: "Anomaly detection of Sales", cardid: "Card7" },
    { value: "yellow", label: "Periodicity of Sales", cardid: "Card8" },
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
          maxWidth: 200, // 这里可以1设置一个最大宽度
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
    <div style={{ width: 300, display: "inline-block" }}> {/* 设置外部容器的固定宽度 */}
      <Select
        mode="multiple"
        showArrow
        tagRender={tagRender}
        value={selectedValues}
        onChange={handleChange}
        // defaultValue={defaultValuesLabels}
        style={{ width: "100%" }} // 设置Select组件的宽度为100%
        dropdownMatchSelectWidth={false} // 确保下拉菜单的宽度不会改变
        dropdownStyle={{ width: 300 }} // 设置下拉菜单的固定宽度
        options={options}
      />
    </div>
  )
}

export default ControlSelectedInsights
