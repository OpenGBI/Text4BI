import React, { useImperativeHandle, forwardRef, useRef, useEffect } from 'react'
import { Chart } from '@antv/g2'
import { Point } from '../types'

interface AssociationProps {
  data: Point[] // n个point画散点图
  tagData: Point[] // 2个point画回归线
}

// const Association: React.FC<AssociationProps> = ({ data, tagData }) => {
const Association = forwardRef(({ data, tagData }: AssociationProps, ref) => {
  const containerRef = React.useRef(null)
  const chartRef = useRef<Chart | null>(null)
  // 使用 useImperativeHandle 将 chart 实例暴露给父组件
  useImperativeHandle(ref, () => ({
    getChart: () => chartRef.current,
  }))

  const k = (tagData[1].y - tagData[0].y) / (tagData[1].x - tagData[0].x)
  const b = tagData[1].y - k * tagData[1].x
  React.useEffect(() => {
    // const data = [
    //   { x: -2, y: 12 },
    //   { x: -13, y: -7 },
    //   { x: 18, y: -13 },
    //   { x: 6, y: 0 },
    //   { x: -15, y: -18 },
    //   { x: -10, y: -11 },
    //   { x: 18, y: -13 },
    //   { x: -8, y: 17 },
    //   { x: 20, y: 6 },
    //   { x: -20, y: 0 },
    //   { x: -5, y: 12 },
    //   { x: -8, y: -20 },
    //   { x: -14, y: 4 },
    //   { x: -1, y: -17 },
    //   { x: 11, y: -13 },
    //   { x: 20, y: 6 },
    //   { x: 2, y: -18 },
    //   { x: -18, y: -2 },
    //   { x: -11, y: -10 },
    //   { x: -17, y: 9 },
    // ]

    // Create a new chart instance
    if (!containerRef.current) return
    const chart = new Chart({
      container: containerRef.current,
      autoFit: true,
      height: 500,
    })
    // console.log('散点图datadatadatadata', data)

    // Load the data
    chart.data(data)

    // Create a scatter plot
    chart.point().encode('x', 'x').encode('y', 'y')
    // Generate data for the line y = x
    // const maxAbsX = data.reduce((max, current) => Math.max(max, Math.abs(current.x)), 0)
    // const lineData = [
    //   { x: -maxAbsX, y: -maxAbsX * k + b },
    //   { x: maxAbsX, y: maxAbsX * k + b },
    // ]

    // Add the line to the chart
    chart.line().encode('x', 'x').encode('y', 'y').encode('color', 'blue').data(tagData)

    // Render the chart
    chart.render()
    console.log('chartchartchartchartchartchart', chart)
    chartRef.current = chart
    return () => {
      chart.destroy()
    }
  }, [data])

  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
})
export default Association
