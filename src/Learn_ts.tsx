import React, { useState, useEffect } from 'react';

import ReactDOM from 'react-dom';
import { Spin } from 'antd';
import { getInsights } from '@antv/ava';
import { JSONView, TableView, StepBar } from 'antv-site-demo-rc';

// 1.元组
const new_list:[string,string,number,number] = ["a","b",33,99]
new_list[0]= "7"
new_list.push(23)
console.log(new_list)
const arr2:[1,2,3] = [1,2,3]
let b:any = 4
arr2[1] = b
// arr2[1] = 5 不合法
const arry3:readonly [number,string]  =[3,"a"]
// arry3[2] = 9 不合法，为了提高可读性，尽量多写readonly
// 2.列表
const list1:Array<number>=[2,3,4]
const list2:string[] = ["s","sss","9yhu8i"]

// const list3:string[] = [22,"sss","9yhu8i"] 不合法


type CalcRectArea = (width: number, height: number) => number;
// 这部分声明了函数的类型，是一个传入两个number传出一个number的函数
const calcRectArea2: CalcRectArea = function(width, height) {
  return width * height;
};
const calcRectArea3: (width: number, height: number) => number = function(width, height):number {
    return width * height;
  };

const calcRectArea4 = (width:number, height:number) => {
  return width * height;
};
function calcRectArea5(width:number, height:number)
{
    return width*height
}
// 不搞花里胡哨的
function calcRectArea6(width:number, height?:number){
    return width * (height === undefined ? 0 : height);
}
// 可选参数
function calcRectArea7(width:number,height:number=0){
    return width*height
}
// 默认参数
// function calcRectArea8(width:number, height?:number=0){
//     return width*height
// }不合法
const Learn_ts = () => {
    console.log(calcRectArea2(7,3))
    console.log(calcRectArea3(8,3))
    console.log(calcRectArea4(9,3))
    console.log(calcRectArea4(10,3))
    const a:readonly number[]=[1,2,3]
    const b:ReadonlyArray<string> = ["sss","fff"]
    
  return (
    <div>
      AAA
    </div>
  );
};

export default Learn_ts;
