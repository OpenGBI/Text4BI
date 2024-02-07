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
  interactionType?: string // 专门给29 outliers之类留的，标明它需要高亮离群点
  paramFilter?: string
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
export type entitiesType = {
  [key: string]: string
  a: string
  b: string
  c: string
  d: string
}
export type entityIconType = {
  [key: string]: entitiesType // 索引签名 zyx
  metric_value: entitiesType
  delta_value: entitiesType
  delta_value_ratio: entitiesType
  insight_desc: entitiesType
  metric_name: entitiesType
  dim_cate: entitiesType
  algorithm: entitiesType
  filter_time: entitiesType
  filter_cate: entitiesType
}
export type entitySelectedIconType = {
  metric_value: string
  delta_value: string
  delta_value_ratio: string
  insight_desc: string
  metric_name: string
  dim_cate: string
  algorithm: string
  filter_time: string
  filter_cate: string
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
  italics: boolean
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
  entityIcon: entityIconType
}
export type highLightMessage = {
  message: string | number
  hoverOrNot: boolean
  interactionType?: string
}
