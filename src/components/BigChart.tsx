import React, { useRef, useEffect } from 'react'
import { Chart } from '@antv/g2'
import Categorization from '../utils/Categorization'
import Proportion from '../utils/Proportion'
import Association from '../utils/Association'
import Distribution from '../utils/Distribution'
import TemporalAnomaly from '../utils/TemporalAnomaly'
import TemporalPeriodicity from '../utils/TemporalPeriodicity'
import TemporalTrend from '../utils/TemporalTrend'
import { Metadata4BigGraph, Point, cateAndValue } from '../types'

type ChartRef = {
  getChart: () => Chart | null
}
export interface IPopupRef {
  open: () => void
}
type BigChartProps = {
  ChartType: string
  BigChartData: Metadata4BigGraph
}
const BigChart: React.FC<BigChartProps> = ({ ChartType, BigChartData }) => {
  // (ChartType,BigChartData)会报错

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
        'chartInstancechartInstancechartInstancechartInstancechartInstance',
        chartRef.current.getChart(),
      ) // 仅示例，实际使用时您可能需要其他逻辑
      if (chartInstance) {
        chartInstance.interaction('brushHighlight', true)
      }
    }
  }, [chartRef.current]) // 没有解决！！！！！！！！！！！！！

  console.log('ChartType, BigChartDataChartType, BigChartData', ChartType, BigChartData)
  switch (ChartType) {
    case 'Categorization':
      return <Categorization data={BigChartData.detail as cateAndValue[]} />
    case 'Proportion':
      return <Proportion data={BigChartData.detail as cateAndValue[]} />
    case 'Association':
      return (
        <Association
          data={BigChartData.detail as Point[]}
          tagData={BigChartData.tagData as Point[]}
          ref={chartRef}
        />
      )
    case 'Distribution':
      return <Distribution data={BigChartData.detail as cateAndValue[]} />
    case 'TemporalPeriodicity':
      return <TemporalPeriodicity data={BigChartData.detail as cateAndValue[]} />
    case 'TemporalAnomaly':
      return (
        <TemporalAnomaly
          data={BigChartData.detail as cateAndValue[]}
          tagData={BigChartData.tagData as number[]}
        />
      )
    case 'TemporalTrend':
      return (
        <TemporalTrend
          data={BigChartData.detail as cateAndValue[]}
          tagData={BigChartData.tagData as cateAndValue[]}
        />
      )
    default:
      return <div />
  }
}
export default BigChart
