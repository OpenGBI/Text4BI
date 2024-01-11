import React from 'react'
import { Col, Row, Divider, Collapse } from 'antd'
import ControlSelectedData from './components/ControlSystemSetting/ControlSelectedData'

const { Panel } = Collapse
const ImportBar: React.FC = () => (
  <div className='panel2'>
    <Row className='control-row' style={{ paddingTop: '10px', paddingBottom: '2px', paddingLeft: '15px' }}>
      <Col span={8} className='control-label' style={{ color: '#050404' }}>
        Select Data
      </Col>
      <Col span={16}>
        <ControlSelectedData />
      </Col>
    </Row>
  </div>
)

export default ImportBar
