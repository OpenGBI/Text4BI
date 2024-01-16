import React, { useState } from "react"
import { Button, Col, Row } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeTypographySetting } from "../../actions/typographySettingAction"
import { typographySettingStateType } from "../../types"
import { AppState } from "../../store"

const ControlItalics: React.FC = () => {
  const [isBoldnessOn, setIsBoldnessOn] = useState(false)

  const dispatch = useDispatch()
  const typographySetting: typographySettingStateType = useSelector(
    (state: AppState) => state.typographySetting,
  )

  const handleBoldnessChange = (value: boolean) => {
    setIsBoldnessOn(value)
    // setShowSecondaryOptions(value === 'temporality')
    dispatch(
      ChangeTypographySetting({
        ...typographySetting,
        boldness: value,
      }),
    )
  }

  return (
    <div className="control-panel">
      <Row>
        <Col span={10} className="control-label">
          Italics
        </Col>
        <Col span={14}>
          <Button.Group style={{ width: "100%" }}>
            <Button
              className="custom-btn"
              type={isBoldnessOn ? "primary" : "default"}
              onClick={() => handleBoldnessChange(true)}
            >
              On
            </Button>
            <Button
              className="custom-btn"
              type={!isBoldnessOn ? "primary" : "default"}
              onClick={() => handleBoldnessChange(false)}
            >
              Off
            </Button>
          </Button.Group>
        </Col>
      </Row>
    </div>
  )
}

export default ControlItalics
