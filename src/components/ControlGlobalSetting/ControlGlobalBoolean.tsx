import React, { useState } from 'react'
import { Button, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeGlobalSetting } from '../../actions/GlobalSettingAction'
import { GlobalSettingStateType } from '../../types'
import { AppState } from '../../store'

const ControlGlobalBoolean: React.FC = () => {
  const [isBoldnessOn, setIsBoldnessOn] = useState(false)
  const [isUnderlineOn, setIsUnderlineOn] = useState(false)
  const [isBulletPointOn, setIsBulletPointOn] = useState(false)
  const [isContourOn, setIsContourOn] = useState(false)

  const dispatch = useDispatch()
  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )

  const toggleGlobalSetting = (setting: string, value: boolean) => {
    switch (setting) {
      case 'boldness':
        setIsBoldnessOn(value)
        break
      case 'underline':
        setIsUnderlineOn(value)
        break
      case 'bulletPoint':
        setIsBulletPointOn(value)
        break
      case 'contour':
        setIsContourOn(value)
        break
      default:
        break
    }

    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        [setting]: value,
      }),
    )
  }

  return (
    <div className='control-panel'>
      <Row>
        <Col span={12} className='control-label'>Boldness</Col>
        <Col span={12} className='control-label'>Underline</Col>
      </Row>
      <div className='button-row'>
        <div className='button-group'>
          <Button
            className='custom-btn'
            type={isBoldnessOn ? 'primary' : 'default'}
            onClick={() => toggleGlobalSetting('boldness', true)}
          >
            On
          </Button>
          <Button
            className='custom-btn'
            type={!isBoldnessOn ? 'primary' : 'default'}
            onClick={() => toggleGlobalSetting('boldness', false)}
          >
            Off
          </Button>
        </div>
        <div className='button-group'>
          <Button
            className='custom-btn'
            type={isUnderlineOn ? 'primary' : 'default'}
            onClick={() => toggleGlobalSetting('underline', true)}
          >
            On
          </Button>
          <Button
            className='custom-btn'
            type={!isUnderlineOn ? 'primary' : 'default'}
            onClick={() => toggleGlobalSetting('underline', false)}
          >
            Off
          </Button>
        </div>
      </div>
      <Row>
        <Col span={12} className='control-label'>BulletPoint</Col>
        <Col span={12} className='control-label'>Contour</Col>
      </Row>
      <div className='button-row'>
        <div className='button-group'>
          <Button
            className='custom-btn'
            type={isBulletPointOn ? 'primary' : 'default'}
            onClick={() => toggleGlobalSetting('bulletPoint', true)}
          >
            On
          </Button>
          <Button
            className='custom-btn'
            type={!isBulletPointOn ? 'primary' : 'default'}
            onClick={() => toggleGlobalSetting('bulletPoint', false)}
          >
            Off
          </Button>
        </div>
        <div className='button-group'>
          <Button
            className='custom-btn'
            type={isContourOn ? 'primary' : 'default'}
            onClick={() => toggleGlobalSetting('contour', true)}
          >
            On
          </Button>
          <Button
            className='custom-btn'
            type={!isContourOn ? 'primary' : 'default'}
            onClick={() => toggleGlobalSetting('contour', false)}
          >
            Off
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ControlGlobalBoolean
