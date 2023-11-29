import React from 'react'
import { Col, Row, Divider, Collapse } from 'antd'
import ControlFont from './components/ControlGlobalSetting/ControlFont'
import ControlGlobalBoolean from './components/ControlGlobalSetting/ControlGlobalBoolean'
import ControlLineHeight from './components/ControlGlobalSetting/ControlLineHeight'
import ControlAspectRatio from './components/ControlGlobalSetting/ControlAspectRatio'
import ControlSparkLinePos from './components/ControlGlobalSetting/ControlSparkLinePos'

const { Panel } = Collapse

const ControlBar: React.FC = () => (
  <div className='pane'>
    <div className='header'>Design Panel</div>
    <Collapse defaultActiveKey={['1']} className='no-border-panel'>
      <Panel header={<span className='custom-panel-header'>Typography Design</span>} key='1'>
        <Row className='control-row'>
          <Col span={8} className='control-label'>
            Typeface
          </Col>
          <Col span={16}>
            <ControlGlobalBoolean />
          </Col>
        </Row>
        <Row className='control-row'>
          <Col span={8} className='control-label'>
            Font
          </Col>
          <Col span={16}>
            <ControlFont />
          </Col>
        </Row>
        <Row className='control-row'>
          <Col span={8} className='control-label'>
            Line Spacing
          </Col>
          <Col span={16}>
            <ControlLineHeight />
          </Col>
        </Row>
      </Panel>
    </Collapse>
    {/* <Divider /> */}
    <Collapse defaultActiveKey={['1']} className='no-border-panel'>
      <Panel header={<span className='custom-panel-header'>Word Scale Graphics Design</span>} key='1'>
        <Row className='control-row'>
          <Col span={8} className='control-label'>
            Position
          </Col>
          <Col span={16}>
            <ControlSparkLinePos />
          </Col>
        </Row>
        <Row className='control-row'>
          <Col span={8} className='control-label'>
            Size
          </Col>
          <Col span={16}>
            <ControlAspectRatio />
          </Col>
        </Row>
      </Panel>
    </Collapse>
  </div>
)

export default ControlBar
