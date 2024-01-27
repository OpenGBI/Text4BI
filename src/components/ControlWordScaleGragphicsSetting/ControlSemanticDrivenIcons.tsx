import React, { useState } from "react"
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
  const [isSemanticDrivenIconsOn, setIsSemanticDrivenIconsOn] = useState(
    wordScaleGraphicsSetting.isSemanticDrivenIconsOn, // 使用从 wordScaleGraphicsSetting 中取出的值作为初始状态
  )
  const buttoWidth1 = 20
  const buttoWidth2 = 20
  // 用于显示和隐藏基于 Semantic-driven 开关状态的组件
  const handleSemanticDrivenChange = (checked: boolean) => {
    setIsSemanticDrivenIconsOn(checked)
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
              <Switch checked={isSemanticDrivenIconsOn && showSparkLine} onChange={handleSemanticDrivenChange} />
            </Col>
          </Row>
        </div>
    </div>
  )
}

export default ControlSemanticDrivenIcons
