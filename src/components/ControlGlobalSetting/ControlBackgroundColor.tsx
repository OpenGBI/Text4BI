import React, { useState } from 'react'
import { App, ColorPicker, Row, Col } from 'antd'
import type { ColorPickerProps, Color } from 'antd/es/color-picker'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalSettingStateType } from '../../types'
import { ChangeGlobalSetting } from '../../actions/GlobalSettingAction'
import { AppState } from '../../store'

const ControlBackgroundColor = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState<ColorPickerProps['value']>('#DFF20F')
  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )
  const handleChangeColor = (backgroundColor: Color) => {
    const hexColor = backgroundColor.toHexString() // 去除 '#' 符号
    // console.log('Selected HEX Color:', hexColor)
    setValue(hexColor)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        backgroundColor: String(hexColor),
      }),
    )
  }
  return (
    <div className='control-panel'>
      <Row>
        <Col span={24} className='control-label'>
          backgroundColor
        </Col>
      </Row>
      <App>
        <ColorPicker value={value} onChangeComplete={handleChangeColor} />
      </App>
    </div>
  )
}

export default ControlBackgroundColor
