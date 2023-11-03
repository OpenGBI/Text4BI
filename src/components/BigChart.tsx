import React, { useRef, useEffect } from 'react'
import LineChart from '../utils/LineChart'
import BarChart from '../utils/BarChart'
import PieChart from '../utils/PieChart'

type BigChartProps = {
  ChartType: string
  BigChartData: number[]
}
const BigChart: React.FC<BigChartProps> = ({ ChartType, BigChartData }) => {
  // (ChartType,BigChartData)会报错
  switch (ChartType) {
    case 'LineChart':
      return <LineChart data={BigChartData} />
    case 'BarChart':
      return <BarChart data={BigChartData} />
    case 'PieChart':
      return <PieChart data={BigChartData} />
    default:
      return <div />
  }
}
export default BigChart
