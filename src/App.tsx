import { Layout } from "antd"
import React, { useRef, useState } from "react"
import { Provider, useSelector, useDispatch } from "react-redux"
import "./App.css"
import { InsightCard } from "@antv/ava-react"
import { store, AppState } from "./store"
import ControlBar from "./ControlBar"
import InsightCards from "./components/InsightCards"
import DesignBar from "./DesignBar"
import ImportBar from "./ImportBar"
import Container from "./Container"
import Navigation from "./Navigation"
import { iniData } from "./utils/iniData"

const { Sider, Content } = Layout

function App() {
  const layoutStyle: React.CSSProperties = {
    height: "100%",
  }
  const leftSiderStyle: React.CSSProperties = {
    height: "100%",
    overflow: "auto",
  }
  const rightSiderStyle: React.CSSProperties = {
    height: "100%",
    overflow: "auto",
  }
  const contentMiddleStyle: React.CSSProperties = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  }
  const contentMiddleHeaderStyle: React.CSSProperties = {
    height: "54px",
    background: "#badde8",
  }
  const contentMiddleContentStyle: React.CSSProperties = {
    flexGrow: 1,
    overflow: "auto",
    background: "#fff",
    height: 0,
  }
  // const { dataset, selectedCards } = useSelector((state: AppState) => state.system)
  const [CardsIDs, setCardsIDs] = useState<string[]>(iniData.map((card) => card.CardName))
  // let CardsIDs: string[] = iniData.map((card) => card.CardName)

  const cardRefs = iniData.map(() => useRef<HTMLDivElement>(null))
  const navigationClick = (squareNumber: number) => {
    const cardRef = cardRefs[squareNumber]

    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }
  // const cardsExchange = (newCardsIDs: string[]) => {
  //   CardsIDs = newCardsIDs
  // }

  return (
    <Provider store={store}>
      <div id="APP" className="app-container">
        <Layout style={layoutStyle} className="full-height">
          <Sider width={420} style={leftSiderStyle}>
            {/* <Content>
            <ControlSelectedData />
          </Content> */}
            <Content>
              <ControlBar />
            </Content>
          </Sider>
          <Content style={contentMiddleStyle}>
            <Content style={contentMiddleHeaderStyle}>
              <ImportBar />
            </Content>
            <Content style={contentMiddleContentStyle}>
              <InsightCards cardRefs={cardRefs} cardsExchange={setCardsIDs} />
            </Content>
            {/* <Container /> */}
          </Content>
          <Sider width={150} style={rightSiderStyle}>
            <Content>
              <Navigation navigationClick={navigationClick} CardsIDs={CardsIDs} />
            </Content>
          </Sider>
        </Layout>
      </div>
    </Provider>
  )
}

export default App
