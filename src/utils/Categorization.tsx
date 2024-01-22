import React from "react"
import { Chart } from "@antv/g2"
import { find } from "lodash"
import { cateAndValue } from "../types"

interface BarChartProps {
  data: cateAndValue[] // n个{category:,value:}画柱状图
  handleCurBigChart: (ref: Chart | null) => void
  message: string | number | undefined
  hoverOrNot: boolean | undefined
}

const Categorization: React.FC<BarChartProps> = ({
  data,
  handleCurBigChart,
  message,
  hoverOrNot,
}) => {
  const containerRef = React.useRef<Chart | null>(null)
  const CategorizationRef = React.useRef(null)
  const [testState, setTestState] = React.useState(0)
  const interactiveRef = React.useRef<Chart | null>(null)
  console.log("CategorizationData!!!!!!!!!!!", data)
  React.useEffect(() => {
    // const plotData = data.map((value, index) => ({
    //   category: index + 1,
    //   value,
    // }))

    if (!CategorizationRef.current) {
      return
    }
    const chart = new Chart({
      container: CategorizationRef.current,
      autoFit: true,
      height: 400,
      width: 600,
    })
    chart.coordinate({ transform: [{ type: "transpose" }] })
    chart.data(data)
    // console.log('CategorizationCategorizationCategorization', data)

    chart
      .interval()

      .encode("x", "category")
      .encode("y", "value")
      .state("active", { fill: "#4B91FF" })
      .state("inactive", { opacity: 0.5 })
    chart.interaction("elementHighlight", true)
    // containerRef.current = chart
    // if (!containerRef.current) return
    // handleCurBigChart(containerRef.current)
    interactiveRef.current = chart
    chart.render()

    // const timer = setTimeout(() => {
    //   setTestState(4)
    // }, 5000) // 2000毫秒后更新testState

    return () => {
      chart.destroy()
      // clearTimeout(timer)
    }
  }, [data])
  React.useEffect(() => {
    if (!interactiveRef.current) {
      return
    }

    if (message === undefined) {
      return
    }
    // const highlightData = data.filter((item) => item.category === message).[0]
    // const highlightData = data?.filter((item) => item.category === message)?.[0]
    // ?.是猜疑链 data?.filter是指，如果data是null或undefined，就不调用filter，而是直接返回undefined，
    // 同理，X?.[0]是指如果X为null或undefined，就不取第一个元素，?.是一个语法糖 zyx

    // let highlightData = find(data, ["category", message])
    const isString = (value: any) => typeof value === "string" || value instanceof String

    const highlightData = find(data, (item: cateAndValue) => {
      if (isString(message)) {
        return item.category === message
      }

      const fixedItemValue = item.value.toFixed(2)
      const fixedMessage = (message as number).toFixed(2)
      return fixedItemValue === fixedMessage
    })

    // if (!highlightData) {
    //   highlightData = find(data, (item) => {
    //     if (item.value !== undefined) {
    //       const formattedValue = item.value.toFixed(2)

    //       // 然后，将数字转换为字符串
    //       const valueStr = formattedValue.toString()

    //       // 根据message长度截取字符串
    //       const valueSubstring = valueStr.substring(0, message.length)

    //       // 检查截取后的字符串是否与message相等
    //       return valueSubstring === message
    //     }
    //     // 如果item没有value属性，则返回false
    //     return false
    //   })
    // }
    console.log("Categorizationdatadatadatadata1", data)
    console.log("Categorizationdatadatadatadata2", highlightData)
    if (highlightData) {
      // data?.filter((item) => item.category === message)?.[0]
      interactiveRef.current?.emit("element:highlight", {
        data: { data: highlightData },
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
  return <div ref={CategorizationRef} style={{ height: 400, width: 600 }} />
}

export default Categorization
