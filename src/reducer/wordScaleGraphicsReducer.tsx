import { wordScaleGraphicsSettingStateType } from "../types"
import { ChangeWordScaleGraphicsSettingAction } from "../actions/wordScaleGraphicsSettingAction"

const iniWordScaleGraphicsSettingState: wordScaleGraphicsSettingStateType = {
  sparkLinePosition: "left",
  showDataDrivenGraphics: true,
  showDataDrivenCharts: true,
  aspectRatio: "1:1",
  distributionType: "a",
  rankType: "a",
  proportionType: "a",
  associationType: "a",
  trendType: "a",
  differenceType: "a",
  anomalyType: "a",
  seasonalityType: "a",
  graphicsSignificance: true,
  graphicsDirection: true,
  graphicsAnomaly: true,
  isSemanticDrivenIconsOn: true,
  semanticsAbsolutePosition: "begin",
  selectedSymbol1: "a",
  semanticBindingEntityType: "metric_value",
  selectedSymbol2: "a",
}

const WordScaleGraphicsSettingReducer = (
  state = iniWordScaleGraphicsSettingState,
  action: ChangeWordScaleGraphicsSettingAction,
) => {
  if (action.type === "CHANGE_WORDSCALEGRAPHICS_SETTING") {
    return action.payload
  }
  return state
}
export default WordScaleGraphicsSettingReducer
