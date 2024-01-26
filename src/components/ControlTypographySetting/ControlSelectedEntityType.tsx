import React, { useState } from "react"
import { Select, Row, Col } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeTypographySetting } from "../../actions/typographySettingAction"
import { typographySettingStateType } from "../../types"
import { AppState } from "../../store"

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
    <div className="control-panel">
      <Row>
        <Col span={10} className="control-label">
          Select entity
        </Col>
        <Col span={14}>
          <Select
            style={{ width: "70%" }}
            value={selectedEntityType}
            onChange={handlePrimaryChange}
          >
            <Option value="metric_value">metric_value</Option>
            <Option value="delta_value">delta_value</Option>
            <Option value="insight">insight</Option>
            <Option value="metric_name">metric_name</Option>
            <Option value="dim_cate">dim_cate</Option>
            <Option value="algorithm">algorithm</Option>
            <Option value="filter_time">filter_time</Option>
            <Option value="filter_num">filter_num</Option>
            {/* <Option value="filter_cate">filter_cate</Option> */}
          </Select>
        </Col>
        {showSecondaryOptions && (
          <Col span={24}>
            <Select
              style={{ width: "100%", marginTop: "10px" }}
              defaultValue="General Trend"
              onChange={(value) => {
                // Handle change for secondary select if needed
              }}
            >
              <Option value="General Trend">General Trend</Option>
              <Option value="Seasonal Feature">Seasonal Feature</Option>
              <Option value="Abnormality">Abnormality</Option>
            </Select>
          </Col>
        )}
      </Row>
    </div>
  )
}

export default ControlSelectedEntityType
