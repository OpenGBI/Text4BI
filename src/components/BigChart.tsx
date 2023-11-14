import React, { useRef, useEffect } from 'react'
import LineChart from '../utils/LineChart'
import Categorization from '../utils/Categorization'
import Proportion from '../utils/Proportion'
import Association from '../utils/Association'
import Distribution from '../utils/Distribution'
import { Metadata4BigGraph, Point, cateAndValue } from '../types'

type BigChartProps = {
  ChartType: string
  BigChartData: Metadata4BigGraph
}
const BigChart: React.FC<BigChartProps> = ({ ChartType, BigChartData }) => {
  // (ChartType,BigChartData)会报错
  console.log('ChartType, BigChartDataChartType, BigChartData', ChartType, BigChartData)
  switch (ChartType) {
    case 'LineChart':
      return <LineChart data={BigChartData.detail as cateAndValue[]} />
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
    default:
      return <div />
  }
}
export default BigChart
