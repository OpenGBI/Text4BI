export type storeType = {
  color: string
  font: string
}
type Phrase = {
  type: string
  value: string
  metadata?: any
}
export type Card = {
  key: string
  type: string
  BigChartData: number[]
  phrases: Phrase[]
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
