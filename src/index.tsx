import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
<<<<<<< HEAD
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.render(
<<<<<<< HEAD
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	root
=======
  <React.StrictMode>
    <div id="APP">
        
    </div>
  </React.StrictMode>,
  document.getElementById('root')
>>>>>>> 5232ddb (feat: use redux for state management)
=======
ReactDOM.render(
	<React.StrictMode>
		<div id="APP"></div>
	</React.StrictMode>,
	document.getElementById('root')
>>>>>>> 205642f (refactor: use eslint to refactor code, rafactor redux)
);

reportWebVitals();
