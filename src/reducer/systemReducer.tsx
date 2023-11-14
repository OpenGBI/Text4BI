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
            { type: 'CardTitle', value: 'Trend' },
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
              value: '卡皮吧啦算法',
              metadata: {
                entityType: 'algorithm',
                origin:
                  '这是一个算法的测试阿巴阿巴不想打工哈哈哈哈我疯啦，学习关我什么事我是一只猴子（浪荡在树林之间）（不经意的顺走路人的香蕉）（缠着树藤从左荡到右）（再从右荡到左）（边荡边吃香蕉）（吃完落在高山上高猿长啸）（啊呜呜呜呜呜）（手拍嘴啊呜呜呜呜）（手挠身上）（猖狂的笑：嘿嘿嘿嘿嘿嘿不给）',
              },
            },
            {
              type: 'entity',
              value: '东北',
              metadata: {
                entityType: 'filter_cate',
                selections: ['东北', '华北', '华南', '华中', '西北'],
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
                entityType: 'insight',
                insightType: 'TemporalityTrend',
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
                entityType: 'insight',
                insightType: 'TemporalityTrend',
                detail: [1, 2, 6, 18, 24, 48],
              },
            },
            { type: 'text', value: '。' },
            { type: 'text', value: '按垂直行业分：' },
            {
              type: 'entity',
              value: '30%',
              metadata: { entityType: 'metric_value', origin: 123077.34 },
            },
            {
              type: 'entity',
              value: '+130.4',
              metadata: { entityType: 'delta_value', assessment: 'negative' },
            },
            {
              type: 'entity',
              value: '-38.4%',
              metadata: { entityType: 'delta_value_ratio', assessment: 'negative' },
            },
            {
              type: 'entity',
              value: 'Sales',
              metadata: { entityType: 'metric_name' },
            },
            {
              type: 'entity',
              value: 'left-skewed',
              metadata: { entityType: 'insight_desc', assessment: 'positive' },
            },
            {
              type: 'entity',
              value: 'Country',
              metadata: { entityType: 'dim_cate' },
            },
            {
              type: 'entity',
              value: '东北',
              metadata: {
                entityType: 'filter_time',
                selections: ['东北', '华北', '华南', '华中', '西北'],
              },
            },
          ],
        },
        {
          type: 'plot',
          chartType: 'LineChart',
          data: [2, 4, 55, 177, 99],
        },
      ],
    },
    {
      CardName: 'Card2',
      paragraph: [
        {
          type: 'topic',
          phrases: [
            { type: 'CardTitle', value: 'balabala' },
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
                selections: ['东北', '华北', '华南', '华中', '西北'],
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
                entityType: 'insight',
                insightType: 'TemporalityTrend',
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
                entityType: 'insight',
                insightType: 'TemporalityTrend',
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
                entityType: 'insight',
                insightType: 'TemporalityTrend',
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
export const SET_DATASET = 'SET_DATASET'

const systemReducer = (state = iniSystemState, action: SystemActionType) => {
  switch (action.type) {
    case 'CHANGE_SYSTEM_ACTION':
      return action.payload
    default:
      return state
  }
}

export default systemReducer
