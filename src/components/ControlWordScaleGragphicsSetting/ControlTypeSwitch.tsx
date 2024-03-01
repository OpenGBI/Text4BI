import React, { useState } from "react"
import { Button, Col, Row } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeWordScaleGraphicsSetting } from "../../actions/wordScaleGraphicsSettingAction"
import { AppState } from "../../store"
import { wordScaleGraphicsSettingStateType } from "../../types"
// 首先，导入所有的SVG图标作为React组件
import { ReactComponent as AnomalyA } from "../../icons/Anomaly_A.svg"
import { ReactComponent as AnomalyB } from "../../icons/Anomaly_B.svg"
import { ReactComponent as AssociationA } from "../../icons/Association_A.svg"
import { ReactComponent as AssociationB } from "../../icons/Association_B.svg"
import { ReactComponent as DifferenceA } from "../../icons/Difference_A.svg"
import { ReactComponent as DifferenceB } from "../../icons/Difference_B.svg"
import { ReactComponent as DistributionA } from "../../icons/Distribution_A.svg"
import { ReactComponent as DistributionB } from "../../icons/Distribution_B.svg"
import { ReactComponent as ProportionA } from "../../icons/Proportion_A.svg"
import { ReactComponent as ProportionB } from "../../icons/Proportion_B.svg"
import { ReactComponent as RankA } from "../../icons/Rank_A.svg"
import { ReactComponent as RankB } from "../../icons/Rank_B.svg"
import { ReactComponent as SeasonalityA } from "../../icons/Seasonality_A.svg"
import { ReactComponent as SeasonalityB } from "../../icons/Seasonality_B.svg"
import { ReactComponent as TrendA } from "../../icons/Trend_A.svg"
import { ReactComponent as TrendB } from "../../icons/Trend_B.svg"

// 定义一个接口来描述SVG图标对象的结构
interface SVGIcons {
  distributionType: { "a": typeof DistributionA; "b": typeof DistributionB }
  rankType: { "a": typeof RankA; "b": typeof RankB }
  proportionType: { "a": typeof ProportionA; "b": typeof ProportionB }
  associationType: { "a": typeof AssociationA; "b": typeof AssociationB }
  trendType: { "a": typeof TrendA; "b": typeof TrendB }
  differenceType: { "a": typeof DifferenceA; "b": typeof DifferenceB }
  anomalyType: { "a": typeof AnomalyA; "b": typeof AnomalyB }
  seasonalityType: { "a": typeof SeasonalityA; "b": typeof SeasonalityB }
}

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

  const [isdistributionTypeOn, setIsdistributionTypeOn] = useState<"a" | "b">("a")
  const [isrankTypeOn, setIsrankTypeOn] = useState<"a" | "b">("a")
  const [isproportionTypeOn, setIsproportionTypeOn] = useState<"a" | "b">("a")
  const [isassociationTypeOn, setIsassociationTypeOn] = useState<"a" | "b">("a")
  const [istrendTypeOn, IstrendTypeOn] = useState<"a" | "b">("a")
  const [isdifferenceTypeOn, setIsdifferenceTypeOn] = useState<"a" | "b">("a")
  const [isanomalyTypeOn, setIsanomalyTypeOn] = useState<"a" | "b">("a")
  const [isseasonalityTypeOn, setIsseasonalityTypeOn] = useState<"a" | "b">("a")

  const handleTypeChange = (typeKey: string, newValue: "a" | "b") => {
    switch (typeKey) {
      case "distributionType":
        setIsdistributionTypeOn(newValue)
        break
      case "rankType":
        setIsrankTypeOn(newValue)
        break
      case "proportionType":
        setIsproportionTypeOn(newValue)
        break
      case "associationType":
        setIsassociationTypeOn(newValue)
        break
      case "trendType":
        IstrendTypeOn(newValue)
        break
      case "differenceType":
        setIsdifferenceTypeOn(newValue)
        break
      case "anomalyType":
        setIsanomalyTypeOn(newValue)
        break
      case "seasonalityType":
        setIsseasonalityTypeOn(newValue)
        break
      default:
        break
    }
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        [typeKey]: newValue,
      }),
    )
  }

  // 定义svg对象映射
  const svgs: SVGIcons = {
    distributionType: { a: DistributionA, b: DistributionB },
    rankType: { a: RankA, b: RankB },
    proportionType: { a: ProportionA, b: ProportionB },
    associationType: { a: AssociationA, b: AssociationB },
    trendType: { a: TrendA, b: TrendB },
    differenceType: { a: DifferenceA, b: DifferenceB },
    anomalyType: { a: AnomalyA, b: AnomalyB },
    seasonalityType: { a: SeasonalityA, b: SeasonalityB },
  }

  // 根据typeKey和value决定使用哪个SVG图标
  const getSVG = (typeKey: keyof SVGIcons, value: "a" | "b"): React.ReactElement => {
    const SVGComponent = svgs[typeKey][value]
    // console.log("检查debug SVGComponent", SVGComponent)
    // 使用React.createElement来创建带有特定属性的SVG元素
    return React.createElement(SVGComponent)
  }

  // 修改renderButtonGroup函数来包含SVG图标
  const renderButtonGroup = (typeKey: keyof SVGIcons, label: string, value: "a" | "b") => {
    const SVGComponentA = svgs[typeKey].a
    const SVGComponentB = svgs[typeKey].b
    return (
      <Row style={{ paddingTop: 6 }}>
        <Col span={10}>
          <div className="control-label-layer3">{label}</div>
        </Col>
        <Col span={14}>
          <Button.Group style={{ width: "80%" }}>
            <Button
              // type={value === "a" ? "primary" : "default"}
              onClick={() => handleTypeChange(typeKey, "a")}
              style={{ width: "70%", paddingTop: "0", paddingBottom: "0" }}
              icon={<SVGComponentA width="70" height="30" />} // 使用组件而非 createElement
            />
            <Button
              // type={value === "b" ? "primary" : "default"}
              onClick={() => handleTypeChange(typeKey, "b")}
              style={{ width: "70%", paddingTop: "0", paddingBottom: "0" }}
              icon={<SVGComponentB width="70" height="30" />} // 使用组件而非 createElement
            />
          </Button.Group>
        </Col>
      </Row>
    )
  }

  return (
    <div className="control-panel">
      {renderButtonGroup("distributionType", "Distribution", isdistributionTypeOn)}
      {renderButtonGroup("differenceType", "Difference", isdifferenceTypeOn)}
      {renderButtonGroup("rankType", "Rank", isrankTypeOn)}
      {renderButtonGroup("proportionType", "Proportion", isproportionTypeOn)}
      {renderButtonGroup("associationType", "Association", isassociationTypeOn)}
      {renderButtonGroup("trendType", "Trend", istrendTypeOn)}
      {renderButtonGroup("anomalyType", "Anomaly", isanomalyTypeOn)}
      {renderButtonGroup("seasonalityType", "Seasonality", isseasonalityTypeOn)}
    </div>
  )
}

export default ControlTypeSwitch
