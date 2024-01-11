import React, { useState } from 'react'
import { Switch, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeWordScaleGraphicsSetting } from '../../actions/wordScaleGraphicsSettingAction'
import { AppState } from '../../store'
import { wordScaleGraphicsSettingStateType } from '../../types'
import ControlAspectRatio from './ControlAspectRatio'
import ControlTypeSwitch from './ControlTypeSwitch'

const ControlChartDesign: React.FC = () => {
  const dispatch = useDispatch()
  const wordScaleGraphicsSetting: wordScaleGraphicsSettingStateType = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  const [isDataDrivenGraphicsOn, setIsDataDrivenGraphicsOn] = useState(true)
  const changeDataDrivenGraphics = (checked: boolean) => {
    setIsDataDrivenGraphicsOn(checked)
    dispatch(
        ChangeWordScaleGraphicsSetting({
            ...wordScaleGraphicsSetting,
            showDataDrivenGraphics: checked,
      }),
    )
  }

  return (
    <div className='control-panel'>
      <Row align='middle'>
        <Col span={10} className='control-label-layer2'>
          Chart
        </Col>
        <Col span={14}>
          <Switch
            checked={isDataDrivenGraphicsOn}
            onChange={changeDataDrivenGraphics}
          />
        </Col>
      </Row>
    </div>
  )
}

export default ControlChartDesign
