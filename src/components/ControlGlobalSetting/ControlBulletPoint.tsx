import React, { useState } from "react"
import { Button, Col, Row, Switch } from "antd"

const ControlGlobalBoolean: React.FC = () => {
  const [isLineBreakOn, setIsLineBreakOn] = useState(false)
  const [bulletPointStyle, setBulletPointStyle] = useState("")

  const handleBulletPointChange = (style: string) => {
    setBulletPointStyle(bulletPointStyle === style ? "" : style)
  }

  return (
    <div className="control-panel">
      <Row>
        <Col span={10} className="control-label">
          Line break
        </Col>
        <Col span={14}>
          <Switch checked={isLineBreakOn} onChange={() => setIsLineBreakOn(!isLineBreakOn)} />
        </Col>
      </Row>
      {isLineBreakOn && (
        <Row style={{ marginTop: 10 }}>
          <Col span={10} className="control-label-layer2">
            Bullet Point
          </Col>
          <Col span={14}>
            <Button.Group>
              {[".", "#", "-"].map((style) => (
                <Button
                  key={style}
                  className={`custom-btn ${bulletPointStyle === style ? "active" : ""}`}
                  onClick={() => handleBulletPointChange(style)}
                >
                  {style}
                </Button>
              ))}
            </Button.Group>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default ControlGlobalBoolean
