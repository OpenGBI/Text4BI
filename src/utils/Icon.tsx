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
import { cateAndValue } from "../types"

interface IconProps {
  assessment: string
}
const Icon: React.FC<IconProps> = ({ assessment }) => {
  switch (assessment) {
    case "significant":
      return <CheckCircleOutlined style={{ fontSize: "16px", color: "#13A8A8" }} />
    case "insignificant":
      return <CloseCircleOutlined style={{ fontSize: "16px", color: "#FA5413" }} />
    case "increase":
      return <CaretUpFilled style={{ fontSize: "16px", color: "#13A8A8" }} />
    case "decrease":
      return <CaretDownFilled style={{ fontSize: "16px", color: "#FA5413" }} />
    case "positive":
      return <PlusCircleOutlined style={{ fontSize: "16px", color: "#13A8A8" }} />
    case "negative":
      return <MinusCircleOutlined style={{ fontSize: "16px", color: "#FA5413" }} />
    case "outlier":
      return <WarningFilled style={{ fontSize: "16px", color: "#FA5413" }} />
    case "anomaly":
      return <WarningFilled style={{ fontSize: "16px", color: "#FA5413" }} />

    default:
      return null
  }
}

export default Icon
