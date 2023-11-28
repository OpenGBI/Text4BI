export type storeType = {
  color: string
  font: string
}
export type Point = {
  x: number
  y: number
}
export type cateAndValue = {
  value: number
  category: string
  // 索引签名
  [key: string]: number | string
}
export type Metadata = {
  entityType?: string
  insightType?: string
  origin?: number | string
  assessment?: 'positive' | 'negative'
  detail?: number[] | Point[] | cateAndValue[]
  selections?: string[]
  delta_value?: string
  ratio_value?: string
  tagData?: number | number[] | Point[]
}
export type Metadata4BigGraph = {
  detail?: cateAndValue[] | Point[]
  tagData?: cateAndValue[] | Point[] | number[]
}
export type Phrase = {
  type: string
  value: string
  metadata?: Metadata
}
export type TopicSentence = {
  type: 'topic'
  phrases: Phrase[]
}
export type NormalSentence = {
  type: 'normal'
  phrases: Phrase[]
}

export type BulletSentence = {
  type: 'bullet'
  phrases: Phrase[]
}

export type PlotSentence = {
  type: 'plot'
  chartType: string
  metadata: Metadata4BigGraph
}

export type sentence = TopicSentence | NormalSentence | BulletSentence | PlotSentence
export type Card = {
  CardName: string
  paragraph: sentence[]
}
export type systemStateType = {
  dataset: Card[]
  showBigGraph: boolean
  showSparkLine: boolean
  selectedCards: string[]
  allCards: string[]
}
export type GlobalSettingStateType = {
  color: string
  boldness: boolean
  underline: boolean
  fontsize: string
  backgroundColor: string
  bulletPoint: boolean
  lineHeight: number
  sparkLinePosition: string // 上下左右
  aspectRatio: string
}
