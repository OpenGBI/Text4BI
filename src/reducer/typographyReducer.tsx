import { typographySettingStateType } from "../types"
import { ChangeTypographySettingAction } from "../actions/typographySettingAction"

const iniTypographySettingState: typographySettingStateType = {
  selectedEntityType: "metric_value",
  boldness: false,
  underline: false,
  contour: false,
  color: "black",
  backgroundColor: "white",
}

const TypographySettingReducer = (
  state = iniTypographySettingState,
  action: ChangeTypographySettingAction,
) => {
  if (action.type === "CHANGE_TYPOGRAPHY_SETTING") {
    return action.payload
  }
  return state
}
export default TypographySettingReducer
