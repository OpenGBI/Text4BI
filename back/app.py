from flask import Flask, jsonify, request
from flask_cors import CORS
import json

from cardsTemplates1.iniData import iniData
from funcs.Proportion import changeProportion
from funcs.Distribution import changeDistribution
from funcs.Categorization import changeCategorization
from funcs.Difference import changeDifference
from funcs.TemporalTrend import changeTemporalTrend
from funcs.TemporalPeriodly import changeTemporalPeriodly
app = Flask(__name__)
CORS(app)  # 允许跨域请求

@app.route('/hello')
def hello_world():
    return jsonify({'message': 'Hello, from Flask!'})


# @app.route('/distribution', methods=['POST'])
# def get_distribution_data():
#     print("start distribution")
#     data = request.json  
#     start_time = data.get('startTime')
#     end_time = data.get('endTime')
#     # get_distribution_data(start_time,end_time)
#     with open('./cardsTemplates/Cards1.json', 'r') as file:
#         # 加载JSON数据
#         data = json.load(file)
#     print("get data")
#     return jsonify(data)
@app.route('/Categorization', methods=['POST'])
def get_categorization_data():
    data = request.json  
    drillDownGroup = data.get('drillDownGroup')
    chartType=data.get("chartType")
    print(drillDownGroup)
    # get_distribution_data(start_time,end_time)
    # with open('./cardsTemplates/Cards2.json', 'r') as file:
    #     # 加载JSON数据
    #     data = json.load(file)
    res = changeCategorization(drillDownGroup)
    print("get data")
    return jsonify(res)
@app.route('/Distribution', methods=['POST'])
def get_distribution_data():
    print("start Distribution")
    data = request.json  
    timeSelection = data.get('timeSelection')
    print(timeSelection)
    # get_distribution_data(start_time,end_time)
    # with open('./cardsTemplates/Cards2.json', 'r') as file:
    #     # 加载JSON数据
    #     data = json.load(file)
    res = changeDistribution(timeSelection)
    print("get data")
    return jsonify(res)
@app.route('/Difference', methods=['POST'])
def get_difference_data():
    print("start Distribution")
    data = request.json  
    timeSelection = data.get('timeSelection')
    print(timeSelection)
    # get_distribution_data(start_time,end_time)
    # with open('./cardsTemplates/Cards2.json', 'r') as file:
    #     # 加载JSON数据
    #     data = json.load(file)
    res = changeDifference(timeSelection)
    print("get data")
    return jsonify(res)
@app.route('/Proportion', methods=['POST'])
def get_proportion_data():
    print("start Proportion")
    data = request.json  
    timeSelection = data.get('timeSelection')
    drillDownGroup = data.get('drillDownGroup')
    chartType=data.get("chartType")
    print(timeSelection)
    print(drillDownGroup)
    # get_distribution_data(start_time,end_time)
    # with open('./cardsTemplates/Cards2.json', 'r') as file:
    #     # 加载JSON数据
    #     data = json.load(file)
    res = changeProportion(timeSelection,drillDownGroup)
    print("get data")
    return jsonify(res)

@app.route('/TemporalPeriodly', methods=['POST'])
def get_TemporalPeriodly_data():
    data = request.json  
    timeSegmentationCondition = data.get('timeSegmentationCondition')
    chartType=data.get("chartType")
    print(timeSegmentationCondition)
    # get_distribution_data(start_time,end_time)
    # with open('./cardsTemplates/Cards2.json', 'r') as file:
    #     # 加载JSON数据
    #     data = json.load(file)
    res = changeTemporalPeriodly(timeSegmentationCondition)
    print("get data")
    return jsonify(res)
@app.route('/TemporalTrend', methods=['POST'])
def get_TemporalTrend_data():
    data = request.json  
    timeSegmentationCondition = data.get('timeSegmentationCondition')
    timeSelection = data.get('timeSelection')
    chartType=data.get("chartType")
    # get_distribution_data(start_time,end_time)
    # with open('./cardsTemplates/Cards2.json', 'r') as file:
    #     # 加载JSON数据
    #     data = json.load(file)
    res = changeTemporalTrend(timeSegmentationCondition,timeSelection)
    print("get data")
    return jsonify(res)


if __name__ == '__main__':
    app.run(debug=True)


