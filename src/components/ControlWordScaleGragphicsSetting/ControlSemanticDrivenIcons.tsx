import React from "react"
import { Button, Row, Col, Switch, Dropdown, Menu, Select } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { ChangeWordScaleGraphicsSetting } from "../../actions/wordScaleGraphicsSettingAction"
import { AppState } from "../../store"
import { wordScaleGraphicsSettingStateType } from "../../types"

const { Option } = Select

const ControlSemanticDrivenIcons: React.FC = () => {
  const dispatch = useDispatch()
  const { showSparkLine } = useSelector((state: AppState) => state.globalSetting)
  const wordScaleGraphicsSetting: wordScaleGraphicsSettingStateType = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  // ... (previous states and functions)

  // 用于显示和隐藏基于 Semantic-driven 开关状态的组件
  const handleSemanticDrivenChange = (checked: boolean) => {
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        isSemanticDrivenIconsOn: checked,
      }),
    )
  }

  return (
    <div style={{ width: "100%" }}>
      {/* Semantic-driven 开关 */}
        <div className="control-panel">
          <Row align="middle">
            <Col span={10} className="control-label">
              Semantic-driven
            </Col>
            <Col span={14}>
              <Switch
                checked={wordScaleGraphicsSetting.isSemanticDrivenIconsOn && showSparkLine}
                onChange={handleSemanticDrivenChange}
              />
            </Col>
          </Row>
        </div>
    </div>
  )
}

export default ControlSemanticDrivenIcons
