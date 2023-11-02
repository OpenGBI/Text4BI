import React, { useRef, useEffect } from 'react'
import { Tooltip, Space, Button, message } from 'antd'
import { DndProvider, useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux'
import { RiseOutlined } from '@ant-design/icons'
// import { NarrativeTextSpec, NarrativeTextVis } from '@antv/ava-react'
import { copyToClipboard, NarrativeTextVis, NtvPluginManager, TextExporter } from '@antv/ava-react'
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
  phrasesLists: Phrase[][]
  id: string
  onDrop: (id: string, targetId: string) => void
}
type BigChartProps = {
  ChartType: string
  BigChartData: number[]
}
// 扩展Phrase类型到PhraseComponent的参数类型
interface PhraseComponentProps extends Phrase {
  fontsize: string
  boldness: boolean
  underline: boolean
  lineHeight: number
  aspectRatio: string
  sparkLinePosition: string
}
const PhraseComponent: React.FC<PhraseComponentProps> = ({
  type,
  value,
  metadata,
  fontsize,
  boldness,
  underline,
  lineHeight,
  aspectRatio,
  sparkLinePosition,
}) => {
  // 接收一个词，生成一个这个词的可视化效果和行内小图
  const fontWeightValue = boldness ? 'bold' : 'normal'
  const underlineValue = underline ? 'underline' : 'none'
  const wordRef = useRef<HTMLSpanElement | null>(null)
  const sparkLineRef = useRef<HTMLSpanElement | null>(null)
  // const svgRef = useRef<SVGSVGElement | null>(null)
  // const tooltipRef = useRef<HTMLDivElement | null>(null)

  // useEffect(() => {
  //   if (
  //     type === 'entity' &&
  //     metadata?.entityType === 'trend_desc' &&
  //     svgRef.current &&
  //     tooltipRef.current
  //   ) {
  //     renderLineChart(svgRef.current, metadata.detail, tooltipRef.current, aspectRatio)
  //   }
  // }, [type, metadata, aspectRatio])
  useEffect(() => {
    console.log('effecteffect')
    if (
      wordRef.current &&
      metadata.detail &&
      (sparkLinePosition === 'up' || sparkLinePosition === 'down')
    ) {
      renderLineChart(metadata.detail, aspectRatio, sparkLinePosition, wordRef.current, undefined)
    }
    if (
      wordRef.current &&
      sparkLineRef.current &&
      metadata.detail &&
      (sparkLinePosition === 'left' || sparkLinePosition === 'right')
    ) {
      renderLineChart(
        metadata.detail,
        aspectRatio,
        sparkLinePosition,
        wordRef.current,
        sparkLineRef.current,
      )
    }
  }, [type, metadata, aspectRatio, sparkLinePosition])
  // strict模式下初始化页面会调用两次useEffect

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
    // const getSvgWidth = (curAspectRatio: string) => {
    //   if (curAspectRatio === 'tiny') {
    //     return '20'
    //   }
    //   if (curAspectRatio === 'medium') {
    //     return '27'
    //   }
    //   if (curAspectRatio === 'big') {
    //     return '100'
    //   }
    //   return '100'
    // }
    return (
      <span style={{ color: wordColor }}>
        {
          metadata?.entityType === 'trend_desc' && sparkLinePosition === 'left' ? (
            <span id='sparkLineElement' ref={sparkLineRef}>
              {/* <svg ref={svgRef} width={getSvgWidth(aspectRatio)} height='20' /> */}
              {/* 在此处把变量svgRef和真实的dom元素绑定起来，当组件被渲染后，svgRef.current将会指向这个SVG元素 */}
              {/* <div ref={tooltipRef} className='tooltip' /> */}
            </span>
          ) : null // 这是一个三目运算符 ？：
        }
        <span
          ref={wordRef}
          style={{
            fontSize: fontsize,
            fontWeight: fontWeightValue,
            textDecoration: underlineValue,
            lineHeight,
            position: 'relative',
          }}
          className='trend_desc'
        >
          {value}
        </span>

        {
          metadata?.entityType === 'trend_desc' && sparkLinePosition === 'right' ? (
            <span ref={sparkLineRef}>
              {/* <svg ref={svgRef} width={getSvgWidth(aspectRatio)} height='20' /> */}
              {/* 在此处把变量svgRef和真实的dom元素绑定起来，当组件被渲染后，svgRef.current将会指向这个SVG元素 */}
              {/* <div ref={tooltipRef} className='tooltip' /> */}
            </span>
          ) : null // 这是一个三目运算符 ？：
        }
        {metadata?.assessment === 'positive' ? (
          <RiseOutlined style={{ fontSize: '16px', color: 'red' }} />
        ) : null}
      </span>
    )
  }
  return <span style={{ fontSize: fontsize, lineHeight }}>{value}</span>
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
  phrasesLists,
  id,
  onDrop,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
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

  if (!type || !BigChartData || !phrasesLists || !id || !onDrop) {
    throw new Error(`No data found for the date: ${type}`)
  }
  const onCopySuccess = () => {
    console.log('success')
  }

  const onClickCopyButton = async () => {
    if (containerRef?.current) {
      const textExporter = new TextExporter()
      const html = await textExporter.getNarrativeHtml(containerRef.current)
      console.log(html)
      const plainText = 'plainText'
      copyToClipboard(html, plainText, onCopySuccess)
      // onCopy?.(currentInsightInfo, ref.current)
    }
  }
  // useEffect(() => {
  //   const handleKeyPress = async (event: KeyboardEvent) => {
  //     if (event.ctrlKey && event.key === 'c') {
  //       // 按下 Ctrl+C
  //       const selection = window.getSelection()
  //       if (!selection) {
  //         throw new Error(`No data found for the date: ${type}`)
  //       }
  //       if (selection.toString().length > 0) {
  //         // 如果选中了文本
  //         event.preventDefault() // 阻止默认复制行为
  //         await onClickCopy() // 调用复制函数
  //       }
  //     }
  //   }

  //   document.addEventListener('keydown', handleKeyPress)

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyPress)
  //   }
  // }, [])
  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     // 检查是否按下了Ctrl+C（或Cmd+C在Mac上）
  //     if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
  //       onClickCopy()
  //     }
  //   }

  //   // 添加事件监听器
  //   document.addEventListener('keydown', handleKeyDown)

  //   // 清除事件监听器
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown)
  //   }
  // }, [onClickCopy])

  const [, drop] = useDrop({
    accept: CARD_DRAG_TYPE,
    hover: (item: any, monitor: DropTargetMonitor) => {
      const clientY = monitor.getClientOffset()?.y
      if (!ref.current) return
      if (item.id === id) return

      // 以下是新增的滚动逻辑
      const rect = ref.current.getBoundingClientRect()
      const scrollSpeed = 5
      const scrollThreshold = 20
      if (!clientY) {
        throw new Error(`No data found for the date: ${clientY}`)
      }
      if (clientY < rect.top + scrollThreshold) {
        ref.current.scrollTop -= scrollSpeed
      } else if (clientY > rect.bottom - scrollThreshold) {
        ref.current.scrollTop += scrollSpeed
      }

      onDrop(item.id, id)
      item.id = id
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: CARD_DRAG_TYPE,
    item: { id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  // 将drag注册到卡片的上边栏。
  drag(ref)

  drag(drop(ref))
  // 函数Dataset接收一个参数，而不是三个函数，预期这个参数是一个对象，并且这个对象应该具有type、BigChartData和phrases这三个属性。
  return (
    <div ref={containerRef}>
      <div ref={ref} style={{ backgroundColor: 'lightgray', cursor: 'move' }}>
        Drag Handle {id}
      </div>
      <Button type='primary' onClick={onClickCopyButton}>
        复制富文本
      </Button>
      <div className='avar-ntv-container'>
        {(function (): React.ReactNode {
          if (showSparkLine === true) {
            return phrasesLists.map((phrases, outIndex) => (
              <div key={outIndex}>
                {bulletPoint ? <span style={{ fontSize: '20px' }}>• </span> : null}
                {phrases.map((phrase, index) => (
                  <PhraseComponent
                    key={index}
                    {...phrase}
                    fontsize={fontsize}
                    boldness={boldness}
                    underline={underline}
                    lineHeight={lineHeight}
                    aspectRatio={aspectRatio}
                    sparkLinePosition={sparkLinePosition}
                  />
                ))}
              </div>
            ))
          }
          return null
        })()}
        {(function (): React.ReactNode {
          if (showBigGraph === true) {
            return <BigChart ChartType={type} BigChartData={BigChartData} />
          }
          return null
        })()}
      </div>
    </div>
  )
}

export default InsightCard
