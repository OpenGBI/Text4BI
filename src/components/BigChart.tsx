import React, { useRef, useEffect } from "react"
import { Chart } from "@antv/g2"
import _ from "lodash"
import Categorization from "../utils/Categorization"
import Proportion from "../utils/Proportion"
import Association from "../utils/Association"
import Difference from "../utils/TemporalDifference"
import Distribution from "../utils/Distribution"
import TemporalAnomaly from "../utils/TemporalAnomaly"
import TemporalPeriodicity from "../utils/TemporalPeriodicity"
import TemporalTrend from "../utils/TemporalTrend"
import { Metadata4BigGraph, Point, cateAndValue } from "../types"

type ChartRef = {
  getChart: () => Chart | null
}
export interface IPopupRef {
  open: () => void
}
type BigChartProps = {
  ChartType: string
  BigChartData: Metadata4BigGraph
  topk: number
}
const BigChart: React.FC<BigChartProps> = ({ ChartType, BigChartData, topk }) => {
  // (ChartType,BigChartData)会报错

  const SlicedBigChartData = _.cloneDeep(BigChartData) // 深拷贝
  SlicedBigChartData.detail =
    topk !== -1 ? SlicedBigChartData.detail?.slice(0, topk) : SlicedBigChartData.detail

  // 这可以通过可选链（?.）操作符来实现，它允许你安全地访问嵌套对象属性，即使其中一些属性可能是未定义的。
  // 在这个版本中，如果 BigChartData.detail 是未定义的，?. 会阻止进一步的调用或访问，并返回 undefined。然后，整个表达式的结果就会根据 topk 的值来决定是一
  // 个截断的数组或原始的 BigChartData.detail。如果 BigChartData.detail 本身就是 undefined，
  // 那么不管 topk 的值是什么，结果都会是 undefined。

  // BigChartData.detail = BigChartData.detail
  const chartRef = useRef<ChartRef>(null) // 创建引用
  // const getChartInstance = () => {
  //   if (chartRef.current) {
  //     const chart = chartRef.current.getChart()
  //     console.log(chart) // 现在可以访问 Chart 实例
  //     if()
  //     chart.interaction('brushHighlight', true)
  //   }
  // }
  // const chartRef = useRef(null)

  // const setChartRef = (newRef:HTMLDivElement) => {
  //   chartRef.current = newRef
  // }

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.getChart()
      // 在这里可以使用 chart 实例
      console.log(
        "chartInstancechartInstancechartInstancechartInstancechartInstance",
        chartRef.current.getChart(),
      ) // 仅示例，实际使用时您可能需要其他逻辑
      if (chartInstance) {
        chartInstance.interaction("brushHighlight", true)
      }
    }
  }, [chartRef.current]) // 没有解决！！！！！！！！！！！！！

  switch (ChartType) {
    case "Categorization":
      return <Categorization data={SlicedBigChartData.detail as cateAndValue[]} />
    case "Proportion":
      return <Proportion data={SlicedBigChartData.detail as cateAndValue[]} />
    case "Association":
      return (
        <Association
          data={SlicedBigChartData.detail as Point[]}
          tagData={SlicedBigChartData.tagData as Point[]}
          ref={chartRef}
        />
      )
    case "Distribution":
      return <Distribution data={SlicedBigChartData.detail as cateAndValue[]} />
    case "TemporalDifference":
      return <Difference iniData={SlicedBigChartData.detail as cateAndValue[]} />
    case "TemporalPeriodicity": {
      console.log(
        "TemporalPeriodicityTemporalPeriodicityTemporalPeriodicityTemporalPeriodicity",
        SlicedBigChartData,
      )
      return (
        <TemporalPeriodicity
          data={SlicedBigChartData.detail as cateAndValue[]}
          tagData={SlicedBigChartData.tagData as cateAndValue[]}
        />
      )
    }

    case "TemporalAnomaly":
      return (
        <TemporalAnomaly
          data={SlicedBigChartData.detail as cateAndValue[]}
          tagData={SlicedBigChartData.tagData as number[]}
        />
      )
    case "TemporalTrend":
      return (
        <TemporalTrend
          data={SlicedBigChartData.detail as cateAndValue[]}
          tagData={SlicedBigChartData.tagData as cateAndValue[]}
        />
      )
    default:
      return <div />
  }
}
export default BigChart
