import React, { useState } from 'react'
import { Switch, Col, Row } from 'antd'
import './ControlBigGraphSparkLine.css' // Assuming this file contains necessary CSS
import { useDispatch, useSelector } from 'react-redux'
import { ChangeGlobalSetting } from '../../actions/GlobalSettingAction'
import { AppState } from '../../store'
import { GlobalSettingStateType } from '../../types'

const ControlBigGraphSparkLine: React.FC = () => {
  const [isSparkLineOn, setIsSparkLineOn] = useState(true)
  const dispatch = useDispatch()
  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )
  const changeSparkLine = (checked: boolean) => {
    setIsSparkLineOn(checked)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        showSparkLine: checked,
      }),
    )
  }

  return (
    <div className='control-panel'>
      <Row align='middle'>
        <Col span={10} className='control-label'>
          Micro-sized graphics
        </Col>
        <Col span={14}>
          <Switch
            checked={isSparkLineOn}
            onChange={changeSparkLine}
          />
        </Col>
      </Row>
    </div>
  )
}

export default ControlBigGraphSparkLine
