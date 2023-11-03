import { MenuProps, Dropdown, message, Space, Select } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeGlobalSetting } from '../../actions/GlobalSettingAction'
import { AppState } from '../../store'
import { GlobalSettingStateType } from '../../types'

const ControlSparkLinePos: React.FC = () => {
  const dispatch = useDispatch()
  const [sparkLinePosition, setSparkLinePosition] = useState('')

  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )
  const handleChangeSparkLinePosition = (newSparkLinePosition: string) => {
    setSparkLinePosition(newSparkLinePosition)
    // console.log(newAspectRatio)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        sparkLinePosition: newSparkLinePosition,
        lineHeight: 4,
      }),
    )
  }

  const onSearch = (value: string) => {
    console.log('search:', value)
  }
  return (
    <Select
      showSearch
      placeholder='Select a sparkline Position'
      optionFilterProp='children'
      onChange={handleChangeSparkLinePosition}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={[
        {
          value: 'up',
          label: 'up',
        },
        {
          value: 'down',
          label: 'down',
        },
        {
          value: 'left',
          label: 'left',
        },
        {
          value: 'right',
          label: 'right',
        },
      ]}
    />
  )
}

export default ControlSparkLinePos
