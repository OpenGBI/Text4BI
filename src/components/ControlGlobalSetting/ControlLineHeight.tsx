import { MenuProps, Dropdown, message, Space, Select } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeGlobalSetting } from '../../actions/GlobalSettingAction'
import { AppState } from '../../store'
import { GlobalSettingStateType } from '../../types'

const ControlLineHeight: React.FC = () => {
  const dispatch = useDispatch()
  // const [font, setFont] = useState('')

  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )
  const handleChangeLineHeight = (lineHeight: string) => {
    // setFont(newFont)
    // console.log(newFont)
    const numberLineHeight = Number(lineHeight)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        lineHeight: numberLineHeight,
      }),
    )
  }

  const onSearch = (value: string) => {
    console.log('search:', value)
  }
  return (
    <Select
      showSearch
      placeholder='Select a Line Height'
      optionFilterProp='children'
      onChange={handleChangeLineHeight}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={[
        {
          value: '1',
          label: '1',
        },
        {
          value: '1.5',
          label: '1.5',
        },
        {
          value: '2',
          label: '2',
        },
      ]}
    />
  )
}

export default ControlLineHeight
