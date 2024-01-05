import React, { useState } from 'react'
import { Button, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeGlobalSetting } from '../../actions/GlobalSettingAction'
import { GlobalSettingStateType } from '../../types'
import { AppState } from '../../store'

const ControlContour: React.FC = () => {
  const dispatch = useDispatch()
  const [isContourOn, setIsContourOn] = useState(false)
  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )

  const toggleGlobalSetting = (value: boolean) => {
    console.log('Before dispatch, isContourOn:', isContourOn)
    setIsContourOn(value)
    console.log('After setIsContourOn, isContourOn:', value)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        contour: value,
      }),
    )
  }

  return (
    <div className='control-panel'>
      <Row>
        <Col span={12} className='control-label'>Contour</Col>
      </Row>
      <div className='button-row'>
        <div className='button-group'>
          <Button
            className='custom-btn'
            type={isContourOn ? 'primary' : 'default'}
            onClick={() => toggleGlobalSetting(true)}
          >
            On
          </Button>
          <Button
            className='custom-btn'
            type={!isContourOn ? 'primary' : 'default'}
            onClick={() => toggleGlobalSetting(false)}
          >
            Off
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ControlContour
