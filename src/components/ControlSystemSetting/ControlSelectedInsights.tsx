import React from 'react'
import { Select, Tag } from 'antd'
import { SelectProps } from 'antd/lib/select'

interface TagRenderProps {
  label: React.ReactNode
  value: string
  closable: boolean
  onClose: () => void
}

const ControlSelectedInsights: React.FC = () => {
  const defaultValue = ['gold', 'cyan']
  const options = [
    { value: 'gold', label: 'Trend of Sales' },
    { value: 'lime', label: 'Lime Sales' },
    { value: 'green', label: 'Green Sales' },
    { value: 'cyan', label: 'Distribution of Sales' },
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
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    )
  }

  const defaultValuesLabels = defaultValue.map(
    (val) => options.find((option) => option.value === val)?.label,
  )

  return (
    <Select
      mode='multiple'
      showArrow
      tagRender={tagRender} // 应该不需要进行类型断言
      defaultValue={defaultValuesLabels}
      style={{ width: '50%' }}
      options={options}
    />
  )
}

export default ControlSelectedInsights
