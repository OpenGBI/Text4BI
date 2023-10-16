<<<<<<< HEAD
import { GlobalSettingStateType } from '../types';
import { ChangeGlobalSettingAction } from '../actions/GlobalSettingAction';
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
};

export const GlobalSettingReducer = (state = iniGlobalSettingState, action: ChangeGlobalSettingAction) => {
	if (action.type === 'CHANGE_GLOBAL_SETTING') return action.payload;
	else return state;
};
=======
import { GlobalSettingStateType } from "../types";
import { GlobalSettingActionType } from "../actions/GlobalSettingAction";
const iniGlobalSettingState: GlobalSettingStateType = {
    "color": "Blue",
    "boldness": false,
    "underline": false,
    "fontsize": "16px",
    "backgroundColor": "white",
    "bulletPoint": false,
    "lineHeight": 1.5,
    "sparkLinePosition": "up",
    "aspectRatio": "tiny"
};
export const GlobalSettingReducer = (state = iniGlobalSettingState, action:GlobalSettingActionType) => {
    switch (action.type) {
        case "CHANGE_COLOR":
            return {
                ...state,
                color: action.payload
            };
        case "CHANGE_BOLDNESS":
            return {
                ...state,
                boldness: action.payload
            };
        case "CHANGE_UNDERLINE":
            return {
                ...state,
                underline: action.payload
            };
        case "CHANGE_FONTSIZE":
            return {
                ...state,
                fontsize: action.payload
            };
        case "CHANGE_BG_COLOR":
            return {
                ...state,
                backgroundColor: action.payload
            };
        case "CHANGE_BULLET_POINT":
            return {
                ...state,
                bulletPoint: action.payload
            };
        case "CHANGE_LINE_HEIGHT":
            return {
                ...state,
                lineHeight: action.payload
            };
        case "CHANGE_SPARK_LINE_POSITION":
            return {
                ...state,
                sparkLinePosition: action.payload
            };
        case "CHANGE_ASPECT_RATIO":
            return {
                ...state,
                aspectRatio: action.payload
            };
        default:
            return state;
    }
}




>>>>>>> cfbc02f314e6d3f8d31d7819ca4913ebee1825d6
