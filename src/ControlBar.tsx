import React from 'react'
import { Col, Row } from 'antd'
import ControlSelectedCards from './components/ControlSystemSetting/ControlSelectedCards'
import ControlBigGraphSparkLine from './components/ControlSystemSetting/ControlBigGraphSparkLine'
import ControlSelectedData from './components/ControlSystemSetting/ControlSelectedData'

const ControlBar: React.FC = () => (
  <div>
    <Row>
      <Col span={24}>
        <ControlSelectedData />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <ControlBigGraphSparkLine />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <ControlSelectedCards />
      </Col>
    </Row>
  </div>
)

export default ControlBar
