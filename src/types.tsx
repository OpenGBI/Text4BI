export type storeType = {
  color: string
  font: string
}
export type Metadata = {
  entityType?: string
  origin?: number
  assessment?: 'positive' | 'negative'
  detail?: (string | number)[]
  selector?: string[]
  delta_value?: string
  ratio_value?: string
  trend_desc?: string
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
  data: number[]
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
