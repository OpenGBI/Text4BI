import React, { useRef, useEffect } from 'react'
import Categorization from '../utils/Categorization'
import Proportion from '../utils/Proportion'
import Association from '../utils/Association'
import Distribution from '../utils/Distribution'
import TemporalAnomaly from '../utils/TemporalAnomaly'
import TemporalPeriodicity from '../utils/TemporalPeriodicity'
import TemporalTrend from '../utils/TemporalTrend'
import { Metadata4BigGraph, Point, cateAndValue } from '../types'

type BigChartProps = {
  ChartType: string
  BigChartData: Metadata4BigGraph
}
const BigChart: React.FC<BigChartProps> = ({ ChartType, BigChartData }) => {
  // (ChartType,BigChartData)会报错
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
