import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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
);

reportWebVitals();
