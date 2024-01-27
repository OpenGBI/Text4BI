import React from "react"
import { Chart } from "@antv/g2"
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CaretUpFilled,
  CaretDownFilled,
  PlusCircleOutlined,
  MinusCircleOutlined,
  WarningFilled,
} from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { cateAndValue } from "../types"
import { AppState } from "../store"

interface IconProps {
  assessment: string
}
const Icon: React.FC<IconProps> = ({ assessment }) => {
  const {
    graphicsSignificance,
    graphicsDirection,
    graphicsAnomaly,
  } = useSelector((state: AppState) => state.wordScaleGraphicsSetting)
  // 添加条件来检查是否渲染特定的图标
  if (
    (graphicsSignificance === false && (assessment === "significant" || assessment === "insignificant")) ||
    (graphicsDirection === false && (assessment === "increase" || assessment === "decrease")) ||
    (graphicsAnomaly === false && (assessment === "anomaly" || assessment === "outlier"))
  ) {
    return null // 不渲染图标
  }

  // 根据 assessment 返回相应的图标
  switch (assessment) {
    case "significant":
      return <CheckCircleOutlined style={{ fontSize: "16px", color: "#13A8A8" }} />
    case "insignificant":
      return <CloseCircleOutlined style={{ fontSize: "16px", color: "#FA5413" }} />
    case "increase":
      return <CaretUpFilled style={{ fontSize: "16px", color: "#13A8A8" }} />
    case "decrease":
      return <CaretDownFilled style={{ fontSize: "16px", color: "#FA5413" }} />
    case "outlier":
      return <WarningFilled style={{ fontSize: "16px", color: "#FA5413" }} />
    case "anomaly":
      return <WarningFilled style={{ fontSize: "16px", color: "#FA5413" }} />
    default:
      return null
  }
}

export default Icon
