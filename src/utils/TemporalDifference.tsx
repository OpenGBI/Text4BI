import React from "react"
import { Chart } from "@antv/g2"
import _, { find } from "lodash"
import * as d3 from "d3"
import { cateAndValue, highLightMessage } from "../types"
import { highlightAxis, noHighlightElement, multiHighlightElements } from "./HighLightElement"

interface DifferenceProps {
  iniData: cateAndValue[] // n个{category:,value:}画箱线图
  tagData: number[]
  message: string | number | undefined
  hoverOrNot: boolean | undefined
  interactionType?: string // 专门给29 outliers之类留的，标明它需要高亮离群点
  xAxis: string
  yAxis: string
  setHighlightMessageB2S: (message: highLightMessage) => void
}

const Difference: React.FC<DifferenceProps> = ({
  iniData,
  tagData,
  message,
  hoverOrNot,
  interactionType,
  xAxis,
  yAxis,
  setHighlightMessageB2S,
}) => {
  const containerRef = React.useRef(null)
  const interactiveRef = React.useRef<Chart | null>(null)

  const handleHover = (messageB2S: number) => {
    const highlightMessage: highLightMessage = {
      hoverOrNot: true,
      message: parseFloat(messageB2S.toFixed(2)),
    }
    highlightMessage.interactionType = "ByValue"

    if (setHighlightMessageB2S) setHighlightMessageB2S(highlightMessage)
  }
  const handleLeave = () => {
    if (setHighlightMessageB2S) setHighlightMessageB2S({ message: "", hoverOrNot: false })
  }
  const handleHoverThrottled = _.throttle(handleHover, 200)
  React.useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current as HTMLDivElement
    const children = container.querySelectorAll("svg")
    children.forEach((child) => {
      container.removeChild(child)
    })

    const margin = { top: 20, right: 30, bottom: 40, left: 90 }
    const width = 600 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(iniData.map((d) => d.category))
      .padding(0.1)

    const curX = svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x))

    curX.attr("class", "x-axis")
    curX.selectAll("text").style("font-size", "12px")

    curX
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.bottom - 10)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Year")
      .style("font-size", "13px") // 增加字号

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(iniData, (d) => d.value)!])
      .range([height, 0])

    const curY = svg.append("g").call(d3.axisLeft(y).ticks(7))
    curY.attr("class", "y-axis")
    curY.selectAll("text").style("font-size", "12px")
    curY
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -height / 2)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Profit")
      .style("font-size", "12px") // 增加字号

    svg
      .selectAll(".bar")
      .data(iniData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.category)!)
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => height - y(d.value))
      .attr("fill", "#4474cc")
      .attr("data-value", (d) => d.value.toFixed(2))
      .on("mouseenter", (event, d) => {
        handleHoverThrottled(parseFloat(d.value.toFixed(2)))
        svg
          .selectAll("rect")
          .transition()
          .duration(150)
          .style("opacity", function () {
            return this === event.currentTarget ? "1" : "0.618" // 对当前rect保持不变，其他的设置透明度为0.618
          })
      })
      .on("mouseleave", (event, d) => {
        handleLeave()
        svg.selectAll("rect").transition().duration(150).style("opacity", "1")
      })
  }, [iniData])
  React.useEffect(() => {
    console.log("debug-data-value", interactionType, message)

    if (message === undefined) {
      return
    }
    if (interactionType === "ByValue") {
      console.log("debug-data-value", message)
      d3.selectAll(".bar").style("opacity", 0.3)

      // 然后找到与message相等的点，将其透明度设置为1
      d3.selectAll(".bar")
        .filter(function () {
          return +d3.select(this).attr("data-value") === message
        })
        .style("opacity", 1)
    }
    if (interactionType === "x-axis") {
      d3.select(containerRef.current)
        .selectAll("rect.bar") // 假设所有的条形都有"bar"类
        .style("opacity", 0.5)
      d3.select(containerRef.current)
        .selectAll(".y-axis") // 假设所有的条形都有"bar"类
        .style("opacity", 0.5)
    }
    if (interactionType === "y-axis") {
      // 首先，将所有元素的透明度设为0.7
      // d3.select(containerRef.current).selectAll("*").style("opacity", 0.7)
      d3.select(containerRef.current)
        .selectAll("rect.bar") // 假设所有的条形都有"bar"类
        .style("opacity", 0.5)
      d3.select(containerRef.current)
        .selectAll(".x-axis") // 假设所有的条形都有"bar"类
        .style("opacity", 0.5)
    }
  }, [message])
  React.useEffect(() => {
    // if (!interactiveRef.current) {
    //   return
    // }
    if (hoverOrNot === undefined) {
      return
    }
    if (!hoverOrNot) {
      // noHighlightElement(interactiveRef.current)
      d3.select(containerRef.current).selectAll("*").style("opacity", 1)
    }
  }, [hoverOrNot])
  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
}
Difference.defaultProps = {
  interactionType: "",
}
export default Difference
