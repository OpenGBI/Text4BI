import React, { useState } from 'react'
import { Button, Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeGlobalSetting } from '../../actions/GlobalSettingAction'
import { AppState } from '../../store'
import { GlobalSettingStateType } from '../../types'

const ControlFont: React.FC = () => {
  const dispatch = useDispatch()
  const [selectedFontSize, setSelectedFontSize] = useState('14px')
  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )

  const handleFontSizeChange = (size: string) => {
    setSelectedFontSize(size)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        fontsize: size,
      }),
    )
  }

  return (
    <div className='control-panel'>
      <Row>
        <Col span={24} className='control-label'>
          Font
        </Col>
      </Row>
      <Row className='button-row' justify='space-around' gutter={[0, 0]}>
        {['14px', '15px', '16px'].map((size) => (
          <Col key={size} span={8}>
            <Button
              block
              className={`custom-btn ${selectedFontSize === size ? 'active' : ''}`}
              onClick={() => handleFontSizeChange(size)}
            >
              {size}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ControlFont
