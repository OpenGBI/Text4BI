import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
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
        
    </div>
>>>>>>> d1f26f1 (feat: use redux for state management)
  </React.StrictMode>,
  root
=======
import './index.css';
ReactDOM.render(
	<React.StrictMode>
		<div id="APP"></div>
	</React.StrictMode>,
	document.getElementById('root')
>>>>>>> 205642f (refactor: use eslint to refactor code, rafactor redux)
);

reportWebVitals();
