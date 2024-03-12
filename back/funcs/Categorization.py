import os
print(os.getcwd())
import pandas as pd
import matplotlib.pyplot as plt
from cardsTemplates1.iniData import iniData
# 读取Global Superstore的CSV文件
data = pd.read_csv(r'./Datasets/Global Superstore.csv')
def changeCategorization(drillDownGroup):
    grouped_by = data.groupby(drillDownGroup)['Sales'].sum().reset_index().sort_values(by='Sales', ascending=False)
    data_export = [{"category": row.drillDownGroup, "value": row.Sales} for _, row in grouped_by.iterrows()]

    # 组合最终的JSON对象
    export_json = {"data": data_export}

    target=0
    for item in iniData:
        if item["paragraph"][-1]["chartType"] == "Categorization":
            target=item
            break
    #修改题目
    target["paragraph"][0]["phrases"][-2]["value"]=drillDownGroup
    #修改大图数据
    target["paragraph"][-2]["metadata"]["detail"]=data_export
    #修改bullet point
    topics = [paragraph for paragraph in target['paragraph'] if paragraph['type'] == 'bullet']
    for i in range(0,len(topics)):
        for phrase in topics[i]['phrases']:
            if phrase.get('metadata', {}).get('entityType') == 'dim_cate':
                phrase["value"]=export_json["data"][i]["category"]
                break
        for phrase in topics[i]['phrases']:
            if phrase.get('metadata', {}).get('entityType') == 'insight':
                phrase["value"]=str(round(export_json["data"][i]["value"]*100,2))+"%"
                phrase["metadata"]["origin"]=export_json["data"][i]["value"]
                phrase["metadata"]["detail"]=export_json["data"]
                break

    return iniData

