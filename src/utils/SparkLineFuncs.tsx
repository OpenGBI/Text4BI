import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

export const renderLineChart = (
  svg: SVGSVGElement,
  data: number[],
  tooltip: HTMLDivElement,
  aspectRatio: string,
) => {
  let width
  let height
  if (aspectRatio === 'tiny') {
    width = 20
    height = 20
  } else if (aspectRatio === 'medium') {
    width = 27
    height = 20
  } else if (aspectRatio === 'big') {
    width = 100
    height = 20
  } else {
    width = 100
    height = 20
  }

  const svgD3 = d3.select(svg)
  svgD3.selectAll('*').remove()

  const xScale = d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([0, width])
  const yScale = d3
    .scaleLinear()
    .domain([d3.min(data) || 0, d3.max(data) || 0])
    .range([height, 0])

  const line = d3
    .line<number>()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d))

  // const xAxis = d3.axisBottom(xScale).ticks(data.length).tickSize(-2);
  // const yAxis = d3.axisLeft(yScale).ticks(3).tickSize(-2);

  svgD3
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1)
    .attr('d', line)

  const xAxis = d3.axisBottom(xScale).ticks(data.length).tickSize(-2)
  const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(-2)

  svgD3.append('g').call(xAxis).attr('transform', `translate(0, ${height})`)
  svgD3.append('g').call(yAxis)
  svgD3
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d, i) => xScale(i))
    .attr('cy', (d) => yScale(d))
    .attr('r', 5) // size of circle for "hit area"
    .style('opacity', 0) // make it invisible
    .on('mouseover', (event, d) => {
      d3.select(tooltip)
        .style('left', `${event.pageX + 5}px`)
        .style('top', `${event.pageY - 28}px`)
        .style('display', 'inline-block')
        .html(`Value: ${d}`)
    })
    .on('mouseout', () => {
      d3.select(tooltip).style('display', 'none')
    })
}

export const renderBarChart = (svg: SVGSVGElement, data: number[], tooltip: HTMLDivElement) => {
  const width = 100 // 修改了这个宽度值以适应柱状图的表现
  const height = 20
  const barWidth = width / data.length

  const xScale = d3.scaleLinear().domain([0, data.length]).range([0, width])
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data) || 0])
    .range([height, 0])

  const svgD3 = d3.select(svg).attr('width', width).attr('height', height)

  svgD3
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => xScale(i))
    .attr('y', (d) => yScale(d))
    .attr('width', barWidth - 5) // 5 is for padding between bars
    .attr('height', (d) => height - yScale(d))
    .attr('fill', 'steelblue')
    .on('mouseover', (event, d) => {
      d3.select(tooltip)
        .style('left', `${event.pageX + 5}px`)
        .style('top', `${event.pageY - 28}px`)
        .style('display', 'inline-block')
        .html(`Value: ${d}`)
    })
    .on('mouseout', () => {
      d3.select(tooltip).style('display', 'none')
    })

  const xAxis = d3.axisBottom(xScale).ticks(data.length).tickSize(-2)
  const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(-2)

  svgD3.append('g').call(xAxis).attr('transform', `translate(0, ${height})`)
  svgD3.append('g').call(yAxis)
}

export const renderPieChart = (svg: SVGSVGElement, data: number[], tooltip: HTMLDivElement) => {
  const width = 20
  const height = 20 // Assuming you want the pie chart to be square
  const radius = Math.min(width, height) / 2

  const pie = d3.pie<number>().sort(null)
  const arc = d3.arc<d3.PieArcDatum<number>>().innerRadius(0).outerRadius(radius)

  const color = d3.scaleOrdinal(d3.schemeCategory10) // A default color scale

  const svgD3 = d3
    .select(svg)
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`) // Center the pie chart

  const pieData = pie(data)

  svgD3
    .selectAll('path')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', arc) // Cast required due to typings mismatch
    .attr('fill', (d, i) => color(i.toString()))
    .on('mouseover', (event, d) => {
      const percentage = ((d.data / d3.sum(data)!) * 100).toFixed(2)
      d3.select(tooltip)
        .style('left', `${event.pageX + 5}px`)
        .style('top', `${event.pageY - 28}px`)
        .style('display', 'inline-block')
        .html(`Value: ${d.data} (${percentage}%)`)
    })
    .on('mouseout', () => {
      d3.select(tooltip).style('display', 'none')
    })
}

export const renderLineChartDown = (
  data: number[],
  tooltip: HTMLDivElement,
  aspectRatio: string,
  targetElement: HTMLSpanElement,
) => {
  let width
  let height
  if (aspectRatio === 'tiny') {
    width = 100
    height = 20
  } else if (aspectRatio === 'medium') {
    width = 100
    height = 20
  } else if (aspectRatio === 'big') {
    width = 100
    height = 20
  } else {
    width = 100
    height = 20
  }

  // const svgD3 = d3.select(svg)
  // svgD3.selectAll('*').remove()

  const xScale = d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([0, width])
  const yScale = d3
    .scaleLinear()
    .domain([d3.min(data) || 0, d3.max(data) || 0])
    .range([height, 0])

  const line = d3
    .line<number>()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d))

  // const xAxis = d3.axisBottom(xScale).ticks(data.length).tickSize(-2);
  // const yAxis = d3.axisLeft(yScale).ticks(3).tickSize(-2);

  const rect = targetElement.getBoundingClientRect()
  console.log(rect)
  const newDiv = document.createElement('span')
  newDiv.setAttribute('data-highlight-color-name', 'red')
  newDiv.classList.add('MEKAs', 'rk4bK', 'PjYjK')
  newDiv.style.position = 'absolute'
  newDiv.style.top = '-20px'
  newDiv.style.left = '-20px'
  newDiv.style.width = `${rect.width + 20}px`
  newDiv.style.height = `${rect.height + 20}px`
  targetElement.appendChild(newDiv)
  // 创建SVG元素
  const svgD3 = d3
    .select(newDiv)
    .append('svg')
    .attr('width', rect.width)
    .attr('height', 20)
    .style('position', 'absolute')
    .style('top', '0')
    .style('left', '0')

  svgD3
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1)
    .attr('d', line)

  const xAxis = d3.axisBottom(xScale).ticks(data.length).tickSize(-2)
  const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(-2)

  svgD3.append('g').call(xAxis).attr('transform', `translate(0, ${height})`)
  svgD3.append('g').call(yAxis)
  svgD3
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d, i) => xScale(i))
    .attr('cy', (d) => yScale(d))
    .attr('r', 5) // size of circle for "hit area"
    .style('opacity', 0) // make it invisible
    .on('mouseover', (event, d) => {
      d3.select(tooltip)
        .style('left', `${event.pageX + 5}px`)
        .style('top', `${event.pageY - 28}px`)
        .style('display', 'inline-block')
        .html(`Value: ${d}`)
    })
    .on('mouseout', () => {
      d3.select(tooltip).style('display', 'none')
    })
}
