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
  assessment?: string
  detail?: number[] | Point[] | cateAndValue[]
  selections?: string[]
  delta_value?: string
  ratio_value?: string
  tagData?: number | number[] | Point[] | cateAndValue[] | string
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
  type: "topic"
  phrases: Phrase[]
}
export type NormalSentence = {
  type: "normal"
  phrases: Phrase[]
}

export type BulletSentence = {
  type: "bullet"
  phrases: Phrase[]
}

export type PlotSentence = {
  type: "plot"
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
  selectedCards: string[]
  allCards: string[]
}
export type GlobalSettingStateType = {
  showBigGraph: boolean
  textPosition: string
  showSparkLine: boolean
  fontsize: string
  lineHeight: number
  bulletPoint: boolean
  isLineBreakOn: boolean
  bulletPointStyle: string
  interaction: boolean
  linking: boolean
  detailsOnDemand: boolean
}
export type typographySettingStateType = {
  selectedEntityType: string
  boldness: boolean
  underline: boolean
  contour: boolean
  color: string
  backgroundColor: string
}
export type wordScaleGraphicsSettingStateType = {
  sparkLinePosition: string
  showDataDrivenGraphics: boolean
  showDataDrivenCharts: boolean
  aspectRatio: string
  distributionType: string
  rankType: string
  proportionType: string
  associationType: string
  trendType: string
  differenceType: string
  anomalyType: string
  seasonalityType: string
  graphicsSignificance: boolean
  graphicsDirection: boolean
  graphicsAnomaly: boolean
  isSemanticDrivenIconsOn: boolean
  semanticsAbsolutePosition: string
  selectedSymbol1: string
  semanticBindingEntityType: string
  selectedSymbol2: string
}
