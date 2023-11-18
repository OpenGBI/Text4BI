import React, { useRef, useEffect } from 'react'
import { Tooltip, Space, Button, message } from 'antd'
import { DndProvider, useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux'
// import { NarrativeTextSpec, NarrativeTextVis } from '@antv/ava-react'
import { copyToClipboard, NarrativeTextVis, NtvPluginManager, TextExporter } from '@antv/ava-react'
import { AppState } from '../store'
import PhraseComponent from './PhraseComponent'
import BigChart from './BigChart'
import { Card, sentence } from '../types'

const CARD_DRAG_TYPE = 'CARD'
// interface Phrase {
//   type: string
//   value: string
//   metadata?: any
// }

interface InsightCardProps extends Card {
  id: string
  onDrop: (id: string, targetId: string) => void
}

export const InsightCard: React.FC<InsightCardProps> = ({ CardName, paragraph, id, onDrop }) => {
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

  if (!CardName || !paragraph || !id || !onDrop) {
    throw new Error('No data found for the date')
  }
  const onCopySuccess = () => {
    console.log('success')
  }

  const onClickCopyButton = async () => {
    if (containerRef?.current) {
      const textExporter = new TextExporter()
      const html = await textExporter.getNarrativeHtml(containerRef.current)
      const plainText = 'plainText'
      copyToClipboard(html, plainText, onCopySuccess)
    }
  }

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
  const renderBulletPoint = (curSentence: sentence) => {
    if (bulletPoint && curSentence.type === 'bullet') {
      return <span style={{ fontSize: '20px' }}>• </span>
    }
    return null
  }
  const renderPhrases = (curSentence: sentence) => {
    if (curSentence.type === 'topic') {
      return curSentence.phrases.map((phrase, index) => (
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
      ))
    }
    if ((curSentence.type === 'normal' || curSentence.type === 'bullet') && showSparkLine) {
      return curSentence.phrases.map((phrase, index) => (
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
      ))
    }

    if (showBigGraph && 'chartType' in curSentence) {
      return <BigChart ChartType={curSentence.chartType} BigChartData={curSentence.metadata} />
    }
  }

  return (
    <div ref={containerRef}>
      <div ref={ref} style={{ backgroundColor: 'lightgray', cursor: 'move' }}>
        Drag Handle {id}
      </div>
      <Button type='primary' onClick={onClickCopyButton}>
        复制富文本
      </Button>
      <div className='avar-ntv-container'>
        {paragraph.map((curSentence, outIndex) => (
          <div key={outIndex}>
            {renderBulletPoint(curSentence)}
            {renderPhrases(curSentence)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default InsightCard
