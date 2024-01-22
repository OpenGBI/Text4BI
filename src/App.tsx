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
  // const { dataset, selectedCards } = useSelector((state: AppState) => state.system)
  const [CardsIDs, setCardsIDs] = useState<string[]>(iniData.map((card) => card.CardName))
  // let CardsIDs: string[] = iniData.map((card) => card.CardName)

  const cardRefs = iniData.map(() => useRef<HTMLDivElement>(null))
  const navigationClick = (squareNumber: number) => {
    console.log("navigationClicknavigationClicknavigationClicknavigationClick")
    console.log(squareNumber)
    console.log(cardRefs)
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
        <Layout className="full-height">
          <Sider width={400}>
            {/* <Content>
            <ControlSelectedData />
          </Content> */}
            <Content>
              <ControlBar />
            </Content>
          </Sider>
          <Content>
            <Content>
              <ImportBar />
            </Content>
            <Content>
              <InsightCards cardRefs={cardRefs} cardsExchange={setCardsIDs} />
            </Content>
          </Content>
          <Sider width={400}>
            <Content>
              <Navigation navigationClick={navigationClick} CardsIDs={CardsIDs} />
              {/* <div>体育采访v古巴iububniubniububuibikuihbuhvghvghvgsdcvcdwcd </div> */}
              {/* <ControlBar /> */}
            </Content>
            {/* <Content>
              <div className="panel1">

              </div>
            </Content> */}
            {/* <Content>
              <div>啊摄像头吃软饭v与i农民开辟了， </div>
            </Content> */}
          </Sider>
          {/* <Container /> */}
          {/* <div className="navigation">
          <Navigation navigationClick={navigationClick} CardsIDs={CardsIDs} />
        </div> */}
        </Layout>
      </div>
    </Provider>
  )
}

export default App
