import React from 'react'
import { Chart } from '@antv/g2'
import { cateAndValue } from '../types'

// interface PieChartData {
//   type: string
//   value: number
// }

interface PieChartProps {
  data: cateAndValue[] // n个{category:,value:}画饼图
}

const Proportion: React.FC<PieChartProps> = ({ data }) => {
  const containerRef = React.useRef(null)
  console.log('BigChartDataBigChartDataBigChartDataBigChartData', data)

  React.useEffect(() => {
    if (!containerRef.current) return

    const chart = new Chart({
      container: containerRef.current,
      autoFit: true,
      height: 400,
      width: 600,
    })
    chart.coordinate({ type: 'theta' })
    chart
      .interval()
      .transform({ type: 'stackY' })
      .data(data)
      .encode('y', 'value')
      .encode('color', 'category')
      .style('stroke', 'white')
      .scale('color', {
        palette: 'spectral',
        offset: (t) => t * 0.8 + 0.1,
      })
      .label({
        text: 'name',
        radius: 0.8,
        fontSize: 10,
        fontWeight: 'bold',
      })
      .label({
        text: (d: cateAndValue, i: number, curData: cateAndValue[]) =>
          i < data.length - 3 ? d.value : '',
        radius: 0.8,
        fontSize: 9,
        dy: 12,
      })
      .animate('enter', { type: 'waveIn' })
      .legend(false)

    chart.render()

    // chart.data(indexAndValue)
    // chart.scale('value', {
    //   nice: true,
    // })

    // chart.coordinate('theta', {
    //   radius: 0.8,
    //   innerRadius: 0.6,
    // })

    // chart
    //   .interval()
    //   .encode('y', 'value')
    //   .encode('color', 'type')
    //   .label({
    //     text: 'name',
    //     radius: 0.8,
    //     fontSize: 10,
    //     fontWeight: 'bold',
    //   })
    //   .label({
    //     text: (d: PieChartData, i: number, curData: PieChartData[]) =>
    //       i < curData.length - 3 ? d.value : '',
    //     radius: 0.8,
    //     fontSize: 9,
    //     dy: 12,
    //   })

    // chart.render()

    return () => {
      chart.destroy()
    }
  }, [data])

  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
}

export default Proportion
