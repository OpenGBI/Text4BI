import React from "react"
import { Chart, ELEMENT_CLASS_NAME, COMPONENT_CLASS_NAME } from "@antv/g2"
import { cateAndValue } from "../types"

interface DistributionProps {
  data: cateAndValue[] // n个{category:,value:}画箱线图
  message: string | number | undefined
  hoverOrNot: boolean | undefined
  interactionType?: string
}

const Distribution: React.FC<DistributionProps> = ({
  data,
  message,
  hoverOrNot,
  interactionType,
}) => {
  const containerRef = React.useRef(null)
  const interactiveRef = React.useRef<Chart | null>(null)
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
    if (!message === undefined || !interactionType) return
    if (interactionType === "distribution outliers") {
      const { canvas } = interactiveRef.current.getContext()
      if (!canvas) return
      const elements = canvas.document.getElementsByClassName(ELEMENT_CLASS_NAME)
      console.log(elements)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const points = _.filter(elements, (element) => element.markType === "point")
      points.forEach((point) => {
        console.log(point)
        point.style.opacity = 0.2
      })
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
      interactiveRef.current?.emit("element:unhighlight", {})
    }
  }, [hoverOrNot])

  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
}
Distribution.defaultProps = {
  interactionType: "defaultType", // 为 interactionType 设置默认值
}
export default Distribution
