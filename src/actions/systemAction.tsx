export const CHANGE_SYSTEM_ACTION = 'CHANGE_SYSTEM_ACTION';
export type GlobalSettingPayload = {
	dataset?: string;
	showBigGraph?: boolean;
	showSparkLine?: boolean;
	selectedCards?: string[];
};

export type SystemActionType = {
	type: string;
	payload: GlobalSettingPayload;
};

export const ChangeSystemSetting = (setting: GlobalSettingPayload) => ({
	type: CHANGE_SYSTEM_ACTION,
	payload: setting,
});
