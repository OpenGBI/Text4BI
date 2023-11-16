import React from 'react'
import { Chart } from '@antv/g2'
import { cateAndValue } from '../types'

interface TemporalAnomalyProps {
  data: cateAndValue[]
  tagData: number[]
}

const TemporalAnomaly: React.FC<TemporalAnomalyProps> = ({ data, tagData }) => {
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

    chart.data(data).axis('y', { title: false }).scale('x', { type: 'linear', tickCount: 10 })
    chart
      .area()
      .encode('x', (d: cateAndValue) => {
        console.log(d)
        return new Date(d.date).getDate()
      })
      .encode('y', ['min', 'max'])
      .encode('shape', 'smooth')
      .style('stroke', '#f8d6b8')
      // .style('lineWidth', 0)
      .style('fillOpacity', 0.65)
      .style('fill', '#fef5ea')
      .style('lineWidth', 1)

    chart
      .point()
      .encode('x', (d: cateAndValue) => {
        console.log(d)
        return new Date(d.date).getDate()
      })
      .encode('y', 'value')
      .encode('size', 2)
      .encode('shape', 'point')
      .tooltip('value')
      .style('fill', 'red')
      .style('fillOpacity', (datum: cateAndValue, i: number) => (tagData.includes(i) ? 1 : 0))

    // chart
    // .point()
    // .position('id*value')
    // .shape('circle')
    // .style({
    //   fill: (datum) => {
    //     return [3, 4, 7, 8].includes(datum.id) ? 'red' : '#1890ff';
    //   },
    // });

    chart
      .line()
      .encode('x', (d: cateAndValue) => {
        console.log(d)
        return new Date(d.date).getDate()
      })
      .encode('y', 'value')
      .encode('color', '#5a85c4')
      .encode('shape', 'smooth')

    chart
      .line()
      .encode('x', (d: cateAndValue) => {
        console.log(d)
        return new Date(d.date).getDate()
      })
      .encode('y', 'predict')
      .encode('color', '#f2a15d')
      .encode('shape', 'smooth')

    chart.render()

    return () => {
      chart.destroy()
    }
  }, [data])

  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
}

export default TemporalAnomaly
