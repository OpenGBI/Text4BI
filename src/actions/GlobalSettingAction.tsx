<<<<<<< HEAD
export const CHANGE_GLOBAL_SETTING = 'CHANGE_GLOBAL_SETTING';

export type GlobalSetting = {
	color?: string;
	boldness?: boolean;
	underline?: boolean;
	fontSize?: string;
	bgColor?: string;
	bulletPoint?: boolean;
	lineHeight?: number;
	sparkLinePosition?: string;
	aspectRatio?: string;
};

export type ChangeGlobalSettingAction = {
	type: string;
	payload: GlobalSetting;
};
export const ChangeGlobalSetting = (setting: GlobalSetting) => ({
	type: CHANGE_GLOBAL_SETTING,
	payload: setting,
});
=======
// "color":string,
//     "boldness":boolean,
//     "underline":boolean,
//     "fontsize":string,
//     "backgroundColor":string,
//     "bulletPoint":boolean,
//     "lineHeight":number,
//     "sparklinePosition":string,//上下左右
//     "aspectRatio":string,//​短（1:1）、中（4:3）、长（16:9） 

export const CHANGE_COLOR = "CHANGE_COLOR"
export const CHANGE_BOLDNESS="CHANGE_BOLDNESS"
export const CHANGE_UNDERLINE = "CHANGE_UNDERLINE"
export const CHANGE_FONTSIZE = "CHANGE_FONTSIZE"
export const CHANGE_BG_COLOR = "CHANGE_BG_COLOR"
export const CHANGE_BULLET_POINT = "CHANGE_BULLET_POINT"
export const CHANGE_LINE_HEIGHT = "CHANGE_LINE_HEIGHT"
export const CHANGE_SPARK_LINE_POSITION = "CHANGE_SPARK_LINE_POSITION"
export const CHANGE_ASPECT_RATIO = "CHANGE_ASPECT_RATIO"

type ChangeColorAction = {
    type: string,
    payload:string
}
type ChangeBoldnessAction = {
    type: string,
    payload:boolean
}
type ChangeUnderlineAction = {
    type: string,
    payload:boolean
}
type ChangeFontsizeAction = {
    type: string,
    payload:string
}
type ChangeBgColorAction = {
    type: string,
    payload:string
}
type ChangeBulletPointAction = {
    type: string,
    payload:boolean
}
type ChangeLineHeightAction = {
    type: string,
    payload:number
}
type ChangeSparkLinePositionAction = {
    type: string,
    payload:string
}
type ChangeAspectRatioAction = {
    type: string,
    payload:string
}
export type GlobalSettingActionType = ChangeAspectRatioAction|ChangeBoldnessAction|ChangeUnderlineAction|ChangeFontsizeAction|ChangeBgColorAction
|ChangeBulletPointAction|ChangeLineHeightAction|ChangeSparkLinePositionAction|ChangeColorAction

export const ChangeColor = (color:string)=>({
    type:CHANGE_COLOR,
    payload:color
})
export const ChangeBoldness = (boldness:boolean)=>({
    type:CHANGE_BOLDNESS,
    payload:boldness
})
export const ChangeUnderline = (underline:boolean)=>({
    type:CHANGE_UNDERLINE,
    payload:underline
})
export const ChangeFontsize = (fontsize:string)=>({
    type:CHANGE_FONTSIZE,
    payload:fontsize
})
export const ChangeBgColor = (bgcolor:string)=>({
    type:CHANGE_BG_COLOR,
    payload:bgcolor
})
export const ChangeBulletPoint = (bulletPoint:boolean)=>({
    type:CHANGE_BULLET_POINT,
    payload:bulletPoint
})
export const ChangeLineHeight = (lineHeight:number)=>({
    type:CHANGE_LINE_HEIGHT,
    payload:lineHeight
})
export const ChangeSparkLinePosition = (sparkLinePosition:string)=>({
    type:CHANGE_SPARK_LINE_POSITION,
    payload:sparkLinePosition
})
export const ChangeAspectRatio = (aspectRatio:string)=>({
    type:CHANGE_ASPECT_RATIO,
    payload:aspectRatio
})




>>>>>>> cfbc02f314e6d3f8d31d7819ca4913ebee1825d6
