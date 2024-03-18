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
    setShowSecondaryOptions(value === "binary_value")
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
            style={{ width: "90%" }}
            value={selectedEntityType}
            onChange={handlePrimaryChange}
          >
            <Option value="metric_value">value phrases(general)</Option>
            <Option value="binary_value">value phrases(binary)</Option>
            <Option value="metric_names">measure phrases</Option>
            <Option value="algorithm">method phrases</Option>
            <Option value="filter_cate">filter phrases</Option>
          </Select>
        </Col>
        {/* {showSecondaryOptions && (
          <Col span={12}>
            <Select
              style={{ width: "100%" }}
              defaultValue="positive"
              placeholder="Select binary option"
              onChange={(value) => {
                // Handle change for secondary select if needed
              }}
            >
              <Option value="positive">Positive</Option>
              <Option value="negative">Negative</Option>
            </Select>
          </Col>
        )} */}
      </Row>
    </div>
  )
}

export default ControlSelectedEntityType
