import React, { useState } from 'react'
import { Button, Row, Col, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeWordScaleGraphicsSetting } from '../../actions/wordScaleGraphicsSettingAction'
import { AppState } from '../../store'
import { wordScaleGraphicsSettingStateType } from '../../types'

const { Option } = Select

const ControlAspectRatio: React.FC = () => {
  const dispatch = useDispatch()
  const wordScaleGraphicsSetting: wordScaleGraphicsSettingStateType = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('1:1')
    // 下拉框显示的值
    const [dropdownDisplay, setDropdownDisplay] = useState('...')

  const handleChangeAspectRatio = (ratio: string) => {
    setSelectedAspectRatio(ratio)
    setDropdownDisplay(ratio) // 同时更改下拉框的显示
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        aspectRatio: ratio,
      }),
    )
  }

  const aspectRatios = {
    '1:1': 'tiny',
    '2:1': 'medium',
    '4:1': 'big',
  }
  // 固定按钮宽度
  const buttonWidth = 20 // 按布局需要调整

  return (
    <div className='control-panel'>
      <Row align='middle'>
        <Col span={10} className='control-label-layer3'>
          Sizing
        </Col>
        <Col span={14}>
          <Button.Group style={{ display: 'flex', width: '80%' }}>
            {Object.entries(aspectRatios).map(([text, ratio]) => (
              <Button
                key={ratio}
                className={`custom-btn ${selectedAspectRatio === text ? 'active' : ''}`}
                onClick={() => handleChangeAspectRatio(text)}
                style={{
                  flex: 1,
                  borderRight: ratio !== 'big' ? 'none' : undefined,
                  textAlign: 'center', // Ensure the text is centered
                  width: `${buttonWidth}px`, // 设置固定宽度
                }}
              >
                {text}
              </Button>
            ))}
            <Select
              style={{ width: `${buttonWidth + 20}px`, textAlign: 'center' }}
            >
              <Option value='...'>{dropdownDisplay}</Option>
              {Object.entries(aspectRatios).map(([text, ratio]) => (
                <Option key={ratio} value={ratio}>
                  {text}
                </Option>
              ))}
            </Select>
          </Button.Group>
        </Col>
      </Row>
    </div>
  )
}

export default ControlAspectRatio
