// import React, { useEffect, useRef } from "react"
// import { Chart } from "@antv/g2"

// const Container = () => {
//   const focusContainerRef = useRef(null)
//   const contextContainerRef = useRef(null)
//   const barContainerRef = useRef(null)
//   const contextRef = useRef<Chart | null>(null)
//   useEffect(() => {
//     // 确保 DOM 元素已挂载
//     if (!focusContainerRef.current || !contextContainerRef.current || !barContainerRef.current) {
//       return
//     }

//     // 渲染 focus 视图
//     const focus = new Chart({
//       container: focusContainerRef.current,
//       height: 360,
//       paddingLeft: 50,
//     })
//     focus
//       .area()
//       .data({
//         type: "fetch",
//         value: "https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv",
//       })
//       .encode("x", "date")
//       .encode("y", "close")
//       .animate(false)
//       .axis("x", { grid: false, title: false, tickCount: 5 })
//       .axis("y", { grid: false, tickCount: 5 })
//       .interaction("tooltip", false)
//       .interaction("brushXFilter", true)

//     // focus.render()

//     focus.render()

//     // 渲染 context 视图
//     const context = new Chart({
//       container: contextContainerRef.current,
//       paddingLeft: 50,
//       paddingTop: 0,
//       paddingBottom: 0,
//       height: 60,
//     })
//     context
//       .area()
//       .data({
//         type: "fetch",
//         value: "https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv",
//       })
//       .encode("x", "date")
//       .encode("y", "close")
//       .animate(false)
//       .axis(false)
//       .interaction("tooltip", false)
//       .interaction("brushXHighlight", { series: true })

//     context.render()
//     contextRef.current = context // context是useEffect这个hook的内部变量，外部不可见，所以必须用contextRef让整个组件可见
//     // 渲染 bar 视图
//     const bar = new Chart({
//       container: barContainerRef.current,
//       paddingLeft: 50,
//       paddingTop: 0,
//       paddingBottom: 0,
//       height: 60,
//     })
//     bar
//       .interval()
//       .data([
//         { genre: "Sports", sold: 275 },
//         { genre: "Strategy", sold: 115 },
//         { genre: "Action", sold: 120 },
//         { genre: "Shooter", sold: 350 },
//         { genre: "Other", sold: 150 },
//       ])
//       .encode("x", "genre") // 编码 x 通道
//       .encode("y", "sold")
//       .animate(false)
//       .axis(false)
//       .interaction("tooltip", false)
//       .state("active", { fill: "orange" })
//       .state("inactive", { opacity: 0.5 })
//     bar.interaction("elementHighlight", true)
//     //   .interaction("brushXHighlight", { series: true })

//     bar.render()

//     // 添加事件监听器在不同图表之间交流
//     focus.on("brush:filter", (e) => {
//       const { nativeEvent } = e
//       if (!nativeEvent) return
//       const { selection } = e.data
//       const { x: scaleX } = focus.getScale()
//       const [[x1, x2]] = selection
//       const domainX = scaleX.getOptions().domain
//       console.log("brush:filter", e)
//       if (x1 === domainX[0] && x2 === domainX[1]) {
//         context.emit("brush:remove", {})
//       } else {
//         context.emit("brush:highlight", { data: { selection } })
//         bar.emit("element:highlight", {
//           data: { data: { genre: "Strategy", sold: 115 } },
//         })
//       }
//     })

//     context.on("brush:highlight", (e) => {
//       console.log(" context.on(brush:highlight", e)
//       const { nativeEvent, data } = e
//       if (!nativeEvent) return
//       const { selection } = data
//       focus.emit("brush:filter", { data: { selection } })
//     })

//     context.on("brush:remove", (e) => {
//       const { nativeEvent } = e
//       if (!nativeEvent) return
//       const { x: scaleX, y: scaleY } = context.getScale()
//       const selection = [scaleX.getOptions().domain, scaleY.getOptions().domain]
//       focus.emit("brush:filter", { data: { selection } })
//     })

//     // bar.on("element:highlight", (event) => {
//     //   const { data, nativeEvent } = event
//     //   if (nativeEvent) {
//     //     console.log("element:highlight", data)
//     //   }
//     // })
//     // const handleClick = () => {
//     //     bar.emit("element:highlight", {
//     //       data: { data: { genre: "Strategy", sold: 115 } },
//     //     })
//     //   }
//     // 清理函数
//     return () => {
//       // 在这里执行任何必要的清理
//       focus.destroy()
//       context.destroy()
//       bar.destroy()
//     }
//   }, [])
//   const handleButtonClick = () => {
//     if (contextRef.current) {
//       contextRef.current.emit("brush:remove", {})
//     }
//   }

//   return (
//     <div>
//       <div ref={focusContainerRef} />
//       <div ref={contextContainerRef} />
//       <div ref={barContainerRef} />
//       <button type="button" onClick={handleButtonClick}>
//         清除选择
//       </button>
//     </div>
//   )
// }

// export default Container

import React, { useEffect, useRef } from "react"
import { Chart } from "@antv/g2"

const Container = () => {
  const containerRef = useRef(null)
  const chartRef = useRef<Chart | null>(null)
  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const chart = new Chart({
      container: containerRef.current,
      autoFit: true,
      height: 500,
    })
    chart
      .data([
        { x: 808.563, y: 198.873 },
        { x: 314.22, y: 3.12 },
        { x: 4503.5372, y: 184.59720000000007 },
        { x: 2808.87024, y: 635.12344 },
        { x: 3662.3100000000004, y: 1053.3699 },
        { x: 622.5381, y: 86.12610000000001 },
      ])
      .point()
      .encode("x", "x")
      .encode("y", "y")
      .state("active", { fill: "#4B91FF" })
      .state("inactive", { opacity: 0.5 })
    chart
      .line()
      .encode("x", "x")
      .encode("y", "y")
      .encode("color", "blue")
      .data([
        { x: 2165.3999, y: 354.7569 },
        { x: 1208.1219999999998, y: -0.025300000000001432 },
      ])
      .state("active", { fill: "#4B91FF" })
      .state("inactive", { opacity: 0.5 })
    chart.interaction("elementHighlight", true)
    chart.render()
    chartRef.current = chart
    return () => {
      chart.destroy()
    }
  }, [])
  const handleButtonClick = () => {
    if (chartRef.current) {
      chartRef.current.emit("element:highlight", {
        data: {
          data: [
            { x: 2165.3999, y: 354.7569 },
            { x: 1208.1219999999998, y: -0.025300000000001432 },
          ],
        },
      })
    }
  }

  return (
    <div>
      <div ref={containerRef} />
      <button type="button" onClick={handleButtonClick}>
        高亮
      </button>
    </div>
  )
}

export default Container
