import { wordScaleGraphicsSettingStateType } from "../types"
import { ChangeWordScaleGraphicsSettingAction } from "../actions/wordScaleGraphicsSettingAction"
import { iniEntityIcon } from "../utils/iniEntityIcon"

const iniWordScaleGraphicsSettingState: wordScaleGraphicsSettingStateType = {
  sparkLinePosition: "right",
  showDataDrivenGraphics: true,
  showDataDrivenCharts: true,
  aspectRatio: "4:1",
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
  entityIcon: iniEntityIcon,
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
