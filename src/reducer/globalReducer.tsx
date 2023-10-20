import { GlobalSettingStateType } from '../types'
import { ChangeGlobalSettingAction } from '../actions/GlobalSettingAction'

const iniGlobalSettingState: GlobalSettingStateType = {
  color: 'Blue',
  boldness: false,
  underline: false,
  fontsize: '16px',
  backgroundColor: 'white',
  bulletPoint: false,
  lineHeight: 1.5,
  sparkLinePosition: 'up',
  aspectRatio: 'tiny',
}

const GlobalSettingReducer = (state = iniGlobalSettingState, action: ChangeGlobalSettingAction) => {
  if (action.type === 'CHANGE_GLOBAL_SETTING') return action.payload
  return state
}
export default GlobalSettingReducer
