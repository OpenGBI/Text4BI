import { systemStateType } from '../types'
import { SystemActionType } from '../actions/systemAction'

const iniSystemState: systemStateType = {
  dataset: [
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
