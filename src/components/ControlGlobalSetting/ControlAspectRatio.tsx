import { MenuProps, Dropdown, message, Space, Select } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeGlobalSetting } from '../../actions/GlobalSettingAction'
import { AppState } from '../../store'
import { GlobalSettingStateType } from '../../types'

const ControlAspectRatio: React.FC = () => {
  const dispatch = useDispatch()
  const [aspectRatio, setAspectRatio] = useState('')

  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )
  const handleChangeAspectRatio = (newAspectRatio: string) => {
    setAspectRatio(newAspectRatio)
    console.log(newAspectRatio)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        aspectRatio: newAspectRatio,
      }),
    )
  }

  const onSearch = (value: string) => {
    console.log('search:', value)
  }
  return (
    <Select
      showSearch
      placeholder='Select Aspect Ratio'
      optionFilterProp='children'
      onChange={handleChangeAspectRatio}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={[
        {
          value: 'tiny',
          label: 'tiny',
        },
        {
          value: 'medium',
          label: 'medium',
        },
        {
          value: 'big',
          label: 'big',
        },
      ]}
    />
  )
}

export default ControlAspectRatio
