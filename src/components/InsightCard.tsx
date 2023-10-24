import React, { useRef, useEffect } from 'react'
import { Tooltip } from 'antd'
// import { DndProvider, useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux'
import { RiseOutlined } from '@ant-design/icons'
import { renderLineChart, renderBarChart, renderPieChart } from '../utils/SparkLineFuncs'
import LineChart from '../utils/LineChart'
import BarChart from '../utils/BarChart'
import PieChart from '../utils/PieChart'
import { AppState } from '../store'

const CARD_DRAG_TYPE = 'CARD'
interface Phrase {
  type: string
  value: string
  metadata?: any
}

interface InsightCardProps {
  type: string
  BigChartData: number[]
  phrases: Phrase[]
  id: string
  onDrop: (id: string, targetId: string) => void
}
type BigChartProps = {
  ChartType: string
  BigChartData: number[]
}

const PhraseComponent: React.FC<Phrase> = ({ type, value, metadata }) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (
      type === 'entity' &&
      metadata?.entityType === 'trend_desc' &&
      svgRef.current &&
      tooltipRef.current
    ) {
      renderLineChart(svgRef.current, metadata.detail, tooltipRef.current)
    }
  }, [type, metadata])

  if (type === 'entity') {
    let wordColor: string = 'black'
    switch (metadata.entityType) {
      case 'metric_value':
        wordColor = 'blue'
        break
      case 'ratio_value':
        wordColor = 'red'
        break
      case 'delta_value':
        wordColor = 'red'
        break
      default:
        break
    }
    return (
      <span style={{ color: wordColor }}>
        <Tooltip title='prompt text'>
          <span>{value}</span>
        </Tooltip>
        {
          metadata?.entityType === 'trend_desc' ? (
            <span>
              <svg ref={svgRef} width='100' height='20' />
              {/* 在此处把变量svgRef和真实的dom元素绑定起来，当组件被渲染后，svgRef.current将会指向这个SVG元素 */}
              <div ref={tooltipRef} className='tooltip' />
            </span>
          ) : null // 这是一个三目运算符 ？：
        }
        {metadata?.assessment === 'positive' ? (
          <RiseOutlined style={{ fontSize: '16px', color: 'red' }} />
        ) : null}
      </span>
    )
  }

  return <span>{value}</span>
}
PhraseComponent.defaultProps = {
  metadata: {}, // 或者其他默认值
}

const BigChart: React.FC<BigChartProps> = ({ ChartType, BigChartData }) => {
  // (ChartType,BigChartData)会报错
  switch (ChartType) {
    case 'LineChart':
      return <LineChart data={BigChartData} />
    case 'BarChart':
      return <BarChart data={BigChartData} />
    case 'PieChart':
      return <PieChart data={BigChartData} />
    default:
      return <div />
  }
}
export const InsightCard: React.FC<InsightCardProps> = ({
  type,
  BigChartData,
  phrases,
  id,
  onDrop,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { dataset, showBigGraph, showSparkLine, selectedCards } = useSelector(
    (state: AppState) => state.system,
  )

  const {
    color,
    boldness,
    underline,
    fontsize,
    backgroundColor,
    bulletPoint,
    lineHeight,
    sparkLinePosition, // 上下左右
    aspectRatio,
  } = useSelector((state: AppState) => state.globalSetting)

  console.log('color', selectedCards)
  console.log('fontsize', fontsize)
  if (!type || !BigChartData || !phrases || !id || !onDrop) {
    throw new Error(`No data found for the date: ${type}`)
  }

  // const [, drop] = useDrop({
  //   accept: CARD_DRAG_TYPE,
  //   hover: (item: any, monitor: DropTargetMonitor) => {
  //     const clientY = monitor.getClientOffset()?.y
  //     if (!ref.current) return
  //     if (item.id === id) return

  //     // 以下是新增的滚动逻辑
  //     const rect = ref.current.getBoundingClientRect()
  //     const scrollSpeed = 5
  //     const scrollThreshold = 20
  //     if (!clientY) {
  //       throw new Error(`No data found for the date: ${clientY}`)
  //     }
  //     if (clientY < rect.top + scrollThreshold) {
  //       ref.current.scrollTop -= scrollSpeed
  //     } else if (clientY > rect.bottom - scrollThreshold) {
  //       ref.current.scrollTop += scrollSpeed
  //     }

  //     onDrop(item.id, id)
  //     item.id = id
  //   },
  // })

  // const [{ isDragging }, drag, preview] = useDrag({
  //   type: CARD_DRAG_TYPE,
  //   item: { id },
  //   collect: (monitor: any) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // })

  // 将drag注册到卡片的上边栏。
  // drag(ref)

  // drag(drop(ref));
  // // 函数Dataset接收一个参数，而不是三个函数，预期这个参数是一个对象，并且这个对象应该具有type、BigChartData和phrases这三个属性。
  return (
    <div className='insight_card'>
      <div ref={ref} style={{ backgroundColor: 'lightgray', cursor: 'move' }}>
        Drag Handle {id}
      </div>
      {phrases.map((phrase, index) => (
        // 每一个phrase都经过这个处理
        <PhraseComponent key={index} {...phrase} />
        // jsx中的js表达式需要{}
        // key: 这是一个特殊的prop，React用它来在列表中唯一标识每一个元素。
        // 这并不是传递给PhraseComponent的真实prop，它只是帮助React进行优化。所以PhraseComponent只接收3个props,不接收index
      ))}
      <BigChart ChartType={type} BigChartData={BigChartData} />
    </div>
  )
}

export default InsightCard
