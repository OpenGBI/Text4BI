import React, { useRef, useEffect } from 'react'
import { RiseOutlined } from '@ant-design/icons'
import SelectorInText from './LineHeightComponents/SelectorInText'
import { renderLineChart, renderBarChart, renderPieChart } from '../utils/SparkLineFuncs'

interface Phrase {
  type: string
  value: string
  metadata?: any
}
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

  if (type === 'entity' && metadata.entityType === 'selector') {
    return <SelectorInText selections={metadata.detail} defaultSelection={metadata.detail[0]} />
  }
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
export default PhraseComponent
