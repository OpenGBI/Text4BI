import os
print(os.getcwd())
import pandas as pd
import matplotlib.pyplot as plt
import copy
from cardsTemplates1.iniData import iniData
from cardsTemplates1.PeriodicityData import PeriodicityData
# 读取Global Superstore的CSV文件
data = pd.read_csv(r'./Datasets/Global Superstore.csv')
def changeTemporalPeriodly(timeSegmentationCondition):
    new_data=copy.deepcopy(PeriodicityData)
    timeSeg=0
    filtered_data=[]

    if timeSegmentationCondition=="4 years":
        filtered_data = [entry for entry in new_data["data"] if entry["date"] < "2015-01-01"]

    if timeSegmentationCondition=="3 years":
        filtered_data = [entry for entry in new_data["data"] if entry["date"] < "2014-01-01"]

    if timeSegmentationCondition=="2 years":
        filtered_data = [entry for entry in new_data["data"] if entry["date"] < "2013-01-01"]

    new_data["data"]=filtered_data
    # abnormal_data = [item for item in data if item["category"] == "abnormal"]
    



    target=0
    for item in iniData:
        if item["paragraph"][-1]["chartType"] == "TemporalPeriodicity":
            target=item
            break
   
    # print(target["paragraph"][0]["phrases"][-1]["value"].split(" ")[:-1].join(" "))
    #修改大图数据
<<<<<<< HEAD
    target["paragraph"][-2]["metadata"]["detail"]=new_data["data"]
    # #修改bullet point
    # topics = [paragraph for paragraph in target['paragraph'] if paragraph['type'] == 'normal']
    # for i in range(0,len(topics)):
    #     for phrase in topics[i]['phrases']:
    #         if phrase.get('metadata', {}).get('entityType') == 'binary_value':
    #             phrase["value"]=len(abnormal_data)
    #             break
    #     for phrase in topics[i]['phrases']:
    #         if phrase.get('metadata', {}).get('entityType') == 'insight':
    #             phrase["metadata"]["detail"]=new_data["data"]
    #             break
    #     for phrase in topics[i]['phrases']:
    #         if phrase.get('metadata', {}).get('entityType') == 'metric_value':
    #             phrase["metadata"]["origin"]=timeSeg
    #             phrase["value"]=str(timeSeg)+" "
    #             break
    # topics = [paragraph for paragraph in target['paragraph'] if paragraph['type'] == 'bullet']
    # for i in range(0,len(topics)):
    #     if(i>=len(abnormal_data)):
    #         topics[i]['show']="no"
    #         continue
    #     del topics[i]['show']
    #     topics[i]["phrases"][1]["value"]=abnormal_data["date"]
    #     for phrase in topics[i]['phrases']:
    #         if phrase.get('metadata', {}).get('entityType') == 'metric_value':
    #             phrase["value"]=str(round(abnormal_data["value"],2))
    #             phrase["metadata"]["origin"]=round(abnormal_data["value"],2)
    #             break
    #     for phrase in topics[i]['phrases']:
    #         if phrase.get('metadata', {}).get('entityType') == 'binary_value':
    #             phrase["value"]=str(round(abnormal_data["predict"],2))
    #             phrase["metadata"]["origin"]=round(abnormal_data["predict"],2)
    #             break
=======
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
>>>>>>> refs/remotes/origin/dev-all

    
    # for item in data:
    #     if item["paragraph"][-1]["chartType"] == "Proportion":
    #         item=target
    #         break
    return iniData

