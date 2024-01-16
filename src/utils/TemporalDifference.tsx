import React from "react"
import { Chart } from "@antv/g2"
import { cateAndValue } from "../types"

interface DifferenceProps {
  iniData: cateAndValue[] // n个{category:,value:}画箱线图
}

const Difference: React.FC<DifferenceProps> = ({ iniData }) => {
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    if (!containerRef.current) return

    // const plotData = data.map((value, index) => ({
    //   category: index + 1,
    //   value,
    // }))
    const data = iniData.map((item) => {
      const month = new Date(item.date).getMonth() + 1
      item.month = month
      return item
    })

    const chart = new Chart({
      container: containerRef.current,
      autoFit: true,
      height: 400,
      width: 600,
    })
    chart
      .data(data)
      .encode("x", "month")
      .encode("y", "value")
      .encode("color", "year")
      .scale("x", {
        range: [0, 1],
      })
      .scale("y", {
        nice: true,
      })
      .scale("color", {
        type: "ordinal",
        range: ["#7593ed", "#95e3b0", "#6c7893", "#e7c450", "#7460eb"],
      })

    chart.line().encode("shape", "smooth")

    chart.point().encode("shape", "point").tooltip(false)

    chart.render()

    return () => {
      chart.destroy()
    }
  }, [iniData])

  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
}

export default Difference
