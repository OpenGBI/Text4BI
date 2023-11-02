import React from 'react'
import { Chart } from '@antv/g2'

interface LineChartProps {
  data: number[]
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    if (!containerRef.current) return

    const plotData = data.map((value, index) => ({
      date: index + 1,
      value,
    }))

    const chart = new Chart({
      container: containerRef.current,
      autoFit: true,
      height: 400,
    })

    chart.data(plotData)
    chart.scale({
      date: {
        min: 1,
        max: data.length,
      },
      value: {
        nice: true,
      },
    })

    chart.axis('date', {
      title: null,
    })

    chart.axis('value', {
      title: null,
    })

    chart.line().encode('x', 'date').encode('y', 'value')
    // line.shape('smooth')
    chart.encode('shape', 'smooth')

    chart.render()

    return () => {
      chart.destroy()
    }
  }, [data])

  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
}

export default LineChart
