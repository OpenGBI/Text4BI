import React from 'react'
import { Col, Row, Divider, Collapse } from 'antd'
// 以下是import&export panel的导入
import ControlSelectedData from './components/ControlSystemSetting/ControlSelectedData'
import ControlSelectedCards from './components/ControlSystemSetting/ControlSelectedCards'
import ControlSelectedInsights from './components/ControlSystemSetting/ControlSelectedInsights'

const { Panel } = Collapse
const ImportBar: React.FC = () => (
  <div className='panel2'>
    <Row className='control-row' style={{ paddingTop: '10px', paddingBottom: '2px', paddingLeft: '15px' }}>
      <Col span={4} className='control-label' style={{ color: '#050404' }}>
        Select Data
      </Col>
      <Col span={4}>
        <ControlSelectedData />
      </Col>
      <Col span={4} className='control-label' style={{ color: '#050404' }}>
        Select Insights
      </Col>
      <Col span={12}>
        <ControlSelectedInsights />
      </Col>
    </Row>
  </div>
)

export default ImportBar
