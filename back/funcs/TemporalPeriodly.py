import os
print(os.getcwd())
import pandas as pd
import matplotlib.pyplot as plt
from cardsTemplates1.iniData import iniData
# 读取Global Superstore的CSV文件
data = pd.read_csv(r'./Datasets/Global Superstore.csv')
def changeTemporalPeriodly(timeSegmentationCondition):
    # 假设df是您的完整DataFrame，并且所有列名都是正确的
    data['OrderDate'] = pd.to_datetime(data['OrderDate'])
    data['Year'] = data['OrderDate'].dt.year
    data['Month'] = data['OrderDate'].dt.month

    # 分组并聚合数据
    monthly_summary = data.groupby(['Year', 'Month']).agg({
        'Sales': 'sum',
        'Profit': 'sum',
        'Quantity': 'sum',
        'ShippingCost': 'sum'
    }).reset_index()

    # 新增一列"YearMonth"，将"Year"和"Month"组合成日期格式
    # 这里我们创建一个日期，假设每个月的第一天
    monthly_summary['YearMonth'] = pd.to_datetime(monthly_summary['Year'].astype(str) + '-' + monthly_summary['Month'].astype(str) + '-01')
    data_export = [{"date": row.YearMonth.strftime('%Y-%m-%d'),  # 使用strftime将日期转换为字符串
                 "value": row.Sales, "category": "none" } for _, row in monthly_summary.iterrows()]
    export_json = {"data": data_export,"tagData":[data_export[0],data_export[12],data_export[12],data_export[24]]}



    target=0
    for item in iniData:
        if item["paragraph"][-1]["chartType"] == "TemporalPeriodicity":
            target=item
            break
    
    # print(target["paragraph"][0]["phrases"][-1]["value"].split(" ")[:-1].join(" "))
    #修改大图数据
    target["paragraph"][-2]["metadata"]["detail"]=export_json["data"]
    target["paragraph"][-2]["metadata"]["tagData"]=export_json["tagData"]
    #修改bullet point
    topics = [paragraph for paragraph in target['paragraph'] if paragraph['type'] == 'bullet']
    for i in range(0,len(topics)):
        for phrase in topics[i]['phrases']:
            if phrase.get('metadata', {}).get('entityType') == 'metric_names':
                phrase["value"]=export_json["data"][i]["category"]
                break
        for phrase in topics[i]['phrases']:
            if phrase.get('metadata', {}).get('entityType') == 'metric_value':
                phrase["value"]=str(round(export_json["data"][i]["value"]*100,2))+"%"
                phrase["metadata"]["origin"]=export_json["data"][i]["value"]
                
                phrase["metadata"]["detail"]=[export_json["data"][i]["value"],1-export_json["data"][i]["value"]]
                break

    
    # for item in data:
    #     if item["paragraph"][-1]["chartType"] == "Proportion":
    #         item=target
    #         break
    return iniData

