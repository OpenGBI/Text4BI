import React, { useState } from 'react'
import { Button, Row, Col, Switch, Dropdown, Menu, Select } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const { Option } = Select

const ControlSemanticDriven: React.FC = () => {
  // ... (previous states and functions)
  const [isSemanticDriven, setIsSemanticDriven] = useState(true)
  const [semanticsAbsolutePosition, setSemanticsAbsolutePosition] = useState('begin')
  const [isAbsolutePositionVisible, setIsAbsolutePositionVisible] = useState(true)
  const [selectedEntityType, setSelectedEntityType] = useState('Association')

  // 用于显示和隐藏基于 Semantic-driven 开关状态的组件
  const handleSemanticDrivenChange = (checked: boolean) => {
    setIsSemanticDriven(checked)
    // 如果关闭 Semantic-driven 开关，则同时关闭 Absolute position 开关
    if (!checked) setIsAbsolutePositionVisible(false)
  }

  // 用于控制 Absolute position 开关状态的函数
  const handleAbsolutePositionChange = (position: string) => {
    setSemanticsAbsolutePosition(position)
    // 只有当位置不是 'no' 时，才显示 Symbol 行
    setIsAbsolutePositionVisible(position !== 'no')
  }

  // Function to handle change in selected entity type
  const handlePrimaryChange = (value: string) => {
    setSelectedEntityType(value)
    // Dispatch or handle change in state here
    console.log('Selected entity type:', value)
  }

  // Dropdown menu for the last symbol button
  const symbolMenu = (
    <Menu>
      <Menu.Item key='0'>
        <Button onClick={() => console.log('option 1')}>Option 1</Button>
      </Menu.Item>
      <Menu.Item key='1'>
        <Button onClick={() => console.log('option 2')}>Option 2</Button>
      </Menu.Item>
      {/* // Add more menu items as needed */}
    </Menu>
  )

  return (
    <div className='control-panel'>
      {/* Semantic-driven 开关 */}
      <Row align='middle' style={{ paddingBottom: 10 }}>
        <Col span={10} className='control-label'>Semantic-driven</Col>
        <Col span={14}>
          <Switch checked={isSemanticDriven} onChange={handleSemanticDrivenChange} />
        </Col>
      </Row>

      {/* Absolute position 按钮行 */}
      {isSemanticDriven && (
        <Row align='middle' style={{ paddingBottom: 10 }}>
          <Col span={10} className='control-label-layer2'>Absolute position</Col>
          <Col span={14}>
            <Button.Group>
              <Button type={semanticsAbsolutePosition === 'begin' ? 'primary' : 'default'} onClick={() => handleAbsolutePositionChange('begin')}>begin</Button>
              <Button type={semanticsAbsolutePosition === 'end' ? 'primary' : 'default'} onClick={() => handleAbsolutePositionChange('end')}>end</Button>
              <Button type={semanticsAbsolutePosition === 'no' ? 'primary' : 'default'} onClick={() => handleAbsolutePositionChange('no')}>no</Button>
            </Button.Group>
          </Col>
        </Row>
      )}

      {/* Symbol 按钮行 */}
      {isAbsolutePositionVisible && (
        <Row align='middle' style={{ paddingBottom: 10 }}>
          <Col span={10} className='control-label-layer3'>Symbol</Col>
          <Col span={14}>
            <Dropdown overlay={symbolMenu} trigger={['click']}>
              <Button>
                Click me <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
        </Row>
      )}

      {/* Binding entity dropdown */}
      {isSemanticDriven && (
        <Row align='middle' style={{ paddingBottom: 10 }}>
          <Col span={10} className='control-label-layer2'>Binding entity</Col>
          <Col span={14}>
            <Select
              style={{ width: '100%' }}
              value={selectedEntityType}
              onChange={handlePrimaryChange}
            >
              <Option value='Association'>Association</Option>
              <Option value='Difference'>Difference</Option>
              <Option value='Distribution'>Distribution</Option>
              <Option value='Categorization'>Categorization</Option>
              <Option value='Proportion'>Proportion</Option>
              <Option value='TemporalityGeneralTrend'>Temporality-General trend</Option>
              <Option value='TemporalitySeasonalFeature'>Temporality-Seasonal feature</Option>
              <Option value='TemporalityAbnormality'>Temporality-Abnormality</Option>
            </Select>
          </Col>
        </Row>
      )}

      {/* Symbol buttons */}
      {isSemanticDriven && (
        <Row align='middle' style={{ paddingBottom: 10 }}>
          <Col span={10} className='control-label-layer3'>Symbol</Col>
          <Col span={14}>
            <Button.Group>
              {/* <Button icon={<DownOutlined />} onClick={() => console.log('symbol 1')} /> */}
              <Button onClick={() => console.log('symbol 2')}>sos</Button>
              <Button onClick={() => console.log('symbol 3')}>clock</Button>
              <Button onClick={() => console.log('symbol 4')}>lamp</Button>
              <Dropdown overlay={symbolMenu} trigger={['click']}>
                <Button>
                  <DownOutlined /> {/* This button will show the dropdown */}
                </Button>
              </Dropdown>
            </Button.Group>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default ControlSemanticDriven
