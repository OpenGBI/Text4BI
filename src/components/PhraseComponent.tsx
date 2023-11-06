import React, { useRef, useEffect } from 'react'
import { RiseOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import SelectorInText from './LineHeightComponents/SelectorInText'
import { renderLineChart, renderBarChart, renderPieChart } from '../utils/SparkLineFuncs'
import { Phrase, Metadata } from '../types'
// interface Phrase {
//   type: string
//   value: string
//   metadata?: any
// }
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
  metadata = {},
  fontsize,
  boldness,
  underline,
  lineHeight,
  aspectRatio,
  sparkLinePosition,
}) => {
  // 接收一个词，生成一个这个词的可视化效果和行内小图
  let fontWeightValue = boldness ? 'bold' : 'normal'
  let underlineValue = underline ? 'underline' : 'none'
  let wordColor: string = 'black'
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
  const renderWord = (curMetadata: Metadata) => {
    if (curMetadata?.origin) {
      return (
        <Tooltip title={curMetadata.origin}>
          <span
            ref={wordRef}
            style={{
              color: wordColor,
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
        </Tooltip>
      )
    }
    console.log('curMetadata', curMetadata.entityType, value)
    console.log(wordColor)
    return (
      <span
        ref={wordRef}
        style={{
          color: wordColor,
          fontSize: fontsize,
          fontWeight: fontWeightValue,
          textDecoration: underlineValue,
          lineHeight,
          position: 'relative',
        }}
        className={curMetadata.entityType}
      >
        {value}
      </span>
    )
  }
  // if (!metadata) {
  //   throw new Error('No data found for the date')
  // }
  useEffect(() => {
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
    if (metadata.entityType === 'selector' && metadata.selections) {
      return (
        <SelectorInText
          selections={metadata.selections}
          defaultSelection={metadata.selections[0]}
        />
      )
    }

    if (metadata.entityType === 'metric_value') {
      wordColor = '#4B91FF'
    }
    if (
      metadata.entityType === 'delta_value' ||
      metadata.entityType === 'delta_value_ratio' ||
      metadata.entityType === 'insight_desc'
    ) {
      if (metadata.assessment === 'positive') {
        wordColor = '#13A8A8'
      } else {
        wordColor = '#FA541C'
      }
    }
    if (metadata.entityType === 'metric_name' || metadata.entityType === 'dim_cate') {
      fontWeightValue = 'bold'
    }
    if (metadata.entityType === 'algorithm') {
      underlineValue = 'underline dashed'
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
      <>
        {
          metadata?.entityType === 'trend_desc' && sparkLinePosition === 'left' ? (
            <span id='sparkLineElement' ref={sparkLineRef}>
              {/* <svg ref={svgRef} width={getSvgWidth(aspectRatio)} height='20' /> */}
              {/* 在此处把变量svgRef和真实的dom元素绑定起来，当组件被渲染后，svgRef.current将会指向这个SVG元素 */}
              {/* <div ref={tooltipRef} className='tooltip' /> */}
            </span>
          ) : null // 这是一个三目运算符 ？：
        }
        {/* <span
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
        </span> */}
        {renderWord(metadata)}

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
          <RiseOutlined style={{ fontSize: '16px', color: '#FA541C' }} />
        ) : null}
      </>
    )
  }
  if (type === 'CardTitle') {
    return (
      <span
        style={{
          fontSize: fontsize,
          lineHeight,
          position: 'relative',
          fontWeight: 'bold',
          backgroundColor: '#87CEFA',
          padding: '5px',
          borderRadius: '5px',
        }}
        className='CardTitle'
      >
        {value}
      </span>
    )
  }
  return <span style={{ fontSize: fontsize, lineHeight }}>{value}</span>
}
export default PhraseComponent
