import React, { useState } from "react"
import { Button, Row, Col } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeWordScaleGraphicsSetting } from "../../actions/wordScaleGraphicsSettingAction"
import { AppState } from "../../store"
import { wordScaleGraphicsSettingStateType, GlobalSettingStateType } from "../../types"
import { ChangeGlobalSetting } from "../../actions/GlobalSettingAction"

const ControlSparkLinePos: React.FC = () => {
  const dispatch = useDispatch()
  const wordScaleGraphicsSetting: wordScaleGraphicsSettingStateType = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )

  const [selectedPosition, setSelectedPosition] = useState("right")
  const [changeLineHeightFlag, setchangeLineHeightFlag] = useState(0)
  const [rememberLineHeight, setRememberLineHeight] = useState(2)
  const handleChangeSparkLinePosition = (newPosition: string) => {
    setSelectedPosition(newPosition)
    // setRememberLineHeight(globalSetting.lineHeight)
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        sparkLinePosition: newPosition,
      }),
    )
    if (newPosition === "up" || newPosition === "down") {
      if (changeLineHeightFlag === 0) {
        setRememberLineHeight(globalSetting.lineHeight)
        setchangeLineHeightFlag(1)
        console.log("debug remember:", globalSetting.lineHeight)
      }

      dispatch(
        ChangeGlobalSetting({
          ...globalSetting,
          lineHeight: 2.6314,
        }),
      )
    } else {
      if (globalSetting.lineHeight === 2.6314) {
        setchangeLineHeightFlag(0)
        console.log("debug remember ===:", rememberLineHeight)
        dispatch(
          ChangeGlobalSetting({
            ...globalSetting,
            lineHeight: rememberLineHeight,
          }),
        )
      } else {
        console.log("debug remember !==:", globalSetting.lineHeight)
        dispatch(
          ChangeGlobalSetting({
            ...globalSetting,
            lineHeight: globalSetting.lineHeight,
          }),
        )
      }
      console.log()
      // dispatch(
      //   ChangeGlobalSetting({
      //     ...globalSetting,
      //     lineHeight: rememberLineHeight,
      //   }),
      // )
    }
  }

  const buttonIcons = {
    right: "➡️",
    left: "⬅️",
    up: "⬆️",
    down: "⬇️",
  }

  return (
    <div className="control-panel">
      <Row align="middle">
        <Col span={10} className="control-label">
          Position
        </Col>
        <Col span={14}>
          <Button.Group style={{ display: "flex", width: "60%" }}>
            {Object.entries(buttonIcons).map(([position, icon]) => (
              <Button
                key={position}
                type={selectedPosition === position ? "primary" : "default"}
                onClick={() => handleChangeSparkLinePosition(position)}
                style={{
                  flex: 1,
                  borderRight: position !== "right" ? "none" : undefined,
                }}
              >
                {icon}
              </Button>
            ))}
          </Button.Group>
        </Col>
      </Row>
    </div>
  )
}

export default ControlSparkLinePos
