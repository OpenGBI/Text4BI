import React, { useState } from 'react'
import { Button, Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeWordScaleGraphicsSetting } from '../../actions/wordScaleGraphicsSettingAction'
import { AppState } from '../../store'
import { wordScaleGraphicsSettingStateType } from '../../types'

const ControlSparkLinePos: React.FC = () => {
  const dispatch = useDispatch()
  const wordScaleGraphicsSetting: wordScaleGraphicsSettingStateType = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  const [selectedPosition, setSelectedPosition] = useState('right')

  const handleChangeSparkLinePosition = (newPosition: string) => {
    setSelectedPosition(newPosition)
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        sparkLinePosition: newPosition,
      }),
    )
  }

  const buttonIcons = {
    right: '➡️',
    left: '⬅️',
    up: '⬆️',
    down: '⬇️',
  }

  return (
    <div className='control-panel'>
      <Row align='middle'>
        <Col span={10} className='control-label'>
          Position
        </Col>
        <Col span={14}>
          <Button.Group style={{ display: 'flex', width: '60%' }}>
            {Object.entries(buttonIcons).map(([position, icon]) => (
              <Button
                key={position}
                className={`custom-btn ${selectedPosition === position ? 'active' : ''}`}
                onClick={() => handleChangeSparkLinePosition(position)}
                style={{
                  flex: 1,
                  borderRight: position !== 'right' ? 'none' : undefined,
                }}
              >
                {icon}
              </Button>
            ))}
          </Button.Group>
        </Col>
      </Row>
    </div>
  )
}

export default ControlSparkLinePos
