import { Layout } from 'antd'
import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import { store } from './store'
import ControlBar from './ControlBar'
import InsightCards from './components/InsightCards'
import DesignBar from './DesignBar'
import ImportBar from './ImportBar'

const { Sider, Content } = Layout

function App() {
  return (
    <Provider store={store}>
      <div id='APP' className='app-container'>
      <Layout className='full-height'>
        <Sider width={400}>
          {/* <Content>
            <ControlSelectedData />
          </Content> */}
          <Content>
            <ControlBar />
          </Content>
        </Sider>
        <Layout>
          <Content>
            <ImportBar />
          </Content>
          <Content>
            <InsightCards />
          </Content>
        </Layout>
      </Layout>
      </div>
    </Provider>
  )
}

export default App
