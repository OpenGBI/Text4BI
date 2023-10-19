import { systemStateType } from '../types'

export const CHANGE_SYSTEM_ACTION = 'CHANGE_SYSTEM_ACTION'

export type SystemActionType = {
  type: string
  payload: systemStateType
}

export const ChangeSystemSetting = (setting: systemStateType) => ({
  type: CHANGE_SYSTEM_ACTION,
  payload: setting,
})
