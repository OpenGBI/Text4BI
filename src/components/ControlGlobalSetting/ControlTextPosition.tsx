import React, { useState } from 'react'
import { Button, Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeGlobalSetting } from '../../actions/GlobalSettingAction'
import { AppState } from '../../store'
import { GlobalSettingStateType } from '../../types'

const ControlTextPosition: React.FC = () => {
  const dispatch = useDispatch()
  const [selectedPosition, setSelectedPosition] = useState('top')

  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )

  const handleChangeTextPosition = (newPosition: string) => {
    setSelectedPosition(newPosition)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        textPosition: newPosition,
      }),
    )
  }

  return (
    <div className='control-panel'>
      <Row>
        <Col span={24} className='control-label'>
          Text Position
        </Col>
      </Row>
      <Row className='button-row' justify='space-between'>
        {['top', 'left'].map((position) => (
          <Col key={position} span={6}>
            <Button
              block
              className={`custom-btn ${selectedPosition === position ? 'active' : ''}`}
              onClick={() => handleChangeTextPosition(position)}
            >
              {position.charAt(0).toUpperCase() + position.slice(1)}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ControlTextPosition
