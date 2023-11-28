import { systemStateType } from '../types'
import { SystemActionType } from '../actions/systemAction'
import { iniData } from '../utils/iniData'

const iniSystemState: systemStateType = {
  dataset: iniData,
  showBigGraph: true,
  showSparkLine: true,
  selectedCards: ['Card1', 'Card2', 'Card3', 'Card4', 'Card5'],
  allCards: ['Card1', 'Card2', 'Card3', 'Card4', 'Card5'],
}
export const SET_DATASET = 'SET_DATASET'

const systemReducer = (state = iniSystemState, action: SystemActionType) => {
  switch (action.type) {
    case 'CHANGE_SYSTEM_ACTION':
      return action.payload
    default:
      return state
  }
}

export default systemReducer
