export type textType = 'text' | 'escape' | 'formula' | 'entity' | 'custom';
export type sceneType = {
    "background": string;
};
export type TextPhraseSpecType = {
    "type": textType;
    "value": string;
    "bold"?: boolean;
    "italic"?: boolean;
    "underline"?: boolean;
    "url"?: string;
    "fontSize":number;
    "fontColor"?: "#000000";
    "fontWeight": "normal";      
    } | null;
export type EscapePhraseSpecType = {
        "value": string;//转义字符
    } | null;
export type FormulaPhraseSpecType = {
        "value": string//latex吗
      } | null;
export type entityType =  
      'metric_name'|
      'metric_value'|
      'other_metric_value'|
      'contribute_ratio'|
      'delta_value'|
      'ratio_value'|
      'trend_desc'|
      'dim_value'|
      'time_desc'|
      'proportion';
export type styleType =  {
    "font": string;
      "fontSize": number;
      "fontColor": string;
      "fontWeight": string;//粗细
      "textDecoration": string;
      "textAlign": string;
      "lineHeight": number;
      "letterSpacing": number;
  }
export type entity = {
    value: string;
    entityType: entityType;
    origin: number;
    assessment: string;
    generateVariableInfo: string;
    style: styleType;
} 
export type globalStateType = {
    type: textType;
    scene: sceneType;
    TextPhraseSpec: TextPhraseSpecType;
    EscapePhraseSpec: EscapePhraseSpecType;
    FormulaPhraseSpec: FormulaPhraseSpecType;
    entity: entity;
}
