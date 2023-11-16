import React from 'react'
import { Chart } from '@antv/g2'
import { cateAndValue } from '../types'

interface TemporalPeriodicityProps {
  data: cateAndValue[]
}

const TemporalPeriodicity: React.FC<TemporalPeriodicityProps> = ({ data }) => {
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

    chart.data(data)
    // chart.scale({
    //   date: {
    //     min: 1,
    //     max: data.length,
    //   },
    //   value: {
    //     nice: true,
    //   },
    // })

    // chart.axis('date', {
    //   title: null,
    // })

    // chart.axis('value', {
    //   title: null,
    // })

    // chart.line().encode('x', 'category').encode('y', 'value')
    // // line.shape('smooth')
    // chart.encode('shape', 'smooth')
    chart
      .line()
      .encode('x', (d: cateAndValue) => {
        console.log(d)
        return `${new Date(d.date).getFullYear()}-${new Date(d.date).getMonth()}${1}-${new Date(
          d.date,
        ).getDate()}`
      })
      .encode('y', 'value')
      .encode('color', 'category')
      .label({
        text: 'value',
        transform: [{ type: 'overlapDodgeY' }],
        fontSize: 10,
      })
      .tooltip({ channel: 'y', valueFormatter: '.1f' })

    chart.render()

    return () => {
      chart.destroy()
    }
  }, [data])

  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
}

export default TemporalPeriodicity
