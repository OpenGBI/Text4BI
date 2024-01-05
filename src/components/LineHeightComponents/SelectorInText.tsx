import React from 'react'
import { Select, Space } from 'antd'

const handleChange = (value: string) => {
  // console.log(`selected ${value}`)
}
type typeSelectorProps = {
  defaultSelection: string
  selections: string[]
}
const SelectorInText: React.FC<typeSelectorProps> = ({ defaultSelection, selections }) => (
  <Space wrap>
    <Select
      defaultValue={defaultSelection}
      style={{ width: 75 }}
      onChange={handleChange}
      options={selections.map((selection: string) => ({ value: selection, label: selection }))}
    />
  </Space>
)

export default SelectorInText
