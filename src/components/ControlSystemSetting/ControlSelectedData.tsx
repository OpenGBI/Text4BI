import React, { useState, useEffect } from 'react'
import { Select, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { systemStateType, Card } from '../../types'
import { AppState } from '../../store'
import { ChangeSystemSetting } from '../../actions/systemAction'

const iniData: Card[] = [
  {
    CardName: 'Card1',
    paragraph: [
      {
        type: 'topic',
        phrases: [
          { type: 'CardType', value: 'Trend' },
          { type: 'entity', value: 'Trend of Sales' },
        ],
      },
      {
        type: 'normal',
        phrases: [
          { type: 'entity', value: 'DAU', metadata: { entityType: 'metric_name' } },
          { type: 'text', value: ' ' },
          {
            type: 'entity',
            value: '1.23亿',
            metadata: { entityType: 'metric_value', origin: 123077.34 },
          },
          {
            type: 'entity',
            value: '东北',
            metadata: {
              entityType: 'selector',
              detail: ['东北', '华北', '华南', '华中', '西北'],
            },
          },
          { type: 'text', value: '，环比昨日 ' },
          {
            type: 'entity',
            value: '80万',
            metadata: { entityType: 'delta_value', assessment: 'positive' },
          },
          { type: 'text', value: '（' },
          {
            type: 'entity',
            value: '2.3%',
            metadata: { entityType: 'ratio_value', assessment: 'positive' },
          },
          { type: 'text', value: '）。' },
          { type: 'text', value: '最近 3 个动态 7 天' },
          {
            type: 'entity',
            value: '趋势上涨',
            metadata: {
              entityType: 'trend_desc',
              detail: [1, 2, 6, 18, 24, 48],
            },
          },
          { type: 'text', value: '。' },
          { type: 'text', value: '按垂直行业分：' },
        ],
      },
      {
        type: 'bullet',
        phrases: [
          { type: 'entity', value: 'DAU', metadata: { entityType: 'metric_name' } },
          { type: 'text', value: ' ' },
          {
            type: 'entity',
            value: '1.23亿',
            metadata: { entityType: 'metric_value', origin: 123077.34 },
          },
          { type: 'text', value: '，环比昨日 ' },
          {
            type: 'entity',
            value: '80万',
            metadata: { entityType: 'delta_value', assessment: 'positive' },
          },
          { type: 'text', value: '（' },
          {
            type: 'entity',
            value: '2.3%',
            metadata: { entityType: 'ratio_value', assessment: 'positive' },
          },
          { type: 'text', value: '）。' },
          { type: 'text', value: '最近 3 个动态 7 天' },
          {
            type: 'entity',
            value: '趋势上涨',
            metadata: {
              entityType: 'trend_desc',
              detail: [1, 2, 6, 18, 24, 48],
            },
          },
          { type: 'text', value: '。' },
          { type: 'text', value: '按垂直行业分：' },
        ],
      },
      {
        type: 'plot',
        chartType: 'LineChart',
        data: [2, 4, 55, 77, 99],
      },
    ],
  },
  {
    CardName: 'Card2',
    paragraph: [
      {
        type: 'topic',
        phrases: [
          { type: 'CardType', value: 'balabala' },
          { type: 'entity', value: 'Trend of Sales' },
        ],
      },
      {
        type: 'normal',
        phrases: [
          { type: 'entity', value: 'DAU', metadata: { entityType: 'metric_name' } },
          { type: 'text', value: ' ' },
          {
            type: 'entity',
            value: '1.23亿',
            metadata: { entityType: 'metric_value', origin: 123077.34 },
          },
          {
            type: 'entity',
            value: '东北',
            metadata: {
              entityType: 'selector',
              detail: ['东北', '华北', '华南', '华中', '西北'],
            },
          },
          { type: 'text', value: '，环比昨日 ' },
          {
            type: 'entity',
            value: '80万',
            metadata: { entityType: 'delta_value', assessment: 'positive' },
          },
          { type: 'text', value: '（' },
          {
            type: 'entity',
            value: '2.3%',
            metadata: { entityType: 'ratio_value', assessment: 'positive' },
          },
          { type: 'text', value: '）。' },
          { type: 'text', value: '最近 3 个动态 7 天' },
          {
            type: 'entity',
            value: '趋势上涨',
            metadata: {
              entityType: 'trend_desc',
              detail: [1, 2, 6, 18, 24, 48],
            },
          },
          { type: 'text', value: '。' },
          { type: 'text', value: '按垂直行业分：' },
        ],
      },
      {
        type: 'bullet',
        phrases: [
          { type: 'entity', value: 'DAU', metadata: { entityType: 'metric_name' } },
          { type: 'text', value: ' ' },
          {
            type: 'entity',
            value: '1.23亿',
            metadata: { entityType: 'metric_value', origin: 123077.34 },
          },
          { type: 'text', value: '，环比昨日 ' },
          {
            type: 'entity',
            value: '80万',
            metadata: { entityType: 'delta_value', assessment: 'positive' },
          },
          { type: 'text', value: '（' },
          {
            type: 'entity',
            value: '2.3%',
            metadata: { entityType: 'ratio_value', assessment: 'positive' },
          },
          { type: 'text', value: '）。' },
          { type: 'text', value: '最近 3 个动态 7 天' },
          {
            type: 'entity',
            value: '趋势上涨',
            metadata: {
              entityType: 'trend_desc',
              detail: [1, 2, 6, 18, 24, 48],
            },
          },
          { type: 'text', value: '。' },
          { type: 'text', value: '按垂直行业分：' },
        ],
      },
      {
        type: 'bullet',
        phrases: [
          { type: 'entity', value: 'DAU', metadata: { entityType: 'metric_name' } },
          { type: 'text', value: ' ' },
          {
            type: 'entity',
            value: '1.23亿',
            metadata: { entityType: 'metric_value', origin: 123077.34 },
          },
          { type: 'text', value: '，环比昨日 ' },
          {
            type: 'entity',
            value: '80万',
            metadata: { entityType: 'delta_value', assessment: 'positive' },
          },
          { type: 'text', value: '（' },
          {
            type: 'entity',
            value: '2.3%',
            metadata: { entityType: 'ratio_value', assessment: 'positive' },
          },
          { type: 'text', value: '）。' },
          { type: 'text', value: '最近 3 个动态 7 天' },
          {
            type: 'entity',
            value: '趋势上涨',
            metadata: {
              entityType: 'trend_desc',
              detail: [1, 2, 6, 18, 24, 48],
            },
          },
          { type: 'text', value: '。' },
          { type: 'text', value: '按垂直行业分：' },
        ],
      },
      {
        type: 'plot',
        chartType: 'LineChart',
        data: [2, 4, 55, 77, 99],
      },
    ],
  },
]

const ControlSelectedData: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<Card[]>(iniData)
  const dispatch = useDispatch()
  const systemSetting: systemStateType = useSelector((state: AppState) => state.system)

  const handleChangeDataset = (value: string) => {
    console.log(`../../public/datas/${value}.json`)
    fetch(`http://localhost:3000/datas/${value}.json`)
      .then((response) => response.json())
      .then((jsonData) => setSelectedDataset(jsonData))
    // console.log('selectedDataset', selectedDataset)
    // const selectedCardsId: string[] = selectedDataset.map((card) => card.key)

    // dispatch(
    //   ChangeSystemSetting({
    //     ...systemSetting,
    //     dataset: selectedDataset,
    //     selectedCards: selectedCardsId,
    //   }),
    // )
  }
  useEffect(() => {
    console.log('selectedDataset', selectedDataset)
    const allCardsId: string[] = selectedDataset.map((card) => card.CardName)

    dispatch(
      ChangeSystemSetting({
        ...systemSetting,
        dataset: selectedDataset,
        selectedCards: allCardsId,
        allCards: allCardsId,
      }),
    )
  }, [selectedDataset]) // 仅当selectedDataset发生变化时运行此effect
  return (
    <Space wrap>
      <Select
        defaultValue='Data1'
        style={{ width: 120 }}
        onChange={handleChangeDataset}
        options={[
          { value: 'Data1', label: 'Data1' },
          { value: 'Data2', label: 'Data2' },
        ]}
      />
    </Space>
  )
}

export default ControlSelectedData
