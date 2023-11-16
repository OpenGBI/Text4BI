import React from 'react'
import { Chart } from '@antv/g2'
import { cateAndValue } from '../types'

interface TemporalTrendProps {
  data: cateAndValue[]
  tagData: cateAndValue[]
}

const TemporalTrend: React.FC<TemporalTrendProps> = ({ data, tagData }) => {
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    if (!containerRef.current) return

    // const plotData = data.map((value, index) => ({
    //   date: index + 1,
    //   value,
    // }))

    const chart = new Chart({
      container: containerRef.current,
      autoFit: true,
      height: 400,
      width: 600,
    })

    // chart.data(data).axis('y', { title: false }).scale('x', { type: 'linear', tickCount: 10 })
    console.log(data)
    const realValue = data.filter((item) => item.category === 'value')
    const predictValue = data.filter((item) => item.category === 'predict')
    // const realtag = tagData.filter((item) => item.category === 'value')
    // const predictTag = tagData.filter((item) => item.category === 'predict')

    chart
      .line()
      .data(realValue)
      .encode('x', (d: cateAndValue) => new Date(d.date).getDate())
      .encode('y', 'value')
      .encode('color', '#5a85c4')
      .encode('shape', 'smooth')
      .style('lineWidth', 3)
    chart
      .line()
      .data(predictValue)
      .encode('x', (d: cateAndValue) => new Date(d.date).getDate())
      .encode('y', 'value')
      .encode('color', '#5a85c4')
      .encode('shape', 'smooth')
      .style('lineWidth', 3)
      .style('opacity', 0.5)
      .style('lineDash', [3, 3])

    chart
      .line()
      .data(tagData)
      .encode('x', (d: cateAndValue) => new Date(d.date).getDate())
      .encode('y', 'predict')
      .encode('color', 'gray')
      .style('lineDash', [3, 3])

    chart.render()

    return () => {
      chart.destroy()
    }
  }, [data])

  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
}

export default TemporalTrend
