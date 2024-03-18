import React, { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Col, Row, Divider, Collapse } from "antd"
import NavigationSparkLine from "./NavigationSparkLine"
import { AppState } from "../store"
import {
  highLightMessage,
  Phrase,
  Metadata,
  Point,
  cateAndValue,
  GlobalSettingStateType,
} from "../types"

type NavigationCardProp = {
  navigationClick: (cardID: number) => void
  CardID: string
  cardIndex: number
}

const NavigationCard: React.FC<NavigationCardProp> = ({ navigationClick, CardID, cardIndex }) => {
  const { sparkLinePosition, aspectRatio } = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  const { dataset, selectedCards } = useSelector((state: AppState) => state.system)
  const curDataset = dataset?.find((item) => item.CardName === CardID)
  const renderPhrases = () => {
    if (curDataset) {
      return curDataset.paragraph.flatMap((paragraph) => {
        if ("phrases" in paragraph) {
          return paragraph.phrases.map((phrase, index) => {
            if (phrase.metadata && phrase.metadata.detail) {
              return (
                <Row className="control-row">
                  <NavigationSparkLine
                    key={index}
                    metadata={phrase.metadata}
                    aspectRatio={aspectRatio}
                    sparkLinePosition="left"
                    globalBoolean
                    navigationClick={navigationClick}
                    cardIndex={cardIndex}
                    value={phrase.value}
                  />
                </Row>
              )
            }
            return null
          })
        }
        return null
      })
    }
  }

  return (
    <div style={{ marginTop: "50px", marginBottom: "50px", background: "#272643" }}>
      {renderPhrases()}
    </div>
  )
}
export default NavigationCard
