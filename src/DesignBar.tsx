import React from 'react'
import { Col, Row } from 'antd'
import ControlFont from './components/ControlGlobalSetting/ControlFont'
import ControlGlobalBoolean from './components/ControlGlobalSetting/ControlGlobalBoolean'
import ControlLineHeight from './components/ControlGlobalSetting/ControlLineHeight'
import ControlAspectRatio from './components/ControlGlobalSetting/ControlAspectRatio'
import ControlSparkLinePos from './components/ControlGlobalSetting/ControlSparkLinePos'

const DesignBar: React.FC = () => (
  <div>
    <Row gutter={16}>
      <Col span={8}>
        <ControlGlobalBoolean />
      </Col>
      <Col span={8}>
        <ControlFont />
      </Col>
      <Col span={8}>
        <ControlLineHeight />
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={8}>
        <ControlSparkLinePos />
      </Col>
      <Col span={8}>
        <ControlAspectRatio />
      </Col>
    </Row>
  </div>
)

export default DesignBar
