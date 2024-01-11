import React, { useState } from 'react'
import { Button, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeTypographySetting } from '../../actions/typographySettingAction'
import { typographySettingStateType, GlobalSettingStateType } from '../../types'
import { AppState } from '../../store'

const ControlContour: React.FC = () => {
  const [isContourOn, setIsContourOn] = useState(false)
  const dispatch = useDispatch()
  const typographySetting: typographySettingStateType = useSelector(
    (state: AppState) => state.typographySetting,
  )

  const toggleGlobalSetting = (value: boolean) => {
    console.log('Before dispatch, isContourOn:', isContourOn)
    setIsContourOn(value)
    console.log('After setIsContourOn, isContourOn:', value)
    dispatch(
      ChangeTypographySetting({
        ...typographySetting,
        contour: value,
      }),
    )
  }

  return (
    <div className='control-panel'>
      <Row>
        <Col span={10} className='control-label'>Contour</Col>
        <Col span={14}>
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
        </Col>
      </Row>
    </div>
  )
}

export default ControlContour
