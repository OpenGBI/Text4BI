import React, { useRef, useEffect } from "react"
import * as d3 from "d3"
import { Point, cateAndValue } from "../types"

export const renderDistribution1 = (
  data: cateAndValue[],
  aspectRatio: string,
  sparkLinePosition: string,
  wordElement?: HTMLSpanElement,
  sparkLineElement?: HTMLSpanElement,
) => {
  // console.log("确认小图函数是否调用 分布1", sparkLineElement)
  let width
  let height
  const padding = 1.5
  // 1:1 2.75:1 4:1
  if (aspectRatio === "1:1") {
    width = 20
    height = 20
  } else if (aspectRatio === "2:1") {
    width = 40
    height = 20
  } else if (aspectRatio === "4:1") {
    width = 80
    height = 20
  } else if (aspectRatio === "4:3") {
    width = 27
    height = 20
  } else if (aspectRatio === "16:9") {
    width = 36
    height = 20
  } else {
    width = 100
    height = 20
  }
  if (wordElement) {
    const children = wordElement.querySelectorAll(":scope > .sparklines")
    children.forEach((child) => {
      wordElement.removeChild(child)
    })
  }
  const values: number[] = data.map((item) => item.value)
  const q1 = d3.quantile(values.sort(d3.ascending), 0.25)
  const median = d3.quantile(values, 0.5)
  const q3 = d3.quantile(values, 0.75)
  if (!q1 || !q3 || !median) {
    throw new Error("q1q3median计算失败")
  }
  const interQuantileRange = q3 - q1
  const min = q1 - 1.5 * interQuantileRange
  const max = q3 + 1.5 * interQuantileRange
  const xScale = d3
    .scaleLinear()
    .domain([min, max])
    .range([padding, width - padding])

  // 上下放小图
  if (wordElement && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
    const rect = wordElement.getBoundingClientRect()
    const newDiv = document.createElement("span")
    newDiv.setAttribute("data-highlight-color-name", "red")
    newDiv.classList.add("sparklines")
    newDiv.style.position = "absolute"
    if (sparkLinePosition === "up") {
      newDiv.style.top = "-20px"
      newDiv.style.left = "0px"
    } else {
      newDiv.style.top = "0px"
      newDiv.style.left = "0px"
    }

    newDiv.style.width = `${rect.width + 20}px`
    newDiv.style.height = `${rect.height + 20}px`
    wordElement.appendChild(newDiv)
    const svgD3 = d3
      .select(newDiv)
      .append("svg")
      .attr("width", width)
      .attr("height", 20)
      .style("position", "absolute")
    if (sparkLinePosition === "up") {
      svgD3.style("top", "0").style("left", "0")
    } else {
      svgD3.style("bottom", "0").style("left", "0")
    }

    svgD3.append("g").attr("transform", `translate(0,${height})`)
    svgD3
      .append("rect")
      .attr("x", xScale(q1))
      .attr("y", height / 2)
      .attr("height", height / 2)
      .attr("width", xScale(q3) - xScale(q1))
      // .attr('stroke', 'black')
      .style("fill", "#ccd7f1")
    svgD3
      .append("line")
      .attr("x1", xScale(median))
      .attr("x2", xScale(median))
      .attr("y1", height / 2)
      .attr("y2", height)
      .attr("stroke", "black")
      .attr("stroke-width", "1")
    // 绘制上下须
    svgD3
      .append("line")
      .attr("x1", xScale(min))
      .attr("x2", xScale(max))
      .attr("y1", (height * 3) / 4)
      .attr("y2", (height * 3) / 4)
      .attr("stroke", "black")
      .attr("stroke-width", "1")

    svgD3
      .append("line")
      .attr("x1", xScale(min))
      .attr("x2", xScale(min))
      .attr("y1", height / 2)
      .attr("y2", height)
      .attr("stroke", "black")
      .attr("stroke-width", "1")

    svgD3
      .append("line")
      .attr("x1", xScale(max))
      .attr("x2", xScale(max))
      .attr("y1", height / 2)
      .attr("y2", height)
      .attr("stroke", "black")
      .attr("stroke-width", "1")
  }
  // 左右放小图
  if (sparkLineElement) {
    while (sparkLineElement.firstChild) {
      sparkLineElement.removeChild(sparkLineElement.firstChild)
    }
    const svgD3 = d3.select(sparkLineElement).append("svg").attr("width", width).attr("height", 20)
    if (sparkLinePosition === "up") {
      svgD3.style("top", "0").style("left", "0")
    } else {
      svgD3.style("bottom", "0").style("left", "0")
    }

    svgD3.append("g").attr("transform", `translate(0,${height})`)
    svgD3
      .append("rect")
      .attr("x", xScale(q1))
      .attr("y", height / 2)
      .attr("height", height / 2)
      .attr("width", xScale(q3) - xScale(q1))
      // .attr('stroke', 'black')
      .style("fill", "#ccd7f1")
    svgD3
      .append("line")
      .attr("x1", xScale(median))
      .attr("x2", xScale(median))
      .attr("y1", height / 2)
      .attr("y2", height)
      .attr("stroke", "black")
      .attr("stroke-width", "1")
    // 绘制上下须
    svgD3
      .append("line")
      .attr("x1", xScale(min))
      .attr("x2", xScale(max))
      .attr("y1", (height * 3) / 4)
      .attr("y2", (height * 3) / 4)
      .attr("stroke", "black")
      .attr("stroke-width", "1")

    svgD3
      .append("line")
      .attr("x1", xScale(min))
      .attr("x2", xScale(min))
      .attr("y1", height / 2)
      .attr("y2", height)
      .attr("stroke", "black")
      .attr("stroke-width", "1")

    svgD3
      .append("line")
      .attr("x1", xScale(max))
      .attr("x2", xScale(max))
      .attr("y1", height / 2)
      .attr("y2", height)
      .attr("stroke", "black")
      .attr("stroke-width", "1")
  }
}
export const renderDistribution2 = (
  data: cateAndValue[],
  aspectRatio: string,
  sparkLinePosition: string,
  wordElement?: HTMLSpanElement,
  sparkLineElement?: HTMLSpanElement,
) => {
  // console.log("确认小图函数是否调用 分布2", sparkLineElement)
  function kernelDensityEstimator(kernel: (v: number) => number, X: number[]) {
    return (V: number[]): [number, number][] =>
      X.map((x) => [x, d3.mean(V, (v) => kernel(x - v))!] as [number, number]) // 使用非空断言
  }

  function kernelEpanechnikov(k: number): (v: number) => number {
    return (v: number) => {
      v /= k
      return Math.abs(v) <= 1 ? (0.75 * (1 - v * v)) / k : 0
    }
  }
  const values: number[] = data.map((item) => item.value)
  let width
  let height
  const padding = 1.5
  // 1:1 2.75:1 4:1
  if (aspectRatio === "1:1") {
    width = 20
    height = 20
  } else if (aspectRatio === "2:1") {
    width = 50
    height = 20
  } else if (aspectRatio === "4:1") {
    width = 100
    height = 20
  } else if (aspectRatio === "4:3") {
    width = 27
    height = 20
  } else if (aspectRatio === "16:9") {
    width = 36
    height = 20
  } else {
    width = 100
    height = 20
  }
  if (wordElement) {
    const children = wordElement.querySelectorAll(":scope > .sparklines")
    children.forEach((child) => {
      wordElement.removeChild(child)
    })
  }

  if (d3.extent(values)[0] === undefined) {
    throw new Error("Error")
  }
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(values) as [number, number]) // data的范围
    .range([padding, width - padding])
  const yScale = d3.scaleLinear().range([height - padding, padding])
  const kde = kernelDensityEstimator(kernelEpanechnikov(7), xScale.ticks(40))
  const density = kde(values)
  yScale.domain([0, d3.max(density, (d) => d[1])!]) // 使用非空断言
  // const xScale = d3
  //   .scaleLinear()
  //   .domain([min, max])
  //   .range([padding, width - padding])

  // 上下放小图
  if (wordElement && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
    const rect = wordElement.getBoundingClientRect()
    const newDiv = document.createElement("span")
    newDiv.setAttribute("data-highlight-color-name", "red")
    newDiv.classList.add("sparklines")
    newDiv.style.position = "absolute"
    if (sparkLinePosition === "up") {
      newDiv.style.top = "-20px"
      newDiv.style.left = "0px"
    } else {
      newDiv.style.top = "0px"
      newDiv.style.left = "0px"
    }

    newDiv.style.width = `${rect.width + 20}px`
    newDiv.style.height = `${rect.height + 20}px`
    wordElement.appendChild(newDiv)
    const svgD3 = d3
      .select(newDiv)
      .append("svg")
      .attr("width", width)
      .attr("height", 20)
      .style("position", "absolute")
    if (sparkLinePosition === "up") {
      svgD3.style("top", "0").style("left", "0")
    } else {
      svgD3.style("bottom", "0").style("left", "0")
    }

    svgD3.append("g").attr("transform", `translate(0,${height})`)
    svgD3
      .append("path")
      .attr("class", "mypath")
      .datum(density)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr(
        "d",
        d3
          .line()
          .curve(d3.curveBasis)
          .x((d) => xScale(d[0]))
          .y((d) => yScale(d[1])),
      )
  }
  // 左右放小图
  if (sparkLineElement) {
    while (sparkLineElement.firstChild) {
      sparkLineElement.removeChild(sparkLineElement.firstChild)
    }
    const svgD3 = d3.select(sparkLineElement).append("svg").attr("width", width).attr("height", 20)
    if (sparkLinePosition === "up") {
      svgD3.style("top", "0").style("left", "0")
    } else {
      svgD3.style("bottom", "0").style("left", "0")
    }

    svgD3.append("g").attr("transform", `translate(0,${height})`)
    svgD3
      .append("path")
      .attr("class", "mypath")
      .datum(density)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr(
        "d",
        d3
          .line()
          .curve(d3.curveBasis)
          .x((d) => xScale(d[0]))
          .y((d) => yScale(d[1])),
      )
  }
}

export const renderCategorization1 = (
  iniData: cateAndValue[],
  tagData: number,
  aspectRatio: string,
  sparkLinePosition: string,
  wordElement?: HTMLSpanElement,
  sparkLineElement?: HTMLSpanElement,
) => {
  let width
  let height: number
  const padding = 1
  const slicedData = iniData.slice(0, 5)
  const data: number[] = slicedData.map((item) => item.value)
  // 1:1 2.75:1 4:1
  if (aspectRatio === "1:1") {
    width = 20
    height = 20
  } else if (aspectRatio === "2:1") {
    width = 50
    height = 20
  } else if (aspectRatio === "4:1") {
    width = 100
    height = 20
  } else if (aspectRatio === "4:3") {
    width = 27
    height = 20
  } else if (aspectRatio === "16:9") {
    width = 36
    height = 20
  } else {
    width = 100
    height = 20
  }
  const barWidth = (width - padding * 2) / data.length
  if (wordElement) {
    const children = wordElement.querySelectorAll(":scope > .sparklines")
    children.forEach((child) => {
      wordElement.removeChild(child)
    })
  }

  const xScale = d3
    .scaleLinear()
    .domain([0, data.length])
    .range([padding, width - padding])
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data) || 0])
    .range([height - padding, padding])

  const line = d3
    .line<number>()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d))

  // 上下放小图
  if (wordElement && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
    const rect = wordElement.getBoundingClientRect()
    const newDiv = document.createElement("span")
    newDiv.setAttribute("data-highlight-color-name", "red")
    newDiv.classList.add("sparklines")
    newDiv.style.position = "absolute"
    if (sparkLinePosition === "up") {
      newDiv.style.top = "-20px"
      newDiv.style.left = "0px"
    } else {
      newDiv.style.top = "0px"
      newDiv.style.left = "0px"
    }

    newDiv.style.width = `${rect.width + 20}px`
    newDiv.style.height = `${rect.height + 20}px`
    wordElement.appendChild(newDiv)
    const svgD3 = d3
      .select(newDiv)
      .append("svg")
      .attr("width", width)
      .attr("height", 20)
      .style("position", "absolute")
    if (sparkLinePosition === "up") {
      svgD3.style("top", "0").style("left", "0")
    } else {
      svgD3.style("bottom", "0").style("left", "0")
    }

    svgD3
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("width", barWidth) // 5 is for padding between bars
      .attr("height", (d) => height - yScale(d))
      .attr("fill", (d, i) => {
        if (tagData === -1) {
          return "#3769b1"
        }
        return i === tagData ? "#3769b1" : "#cbd7ed"
      })
  }
  // 左右放小图
  if (sparkLineElement) {
    while (sparkLineElement.firstChild) {
      sparkLineElement.removeChild(sparkLineElement.firstChild)
    }
    const svgD3 = d3
      .select(sparkLineElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
    svgD3
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("width", barWidth) // 5 is for padding between bars
      .attr("height", (d) => height - yScale(d))
      .attr("fill", (d, i) => {
        if (tagData === -1) {
          return "#3769b1"
        }
        return i === tagData ? "#3769b1" : "#cbd7ed"
      })
  }
}

export const renderCategorization2 = (
  iniData: cateAndValue[],
  tagData: number,
  aspectRatio: string,
  sparkLinePosition: string,
  wordElement?: HTMLSpanElement,
  sparkLineElement?: HTMLSpanElement,
) => {
  let width
  let height: number
  const padding = 1
  const slicedData = iniData.slice(0, 5)
  const data: number[] = slicedData.map((item) => item.value)
  // 1:1 2.75:1 4:1
  if (aspectRatio === "1:1") {
    width = 20
    height = 20
  } else if (aspectRatio === "2:1") {
    width = 50
    height = 20
  } else if (aspectRatio === "4:1") {
    width = 100
    height = 20
  } else if (aspectRatio === "4:3") {
    width = 27
    height = 20
  } else if (aspectRatio === "16:9") {
    width = 36
    height = 20
  } else {
    width = 100
    height = 20
  }
  const barWidth = (width - padding * 2) / data.length
  if (wordElement) {
    const children = wordElement.querySelectorAll(":scope > .sparklines")
    children.forEach((child) => {
      wordElement.removeChild(child)
    })
  }

  // const xScale = d3
  //   .scaleLinear()
  //   .domain([0, data.length])
  //   .range([padding, width - padding])
  // const yScale = d3
  //   .scaleLinear()
  //   .domain([0, d3.max(data) || 0])
  //   .range([height - padding, padding])
  function getx(index: number, xScale: d3.ScaleLinear<number, number>) {
    let res = 0
    for (let i = 0; i < index; i += 1) {
      res += Math.sqrt(data[i])
      res += padding
    }
    return xScale(res)
  }
  function getTotal() {
    let res = 0
    for (let i = 0; i < data.length; i += 1) {
      res += Math.sqrt(data[i])
      res += padding
    }
    return res
  }
  const xScale = d3.scaleLinear().domain([0, getTotal()]).range([0, width])
  // 上下放小图
  if (wordElement && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
    const rect = wordElement.getBoundingClientRect()
    const newDiv = document.createElement("span")
    newDiv.setAttribute("data-highlight-color-name", "red")
    newDiv.classList.add("sparklines")
    newDiv.style.position = "absolute"
    if (sparkLinePosition === "up") {
      newDiv.style.top = "-20px"
      newDiv.style.left = "0px"
    } else {
      newDiv.style.top = "0px"
      newDiv.style.left = "0px"
    }

    newDiv.style.width = `${rect.width + 20}px`
    newDiv.style.height = `${rect.height + 20}px`
    wordElement.appendChild(newDiv)
    const svgD3 = d3
      .select(newDiv)
      .append("svg")
      .attr("width", width)
      .attr("height", 20)
      .style("position", "absolute")
    if (sparkLinePosition === "up") {
      svgD3.style("top", "0").style("left", "0")
    } else {
      svgD3.style("bottom", "0").style("left", "0")
    }

    svgD3
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d: number, i: number) => getx(i, xScale))
      .attr("y", (d: number) => height - xScale(Math.sqrt(d))) // y coordinate is the SVG height minus the square's side length
      .attr("width", (d: number) => xScale(Math.sqrt(d))) // The width is the bandwidth calculated by the scale
      .attr("height", (d: number) => xScale(Math.sqrt(d))) // The height is the square root of the area
      .attr("fill", (d, i) => {
        if (tagData === -1) {
          return "#3769b1"
        }
        return i === tagData ? "#3769b1" : "#cbd7ed"
      })
  }
  // 左右放小图
  if (sparkLineElement) {
    while (sparkLineElement.firstChild) {
      sparkLineElement.removeChild(sparkLineElement.firstChild)
    }
    const svgD3 = d3
      .select(sparkLineElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
    svgD3
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d: number, i: number) => getx(i, xScale))
      .attr("y", (d: number) => height - xScale(Math.sqrt(d))) // y coordinate is the SVG height minus the square's side length
      .attr("width", (d: number) => xScale(Math.sqrt(d))) // The width is the bandwidth calculated by the scale
      .attr("height", (d: number) => xScale(Math.sqrt(d))) // The height is the square root of the area
      .attr("fill", (d, i) => {
        if (tagData === -1) {
          return "#3769b1"
        }
        return i === tagData ? "#3769b1" : "#cbd7ed"
      })
  }
}
export const renderProportion1 = (
  data: number[],
  aspectRatio: string,
  sparkLinePosition: string,
  wordElement?: HTMLSpanElement,
  sparkLineElement?: HTMLSpanElement,
) => {
  let width
  let height
  const padding = 0.5
  // 1:1 2.75:1 4:1
  if (aspectRatio === "1:1") {
    width = 20
    height = 20
  } else if (aspectRatio === "2:1") {
    width = 50
    height = 20
  } else if (aspectRatio === "4:1") {
    width = 100
    height = 20
  } else if (aspectRatio === "4:3") {
    width = 27
    height = 20
  } else if (aspectRatio === "16:9") {
    width = 36
    height = 20
  } else {
    width = 100
    height = 20
  }

  if (wordElement) {
    const children = wordElement.querySelectorAll(":scope > .sparklines")
    children.forEach((child) => {
      wordElement.removeChild(child)
    })
  }
  const radius = Math.min(width, height) / 2

  const pie = d3.pie<number>().sort(null)
  const arc = d3.arc<d3.PieArcDatum<number>>().innerRadius(0).outerRadius(radius)

  const color = d3.scaleOrdinal(d3.schemeCategory10)
  // const xScale = d3
  //   .scaleLinear()
  //   .domain([0, data.length - 1])
  //   .range([padding, width - padding])
  // const yScale = d3
  //   .scaleLinear()
  //   .domain([d3.min(data) || 0, d3.max(data) || 0])
  //   .range([height - padding, padding])

  // const line = d3
  //   .line<number>()
  //   .x((d, i) => xScale(i))
  //   .y((d) => yScale(d))
  console.log("sparkLinePositionsparkLinePositionsparkLinePosition", sparkLinePosition)
  // 上下放小图
  if (wordElement && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
    const rect = wordElement.getBoundingClientRect()
    const newDiv = document.createElement("span")
    newDiv.setAttribute("data-highlight-color-name", "red")
    newDiv.classList.add("sparklines")
    newDiv.style.position = "absolute"
    if (sparkLinePosition === "up") {
      newDiv.style.top = "-40px"
      newDiv.style.left = "0px"
    } else {
      newDiv.style.top = "0px"
      newDiv.style.left = "0px"
    }

    newDiv.style.width = `${rect.width + 20}px`
    newDiv.style.height = `${rect.height + 20}px`
    wordElement.appendChild(newDiv)

    const svgD3 = d3
      .select(newDiv)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`) // Center the pie chart

    const pieData = pie(data)

    svgD3
      .selectAll("path")
      .data(pieData)
      .enter()
      .append("path")
      .attr("d", arc) // Cast required due to typings mismatch
      .attr("fill", (d, i) => color(i.toString()))
  }
  // 左右放小图
  if (sparkLineElement) {
    while (sparkLineElement.firstChild) {
      sparkLineElement.removeChild(sparkLineElement.firstChild)
    }
    const svgD3 = d3
      .select(sparkLineElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`) // Center the pie chart

    const pieData = pie(data)

    svgD3
      .selectAll("path")
      .data(pieData)
      .enter()
      .append("path")
      .attr("d", arc) // Cast required due to typings mismatch
      .attr("fill", (d, i) => color(i.toString()))
  }
}
export const renderProportion2 = (
  data: number[],
  aspectRatio: string,
  sparkLinePosition: string,
  wordElement?: HTMLSpanElement,
  sparkLineElement?: HTMLSpanElement,
) => {
  let width
  let height: number
  const padding: number = 0.5
  // 1:1 2.75:1 4:1
  if (aspectRatio === "1:1") {
    width = 20
    height = 20
  } else if (aspectRatio === "2:1") {
    width = 50
    height = 20
  } else if (aspectRatio === "4:1") {
    width = 100
    height = 20
  } else if (aspectRatio === "4:3") {
    width = 27
    height = 20
  } else if (aspectRatio === "16:9") {
    width = 36
    height = 20
  } else {
    width = 100
    height = 20
  }
  function getx(index: number, xScale: d3.ScaleLinear<number, number>): number {
    let res: number = 0
    for (let i: number = 0; i < index; i += 1) {
      res += data[i]
      res += padding
    }
    return xScale(res)
  }

  function gettotal(): number {
    let res: number = 0
    for (let i: number = 0; i < data.length; i += 1) {
      res += data[i]
      res += padding
    }
    return res
  }
  if (wordElement) {
    const children = wordElement.querySelectorAll(":scope > .sparklines")
    children.forEach((child) => {
      wordElement.removeChild(child)
    })
  }
  const colorScale: d3.ScaleOrdinal<number, string> = d3
    .scaleOrdinal<number, string>()
    .domain(d3.range(data.length))
    .range(d3.schemeCategory10) // const xScale = d3
  const xScale = d3.scaleLinear().domain([0, gettotal()]).range([0, width])
  //   .scaleLinear()
  //   .domain([0, data.length - 1])
  //   .range([padding, width - padding])
  // const yScale = d3
  //   .scaleLinear()
  //   .domain([d3.min(data) || 0, d3.max(data) || 0])
  //   .range([height - padding, padding])

  // const line = d3
  //   .line<number>()
  //   .x((d, i) => xScale(i))
  //   .y((d) => yScale(d))

  // 上下放小图
  if (wordElement && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
    const rect = wordElement.getBoundingClientRect()
    const newDiv = document.createElement("span")
    newDiv.setAttribute("data-highlight-color-name", "red")
    newDiv.classList.add("sparklines")
    newDiv.style.position = "absolute"
    if (sparkLinePosition === "up") {
      newDiv.style.top = "-20px"
      newDiv.style.left = "0px"
    } else {
      newDiv.style.top = "0px"
      newDiv.style.left = "0px"
    }

    newDiv.style.width = `${rect.width + 20}px`
    newDiv.style.height = `${rect.height + 20}px`
    wordElement.appendChild(newDiv)
    const svgD3 = d3
      .select(newDiv)
      .append("svg")
      .attr("width", width)
      .attr("height", 20)
      .style("position", "absolute")
    if (sparkLinePosition === "up") {
      svgD3.style("top", "0").style("left", "0")
    } else {
      svgD3.style("bottom", "0").style("left", "0")
    }
    // const svgD3 = d3
    //   .select(newDiv)
    //   .append('svg')
    //   .attr('width', width)
    //   .attr('height', height)
    //   .append('g')
    //   .attr('transform', `translate(${width / 2}, ${height / 2})`) // Center the pie chart

    svgD3
      .selectAll<SVGRectElement, number>(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d: number, i: number) => getx(i, xScale))
      .attr("y", (d: number) => height - 10) // y坐标由SVG高度减去正方形的边长
      .attr("width", (d: number) => xScale(d)) // 宽度为比例尺计算的带宽
      .attr("height", 10) // 高度为面积的平方根
      .attr("fill", (d: number, i: number) => colorScale(i)) // 使用颜色比例尺设置填充色
  }
  // 左右放小图
  if (sparkLineElement) {
    while (sparkLineElement.firstChild) {
      sparkLineElement.removeChild(sparkLineElement.firstChild)
    }
    // const svgD3 = d3
    //   .select(sparkLineElement)
    //   .append('svg')
    //   .attr('width', width)
    //   .attr('height', height)
    //   .append('g')
    //   .attr('transform', `translate(${width / 2}, ${height / 2})`) // Center the pie chart
    const svgD3 = d3
      .select(sparkLineElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
    svgD3
      .selectAll<SVGRectElement, number>(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d: number, i: number) => getx(i, xScale))
      .attr("y", (d: number) => height - 10) // y坐标由SVG高度减去正方形的边长
      .attr("width", (d: number) => xScale(d)) // 宽度为比例尺计算的带宽
      .attr("height", 10) // 高度为面积的平方根
      .attr("fill", (d: number, i: number) => colorScale(i)) // 使用颜色比例尺设置填充色
  }
}
export const renderAssociation1 = (
  data: Point[],
  aspectRatio: string,
  sparkLinePosition: string,
  tagData: Point[],
  wordElement?: HTMLSpanElement,
  sparkLineElement?: HTMLSpanElement,
) => {
  const k = (tagData[1].y - tagData[0].y) / (tagData[1].x - tagData[0].x)
  const b = tagData[1].y - k * tagData[1].x
  // console.log('kkkkkkkk,bbbbbb', k, b)
  let width
  let height
  const padding = 1.5
  // 1:1 2.75:1 4:1
  if (aspectRatio === "1:1") {
    width = 20
    height = 20
  } else if (aspectRatio === "2:1") {
    width = 50
    height = 20
  } else if (aspectRatio === "4:1") {
    width = 100
    height = 20
  } else if (aspectRatio === "4:3") {
    width = 27
    height = 20
  } else if (aspectRatio === "16:9") {
    width = 36
    height = 20
  } else {
    width = 100
    height = 20
  }
  if (wordElement) {
    const children = wordElement.querySelectorAll(":scope > .sparklines")
    children.forEach((child) => {
      wordElement.removeChild(child)
    })
  }
  const maxAbsX = data.reduce((max, current) => Math.max(max, Math.abs(current.x)), 0)
  const xScale = d3
    .scaleLinear()
    .rangeRound([padding, width - padding])
    .domain([-maxAbsX, maxAbsX])
  const maxAbsY = data.reduce((max, current) => Math.max(max, Math.abs(current.y)), 0)
  const yScale = d3
    .scaleLinear()
    .rangeRound([height - padding, padding])
    .domain([-maxAbsY, maxAbsY])

  // 上下放小图
  if (wordElement && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
    const rect = wordElement.getBoundingClientRect()
    const newDiv = document.createElement("span")
    newDiv.setAttribute("data-highlight-color-name", "red")
    newDiv.classList.add("sparklines")
    newDiv.style.position = "absolute"
    if (sparkLinePosition === "up") {
      newDiv.style.top = "-20px"
      newDiv.style.left = "0px"
    } else {
      newDiv.style.top = "0px"
      newDiv.style.left = "0px"
    }

    newDiv.style.width = `${rect.width + 20}px`
    newDiv.style.height = `${rect.height + 20}px`
    wordElement.appendChild(newDiv)
    const svgD3 = d3
      .select(newDiv)
      .append("svg")
      .attr("width", width)
      .attr("height", 20)
      .style("position", "absolute")
    if (sparkLinePosition === "up") {
      svgD3.style("top", "0").style("left", "0")
    } else {
      svgD3.style("bottom", "0").style("left", "0")
    }

    svgD3
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("class", "arrowHead")
      .attr("fill", "steelblue")
    svgD3
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${yScale(0)})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(0.1)
          .tickFormat(() => ""),
      )
      .selectAll("path, line") // 选择坐标轴的所有路径和线
      .style("stroke", "steelblue")

    svgD3
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${xScale(0)},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(0.1)
          .tickFormat(() => ""),
      )
      .selectAll("path, line") // 选择坐标轴的所有路径和线
      .style("stroke", "steelblue")

    // Equation of the line: y = 4.5x + -5.0
    const line = d3
      .line<Point>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(k * d.x + b))

    const res = svgD3
      .append("path")
      .datum([
        { x: -maxAbsX, y: 0 },
        { x: maxAbsX, y: 0 },
      ])
      .attr("class", "line")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line)
      .attr("marker-end", "url(#arrow)")
  }
  // 左右放小图
  if (sparkLineElement) {
    while (sparkLineElement.firstChild) {
      sparkLineElement.removeChild(sparkLineElement.firstChild)
    }
    const svgD3 = d3
      .select(sparkLineElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    // Equation of the line: y = 4.5x + -5.0
    svgD3
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("class", "arrowHead")
      .attr("fill", "steelblue")
    svgD3
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${yScale(0)})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(0.1)
          .tickFormat(() => ""),
      )
      .selectAll("path, line") // 选择坐标轴的所有路径和线
      .style("stroke", "steelblue")

    svgD3
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${xScale(0)},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(0.1)
          .tickFormat(() => ""),
      )
      .selectAll("path, line") // 选择坐标轴的所有路径和线
      .style("stroke", "steelblue")

    // Equation of the line: y = 4.5x + -5.0
    const line = d3
      .line<Point>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(k * d.x + b))

    const res = svgD3
      .append("path")
      .datum([
        { x: -maxAbsX, y: 0 },
        { x: maxAbsX, y: 0 },
      ])
      .attr("class", "line")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line)
      .attr("marker-end", "url(#arrow)")
  }
}
export const renderAssociation2 = (
  data: Point[],
  aspectRatio: string,
  sparkLinePosition: string,
  tagData: Point[],
  wordElement?: HTMLSpanElement,
  sparkLineElement?: HTMLSpanElement,
) => {
  const k = (tagData[1].y - tagData[0].y) / (tagData[1].x - tagData[0].x)
  const b = tagData[1].y - k * tagData[1].x
  let width
  let height
  const padding = 1
  // 1:1 2.75:1 4:1
  if (aspectRatio === "1:1") {
    width = 20
    height = 20
  } else if (aspectRatio === "2:1") {
    width = 50
    height = 20
  } else if (aspectRatio === "4:1") {
    width = 100
    height = 20
  } else if (aspectRatio === "4:3") {
    width = 27
    height = 20
  } else if (aspectRatio === "16:9") {
    width = 36
    height = 20
  } else {
    width = 100
    height = 20
  }
  if (wordElement) {
    const children = wordElement.querySelectorAll(":scope > .sparklines")
    children.forEach((child) => {
      wordElement.removeChild(child)
    })
  }
  const maxAbsX = data.reduce((max, current) => Math.max(max, Math.abs(current.x)), 0)
  const xScale = d3
    .scaleLinear()
    .rangeRound([padding, width - padding])
    .domain([-maxAbsX, maxAbsX])
  // console.log('d3.extent(data, (d) => d.x) as number[]', d3.extent(data, (d) => d.x) as number[])
  const maxAbsY = data.reduce((max, current) => Math.max(max, Math.abs(current.y)), 0)
  const yScale = d3
    .scaleLinear()
    .rangeRound([height - padding, padding])
    .domain([-maxAbsY, maxAbsY])
  // const xScale = d3
  //   .scaleLinear()
  //   .domain([0, data.length])
  //   .range([padding, width - padding])
  // const yScale = d3
  //   .scaleLinear()
  //   .domain([d3.min(data) || 0, d3.max(data) || 0])
  //   .range([height - padding, padding])

  // const line = d3
  //   .line<number>()
  //   .x((d, i) => xScale(i))
  //   .y((d) => yScale(d))

  // 上下放小图
  if (wordElement && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
    const rect = wordElement.getBoundingClientRect()
    const newDiv = document.createElement("span")
    newDiv.setAttribute("data-highlight-color-name", "red")
    newDiv.classList.add("sparklines")
    newDiv.style.position = "absolute"
    if (sparkLinePosition === "up") {
      newDiv.style.top = "-20px"
      newDiv.style.left = "0px"
    } else {
      newDiv.style.top = "0px"
      newDiv.style.left = "0px"
    }

    newDiv.style.width = `${rect.width + 20}px`
    newDiv.style.height = `${rect.height + 20}px`
    wordElement.appendChild(newDiv)
    const svgD3 = d3
      .select(newDiv)
      .append("svg")
      .attr("width", width)
      .attr("height", 20)
      .style("position", "absolute")
    if (sparkLinePosition === "up") {
      svgD3.style("top", "0").style("left", "0")
    } else {
      svgD3.style("bottom", "0").style("left", "0")
    }

    svgD3
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${yScale(0)})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(0.1)
          .tickFormat(() => ""),
      )
      .selectAll("path, line") // 选择坐标轴的所有路径和线
      .style("stroke", "steelblue")

    svgD3
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${xScale(0)},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(0.1)
          .tickFormat(() => ""),
      )
      .selectAll("path, line") // 选择坐标轴的所有路径和线
      .style("stroke", "steelblue")

    // Scatter plot
    svgD3
      .selectAll(".scatter")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "scatter")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 1)
      .attr("fill", "steelblue")

    // Equation of the line: y = 4.5x + -5.0
    const line = d3
      .line<Point>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(k * d.x + b))

    const res = svgD3
      .append("path")
      .datum([
        { x: -maxAbsX, y: 0 },
        { x: maxAbsX, y: 0 },
      ])
      .attr("class", "line")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line)
  }
  // 左右放小图
  if (sparkLineElement) {
    while (sparkLineElement.firstChild) {
      sparkLineElement.removeChild(sparkLineElement.firstChild)
    }
    const svgD3 = d3
      .select(sparkLineElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
    svgD3
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${yScale(0)})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(0.1)
          .tickFormat(() => ""),
      )
      .selectAll("path, line") // 选择坐标轴的所有路径和线
      .style("stroke", "steelblue")

    svgD3
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${xScale(0)},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(0.1)
          .tickFormat(() => ""),
      )
      .selectAll("path, line") // 选择坐标轴的所有路径和线
      .style("stroke", "steelblue")

    // Scatter plot
    svgD3
      .selectAll(".scatter")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "scatter")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 1)
      .attr("fill", "steelblue")

    // Equation of the line: y = 4.5x + -5.0
    const line = d3
      .line<Point>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(k * d.x + b))
    // console.log('datumdatum', k, b)

    const res = svgD3
      .append("path")
      .datum([
        { x: -maxAbsX, y: 0 },
        { x: maxAbsX, y: 0 },
      ])
      .attr("class", "line")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line)
  }
}
export const renderTemporalityTrend1 = (
  data: number[],
  aspectRatio: string,
  sparkLinePosition: string,
  wordElement?: HTMLSpanElement,
  sparkLineElement?: HTMLSpanElement,
) => {
  let width
  let height
  const padding = 1.5
  // 1:1 2.75:1 4:1
  if (aspectRatio === "1:1") {
    width = 20
    height = 20
  } else if (aspectRatio === "2:1") {
    width = 50
    height = 20
  } else if (aspectRatio === "4:1") {
    width = 100
    height = 20
  } else if (aspectRatio === "4:3") {
    width = 27
    height = 20
  } else if (aspectRatio === "16:9") {
    width = 36
    height = 20
  } else {
    width = 100
    height = 20
  }
  if (wordElement) {
    const children = wordElement.querySelectorAll(":scope > .sparklines")
    children.forEach((child) => {
      wordElement.removeChild(child)
    })
  }

  const xScale = d3
    .scaleLinear()
    .domain([0, data.length])
    .range([padding, width - padding])
  const yScale = d3
    .scaleLinear()
    .domain([d3.min(data) || 0, d3.max(data) || 0])
    .range([height - padding, padding])

  const line = d3
    .line<number>()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d))

  // 上下放小图
  if (wordElement && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
    const rect = wordElement.getBoundingClientRect()
    // console.log(rect)
    const newDiv = document.createElement("span")
    newDiv.setAttribute("data-highlight-color-name", "red")
    newDiv.classList.add("sparklines")
    newDiv.style.position = "absolute"
    if (sparkLinePosition === "up") {
      newDiv.style.top = "-20px"
      newDiv.style.left = "0px"
    } else {
      newDiv.style.top = "0px"
      newDiv.style.left = "0px"
    }

    newDiv.style.width = `${rect.width + 20}px`
    newDiv.style.height = `${rect.height + 20}px`
    wordElement.appendChild(newDiv)
    const svgD3 = d3
      .select(newDiv)
      .append("svg")
      .attr("width", width)
      .attr("height", 20)
      .style("position", "absolute")
    if (sparkLinePosition === "up") {
      svgD3.style("top", "0").style("left", "0")
    } else {
      svgD3.style("bottom", "0").style("left", "0")
    }

    svgD3
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line)

    // const xAxis = d3.axisBottom(xScale).ticks(data.length).tickSize(-2)
    // const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(-2)

    // svgD3.append('g').call(xAxis).attr('transform', `translate(0, ${height})`)
    // svgD3.append('g').call(yAxis)
    svgD3
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", (d) => yScale(d))
      .attr("r", 1.5) // size of circle for "hit area"
      .style("opacity", (d, i) => {
        if (i === 0 || i === data.length - 1) {
          return 1 // 更大的半径
        }
        return 0 // 默认的半径大小
      })
      .style("fill", "steelblue")
  }
  // 左右放小图
  if (sparkLineElement) {
    while (sparkLineElement.firstChild) {
      sparkLineElement.removeChild(sparkLineElement.firstChild)
    }
    const svgD3 = d3
      .select(sparkLineElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
    svgD3
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line)

    // const xAxis = d3.axisBottom(xScale).ticks(data.length).tickSize(-2)
    // const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(-2)

    // svgD3.append('g').call(xAxis).attr('transform', `translate(0, ${height})`)
    // svgD3.append('g').call(yAxis)
    svgD3
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", (d) => yScale(d))
      .attr("r", 1.5) // size of circle for "hit area"
      .style("opacity", (d, i) => {
        if (i === 0 || i === data.length - 1) {
          return 1 // 更大的半径
        }
        return 0 // 默认的半径大小
      })
      .style("fill", "steelblue")
  }
}
export const renderTemporalityTrend2 = (
  data: number[],
  aspectRatio: string,
  sparkLinePosition: string,
  wordElement?: HTMLSpanElement,
  sparkLineElement?: HTMLSpanElement,
) => {
  let width
  let height
  const padding = 1.5
  // 1:1 2.75:1 4:1
  if (aspectRatio === "1:1") {
    width = 20
    height = 20
  } else if (aspectRatio === "2:1") {
    width = 50
    height = 20
  } else if (aspectRatio === "4:1") {
    width = 100
    height = 20
  } else if (aspectRatio === "4:3") {
    width = 27
    height = 20
  } else if (aspectRatio === "16:9") {
    width = 36
    height = 20
  } else {
    width = 100
    height = 20
  }
  if (wordElement) {
    const children = wordElement.querySelectorAll(":scope > .sparklines")
    children.forEach((child) => {
      wordElement.removeChild(child)
    })
  }

  const processedData = data.map((d, i) => ({ x: i, y: d }))
  const xScale = d3
    .scaleLinear()
    .domain([0, processedData.length])
    .range([padding, width - padding])
  const yScale = d3
    .scaleLinear()
    .domain([d3.min(data) || 0, d3.max(data) || 0])
    .range([height - padding, padding])
  const line = d3
    .line<number>()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d))

  // 上下放小图
  if (wordElement && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
    const rect = wordElement.getBoundingClientRect()
    const newDiv = document.createElement("span")
    newDiv.setAttribute("data-highlight-color-name", "red")
    newDiv.classList.add("sparklines")
    newDiv.style.position = "absolute"
    if (sparkLinePosition === "up") {
      newDiv.style.top = "-20px"
      newDiv.style.left = "0px"
    } else {
      newDiv.style.top = "0px"
      newDiv.style.left = "0px"
    }

    newDiv.style.width = `${rect.width + 20}px`
    newDiv.style.height = `${rect.height + 20}px`
    wordElement.appendChild(newDiv)
    const svgD3 = d3
      .select(newDiv)
      .append("svg")
      .attr("width", rect.width)
      .attr("height", 20)
      .style("position", "absolute")
    if (sparkLinePosition === "up") {
      svgD3.style("top", "0").style("left", "0")
    } else {
      svgD3.style("bottom", "0").style("left", "0")
    }
    svgD3
      .append("defs")
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "0%")
      .attr("y2", "0%")
      .selectAll("stop")
      .data([
        { offset: "0%", color: "blue", opacity: "0" },
        { offset: "100%", color: "blue", opacity: "0.3" },
      ])
      .enter()
      .append("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color)
      .attr("stop-opacity", (d) => d.opacity)
    const area = d3
      .area<{ x: number; y: number }>()
      .x((d) => xScale(d.x))
      .y0(height)
      .y1((d) => yScale(d.y))

    svgD3
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line)

    svgD3
      .append("path")
      .datum(processedData)
      .attr("class", "area")
      .style("fill", "url(#area-gradient)")
      .attr("d", area)
    // const xAxis = d3.axisBottom(xScale).ticks(data.length).tickSize(-2)
    // const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(-2)

    // svgD3.append('g').call(xAxis).attr('transform', `translate(0, ${height})`)
    // svgD3.append('g').call(yAxis)
    svgD3
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", (d) => yScale(d))
      .attr("r", 1.5) // size of circle for "hit area"
      .style("opacity", (d, i) => {
        if (i === 0 || i === data.length - 1) {
          return 1 // 更大的半径
        }
        return 0 // 默认的半径大小
      })
      .style("fill", "steelblue")
  }
  // 左右放小图
  if (sparkLineElement) {
    while (sparkLineElement.firstChild) {
      sparkLineElement.removeChild(sparkLineElement.firstChild)
    }
    const svgD3 = d3
      .select(sparkLineElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
    svgD3
      .append("defs")
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "0%")
      .attr("y2", "0%")
      .selectAll("stop")
      .data([
        { offset: "0%", color: "blue", opacity: "0" },
        { offset: "100%", color: "blue", opacity: "0.3" },
      ])
      .enter()
      .append("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color)
      .attr("stop-opacity", (d) => d.opacity)
    const area = d3
      .area<{ x: number; y: number }>()
      .x((d) => xScale(d.x))
      .y0(height)
      .y1((d) => yScale(d.y))

    svgD3
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line)

    svgD3
      .append("path")
      .datum(processedData)
      .attr("class", "area")
      .style("fill", "url(#area-gradient)")
      .attr("d", area)
    // const xAxis = d3.axisBottom(xScale).ticks(data.length).tickSize(-2)
    // const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(-2)

    // svgD3.append('g').call(xAxis).attr('transform', `translate(0, ${height})`)
    // svgD3.append('g').call(yAxis)
    svgD3
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", (d) => yScale(d))
      .attr("r", 1.5) // size of circle for "hit area"
      .style("opacity", (d, i) => {
        if (i === 0 || i === data.length - 1) {
          return 1 // 更大的半径
        }
        return 0 // 默认的半径大小
      })
      .style("fill", "steelblue")
  }
}
export const renderTemporalityDifference1 = (
  iniData: cateAndValue[],
  aspectRatio: string,
  sparkLinePosition: string,
  tagData: number[],
  wordElement?: HTMLSpanElement,
  sparkLineElement?: HTMLSpanElement,
) => {
  let width
  let height: number

  const padding = 1.5
  const data: number[] = tagData.map((year) => {
    const sum = iniData
      .filter((item) => item.year === year)
      .reduce((acc, item) => acc + item.value, 0)
    return sum
  })

  // console.log(
  //   "renderTemporalityDifference1renderTemporalityDifference1renderTemporalityDifference1renderTemporalityDifference1",
  //   data,
  // )
  // 1:1 2.75:1 4:1
  if (aspectRatio === "1:1") {
    width = 20
    height = 20
  } else if (aspectRatio === "2:1") {
    width = 50
    height = 20
  } else if (aspectRatio === "4:1") {
    width = 100
    height = 20
  } else if (aspectRatio === "4:3") {
    width = 27
    height = 20
  } else if (aspectRatio === "16:9") {
    width = 36
    height = 20
  } else {
    width = 100
    height = 20
  }
  const barWidth = (width - padding * 6) / data.length
  if (wordElement) {
    const children = wordElement.querySelectorAll(":scope > .sparklines")
    children.forEach((child) => {
      wordElement.removeChild(child)
    })
  }

  const xScale = d3
    .scaleLinear()
    .domain([0, data.length])
    .range([padding, width - padding])

  // 定义Y比例尺
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data) || 0])
    .range([height - padding, padding])

  // xScale.domain(data.map((d, i) => i))
  // 绘制线条
  // const line = d3
  //   .line<number>()
  //   .x((d, i) => xScale(i))
  //   .y(height / 2) // 固定在 SVG 中间的高度

  // 上下放小图
  if (wordElement && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
    const rect = wordElement.getBoundingClientRect()
    const newDiv = document.createElement("span")
    newDiv.setAttribute("data-highlight-color-name", "red")
    newDiv.classList.add("sparklines")
    newDiv.style.position = "absolute"
    if (sparkLinePosition === "up") {
      newDiv.style.top = "-20px"
      newDiv.style.left = "0px"
    } else {
      newDiv.style.top = "0px"
      newDiv.style.left = "0px"
    }

    newDiv.style.width = `${rect.width + 20}px`
    newDiv.style.height = `${rect.height + 20}px`
    wordElement.appendChild(newDiv)
    const svgD3 = d3
      .select(newDiv)
      .append("svg")
      .attr("width", rect.width)
      .attr("height", 20)
      .style("position", "absolute")
    if (sparkLinePosition === "up") {
      svgD3.style("top", "0").style("left", "0")
    } else {
      svgD3.style("bottom", "0").style("left", "0")
    }

    svgD3
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("class", "arrowHead")
      .attr("fill", "red")
    svgD3
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("width", barWidth)
      .attr("height", (d) => height - yScale(d))

    // 画趋势线
    const line = d3
      .line<number>()
      .x((d, i) => xScale(i) + barWidth / 2)
      .y((d) => yScale(d))

    svgD3
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("d", line)
      .attr("marker-end", "url(#arrow)") // 应用箭头
  }
  // 左右放小图
  if (sparkLineElement) {
    while (sparkLineElement.firstChild) {
      sparkLineElement.removeChild(sparkLineElement.firstChild)
    }
    const svgD3 = d3
      .select(sparkLineElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
    svgD3
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("class", "arrowHead")
      .attr("fill", "red")
    svgD3
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("width", barWidth)
      .attr("height", (d) => height - yScale(d))
      .attr("fill", "steelblue")

    // 画趋势线
    const line = d3
      .line<number>()
      .x((d, i) => xScale(i) + barWidth / 2)
      .y((d) => yScale(d))

    svgD3
      .append("path")
      .datum(data)
      .attr("fill", "red")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("d", line)
    // .attr("marker-end", "url(#arrow)") // 应用箭头
  }
}
export const renderTemporalityDifference2 = (
  iniData: cateAndValue[],
  aspectRatio: string,
  sparkLinePosition: string,
  tagData: number[],
  wordElement?: HTMLSpanElement,
  sparkLineElement?: HTMLSpanElement,
) => {
  let width
  let height
  const padding = 1.5
  const data: number[] = tagData.map((year) => {
    const sum = iniData
      .filter((item) => item.year === year)
      .reduce((acc, item) => acc + item.value, 0)
    return sum
  })
  // 1:1 2.75:1 4:1
  if (aspectRatio === "1:1") {
    width = 20
    height = 20
  } else if (aspectRatio === "2:1") {
    width = 50
    height = 20
  } else if (aspectRatio === "4:1") {
    width = 100
    height = 20
  } else if (aspectRatio === "4:3") {
    width = 27
    height = 20
  } else if (aspectRatio === "16:9") {
    width = 36
    height = 20
  } else {
    width = 100
    height = 20
  }
  if (wordElement) {
    const children = wordElement.querySelectorAll(":scope > .sparklines")
    children.forEach((child) => {
      wordElement.removeChild(child)
    })
  }

  const xScale = d3
    .scaleLinear()
    .domain([0, data.length])
    .range([padding, width - padding])
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data) || 0])
    .range([height - padding, padding])

  const line = d3
    .line<number>()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d))

  // 上下放小图
  if (wordElement && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
    const rect = wordElement.getBoundingClientRect()
    // console.log(rect)
    const newDiv = document.createElement("span")
    newDiv.setAttribute("data-highlight-color-name", "red")
    newDiv.classList.add("sparklines")
    newDiv.style.position = "absolute"
    if (sparkLinePosition === "up") {
      newDiv.style.top = "-20px"
      newDiv.style.left = "0px"
    } else {
      newDiv.style.top = "0px"
      newDiv.style.left = "0px"
    }

    newDiv.style.width = `${rect.width + 20}px`
    newDiv.style.height = `${rect.height + 20}px`
    wordElement.appendChild(newDiv)
    const svgD3 = d3
      .select(newDiv)
      .append("svg")
      .attr("width", rect.width)
      .attr("height", 20)
      .style("position", "absolute")
    if (sparkLinePosition === "up") {
      svgD3.style("top", "0").style("left", "0")
    } else {
      svgD3.style("bottom", "0").style("left", "0")
    }

    svgD3
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line)

    // const xAxis = d3.axisBottom(xScale).ticks(data.length).tickSize(-2)
    // const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(-2)

    // svgD3.append('g').call(xAxis).attr('transform', `translate(0, ${height})`)
    // svgD3.append('g').call(yAxis)
    svgD3
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", (d) => yScale(d))
      .attr("r", 1.5) // size of circle for "hit area"
      .style("opacity", (d, i) => {
        if (i === 0 || i === data.length - 1) {
          return 1 // 更大的半径
        }
        return 0 // 默认的半径大小
      })
      .style("fill", "steelblue")
  }
  // 左右放小图
  if (sparkLineElement) {
    while (sparkLineElement.firstChild) {
      sparkLineElement.removeChild(sparkLineElement.firstChild)
    }
    const svgD3 = d3
      .select(sparkLineElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
    svgD3
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line)

    // const xAxis = d3.axisBottom(xScale).ticks(data.length).tickSize(-2)
    // const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(-2)

    // svgD3.append('g').call(xAxis).attr('transform', `translate(0, ${height})`)
    // svgD3.append('g').call(yAxis)
    svgD3
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", (d) => yScale(d))
      .attr("r", 1.5) // size of circle for "hit area"
      .style("opacity", (d, i) => {
        if (i === 0 || i === data.length - 1) {
          return 1 // 更大的半径
        }
        return 0 // 默认的半径大小
      })
      .style("fill", "steelblue")
  }
}
export const renderTemporalityAnomaly1 = (
  iniData: cateAndValue[],
  aspectRatio: string,
  sparkLinePosition: string,
  wordElement?: HTMLSpanElement,
  sparkLineElement?: HTMLSpanElement,
) => {
  let width
  let height
  const padding = 1.5
  const data = iniData.map((item, index) => index)
  const tagData = iniData
    .map((item, index) => (item.category === "abnormal" ? index : -1))
    .filter((index) => index !== -1)
  // 1:1 2.75:1 4:1
  if (aspectRatio === "1:1") {
    width = 20
    height = 20
  } else if (aspectRatio === "2:1") {
    width = 50
    height = 20
  } else if (aspectRatio === "4:1") {
    width = 100
    height = 20
  } else if (aspectRatio === "4:3") {
    width = 27
    height = 20
  } else if (aspectRatio === "16:9") {
    width = 36
    height = 20
  } else {
    width = 100
    height = 20
  }
  if (wordElement) {
    const children = wordElement.querySelectorAll(":scope > .sparklines")
    children.forEach((child) => {
      wordElement.removeChild(child)
    })
  }
  const xScale = d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([padding, width - padding])

  // 绘制线条
  const line = d3
    .line<number>()
    .x((d, i) => xScale(i))
    .y(height / 2) // 固定在 SVG 中间的高度

  // 上下放小图
  if (wordElement && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
    const rect = wordElement.getBoundingClientRect()
    const newDiv = document.createElement("span")
    newDiv.setAttribute("data-highlight-color-name", "red")
    newDiv.classList.add("sparklines")
    newDiv.style.position = "absolute"
    if (sparkLinePosition === "up") {
      newDiv.style.top = "-20px"
      newDiv.style.left = "0px"
    } else {
      newDiv.style.top = "0px"
      newDiv.style.left = "0px"
    }

    newDiv.style.width = `${rect.width + 20}px`
    newDiv.style.height = `${rect.height + 20}px`
    wordElement.appendChild(newDiv)
    const svgD3 = d3
      .select(newDiv)
      .append("svg")
      .attr("width", rect.width)
      .attr("height", 20)
      .style("position", "absolute")
    if (sparkLinePosition === "up") {
      svgD3.style("top", "0").style("left", "0")
    } else {
      svgD3.style("bottom", "0").style("left", "0")
    }

    svgD3
      .append("path")
      .datum(data)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2)

    // 标记第3个和第5个点
    svgD3
      .selectAll(".marked-point")
      .data(data) // 选取第3个和第5个元素
      .enter()
      .append("circle")
      .attr("class", "marked-point")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", height / 2)
      .attr("r", 2)
      .attr("fill", "red")
      .attr("opacity", (d, i) => (tagData.includes(i) ? 1 : 0))
  }
  // 左右放小图
  if (sparkLineElement) {
    while (sparkLineElement.firstChild) {
      sparkLineElement.removeChild(sparkLineElement.firstChild)
    }
    const svgD3 = d3
      .select(sparkLineElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
    svgD3
      .append("path")
      .datum(data)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2)

    // 标记第3个和第5个点
    svgD3
      .selectAll(".marked-point")
      .data(data) // 选取第3个和第5个元素
      .enter()
      .append("circle")
      .attr("class", "marked-point")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", height / 2)
      .attr("r", 2)
      .attr("fill", "red")
      .attr("opacity", (d, i) => (tagData.includes(i) ? 1 : 0))
  }
}
export const renderTemporalityAnomaly2 = (
  iniData: cateAndValue[],
  aspectRatio: string,
  sparkLinePosition: string,
  wordElement?: HTMLSpanElement,
  sparkLineElement?: HTMLSpanElement,
) => {
  let width
  let height
  const padding = 1.5
  const data = iniData.map((item, index) => index)
  const tagData = iniData
    .map((item, index) => (item.category === "abnormal" ? index : -1))
    .filter((index) => index !== -1)
  // 1:1 2.75:1 4:1
  if (aspectRatio === "1:1") {
    width = 20
    height = 20
  } else if (aspectRatio === "2:1") {
    width = 50
    height = 20
  } else if (aspectRatio === "4:1") {
    width = 100
    height = 20
  } else if (aspectRatio === "4:3") {
    width = 27
    height = 20
  } else if (aspectRatio === "16:9") {
    width = 36
    height = 20
  } else {
    width = 100
    height = 20
  }
  if (wordElement) {
    const children = wordElement.querySelectorAll(":scope > .sparklines")
    children.forEach((child) => {
      wordElement.removeChild(child)
    })
  }

  const xScale = d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([padding, width - padding])

  // 绘制线条
  const line = d3
    .line<number>()
    .x((d, i) => xScale(i))
    .y(height / 2) // 固定在 SVG 中间的高度

  // 上下放小图
  if (wordElement && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
    const rect = wordElement.getBoundingClientRect()
    const newDiv = document.createElement("span")
    newDiv.setAttribute("data-highlight-color-name", "red")
    newDiv.classList.add("sparklines")
    newDiv.style.position = "absolute"
    if (sparkLinePosition === "up") {
      newDiv.style.top = "-20px"
      newDiv.style.left = "0px"
    } else {
      newDiv.style.top = "0px"
      newDiv.style.left = "0px"
    }

    newDiv.style.width = `${rect.width + 20}px`
    newDiv.style.height = `${rect.height + 20}px`
    wordElement.appendChild(newDiv)
    const svgD3 = d3
      .select(newDiv)
      .append("svg")
      .attr("width", rect.width)
      .attr("height", 20)
      .style("position", "absolute")
    if (sparkLinePosition === "up") {
      svgD3.style("top", "0").style("left", "0")
    } else {
      svgD3.style("bottom", "0").style("left", "0")
    }

    svgD3
      .append("path")
      .datum(data)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2)

    // 标记第3个和第5个点
    svgD3
      .selectAll("line.vertical")
      .data(data)
      .enter()
      .append("line")
      .attr("x1", (d, i) => xScale(i))
      .attr("y1", 0.2 * height)
      .attr("x2", (d, i) => xScale(i))
      .attr("y2", 0.8 * height)
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("opacity", (d, i) => (tagData.includes(i) ? 1 : 0))
  }
  // 左右放小图
  if (sparkLineElement) {
    while (sparkLineElement.firstChild) {
      sparkLineElement.removeChild(sparkLineElement.firstChild)
    }
    const svgD3 = d3
      .select(sparkLineElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
    svgD3
      .append("path")
      .datum(data)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2)

    // 标记第3个和第5个点
    svgD3
      .selectAll("line.vertical")
      .data(data)
      .enter()
      .append("line")
      .attr("x1", (d, i) => xScale(i))
      .attr("y1", 0.2 * height)
      .attr("x2", (d, i) => xScale(i))
      .attr("y2", 0.8 * height)
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("opacity", (d, i) => (tagData.includes(i) ? 1 : 0))
  }
}
export const renderTemporalitySeasonality1 = (
  iniData: cateAndValue[],
  iniTagData: cateAndValue[],
  aspectRatio: string,
  sparkLinePosition: string,
  wordElement?: HTMLSpanElement,
  sparkLineElement?: HTMLSpanElement,
) => {
  let width
  let height
  const padding = 1.5
  const data: number[] = iniData.map((item) => item.value)
  const tagData: number[] = iniTagData.map((item) => item.value)
  // 1:1 2.75:1 4:1
  if (aspectRatio === "1:1") {
    width = 20
    height = 20
  } else if (aspectRatio === "2:1") {
    width = 50
    height = 20
  } else if (aspectRatio === "4:1") {
    width = 100
    height = 20
  } else if (aspectRatio === "4:3") {
    width = 27
    height = 20
  } else if (aspectRatio === "16:9") {
    width = 36
    height = 20
  } else {
    width = 100
    height = 20
  }
  if (wordElement) {
    const children = wordElement.querySelectorAll(":scope > .sparklines")
    children.forEach((child) => {
      wordElement.removeChild(child)
    })
  }

  const xScale = d3
    .scaleLinear()
    .domain([0, data.length])
    .range([padding, width - padding])
  const yScale = d3
    .scaleLinear()
    .domain([d3.min(data) || 0, d3.max(data) || 0])
    .range([height - padding, padding])

  const line = d3
    .line<number>()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d))

  // 上下放小图
  if (wordElement && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
    const rect = wordElement.getBoundingClientRect()
    const newDiv = document.createElement("span")
    newDiv.setAttribute("data-highlight-color-name", "red")
    newDiv.classList.add("sparklines")
    newDiv.style.position = "absolute"
    if (sparkLinePosition === "up") {
      newDiv.style.top = "-20px"
      newDiv.style.left = "0px"
    } else {
      newDiv.style.top = "0px"
      newDiv.style.left = "0px"
    }

    newDiv.style.width = `${rect.width + 20}px`
    newDiv.style.height = `${rect.height + 20}px`
    wordElement.appendChild(newDiv)
    const svgD3 = d3
      .select(newDiv)
      .append("svg")
      .attr("width", width)
      .attr("height", 20)
      .style("position", "absolute")
    if (sparkLinePosition === "up") {
      svgD3.style("top", "0").style("left", "0")
    } else {
      svgD3.style("bottom", "0").style("left", "0")
    }

    svgD3
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line)

    // const xAxis = d3.axisBottom(xScale).ticks(data.length).tickSize(-2)
    // const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(-2)

    // svgD3.append('g').call(xAxis).attr('transform', `translate(0, ${height})`)
    // svgD3.append('g').call(yAxis)
    svgD3
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", (d) => yScale(d))
      .attr("r", 1.5) // size of circle for "hit area"
      .style("opacity", (d, i) => {
        if (i === 0 || i === data.length - 1) {
          return 1 // 更大的半径
        }
        return 0 // 默认的半径大小
      })
      .style("fill", "steelblue")
    for (let i = 0; i < tagData.length; i += 2) {
      svgD3
        .append("rect")
        .attr("x", xScale(tagData[i]))
        .attr("width", xScale(tagData[i + 1]) - xScale(tagData[i]))
        .attr("y", 0)
        .attr("height", height)
        .attr("fill", "#f7e3df")
        .attr("opacity", 0.8)
    }
  }
  // 左右放小图
  if (sparkLineElement) {
    while (sparkLineElement.firstChild) {
      sparkLineElement.removeChild(sparkLineElement.firstChild)
    }
    const svgD3 = d3
      .select(sparkLineElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
    svgD3
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line)

    // const xAxis = d3.axisBottom(xScale).ticks(data.length).tickSize(-2)
    // const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(-2)

    // svgD3.append('g').call(xAxis).attr('transform', `translate(0, ${height})`)
    // svgD3.append('g').call(yAxis)
    svgD3
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", (d) => yScale(d))
      .attr("r", 1.5) // size of circle for "hit area"
      .style("opacity", (d, i) => {
        if (i === 0 || i === data.length - 1) {
          return 1 // 更大的半径
        }
        return 0 // 默认的半径大小
      })
      .style("fill", "steelblue")
    for (let i = 0; i < tagData.length; i += 2) {
      svgD3
        .append("rect")
        .attr("x", xScale(tagData[i]))
        .attr("width", xScale(tagData[i + 1]) - xScale(tagData[i]))
        .attr("y", 0)
        .attr("height", height)
        .attr("fill", "#f7e3df")
        .attr("opacity", 0.8)
    }
  }
}

export const renderTemporalitySeasonality2 = (
  data: number[],
  aspectRatio: string,
  sparkLinePosition: string,
  tagData: number[],
  wordElement?: HTMLSpanElement,
  sparkLineElement?: HTMLSpanElement,
) => {
  let width
  let height
  const padding = 1.5
  // 1:1 2.75:1 4:1
  if (aspectRatio === "1:1") {
    width = 20
    height = 20
  } else if (aspectRatio === "2:1") {
    width = 50
    height = 20
  } else if (aspectRatio === "4:1") {
    width = 100
    height = 20
  } else if (aspectRatio === "4:3") {
    width = 27
    height = 20
  } else if (aspectRatio === "16:9") {
    width = 36
    height = 20
  } else {
    width = 100
    height = 20
  }
  if (wordElement) {
    const children = wordElement.querySelectorAll(":scope > .sparklines")
    children.forEach((child) => {
      wordElement.removeChild(child)
    })
  }

  const xScale = d3.scaleLinear().domain([1, data.length]).range([0, width])

  // 上下放小图
  if (wordElement && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
    const rect = wordElement.getBoundingClientRect()
    const newDiv = document.createElement("span")
    newDiv.setAttribute("data-highlight-color-name", "red")
    newDiv.classList.add("sparklines")
    newDiv.style.position = "absolute"
    if (sparkLinePosition === "up") {
      newDiv.style.top = "-20px"
      newDiv.style.left = "0px"
    } else {
      newDiv.style.top = "0px"
      newDiv.style.left = "0px"
    }

    newDiv.style.width = `${rect.width + 20}px`
    newDiv.style.height = `${rect.height + 20}px`
    wordElement.appendChild(newDiv)
    const svgD3 = d3
      .select(newDiv)
      .append("svg")
      .attr("width", width)
      .attr("height", 20)
      .style("position", "absolute")
    if (sparkLinePosition === "up") {
      svgD3.style("top", "0").style("left", "0")
    } else {
      svgD3.style("bottom", "0").style("left", "0")
    }

    // 画横线
    svgD3
      .append("line")
      .attr("x1", 0)
      .attr("y1", height / 2)
      .attr("x2", width)
      .attr("y2", height / 2)
      .attr("stroke", "black")
    const arcGenerator = d3
      .line()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(d3.curveBasis)
    for (let i = 0; i < tagData.length; i += 2) {
      const pointA = [xScale(tagData[i]), height / 2]
      const pointB: number[] = [xScale(tagData[i + 1]), height / 2]
      svgD3
        .append("circle")
        .attr("cx", pointA[0])
        .attr("cy", pointA[1])
        .attr("r", 2)
        .attr("fill", "red")
      svgD3
        .append("circle")
        .attr("cx", pointB[0])
        .attr("cy", pointB[1])
        .attr("r", 2)
        .attr("fill", "red")
      const points = [
        pointA,
        [(pointA[0] + pointB[0]) / 2, height / 4], // 控制点，决定弧线的高度
        pointB,
      ]
      // console.log(points)
      svgD3
        .append("path")
        .attr("d", arcGenerator(points as any)) // `as any` is used to bypass the strict type checking
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
    }
  }
  // 左右放小图
  if (sparkLineElement) {
    while (sparkLineElement.firstChild) {
      sparkLineElement.removeChild(sparkLineElement.firstChild)
    }
    const svgD3 = d3
      .select(sparkLineElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
    // 画横线
    svgD3
      .append("line")
      .attr("x1", 0)
      .attr("y1", height / 2)
      .attr("x2", width)
      .attr("y2", height / 2)
      .attr("stroke", "black")
    const arcGenerator = d3
      .line()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(d3.curveBasis)
    for (let i = 0; i < tagData.length; i += 2) {
      const pointA = [xScale(tagData[i]), height / 2]
      const pointB: number[] = [xScale(tagData[i + 1]), height / 2]
      svgD3
        .append("circle")
        .attr("cx", pointA[0])
        .attr("cy", pointA[1])
        .attr("r", 2)
        .attr("fill", "red")
      svgD3
        .append("circle")
        .attr("cx", pointB[0])
        .attr("cy", pointB[1])
        .attr("r", 2)
        .attr("fill", "red")
      const points = [
        pointA,
        [(pointA[0] + pointB[0]) / 2, height / 4], // 控制点，决定弧线的高度
        pointB,
      ]
      svgD3
        .append("path")
        .attr("d", arcGenerator(points as any)) // `as any` is used to bypass the strict type checking
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
    }
  }
}
