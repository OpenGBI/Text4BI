import React, { useMemo, useState, useEffect } from "react";

import ReactDOM from "react-dom";
import { Spin } from "antd";
import { getInsights } from "@antv/ava";
import { InsightCard } from "@antv/ava-react";
import { JSONView, TableView, StepBar } from "antv-site-demo-rc";

const AutoInsightVis = () => {
  const data = useMemo(() => [
    {
      date: "2019-08-01",
      discount_price: 727.12,
    },
    {
      date: "2019-08-02",
      discount_price: 729.59,
    },
    {
      date: "2019-08-03",
      discount_price: 730.21,
    },
    {
      date: "2019-08-04",
      discount_price: 732.11,
    },
    {
      date: "2019-08-05",
      discount_price: 733.22,
    },
    {
      date: "2019-08-06",
      discount_price: 741.19,
    },
    {
      date: "2019-08-07",
      discount_price: 742.37,
    },
    {
      date: "2019-08-08",
      discount_price: 752.34,
    },
    {
      date: "2019-08-09",
      discount_price: 761.12,
    },
    {
      date: "2019-08-10",
      discount_price: 783.99,
    },
    {
      date: "2019-08-11",
      discount_price: 791.23,
    },
    {
      date: "2019-08-12",
      discount_price: 781.99,
    },
    {
      date: "2019-08-13",
      discount_price: 835.71,
    },
    {
      date: "2019-08-14",
      discount_price: 839.24,
    },
    {
      date: "2019-08-15",
      discount_price: 883.51,
    },
    {
      date: "2019-08-16",
      discount_price: 873.98,
    },
    {
      date: "2019-08-17",
      discount_price: 802.78,
    },
    {
      date: "2019-08-18",
      discount_price: 807.05,
    },
    {
      date: "2019-08-19",
      discount_price: 885.12,
    },
    {
      date: "2019-08-20",
      discount_price: 1018.85,
    },
    {
      date: "2019-08-21",
      discount_price: 934.49,
    },
    {
      date: "2019-08-22",
      discount_price: 908.74,
    },
    {
      date: "2019-08-23",
      discount_price: 930.55,
    },
    {
      date: "2019-08-24",
      discount_price: 978.53,
    },
    {
      date: "2019-08-25",
      discount_price: 931.47,
    },
    {
      date: "2019-08-26",
      discount_price: 891,
    },
    {
      date: "2019-08-27",
      discount_price: 836.41,
    },
    {
      date: "2019-08-28",
      discount_price: 826.11,
    },
    {
      date: "2019-08-29",
      discount_price: 820.11,
    },
    {
      date: "2019-08-30",
      discount_price: 811.11,
    },
  ],[]);
  const [result, setResult] = useState({});
  //   函数式组件中新建state的方法，setResult是对应更新result的函数
  console.log("resultresultresultresultresultresultresultresultresult")
  console.log(result);
  const [insightLoading, setInsightLoading] = useState(true);
  console.log(insightLoading);
  const [currentStep, setCurrentStep] = useState(0);
  console.log(currentStep);
  console.log(result);
  const getMyInsights = async () => {
    if (data) {
      const insightResult = getInsights(data, {
        limit: 60,
        dimensions: [{ fieldName: "date" }],
        measures: [{ fieldName: "discount_price", method: "SUM" }],
        visualization: true,
      });
      setResult(insightResult);
      setInsightLoading(false);
    }
  };

  useEffect(() => {
    getMyInsights();
  }, []);
  // useEffect(callback, deps?)
  // useEffect 接收两个参数，第一个是必传的 callback，第二个是选传的 dependencies, 类型为列表。例如 [a, b]。
  // 可以理解为，每当 dependencies 中的一个或多个元素发生改变时，都会去执行一遍 callback.
  // 两个特殊情况是：
  // 1. deps 为空列表 [], 则 callback 只会在组件 mount 时被执行。
  // 2. 不传入 deps 参数，则每当 state 或者 props 发生变化（组件重新渲染）时，callback 都会被执行。
  const dataContent = <TableView data={data} />;

  const insightsContent = (
    <JSONView json={result} rjvConfigs={{ collapsed: 2 }} />
  );

  const plotContent = (
    // <div key="plot" style={{ flex: 5, height: "100%" }}>
    //   {result.insights &&
    //     result.insights.map((insight, index) => {
    //       return <InsightCard insightInfo={insight} key={index} />;
    //     })}
    // </div>
    <div></div>
  );

  const steps = [
    {
      title: "Data",
      desc: "Source data:",
      content: dataContent,
    },
    {
      title: "Insights",
      desc: "Insights extracted from data:",
      content: insightsContent,
    },
    {
      title: "Visualization",
      desc: "Represent insight with visualization.",
      content: plotContent,
    },
  ];

  return (
    <>
      <StepBar current={currentStep} onChange={setCurrentStep} steps={steps} />

      <p>{steps[currentStep].desc}</p>

      <div style={{ height: "calc(100% - 80px)" }}>
        <Spin spinning={insightLoading}>{steps[currentStep].content}</Spin>
      </div>
    </>
  );
};
export default AutoInsightVis;
// ReactDOM.render(<App />, document.getElementById("container"));
