import React, { useState } from 'react'
import { Button, Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeGlobalSetting } from '../../actions/GlobalSettingAction'
import { AppState } from '../../store'
import { GlobalSettingStateType } from '../../types'

const ControlLineHeight: React.FC = () => {
  const dispatch = useDispatch()
  const [selectedLineHeight, setSelectedLineHeight] = useState('1')

  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )

  const handleChangeLineHeight = (lineHeight: string) => {
    setSelectedLineHeight(lineHeight)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        lineHeight: parseFloat(lineHeight),
      }),
    )
  }

  return (
    <div className='control-panel'>
      <Row>
        <Col span={24} className='control-label'>
          Line Spacing
        </Col>
      </Row>
      <Row className='button-row' justify='space-around' gutter={[6, 6]}>
        {['1', '1.5', '2'].map((lineHeight) => (
          <Col key={lineHeight} span={8}>
            <Button
              block
              className={`custom-btn ${selectedLineHeight === lineHeight ? 'active' : ''}`}
              onClick={() => handleChangeLineHeight(lineHeight)}
            >
              {lineHeight}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ControlLineHeight
