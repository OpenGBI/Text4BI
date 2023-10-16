import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <React.StrictMode>
    <App />
=======
import './index.css'
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
            </div>
        </div>
    </div>
>>>>>>> d1f26f1 (feat: use redux for state management)
  </React.StrictMode>,
  root
);

reportWebVitals();
