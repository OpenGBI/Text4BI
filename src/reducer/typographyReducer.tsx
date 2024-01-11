import { typographySettingStateType } from '../types'
import { ChangeTypographySettingAction } from '../actions/typographySettingAction'

const iniTypographySettingState: typographySettingStateType = {
    selectedEntityType: 'Association',
    boldness: false,
    underline: false,
    contour: false,
    color: 'blue',
    backgroundColor: 'white',
}

const TypographySettingReducer = (
    state = iniTypographySettingState,
    action: ChangeTypographySettingAction,
    ) => {
    if (action.type === 'CHANGE_TYPOGRAPHY_SETTING') {
      return action.payload
    }
    return state
  }
export default TypographySettingReducer
