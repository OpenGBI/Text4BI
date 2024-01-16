import React from "react"
import { Chart } from "@antv/g2"
import { cateAndValue } from "../types"

interface DistributionProps {
  data: cateAndValue[] // n个{category:,value:}画箱线图
}

const Distribution: React.FC<DistributionProps> = ({ data }) => {
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    if (!containerRef.current) return

    // const plotData = data.map((value, index) => ({
    //   category: index + 1,
    //   value,
    // }))

    const chart = new Chart({
      container: containerRef.current,
      autoFit: true,
      height: 400,
      width: 600,
    })
    chart.coordinate({ transform: [{ type: "transpose" }] })
    // chart.coordinate({ transform: [{ type: 'transpose' }] })
    // chart.boxplot().data(data)
    // console.log('DistributionDistributionDistributionDistributionDistribution', data)

    // chart
    //   //   .interval()
    //   .encode('x', 'category')
    //   .encode('y', 'value')
    //   .encode('color', 'sex')
    //   .encode('series', 'sex')
    chart
      .boxplot()
      .data(data)
      .encode("x", "category")
      .encode("y", "value")
      .encode("color", "category")
      .encode("series", "category")
    chart.render()

    return () => {
      chart.destroy()
    }
  }, [data])

  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
}

export default Distribution
