import { StoreActionType, CHANGE_FONT, CHANGE_COLOR } from "../actions/storeAction"
import { storeType } from "../types"
const iniState: storeType = {
    color:"Blue",
    font:"16px"
}

export const storeReducer = (state = iniState, action:StoreActionType)=>{
switch(action.type){
    case CHANGE_COLOR:
        return {
            ...state,
            color:action.payload
        }
    case CHANGE_FONT:
        return {
            ...state,
            font:action.payload
        }
    default:
        return state
}

}
