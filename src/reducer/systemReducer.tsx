<<<<<<< HEAD
import { systemStateType } from '../types';
import { SystemActionType } from '../actions/systemAction';

const iniSystemState: systemStateType = {
	dataset: 'data1',
	showBigGraph: true,
	showSparkLine: true,
	selectedCard: ['Card1', 'Card2'],
};

export const systemReducer = (state = iniSystemState, action: SystemActionType) => {
	switch (action.type) {
		case 'CHANGE_SYSTEM_ACTION':
			return action.payload;
		default:
			return state;
	}
};
=======
import { systemStateType } from "../types";
import { systemActionType } from "../actions/systemAction";

const iniSystemState:systemStateType={
    dataset:"data1",
        showBigGraph:true,
        showSparkLine:true,
        selectedCard:["Card1","Card2"]
}

export const systemReducer = (state=iniSystemState,action:systemActionType)=>{
    switch(action.type){
        case "CHANGE_DATASET":
            return {
                ...state,
                Dataset:action.payload
            };
        case "CHANGE_SHOW_BIG_GRAPH":
            return {
                ...state,
                showBigGraph:action.payload
            };
        case "CHANGE_SHOW_SPARK_LINE":
            return {
                ...state,
                showSparkLine:action.payload
            };
        case "CHANGE_SELECTED_CARDS":
            return {
                ...state,
                selectedCard:action.payload
            };
        default:
            return state
    }
}





>>>>>>> cfbc02f314e6d3f8d31d7819ca4913ebee1825d6
