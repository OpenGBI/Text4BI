import { GlobalSettingStateType } from '../types'
import { ChangeGlobalSettingAction } from '../actions/GlobalSettingAction'

const iniGlobalSettingState: GlobalSettingStateType = {
  color: 'blue',
  boldness: false,
  contour: false,
  underline: false,
  fontsize: '16px',
  backgroundColor: 'white',
  bulletPoint: false,
  lineHeight: 4,
  sparkLinePosition: 'left',
  aspectRatio: 'tiny',
  textPosition: 'top',
}

const GlobalSettingReducer = (state = iniGlobalSettingState, action: ChangeGlobalSettingAction) => {
  if (action.type === 'CHANGE_GLOBAL_SETTING') return action.payload
  return state
}
export default GlobalSettingReducer
