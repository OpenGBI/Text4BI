from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from utils.getDistributionData import get_distribution_data
app = Flask(__name__)
CORS(app)  # 允许跨域请求

@app.route('/hello')
def hello_world():
    return jsonify({'message': 'Hello, from Flask!'})


@app.route('/distribution', methods=['POST'])
def get_distribution_data():
    print("start distribution")
    data = request.json  
    start_time = data.get('startTime')
    end_time = data.get('endTime')
    # get_distribution_data(start_time,end_time)
    with open('./cardsTemplates/Cards1.json', 'r') as file:
        # 加载JSON数据
        data = json.load(file)
    print("get data")
    return jsonify(data)
if __name__ == '__main__':
    app.run(debug=True)
