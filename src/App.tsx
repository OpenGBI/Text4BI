import { Layout } from 'antd'
import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import { store } from './store'
import ControlBar from './ControlBar'
import InsightCards from './components/InsightCards'
import DesignBar from './DesignBar'
import ControlSelectedData from './components/ControlSystemSetting/ControlSelectedData'

const { Sider, Content } = Layout

function App() {
  return (
    <Provider store={store}>
      <div id='APP' className='app-container'>
      <Layout className='full-height'>
        <Sider width={350} style={{ backgroundColor: '#eee' }}>
          {/* <Content>
            <ControlSelectedData />
          </Content> */}
          <Content>
            <ControlBar />
          </Content>
        </Sider>
        <Layout>
          <Content className='full-height'>
            <InsightCards />
          </Content>
        </Layout>
      </Layout>
      </div>
    </Provider>
  )
}

export default App
