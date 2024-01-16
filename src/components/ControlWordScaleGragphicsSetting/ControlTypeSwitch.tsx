import React from "react"
import { Button, Col, Row } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeWordScaleGraphicsSetting } from "../../actions/wordScaleGraphicsSettingAction"
import { AppState } from "../../store"
import { wordScaleGraphicsSettingStateType } from "../../types"

const types = [
  { key: "distributionType", label: "Distribution" },
  { key: "rankType", label: "Rank" },
  { key: "proportionType", label: "Proportion" },
  { key: "associationType", label: "Association" },
  { key: "trendType", label: "Trend" },
  { key: "differenceType", label: "Difference" },
  { key: "anomalyType", label: "Anomaly" },
  { key: "seasonalityType", label: "Seasonality" },
]

const ControlTypeSwitch: React.FC = () => {
  const dispatch = useDispatch()
  const wordScaleGraphicsSetting: wordScaleGraphicsSettingStateType = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  const handleTypeChange = (typeKey: string, newValue: string) => {
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        [typeKey]: newValue,
      }),
    )
  }

  return (
    <>
      {types.map((type) => (
        <Row key={type.key}>
          <Col span={10} className="control-label-layer3">
            {type.label}
          </Col>
          <Col span={14}>
            <Button.Group style={{ width: "100%" }}>
              <Button
                type="primary"
                onClick={() => handleTypeChange(type.key, "a")}
                style={{ width: "100%" }}
              >
                A
              </Button>
              <Button
                type="default"
                onClick={() => handleTypeChange(type.key, "b")}
                style={{ width: "100%" }}
              >
                B
              </Button>
            </Button.Group>
          </Col>
        </Row>
      ))}
    </>
  )
}

export default ControlTypeSwitch
