import React from 'react'
import { Col, Row, Divider, Collapse } from 'antd'
import ControlSelectedCards from './components/ControlSystemSetting/ControlSelectedCards'
import ControlBigGraphSparkLine from './components/ControlSystemSetting/ControlBigGraphSparkLine'
import ControlSelectedData from './components/ControlSystemSetting/ControlSelectedData'
import ControlFont from './components/ControlGlobalSetting/ControlFont'
import ControlGlobalBoolean from './components/ControlGlobalSetting/ControlGlobalBoolean'
import ControlLineHeight from './components/ControlGlobalSetting/ControlLineHeight'
import ControlAspectRatio from './components/ControlGlobalSetting/ControlAspectRatio'
import ControlSparkLinePos from './components/ControlGlobalSetting/ControlSparkLinePos'
import ControlTextPosition from './components/ControlGlobalSetting/ControlTextPosition'
import ControlContour from './components/ControlGlobalSetting/ControlContour'
import ControlColor from './components/ControlGlobalSetting/ControlColor'
import ControlBackgroundColor from './components/ControlGlobalSetting/ControlBackgroundColor'

const { Panel } = Collapse

const ControlBar: React.FC = () => (
  <div className='pane'>
    <Row className='control-row' style={{ paddingTop: '10px', paddingBottom: '2px', paddingLeft: '15px' }}>
      <Col span={8} className='control-label'>
        Select Data
      </Col>
      <Col span={16}>
        <ControlSelectedData />
      </Col>
    </Row>
    <Collapse defaultActiveKey={['1']} className='no-border-panel'>
      <Panel header={<span className='custom-panel-header'>Global Design</span>} key='1'>
        <Row className='control-row'>
          <ControlBigGraphSparkLine />
        </Row>
        <Row className='control-row'>
          <ControlColor />
        </Row>
        <Row className='control-row'>
          <ControlBackgroundColor />
        </Row>
        <Row className='control-row'>
          <Col span={8} className='control-label'>
            Select Cards
          </Col>
          <Col span={16}>
            <ControlSelectedCards />
          </Col>
        </Row>
      </Panel>
    </Collapse>
    <Collapse defaultActiveKey={['1']} className='no-border-panel'>
      <Panel header={<span className='custom-panel-header'>Typography Design</span>} key='1'>
        <Row className='control-row'>
          <ControlGlobalBoolean />
        </Row>
        <Row className='control-row'>
            <ControlContour />
        </Row>
        <Row className='control-row'>
            <ControlFont />
        </Row>
        <Row className='control-row'>
            <ControlLineHeight />
        </Row>
        <Row className='control-row'>
            <ControlTextPosition />
        </Row>
      </Panel>
    </Collapse>
    <Collapse defaultActiveKey={['1']} className='no-border-panel'>
      <Panel header={<span className='custom-panel-header'>Word Scale Graphics Design</span>} key='1'>
        <Row className='control-row'>
            <ControlSparkLinePos />
        </Row>
        <Row className='control-row'>
            <ControlAspectRatio />
        </Row>
      </Panel>
    </Collapse>
  </div>
)

export default ControlBar
