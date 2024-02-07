import React, { useImperativeHandle, forwardRef, useRef, useEffect } from "react"
import { Chart } from "@antv/g2"
import { find } from "lodash"
import { Point } from "../types"

interface AssociationProps {
  data: Point[] // n个point画散点图
  tagData: Point[] // 2个point画回归线
  message: string | number | undefined
  hoverOrNot: boolean | undefined
}

// const Association: React.FC<AssociationProps> = ({ data, tagData }) => {
const Association = forwardRef(({ data, tagData, message, hoverOrNot }: AssociationProps, ref) => {
  const containerRef = React.useRef(null)
  const chartRef = useRef<Chart | null>(null)
  const interactiveRef = React.useRef<Chart | null>(null)
  // 使用 useImperativeHandle 将 chart 实例暴露给父组件
  useImperativeHandle(ref, () => ({
    getChart: () => chartRef.current,
  }))

  const k = (tagData[1].y - tagData[0].y) / (tagData[1].x - tagData[0].x)
  const b = tagData[1].y - k * tagData[1].x
  React.useEffect(() => {
    // Create a new chart instance
    if (!containerRef.current) return
    const chart = new Chart({
      container: containerRef.current,
      autoFit: true,
      height: 500,
    })
    // console.log('散点图datadatadatadata', data)

    // Load the data
    // chart

    // Create a scatter plot
    chart
      .data(data)
      .point()
      .encode("x", "x")
      .encode("y", "y")
      .state("active", { fill: "#4B91FF" })
      .state("inactive", { opacity: 0.5 })
    // Generate data for the line y = x
    // const maxAbsX = data.reduce((max, current) => Math.max(max, Math.abs(current.x)), 0)
    // const lineData = [
    //   { x: -maxAbsX, y: -maxAbsX * k + b },
    //   { x: maxAbsX, y: maxAbsX * k + b },
    // ]

    // Add the line to the chart
    chart
      .line()
      .encode("x", "x")
      .encode("y", "y")
      .encode("color", "blue")
      .data(tagData)
      .state("active", { opacity: 1 })
      .state("inactive", { opacity: 0.5 })
    chart.interaction("elementHighlight", true)
    interactiveRef.current = chart
    // Render the chart
    chart.render()
    // console.log('chartchartchartchartchartchart', chart)
    chartRef.current = chart
    return () => {
      chart.destroy()
    }
  }, [data])
  React.useEffect(() => {
    if (!interactiveRef.current) {
      return
    }
    if (message === undefined) {
      return
    }
    interactiveRef.current?.emit("element:highlight", {
      data: { data: tagData[0] },
    })
  }, [message])
  React.useEffect(() => {
    if (!interactiveRef.current) {
      return
    }
    if (hoverOrNot === undefined) {
      return
    }
    if (!hoverOrNot) {
      interactiveRef.current?.emit("element:unhighlight", {})
    }
  }, [hoverOrNot])

  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
})
export default Association
