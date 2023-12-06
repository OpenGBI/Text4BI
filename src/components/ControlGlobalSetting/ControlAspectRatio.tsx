import React, { useState } from 'react'
import { Button, Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeGlobalSetting } from '../../actions/GlobalSettingAction'
import { AppState } from '../../store'
import { GlobalSettingStateType } from '../../types'

const ControlAspectRatio: React.FC = () => {
  const dispatch = useDispatch()
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('')

  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )

  const handleChangeAspectRatio = (ratio: string) => {
    setSelectedAspectRatio(ratio)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        aspectRatio: ratio,
      }),
    )
  }

  return (
    <div className='control-panel'>
      <Row>
        <Col span={24} className='control-label'>
          Aspect Ratio
        </Col>
      </Row>
      <Row className='button-row' justify='space-around' gutter={[6, 6]}>
        {['Tiny', 'Medium', 'Big'].map((ratio) => (
          <Col key={ratio} span={8}>
            <Button
              block
              className={`custom-btn ${selectedAspectRatio === ratio ? 'active' : ''}`}
              onClick={() => handleChangeAspectRatio(ratio)}
            >
              {ratio}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ControlAspectRatio
