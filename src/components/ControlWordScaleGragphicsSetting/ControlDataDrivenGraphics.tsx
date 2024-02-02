import React from "react"
import { Switch, Col, Row } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeWordScaleGraphicsSetting } from "../../actions/wordScaleGraphicsSettingAction"
import { AppState } from "../../store"

const ControlDataDrivenGraphics: React.FC = () => {
  const dispatch = useDispatch()
  const globalSetting = useSelector((state: AppState) => state.globalSetting)
  const wordScaleGraphicsSetting = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )

  const changeDataDrivenGraphics = (checked: boolean) => {
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        showDataDrivenGraphics: checked,
        showDataDrivenCharts: checked,
        graphicsSignificance: checked,
        graphicsDirection: checked,
        graphicsAnomaly: checked,
      }),
    )
  }

  return (
    <div className="control-panel">
      <Row align="middle">
        <Col span={10} className="control-label">
          Data-Driven
        </Col>
        <Col span={14}>
          <Switch
            checked={globalSetting.showSparkLine && wordScaleGraphicsSetting.showDataDrivenGraphics}
            onChange={changeDataDrivenGraphics}
          />
        </Col>
      </Row>
    </div>
  )
}

export default ControlDataDrivenGraphics
