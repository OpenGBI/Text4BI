import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import { store } from './store'
import ControlBar from './ControlBar'
import InsightCards from './components/InsightCards'
import DesignBar from './DesignBar'

function App() {
  return (
    <Provider store={store}>
      <div id='APP'>
        <div id='control_bar' className='view'>
          <h2>DesignBar</h2>
          <DesignBar />
        </div>
        <div id='bottom'>
          <div id='design' className='view'>
            <h2>ControlBar</h2>
            <ControlBar />
          </div>
          <div id='visualization' className='view'>
            <h2>Text Vis</h2>
            <InsightCards />
          </div>
        </div>
      </div>
    </Provider>
  )
}

export default App
