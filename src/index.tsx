import React from 'react';
import ReactDOM from 'react-dom';
import AutoInsightVis from './AutoInsightVis';
import ControlBar from './ControlBar';
import './index.css'
import VisualText from './components/VisualText';
ReactDOM.render(
  <React.StrictMode>
    <div id="APP">
        <div id="control_bar" className="view">
          <h2>Control</h2>
          <ControlBar></ControlBar>
        </div>
        <div id = "bottom">
              <div id = "visualization" className="view">
                <h2>Text Vis</h2>
              {/* <AutoInsightVis></AutoInsightVis> */}
              <VisualText></VisualText>
              </div>
            <div id = "design" className="view">
              <h2>Design</h2>
            </div>
        </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
