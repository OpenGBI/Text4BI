import os
print(os.getcwd())
import pandas as pd
import matplotlib.pyplot as plt
from cardsTemplates1.iniData import iniData
from cardsTemplates1.TrendData import TrendData
import copy
# 读取Global Superstore的CSV文件
data = pd.read_csv(r'./Datasets/Global Superstore.csv')
def changeTemporalTrend2(timeSegmentationCondition,timeSelection):
    new_data=copy.deepcopy(TrendData)
    timeSeg=0
    filtered_data=[]
    if timeSegmentationCondition=="365 days":
        filtered_data = [entry for entry in new_data["data"] if entry["date"] > "2011-01-01"]
    if timeSegmentationCondition=="30 days":
        filtered_data = [entry for entry in new_data["data"] if entry["date"] > "2011-12-01"]
    if timeSegmentationCondition=="7 days":
        filtered_data = [entry for entry in new_data["data"] if entry["date"] > "2011-12-23"]
    filtered_predict_data=[entry for entry in new_data["predictData"] if entry["date"] < timeSelection[0]]
    print(timeSelection[0])
    print(filtered_predict_data)
    tag_data=[filtered_data[0],filtered_data[-1],filtered_predict_data[1],filtered_predict_data[-1]]
    new_data["data"]=filtered_data
    new_data["predictData"]=filtered_predict_data
    new_data["tagData"]=tag_data

    



    target=0
    for item in iniData:
        if item["paragraph"][-1]["chartType"] == "TemporalTrend":
            target=item
            break
   
    # print(target["paragraph"][0]["phrases"][-1]["value"].split(" ")[:-1].join(" "))
    #修改大图数据
    target["paragraph"][-2]["metadata"]["detail"]=new_data["data"]+new_data["predictData"]
    target["paragraph"][-2]["metadata"]["tagData"]=new_data["tagData"]
    
    topics = [paragraph for paragraph in target['paragraph'] if paragraph['type'] == 'normal']
    count=0
    print(new_data["predictData"][0]["value"])
    print(new_data["predictData"][-1]["value"])
    for i in range(0,len(topics)):
        count+=1
        for phrase in topics[i]['phrases']:
            entity_type = phrase.get('metadata', {}).get('entityType')
            # print(entity_type)
            if entity_type is not None and entity_type.startswith("binary_value") and count==1:
                phrase["metadata"]["detail"]=new_data["data"]
                phrase["metadata"]["tagData"]=new_data["predictData"]
                if new_data["data"][0]["value"]<new_data["data"][-1]["value"]:
                    phrase["value"]="increased "
                    phrase["metadata"]["entityType"]= "binary_value_positive"
                    phrase["metadata"]["assessment"]="increase"
                else:
                    phrase["value"]="decreased "
                    phrase["metadata"]["entityType"]= "binary_value_negative"
                    phrase["metadata"]["assessment"]="decrease"
                break
            if entity_type is not None and entity_type.startswith("binary_value") and count==2:
                if new_data["predictData"][0]["value"]<new_data["predictData"][-1]["value"]:
                    phrase["value"]="increasing "
                    phrase["metadata"]["entityType"]="binary_value_positive"
                    phrase["metadata"]["assessment"]="increase"
                else:
                    phrase["value"]="decreasing "
                    phrase["metadata"]["entityType"]="binary_value_negative"
                    phrase["metadata"]["assessment"]="decrease"
                # if new_data["predictData"]["value"][0]<new_data["predictData"]["value"][1]:
                #     phrase["metadata"]["tagData"]["entityType"]= "binary_value_positive",
                # else:
                #     phrase["metadata"]["tagData"]["entityType"]= "binary_value_negative",
                break
        for phrase in topics[i]['phrases']:
            if phrase.get('metadata', {}).get('entityType') == 'metric_value':
                phrase["value"]=str(round(new_data["predictData"][-1]["value"],2))
                phrase["metadata"]["origin"]=round(new_data["predictData"][-1]["value"],2)
                break

    
    # for item in data:
    #     if item["paragraph"][-1]["chartType"] == "Proportion":
    #         item=target
    #         break
    return iniData

