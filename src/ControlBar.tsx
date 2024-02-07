import React from "react"
import { Col, Row, Divider, Collapse } from "antd"
// 以下是global panel的导入
import ControlTextPosition from "./components/ControlGlobalSetting/ControlTextPosition"
import ControlBigGraphSparkLine from "./components/ControlGlobalSetting/ControlBigGraphSparkLine"
import ControlFont from "./components/ControlGlobalSetting/ControlFont"
import ControlLineHeight from "./components/ControlGlobalSetting/ControlLineHeight"
import ControlBulletPoint from "./components/ControlGlobalSetting/ControlBulletPoint"
import ControlInteraction from "./components/ControlGlobalSetting/ControlInteractiveOn"
// 以下是typography panel的导入
import ControlSelectedEntityType from "./components/ControlTypographySetting/ControlSelectedEntityType"
import ControlBoldness from "./components/ControlTypographySetting/ControlBoldness"
import ControlUnderline from "./components/ControlTypographySetting/ControlUnderline"
import ControlItalics from "./components/ControlTypographySetting/ControlItalics"
import ControlContour from "./components/ControlTypographySetting/ControlContour"
import ControlColor from "./components/ControlTypographySetting/ControlColor"
import ControlBackgroundColor from "./components/ControlTypographySetting/ControlBackgroundColor"
// 以下是word graphics panel的导入
import ControlAspectRatio from "./components/ControlWordScaleGragphicsSetting/ControlAspectRatio"
import ControlDataDrivenGraphics from "./components/ControlWordScaleGragphicsSetting/ControlDataDrivenGraphics"
import ControlDataDrivenCharts from "./components/ControlWordScaleGragphicsSetting/ControlDataDrivenCharts"
import ControlSparkLinePos from "./components/ControlWordScaleGragphicsSetting/ControlSparkLinePos"
import ControlTypeSwitch from "./components/ControlWordScaleGragphicsSetting/ControlTypeSwitch"
import ControlDataDrivenIcons from "./components/ControlWordScaleGragphicsSetting/ControlDataDrivenIcons"
import ControlSemanticDrivenIcons from "./components/ControlWordScaleGragphicsSetting/ControlSemanticDrivenIcons"
import ControlIconDesign from "./components/ControlWordScaleGragphicsSetting/ControlIconDesign"
import Navigation from "./Navigation"

const { Panel } = Collapse

const ControlBar: React.FC = () => (
  <div className="panel1">
    <div
      className="contro-label"
      style={{
        paddingBottom: 16,
        paddingLeft: 14,
        paddingTop: 14,
        fontSize: "16px",
        fontWeight: "bold",
      }}
    >
      Design Panel
    </div>
    <div style={{ height: 820, overflow: "auto" }}>
      <Collapse defaultActiveKey={["1"]} style={{ backgroundColor: "#fff" }}>
        <Panel
          header={<span className="panel-header">Global Design</span>}
          key="1"
          style={{ backgroundColor: "#fff" }}
        >
          <Row className="control-row">
            <ControlTextPosition />
          </Row>
          <Row className="control-row">
            <ControlBigGraphSparkLine />
          </Row>
          <Row className="control-row">
            <ControlFont />
          </Row>
          <Row className="control-row">
            <ControlLineHeight />
          </Row>
          <Row className="control-row">
            <ControlBulletPoint />
          </Row>
          <Row className="control-row">
            <ControlInteraction />
          </Row>
        </Panel>
      </Collapse>
      <Collapse defaultActiveKey={["1"]} style={{ backgroundColor: "#fff" }}>
        <Panel header={<span className="panel-header">Typography</span>} key="1">
          {/* <Row className='control-row'>
            <Col span={8} className='control-label'>
              Select Cards
            </Col>
            <Col span={16}>
              <ControlSelectedCards />
            </Col>
          </Row> */}
          <Row className="control-row">
            <ControlSelectedEntityType />
          </Row>
          <Row className="control-row">
            <ControlBoldness />
          </Row>
          <Row className="control-row">
            <ControlUnderline />
          </Row>
          <Row className="control-row">
            <ControlItalics />
          </Row>
          <Row className="control-row">
            <ControlContour />
          </Row>
          <Row className="control-row">
            <ControlColor />
          </Row>
          <Row className="control-row">
            <ControlBackgroundColor />
          </Row>
        </Panel>
      </Collapse>
      <Collapse defaultActiveKey={["1"]} style={{ backgroundColor: "#fff" }}>
        <Panel header={<span className="panel-header">Word Scale Graphics</span>} key="1">
          <Row className="control-row">
            <ControlSparkLinePos />
          </Row>
          <Row className="control-row">
            <ControlDataDrivenGraphics />
          </Row>
          <ControlDataDrivenCharts />
          {/* <Row className='control-row'>
            <ControlAspectRatio />
          </Row>
          <Row className="control-row">
            <ControlTypeSwitch />
          </Row> */}
          <Row className="control-row">
            <ControlDataDrivenIcons />
          </Row>
          <Row className="control-row">
            <ControlSemanticDrivenIcons />
          </Row>
          <Row className="control-row">
            <ControlIconDesign />
          </Row>
        </Panel>
      </Collapse>
    </div>
  </div>
)

export default ControlBar
