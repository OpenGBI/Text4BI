import React, { useRef, useEffect } from 'react'
import { RiseOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import SelectorInText from './LineHeightComponents/SelectorInText'
import {
  renderAssociation1,
  renderAssociation2,
  renderCategorization1,
  renderCategorization2,
  renderDistribution1,
  renderDistribution2,
  renderProportion1,
  renderProportion2,
  renderTemporalityAnomaly1,
  renderTemporalityAnomaly2,
  renderTemporalityDifference1,
  renderTemporalityDifference2,
  renderTemporalitySeasonality1,
  renderTemporalitySeasonality2,
  renderTemporalityTrend1,
  renderTemporalityTrend2,
} from '../utils/SparkLineFuncs'
import { Phrase, Metadata, Point } from '../types'

const globalBoolean = true
// interface Phrase {
//   type: string
//   value: string
//   metadata?: any
// }
function isPointArray(value: any): value is Point[] {
  if (!Array.isArray(value)) {
    return false
  }

  return value.every(
    (point) =>
      typeof point === 'object' &&
      point !== null &&
      'x' in point &&
      'y' in point &&
      typeof point.x === 'number' &&
      typeof point.y === 'number',
  )
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
    if (curMetadata.entityType) {
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
            className={curMetadata.insightType}
          >
            {value}
          </span>
        </Tooltip>
      )
    }
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
  const renderSparkLine = (
    curMetadata: Metadata,
    curAspectRatio: string,
    curSparkLinePosition: string,
    curWordSpan: HTMLSpanElement,
    curSparkLineSpan: HTMLSpanElement | undefined,
    defaultChoice: boolean, // 是否选择函数1
  ) => {
    if (!curMetadata.detail) {
      throw new Error('no curMetadata')
    }
    if (curMetadata.insightType === 'Distribution') {
      if (
        defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderDistribution1(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderDistribution2(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === 'Categorization') {
      if (
        defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderCategorization1(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderCategorization2(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === 'Proportion') {
      if (
        defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderProportion1(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderProportion2(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === 'Association') {
      if (defaultChoice && isPointArray(curMetadata.detail)) {
        renderAssociation1(
          curMetadata.detail as Point[],
          curAspectRatio,
          curSparkLinePosition,
          metadata.tagData as Point[],
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (!defaultChoice && isPointArray(curMetadata.detail)) {
        renderAssociation2(
          curMetadata.detail as Point[],
          curAspectRatio,
          curSparkLinePosition,
          metadata.tagData as Point[],
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === 'TemporalityTrend') {
      if (
        defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderTemporalityTrend1(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !defaultChoice
        //  &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderTemporalityTrend2(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === 'TemporalityDifference') {
      if (
        defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderTemporalityDifference1(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          metadata.tagData as number[],
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !defaultChoice
        //  &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderTemporalityDifference2(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === 'TemporalityAnomaly' && curMetadata.tagData) {
      if (
        defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderTemporalityAnomaly1(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          metadata.tagData as number[],
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderTemporalityAnomaly2(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          metadata.tagData as number[],
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === 'TemporalitySeasonality' && curMetadata.tagData) {
      if (
        defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderTemporalitySeasonality1(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          metadata.tagData as number[],
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !defaultChoice
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === 'number')
      ) {
        renderTemporalitySeasonality2(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          metadata.tagData as number[],
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
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
      renderSparkLine(
        metadata,
        aspectRatio,
        sparkLinePosition,
        wordRef.current,
        undefined,
        globalBoolean,
      )
    }
    if (
      wordRef.current &&
      sparkLineRef.current &&
      metadata.detail &&
      (sparkLinePosition === 'left' || sparkLinePosition === 'right')
    ) {
      renderSparkLine(
        metadata,
        aspectRatio,
        sparkLinePosition,
        wordRef.current,
        sparkLineRef.current,
        globalBoolean,
      )
    }
  }, [type, metadata, aspectRatio, sparkLinePosition])
  // strict模式下初始化页面会调用两次useEffect

  if (type === 'entity') {
    if (
      (metadata.entityType === 'filter_time' || metadata.entityType === 'filter_cate') &&
      metadata.selections
    ) {
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
          metadata?.entityType === 'insight' && sparkLinePosition === 'left' ? (
            <span id='sparkLineElement' ref={sparkLineRef} className='sparkLineSpan'>
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
          metadata?.entityType === 'insight' && sparkLinePosition === 'right' ? (
            <span ref={sparkLineRef} className='sparkLineSpan'>
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
