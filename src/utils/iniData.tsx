import { AssociationData } from '../datas4graph/AssociationData'
import { DistributionData } from '../datas4graph/DistributionData'
import { Card } from '../types'

export const iniData: Card[] = [
  {
    CardName: 'Card1',
    paragraph: [
      {
        type: 'topic',
        phrases: [
          { type: 'CardTitle', value: 'Association' },
          { type: 'entity', value: 'Correlation Analysis of Sales and Profit' },
        ],
      },
      {
        type: 'normal',
        phrases: [
          { type: 'text', value: 'Sales and Profit: According to the ' },
          {
            type: 'entity',
            value: 'Pearson correlation coefficient',
            metadata: {
              entityType: 'algorithm',
              origin: '这里缺一个算法的解释',
            },
          },
          { type: 'text', value: ', the correlation between ' },
          {
            type: 'entity',
            value: 'Sales',
            metadata: { entityType: 'metric_name' },
          },
          { type: 'text', value: ' and ' },
          {
            type: 'entity',
            value: 'Profit',
            metadata: { entityType: 'metric_name' },
          },
          { type: 'text', value: ' is ' },
          {
            type: 'entity',
            value: '0.65',
            metadata: {
              entityType: 'insight',
              insightType: 'Association',
              detail: AssociationData.data,
              tagData: AssociationData.tagData,
            },
          },
          { type: 'text', value: ' The correlation is depicted in the graph below:' },
        ],
      },
      {
        type: 'plot',
        chartType: 'Association',
        metadata: {
          detail: AssociationData.data,
          tagData: AssociationData.tagData,
        },
      },
    ],
  },
  // {
  //   CardName: 'Card2',
  //   paragraph: [
  //     {
  //       type: 'topic',
  //       phrases: [
  //         { type: 'CardTitle', value: 'difference' },
  //         {
  //           type: 'entity',
  //           value: 'Analysis of Discrepancies in Total Profit by Sales Categories',
  //         },
  //       ],
  //     },
  //     {
  //       type: 'normal',
  //       phrases: [
  //         { type: 'text', value: 'From ' },
  //         {
  //           type: 'entity',
  //           value: 'January 1, 2011',
  //           metadata: { entityType: 'filter_time', selections: ['2011-1-1'] },
  //         },
  //         { type: 'text', value: ' to ' },
  //         {
  //           type: 'entity',
  //           value: 'December 31, 2014',
  //           metadata: { entityType: 'filter_time', selections: ['2014-12-31'] },
  //         },
  //         {
  //           type: 'text',
  //           value: ' there were noticeable differences in total profit among different ',
  //         },
  //         {
  //           type: 'entity',
  //           value: 'sales categories',
  //           metadata: { entityType: 'metric_name' },
  //         },
  //         {
  //           type: 'text',
  //           value: '. Specifically, the profit in the "technology" category was ',
  //         },
  //         {
  //           type: 'entity',
  //           value: '174,600',
  //           metadata: { entityType: 'delta_value', assessment: 'positive' },
  //         },
  //         { type: 'text', value: ' higher than the average, standing at ' },
  //         {
  //           type: 'entity',
  //           value: '489,200',
  //           metadata: { entityType: 'metric_value', origin: 489200 },
  //         },
  //         { type: 'text', value: '.' },
  //       ],
  //     },

  //     {
  //       type: 'plot',
  //       chartType: 'LineChart',
  //       metadata: {
  //         detail: [
  //           { category: '2', value: 3 },
  //           { category: '4', value: 7 },
  //         ],
  //       },
  //     },
  //   ],
  // },
  {
    CardName: 'Card2',
    paragraph: [
      {
        type: 'topic',
        phrases: [
          { type: 'CardTitle', value: 'distribution' },
          {
            type: 'entity',
            value: 'Distribution Analysis of Daily Sales Sum',
          },
        ],
      },
      {
        type: 'normal',
        phrases: [
          { type: 'text', value: 'From ' },
          {
            type: 'entity',
            value: 'January 1, 2011',
            metadata: { entityType: 'filter_time', selections: ['2011-1-1'] },
          },
          { type: 'text', value: ' to ' },
          {
            type: 'entity',
            value: 'December 31, 2014',
            metadata: { entityType: 'filter_time', selections: ['2014-12-31'] },
          },
          {
            type: 'text',
            value: ', the distribution of ',
          },
          {
            type: 'entity',
            value: 'daily sales sums ',
            metadata: { entityType: 'metric_name' },
          },
          {
            type: 'entity',
            value: 'right-skewed',
            metadata: { entityType: 'insight_desc', assessment: 'negative' },
          },
          {
            type: 'entity',
            value: '',
            metadata: {
              entityType: 'insight',
              insightType: 'Distribution',
              detail: DistributionData.data,
            },
          },
          {
            type: 'text',
            value:
              'distribution. The current binning strategy employs equidistant bins with a total of ',
          },
          {
            type: 'entity',
            value: '37',
            metadata: { entityType: 'metric_value', origin: 37 },
          },
          { type: 'text', value: ' bins and a bin width of ' },
          {
            type: 'entity',
            value: '681.945',
            metadata: { entityType: 'metric_value', origin: 681.9450621621 },
          },
          { type: 'text', value: '.' },
        ],
      },
      {
        type: 'normal',
        phrases: [
          { type: 'text', value: 'The samples maximum value is ' },
          {
            type: 'entity',
            value: '39,500',
            metadata: { entityType: 'metric_value', origin: 39500 },
          },
          { type: 'text', value: ' , the minimum value is ' },
          {
            type: 'entity',
            value: '2,690',
            metadata: { entityType: 'metric_value', origin: 2690 },
          },
          { type: 'text', value: ' , the mean is' },
          {
            type: 'entity',
            value: '8,840.91',
            metadata: { entityType: 'metric_value', origin: 8840.91 },
          },
          {
            type: 'text',
            value: ', the median is ',
          },
          {
            type: 'entity',
            value: '7,700.14',
            metadata: { entityType: 'metric_value', origin: 7700.14 },
          },
          {
            type: 'text',
            value: ', the 75th percentile is ',
          },
          {
            type: 'entity',
            value: '12,500',
            metadata: { entityType: 'metric_value', origin: 12500 },
          },
          {
            type: 'text',
            value: ', the 25th percentile is ',
          },
          {
            type: 'entity',
            value: '3,780.98',
            metadata: { entityType: 'metric_value', origin: 3780.98 },
          },
          {
            type: 'text',
            value: ', and the standard deviation is ',
          },
          {
            type: 'entity',
            value: '6,570.12',
            metadata: { entityType: 'metric_value', origin: 6570.12 },
          },
          {
            type: 'entity',
            value: '',
            metadata: {
              entityType: 'insight',
              insightType: 'Distribution',
              detail: DistributionData.data,
            },
          },
          {
            type: 'text',
            value:
              '. The sample data contains outliers, and it is advisable to use the median, rather than the mean, to describe the overall numerical level.',
          },
        ],
      },
      {
        type: 'normal',
        phrases: [
          { type: 'text', value: 'In the box plot outlier detection, there are' },
          {
            type: 'entity',
            value: '29',
            metadata: { entityType: 'metric_value', origin: 29 },
          },
          { type: 'text', value: ' outliers in this sample.' },
        ],
      },
      {
        type: 'plot',
        chartType: 'Distribution',
        metadata: {
          detail: DistributionData.data,
        },
      },
    ],
  },
  {
    CardName: 'Card3',
    paragraph: [
      {
        type: 'topic',
        phrases: [
          { type: 'CardTitle', value: 'proportion' },
          {
            type: 'entity',
            value: 'Proportion Analysis of Sales Volume by Different Countries',
          },
        ],
      },
      {
        type: 'normal',
        phrases: [
          { type: 'text', value: 'From ' },
          {
            type: 'entity',
            value: 'January 1, 2011',
            metadata: { entityType: 'filter_time', selections: ['2011-1-1'] },
          },
          { type: 'text', value: ' to ' },
          {
            type: 'entity',
            value: 'December 31, 2014',
            metadata: { entityType: 'filter_time', selections: ['2014-12-31'] },
          },
          {
            type: 'text',
            value: ', when drilling down by ',
          },
          {
            type: 'entity',
            value: '中国',
            metadata: {
              entityType: 'filter_cate',
              selections: ['中国', '美国', '英国', '日本', '西班牙'],
            },
          },
          {
            type: 'text',
            value: ', the specific proportions of total ',
          },
          {
            type: 'entity',
            value: 'sales',
            metadata: { entityType: 'metric_name' },
          },
          {
            type: 'text',
            value: ' volume are as follows:',
          },
        ],
      },
      {
        type: 'bullet',
        phrases: [
          {
            type: 'entity',
            value: 'United States',
            metadata: { entityType: 'dim_cate' },
          },
          {
            type: 'text',
            value: ' ranks first, with a proportion of ',
          },

          {
            type: 'entity',
            value: '18.77%',
            metadata: { entityType: 'metric_value', origin: 0.1877 },
          },
          {
            type: 'entity',
            value: '',
            metadata: {
              entityType: 'insight',
              insightType: 'Proportion',
              detail: [0.1877, 1 - 0.1877],
            },
          },
        ],
      },
      {
        type: 'bullet',
        phrases: [
          {
            type: 'entity',
            value: 'Australia',
            metadata: { entityType: 'dim_cate' },
          },
          {
            type: 'text',
            value: ' takes the second position, with a proportion of ',
          },

          {
            type: 'entity',
            value: '7.32%',
            metadata: { entityType: 'metric_value', origin: 0.0732 },
          },
          {
            type: 'entity',
            value: '',
            metadata: {
              entityType: 'insight',
              insightType: 'Proportion',
              detail: [0.1877, 1 - 0.1877],
            },
          },
        ],
      },
      {
        type: 'plot',
        chartType: 'Distribution',
        metadata: {
          detail: DistributionData.data,
        },
      },
    ],
  },
]
