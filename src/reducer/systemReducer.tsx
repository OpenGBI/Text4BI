import { systemStateType } from '../types'
import { SystemActionType } from '../actions/systemAction'

const iniSystemState: systemStateType = {
  dataset: [
    {
      key: 'Card1',
      type: 'LineChart',
      BigChartData: [2, 4, 55, 77, 99],
      phrasesLists: [
        [
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
        [
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
      ],
    },
    {
      key: 'Card2',
      type: 'LineChart',
      BigChartData: [2, 4, 55, 7, 99],
      phrasesLists: [
        [
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
        [
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
      ],
    },
    {
      key: 'Card3',
      type: 'LineChart',
      BigChartData: [2, 2, 2, 2, 99],
      phrasesLists: [
        [
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
        [
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
      ],
    },
    {
      key: 'Card4',
      type: 'LineChart',
      BigChartData: [333, 4, 55, 7, 99],
      phrasesLists: [
        [
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
        [
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
      ],
    },
    {
      key: 'Card5',
      type: 'LineChart',
      BigChartData: [2, 222, 55, 222, 99],
      phrasesLists: [
        [
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
        [
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
      ],
    },
  ],
  showBigGraph: true,
  showSparkLine: true,
  selectedCards: ['Card1', 'Card2', 'Card3', 'Card4', 'Card5'],
  allCards: ['Card1', 'Card2', 'Card3', 'Card4', 'Card5'],
}

const systemReducer = (state = iniSystemState, action: SystemActionType) => {
  switch (action.type) {
    case 'CHANGE_SYSTEM_ACTION':
      return action.payload
    default:
      return state
  }
}

export default systemReducer
