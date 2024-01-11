import React, { useState } from 'react'
import { Select, Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeTypographySetting } from '../../actions/typographySettingAction'
import { typographySettingStateType } from '../../types'
import { AppState } from '../../store'

const { Option } = Select

const ControlSelectedEntityType: React.FC = () => {
  const dispatch = useDispatch()
  const typographySetting: typographySettingStateType = useSelector(
    (state: AppState) => state.typographySetting,
  )
  const [selectedEntityType, setSelectedEntityType] = useState(typographySetting.selectedEntityType)
  const [showSecondaryOptions, setShowSecondaryOptions] = useState(false)

  const handlePrimaryChange = (value: string) => {
    setSelectedEntityType(value)
    // setShowSecondaryOptions(value === 'temporality')
    dispatch(
      ChangeTypographySetting({
        ...typographySetting,
        selectedEntityType: value,
      }),
    )
  }

  return (
    <div className='control-panel'>
      <Row>
        <Col span={10} className='control-label'>
          Select entity
        </Col>
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
        {showSecondaryOptions && (
          <Col span={24}>
            <Select
              style={{ width: '100%', marginTop: '10px' }}
              defaultValue='General Trend'
              onChange={(value) => {
                // Handle change for secondary select if needed
              }}
            >
              <Option value='General Trend'>General Trend</Option>
              <Option value='Seasonal Feature'>Seasonal Feature</Option>
              <Option value='Abnormality'>Abnormality</Option>
            </Select>
          </Col>
        )}
      </Row>
    </div>
  )
}

export default ControlSelectedEntityType
