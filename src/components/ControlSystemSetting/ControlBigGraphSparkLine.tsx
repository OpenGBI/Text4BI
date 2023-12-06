import React, { useState } from 'react'
import { Button, Col, Row } from 'antd'
import './ControlBigGraphSparkLine.css'// 引入CSS样式文件
import { useDispatch, useSelector } from 'react-redux'
import { ChangeSystemSetting } from '../../actions/systemAction'
import { systemStateType } from '../../types'
import { AppState } from '../../store'

const ControlBigGraphSparkLine: React.FC = () => {
  const [isBigGraphOn, setIsBigGraphOn] = useState(true)
  const [isSparkLineOn, setIsSparkLineOn] = useState(true)
  const dispatch = useDispatch()
  const systemSetting: systemStateType = useSelector((state: AppState) => state.system)

  const toggleBigGraph = (value: boolean) => {
    setIsBigGraphOn(value)
    dispatch(
      ChangeSystemSetting({
        ...systemSetting,
        showBigGraph: value,
      }),
    )
  }

  const toggleSparkLine = (value: boolean) => {
    setIsSparkLineOn(value)
    dispatch(
      ChangeSystemSetting({
        ...systemSetting,
        showSparkLine: value,
      }),
    )
  }

  return (
    <div className='control-panel'>
      <Row>
        <Col span={13} className='control-label'>
          BigGraph
        </Col>
        <Col span={11}>
          SparkLine
        </Col>
      </Row>
      <div className='button-row'>
        <div className='button-group'>
          <Button
            className='custom-btn'
            type={isBigGraphOn ? 'primary' : 'default'}
            onClick={() => toggleBigGraph(true)}
          >
            On
          </Button>
          <Button
            className='custom-btn'
            type={!isBigGraphOn ? 'primary' : 'default'}
            onClick={() => toggleBigGraph(false)}
          >
            Off
          </Button>
        </div>
        <div className='button-group'>
          <Button
            className='custom-btn'
            type={isSparkLineOn ? 'primary' : 'default'}
            onClick={() => toggleSparkLine(true)}
          >
            On
          </Button>
          <Button
            className='custom-btn'
            type={!isSparkLineOn ? 'primary' : 'default'}
            onClick={() => toggleSparkLine(false)}
          >
            Off
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ControlBigGraphSparkLine
