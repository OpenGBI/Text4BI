import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const root = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <React.StrictMode>
    <div id="APP">
        <div id="control_bar" className="view">
          <h2>Control</h2>
          
        </div>
        <div id = "bottom">
              <div id = "visualization" className="view">
                <h2>Text Vis</h2>
              
              </div>
            <div id = "design" className="view">
              <h2>Design</h2>
              
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
