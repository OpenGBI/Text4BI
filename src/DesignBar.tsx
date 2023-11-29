import React from 'react'
import { Col, Row } from 'antd'
import ControlSelectedCards from './components/ControlSystemSetting/ControlSelectedCards'
import ControlBigGraphSparkLine from './components/ControlSystemSetting/ControlBigGraphSparkLine'
import ControlSelectedData from './components/ControlSystemSetting/ControlSelectedData'
// import './DesignBar.css' // Make sure to import your CSS file

const DesignBar: React.FC = () => (
  <div id='view1' className='pane'>
    <div className='header'>Control Panel</div>
    <Row className='control-row'>
      <Col span={8} className='control-label'>
        Select Data
      </Col>
      <Col span={16}>
        <ControlSelectedData />
      </Col>
    </Row>
    <Row className='control-row'>
      <Col span={8} className='control-label'>
        Select Elements
      </Col>
      <Col span={16}>
        <ControlBigGraphSparkLine />
      </Col>
    </Row>
    <Row className='control-row'>
      <Col span={8} className='control-label'>
        Select Cards
      </Col>
      <Col span={16}>
        <ControlSelectedCards />
      </Col>
    </Row>
  </div>
)

export default DesignBar
