import os
print(os.getcwd())
import pandas as pd
import matplotlib.pyplot as plt
from cardsTemplates1.iniData import iniData
from cardsTemplates2.iniData2 import iniData2
from cardsTemplates3.iniData3 import iniData3
# 读取Global Superstore的CSV文件
def change_datasets(dataset):
    if(dataset=="Data1"):
        return iniData
    if(dataset=="Data2"):
        return iniData2
    if(dataset=="Data3"):
        return iniData3
    return iniData
