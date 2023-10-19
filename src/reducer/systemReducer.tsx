import { systemStateType } from '../types'
import { SystemActionType } from '../actions/systemAction'

const iniSystemState: systemStateType = {
  dataset: 'data1',
  showBigGraph: true,
  showSparkLine: true,
  selectedCards: [''],
}

const systemReducer = (state = iniSystemState, action: SystemActionType) => {
  switch (action.type) {
    case 'CHANGE_SYSTEM_ACTION':
      return action.payload
    default:
      return state
  }
}

export default systemReducer
