import React from 'react'
import { Chart } from '@antv/g2'

interface BarChartProps {
  data: number[]
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    if (!containerRef.current) return

    const plotData = data.map((value, index) => ({
      category: index + 1,
      value,
    }))

    const chart = new Chart({
      container: containerRef.current,
      autoFit: true,
      height: 400,
      width: 600,
    })

    chart.data(plotData)

    chart.interval().encode('x', 'category').encode('y', 'value')

    chart.render()

    return () => {
      chart.destroy()
    }
  }, [data])

  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
}

export default BarChart
