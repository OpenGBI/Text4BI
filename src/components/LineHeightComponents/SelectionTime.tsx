import React from 'react'
import { DatePickerProps, DatePicker, Space } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
const dateFormat = 'YYYY-MM-DD'
const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString)
}
type typeSelectorTimeProps = {
  defaultSelection: string
}
const SelectorTime: React.FC<typeSelectorTimeProps> = ({ defaultSelection }) => (
  <Space direction='vertical'>
    <DatePicker defaultValue={dayjs(defaultSelection, dateFormat)} onChange={onChange} />
  </Space>
)

export default SelectorTime
