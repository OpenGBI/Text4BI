import React, { useState } from "react"
import { Switch, Col, Row } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeWordScaleGraphicsSetting } from "../../actions/wordScaleGraphicsSettingAction"
import { AppState } from "../../store"
import { wordScaleGraphicsSettingStateType } from "../../types"
import ControlAspectRatio from "./ControlAspectRatio"
import ControlTypeSwitch from "./ControlTypeSwitch"
import ControlSparkLinePos from "./ControlSparkLinePos"

const ControlDataDrivenCharts: React.FC = () => {
  const dispatch = useDispatch()
  const globalSetting = useSelector((state: AppState) => state.globalSetting)
  const { showDataDrivenGraphics, showDataDrivenCharts } = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  const { showSparkLine } = useSelector((state: AppState) => state.globalSetting)
  const wordScaleGraphicsSetting: wordScaleGraphicsSettingStateType = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  // const [isDataDrivenChartsOn, setIsDataDrivenChartsOn] = useState(true)
  const changeDataDrivenCharts = (checked: boolean) => {
    // setIsDataDrivenChartsOn(checked)
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        showDataDrivenCharts: checked,
      }),
    )
  }

  return (
    <div
      style={{
        width: "100%",
        display:
          wordScaleGraphicsSetting.showDataDrivenGraphics && globalSetting.showSparkLine
            ? "block"
            : "none",
      }}
    >
      <Row className="control-row">
        <div className="control-panel">
          <Row align="middle">
            <Col span={10} className="control-label-layer2">
              Chart
            </Col>
            <Col span={14}>
              <Switch
                checked={wordScaleGraphicsSetting.showDataDrivenCharts}
                onChange={changeDataDrivenCharts}
              />
            </Col>
          </Row>
        </div>
      </Row>
      <Row
        className="control-row"
        style={{ display: wordScaleGraphicsSetting.showDataDrivenCharts ? "block" : "none" }}
      >
        <ControlAspectRatio />
      </Row>
      <Row
        className="control-row"
        style={{ display: wordScaleGraphicsSetting.showDataDrivenCharts ? "block" : "none" }}
      >
        <ControlSparkLinePos />
      </Row>
      <Row
        className="control-row"
        style={{ display: wordScaleGraphicsSetting.showDataDrivenCharts ? "block" : "none" }}
      >
        <ControlTypeSwitch />
      </Row>
    </div>
  )
}

export default ControlDataDrivenCharts
