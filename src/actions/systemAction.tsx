// export const CHANGE_DATASET = 'CHANGE_DATASET';
// export const CHANGE_SHOW_BIG_GRAPH = 'CHANGE_SHOW_BIG_GRAPH';
// export const CHANGE_SHOW_SPARK_LINE = 'CHANGE_SHOW_SPARK_LINE';
// export const CHANGE_SELECTED_CARDS = 'CHANGE_SELECTED_CARDS';

// type ChangeDatasetType = {
// 	type: typeof CHANGE_DATASET;
// 	payload: string;
// };
// type ChangeShowBigGraphType = {
// 	type: typeof CHANGE_SHOW_BIG_GRAPH;
// 	payload: boolean;
// };
// type ChangeShowSparkLineType = {
// 	type: typeof CHANGE_SHOW_SPARK_LINE;
// 	payload: boolean;
// };
// type ChangeSelectedCardsType = {
// 	type: typeof CHANGE_SELECTED_CARDS;
// 	payload: string[];
// };

// export type systemActionType =
// 	| ChangeDatasetType
// 	| ChangeShowBigGraphType
// 	| ChangeShowSparkLineType
// 	| ChangeSelectedCardsType;
// export const ChangeDataset = (Dataset: string) => ({
// 	type: CHANGE_DATASET,
// 	payload: Dataset,
// });
// export const ChangeShowBigGraph = (showBigGraph: boolean) => ({
// 	type: CHANGE_SHOW_BIG_GRAPH,
// 	payload: showBigGraph,
// });
// export const ChangeShowSparkLine = (ShowSparkLine: boolean) => ({
// 	type: CHANGE_SHOW_SPARK_LINE,
// 	payload: ShowSparkLine,
// });
// export const ChangeSelectedCards = (SelectedCards: string[]) => ({
// 	type: CHANGE_SELECTED_CARDS,
// 	payload: SelectedCards,
// });

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
