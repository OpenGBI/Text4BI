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
