import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
<<<<<<< HEAD
ReactDOM.render(
	<React.StrictMode>
		<div id="APP"></div>
	</React.StrictMode>,
	document.getElementById('root')
);
=======
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);

reportWebVitals();
>>>>>>> cfbc02f314e6d3f8d31d7819ca4913ebee1825d6
