export type storeType = {
<<<<<<< HEAD
	color: string;
	font: string;
};

export type systemStateType = {
	dataset: string;
	showBigGraph: boolean;
	showSparkLine: boolean;
	selectedCard: string[];
};
export type GlobalSettingStateType = {
	color: string;
	boldness: boolean;
	underline: boolean;
	fontsize: string;
	backgroundColor: string;
	bulletPoint: boolean;
	lineHeight: number;
	sparkLinePosition: string;
	aspectRatio: string;
};
=======
    color:string,
    font:string,
}

export type systemStateType = {
    
        "dataset":string,
        "showBigGraph":boolean,
        "showSparkLine":boolean,
        "selectedCard":string[]
      
}
export type GlobalSettingStateType = {
    "color":string,
    "boldness":boolean,
    "underline":boolean,
    "fontsize":string,
    "backgroundColor":string,
    "bulletPoint":boolean,
    "lineHeight":number,
    "sparkLinePosition":string,//上下左右
    "aspectRatio":string,//​短（1:1）、中（4:3）、长（16:9） 
}

>>>>>>> cfbc02f314e6d3f8d31d7819ca4913ebee1825d6
