import { MenuProps, Dropdown, message, Space, Select } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeGlobalSetting } from '../../actions/GlobalSettingAction'
import { AppState } from '../../store'
import { GlobalSettingStateType } from '../../types'

const ControlFont: React.FC = () => {
  const dispatch = useDispatch()
  const [font, setFont] = useState('')

  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )
  const handleChangeFont = (newFont: string) => {
    setFont(newFont)
    console.log(newFont)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        fontsize: newFont,
      }),
    )
  }

  const onSearch = (value: string) => {
    console.log('search:', value)
  }
  return (
    <Select
      showSearch
      placeholder='Select a Font'
      optionFilterProp='children'
      onChange={handleChangeFont}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={[
        {
          value: '14px',
          label: '14px',
        },
        {
          value: '15px',
          label: '15px',
        },
        {
          value: '16px',
          label: '16px',
        },
      ]}
    />
  )
}

export default ControlFont
