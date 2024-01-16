import { wordScaleGraphicsSettingStateType } from "../types"
import { ChangeWordScaleGraphicsSettingAction } from "../actions/wordScaleGraphicsSettingAction"

const iniWordScaleGraphicsSettingState: wordScaleGraphicsSettingStateType = {
  sparkLinePosition: "left",
  showDataDrivenGraphics: true,
  aspectRatio: "tiny",
  distributionType: "a",
  rankType: "a",
  proportionType: "a",
  associationType: "a",
  trendType: "a",
  differenceType: "a",
  anomalyType: "a",
  seasonalityType: "a",
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
