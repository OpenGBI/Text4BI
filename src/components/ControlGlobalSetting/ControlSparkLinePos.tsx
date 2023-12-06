import React, { useState } from 'react'
import { Button, Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeGlobalSetting } from '../../actions/GlobalSettingAction'
import { AppState } from '../../store'
import { GlobalSettingStateType } from '../../types'

const ControlSparkLinePos: React.FC = () => {
  const dispatch = useDispatch()
  const [selectedPosition, setSelectedPosition] = useState('')

  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )

  const handleChangeSparkLinePosition = (newPosition: string) => {
    setSelectedPosition(newPosition)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        sparkLinePosition: newPosition,
      }),
    )
  }

  return (
    <div className='control-panel'>
      <Row>
        <Col span={24} className='control-label'>
          Position
        </Col>
      </Row>
      <Row className='button-row' justify='space-between'>
        {['Up ↑', 'Down ↓', 'Left ←', 'Right →'].map((position) => (
          <Col key={position} span={6}>
            <Button
              block
              className={`custom-btn ${selectedPosition === position ? 'active' : ''}`}
              onClick={() => handleChangeSparkLinePosition(position)}
            >
              {position}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ControlSparkLinePos
