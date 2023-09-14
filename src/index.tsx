import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // 假设你的应用组件是App.tsx中定义的
import AutoInsight from './AutoInsight';
import Learn_ts from './Learn_ts';
import AutoInsightVis from './AutoInsightVis';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <div id="APP">
        <div id="control_bar" className="view">
          <h2>Control</h2>
          <Learn_ts></Learn_ts>
        </div>
        <div id = "bottom">
              <div id = "visulization" className="view">
                <h2>Text Vis</h2>
              <AutoInsightVis></AutoInsightVis>
              </div>
            <div id = "design" className="view">
              <h2>Design</h2>
              <Learn_ts></Learn_ts>
              {/* <AutoInsightVis></AutoInsightVis> */}
            </div>
        </div>
    </div>
    
    {/* <AutoInsight></AutoInsight>
    <Learn_ts></Learn_ts>
    <AutoInsightVis></AutoInsightVis> */}
  </React.StrictMode>,
  document.getElementById('root')
);
