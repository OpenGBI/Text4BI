import React from "react"
import { Chart, ELEMENT_CLASS_NAME, COMPONENT_CLASS_NAME } from "@antv/g2"
import { cateAndValue } from "../types"
import { highlightAxis, noHighlightElement } from "./HighLightElement"

interface TemporalAnomalyProps {
  data: cateAndValue[] // n个AAAA
  tagData: number[] // 长度为n的下脚标列表，表明第几个点是异常的需要加红点（从0开始计数）。
  message: string | number | undefined
  hoverOrNot: boolean | undefined
  interactionType?: string
}
// AAAA = {
//   category:数据类别，这n个可以一样
//   min:这个时间点的最小值
//   max:这个时间点的最大值
//   predict:这个时间点的正常值的预测值
//   value:这个时间点的真实值（设计稿的蓝线）
// }

const TemporalAnomaly: React.FC<TemporalAnomalyProps> = ({
  data,
  tagData,
  message,
  hoverOrNot,
  interactionType,
}) => {
  const containerRef = React.useRef(null)
  const interactiveRef = React.useRef<Chart | null>(null)

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
      .encode("x", "date")
      .encode("y", ["min", "max"])
      .encode("shape", "smooth")
      .style("stroke", "#f8d6b8")
      // .style('lineWidth', 0)
      .style("fillOpacity", 0.65)
      .style("fill", "#fef5ea")
      .style("lineWidth", 1)

    chart
      .point()
      .encode("x", "date")
      .encode("y", "value")
      .encode("size", 2)
      .encode("shape", "point")
      .tooltip("value")
      .style("fill", "red")
      .style("fillOpacity", (datum: cateAndValue, i: number) =>
        datum.category === "abnormal" ? 1 : 0,
      )

    chart
      .line()
      .encode("x", "date")
      .encode("y", "value")
      .encode("color", "#5a85c4")
      .encode("shape", "smooth")

    chart
      .line()
      .encode("x", "date")
      .encode("y", "predict")
      .encode("color", "#f2a15d")
      .encode("shape", "smooth")
    interactiveRef.current = chart

    chart.render()

    return () => {
      chart.destroy()
    }
  }, [data])
  React.useEffect(() => {
    if (!interactiveRef.current) {
      return
    }

    if (message === undefined) {
      return
    }
    if (interactionType === "ByIndex") {
      const lineY = data[message as number].value
      const lineX = data[message as number].date
      if (lineX && lineY) {
        // console.log(interactiveRef.current)
        for (let i = interactiveRef.current.children.length - 1; i > 3; i -= 1) {
          interactiveRef.current.children[i].remove()
        }
        // interactiveRef.current.render()
        interactiveRef.current.line().encode("x", "date").encode("y", lineY)
        interactiveRef.current.line().encode("x", lineX).encode("y", "value")
        interactiveRef.current.render()
      }
    }

    if (interactionType === "ByValue") {
      const lineY = message
      const lineX = data.find(
        (item) =>
          Number(Number(item.min).toFixed(2)) === message ||
          Number(Number(item.max).toFixed(2)) === message ||
          Number(Number(item.predict).toFixed(2)) === message ||
          Number(Number(item.value).toFixed(2)) === message,
      )?.date
      if (lineX && lineY) {
        // console.log(interactiveRef.current)
        for (let i = interactiveRef.current.children.length - 1; i > 3; i -= 1) {
          interactiveRef.current.children[i].remove()
        }
        // interactiveRef.current.render()
        interactiveRef.current.line().encode("x", "date").encode("y", lineY)
        interactiveRef.current.line().encode("x", lineX).encode("y", "value")
        interactiveRef.current.render()
      }
    }
    if (interactionType === "x-axis" || interactionType === "y-axis") {
      highlightAxis(interactiveRef.current, interactionType)
    }
  }, [message])
  React.useEffect(() => {
    if (!interactiveRef.current) {
      return
    }
    if (hoverOrNot === undefined) {
      return
    }
    if (!hoverOrNot) {
      noHighlightElement(interactiveRef.current)
      const { canvas } = interactiveRef.current.getContext()
      if (!canvas) return
      const elements = canvas.document.getElementsByClassName(ELEMENT_CLASS_NAME)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const lines = _.filter(elements, (element) => element.markType === "line")
      for (let i = lines.length - 1; i > 1; i -= 1) {
        lines[i].remove()
      }
    }
  }, [hoverOrNot])
  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
}
TemporalAnomaly.defaultProps = {
  interactionType: "",
}
export default TemporalAnomaly
