import os
print(os.getcwd())
import pandas as pd
import matplotlib.pyplot as plt
from cardsTemplates1.iniData import iniData
# 读取Global Superstore的CSV文件
data = pd.read_csv(r'./Datasets/Global Superstore.csv')
def changeDifference(timeSelection):
    data['OrderDate'] = pd.to_datetime(data['OrderDate'])

# 定义时间段
    time11 = timeSelection[0]
    time12 = timeSelection[1]
    time21 = timeSelection[2]
    time22 = timeSelection[3]
    filtered_df_time1 = data[(data['OrderDate'] >= time11) & (data['OrderDate'] <= time12)]
    filtered_df_time2 = data[(data['OrderDate'] >= time21) & (data['OrderDate'] <= time22)]
    sales_sum_time1 = filtered_df_time1['Sales'].sum()
    sales_sum_time2 = filtered_df_time2['Sales'].sum()
    data_export = [
        {"value": sales_sum_time1, "category": "time1"},
        {"value": sales_sum_time2, "category": "time2"},
    ]
    export_json={"data":data_export}


    target=0
    for item in iniData:
        if item["paragraph"][-1]["chartType"] == "TemporalDifference":
            target=item
            break
    # if(data_export[1]["value"]>data_export[0]["value"]):

    # print(target["paragraph"][0]["phrases"][-1]["value"].split(" ")[:-1].join(" "))
    #修改大图数据
    target["paragraph"][-2]["metadata"]["detail"]=data_export
    #修改bullet point
    topics = [paragraph for paragraph in target['paragraph'] if paragraph['type'] == 'normal']
    for i in range(0,len(topics)):
        for phrase in topics[i]['phrases']:
            if phrase.get('metadata', {}).get('entityType') == 'insight_desc':
                if data_export[1]["value"]>data_export[0]["value"]:
                    phrase["value"]="increase"
                else:
                    phrase["value"]="decrease"
                break
        for phrase in topics[i]['phrases']:
            if phrase.get('metadata', {}).get('entityType') == 'delta_value_ratio':
                phrase["value"]=str(round((data_export[1]["value"]/data_export[0]["value"]-1)*100,2))+"%"
                if data_export[1]["value"]>data_export[0]["value"]:
                    phrase["metadata"]["assessment"]="positive"
                else:
                    phrase["metadata"]["assessment"]="negative"
                break
        for phrase in topics[i]['phrases']:
            if phrase.get('metadata', {}).get('entityType') == 'insight':             
                phrase["value"]="("+str(round(data_export[0]["value"],2))+" → "+str(round(data_export[1]["value"],2))+")"
                phrase["detail"]=data_export
                
    return iniData

