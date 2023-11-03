import React, { useState } from 'react'
import { App, ColorPicker } from 'antd'
import type { ColorPickerProps, Color } from 'antd/es/color-picker'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalSettingStateType } from '../../types'
import { ChangeGlobalSetting } from '../../actions/GlobalSettingAction'
import { AppState } from '../../store'

const ControlColor = () => {
  const { message } = App.useApp()
  const [value, setValue] = useState<ColorPickerProps['value']>('#1677ff')
  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )
  const handleChangeColor = (color: Color) => {
    setValue(color)
    const dispatch = useDispatch()

    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        fontsize: String(color),
      }),
    )
  }
  return (
    <App>
      <ColorPicker value={value} onChangeComplete={handleChangeColor} />
    </App>
  )
}

export default ControlColor
