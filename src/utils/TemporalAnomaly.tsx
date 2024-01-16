import React from "react"
import { Chart } from "@antv/g2"
import { cateAndValue } from "../types"

interface TemporalAnomalyProps {
  data: cateAndValue[] // n个AAAA
  tagData: number[] // 长度为n的下脚标列表，表明第几个点是异常的需要加红点（从0开始计数）。
}
// AAAA = {
//   category:数据类别，这n个可以一样
//   min:这个时间点的最小值
//   max:这个时间点的最大值
//   predict:这个时间点的正常值的预测值
//   value:这个时间点的真实值（设计稿的蓝线）
// }

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

    chart.data(data)
    // .axis("y", { title: false }).scale("x", { type: "linear", tickCount: 10 })
    chart
      .area()
      .encode(
        "x",
        (d: cateAndValue) =>
          `${new Date(d.date).getFullYear()}-${new Date(d.date).getMonth()}${1}-${new Date(
            d.date,
          ).getDate()}`,
      )
      .encode("y", ["min", "max"])
      .encode("shape", "smooth")
      .style("stroke", "#f8d6b8")
      // .style('lineWidth', 0)
      .style("fillOpacity", 0.65)
      .style("fill", "#fef5ea")
      .style("lineWidth", 1)

    chart
      .point()
      .encode(
        "x",
        (d: cateAndValue) =>
          `${new Date(d.date).getFullYear()}-${new Date(d.date).getMonth()}${1}-${new Date(
            d.date,
          ).getDate()}`,
      )
      .encode("y", "value")
      .encode("size", 2)
      .encode("shape", "point")
      .tooltip("value")
      .style("fill", "red")
      .style("fillOpacity", (datum: cateAndValue, i: number) =>
        datum.category === "abnormal" ? 1 : 0,
      )

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
      .encode(
        "x",
        (d: cateAndValue) =>
          `${new Date(d.date).getFullYear()}-${new Date(d.date).getMonth()}${1}-${new Date(
            d.date,
          ).getDate()}`,
      )
      .encode("y", "value")
      .encode("color", "#5a85c4")
      .encode("shape", "smooth")

    chart
      .line()
      .encode(
        "x",
        (d: cateAndValue) =>
          `${new Date(d.date).getFullYear()}-${new Date(d.date).getMonth()}${1}-${new Date(
            d.date,
          ).getDate()}`,
      )
      .encode("y", "predict")
      .encode("color", "#f2a15d")
      .encode("shape", "smooth")

    chart.render()

    return () => {
      chart.destroy()
    }
  }, [data])

  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
}

export default TemporalAnomaly
