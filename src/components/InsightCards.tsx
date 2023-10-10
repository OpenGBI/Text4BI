import React, { useRef, useEffect, CSSProperties, useState } from 'react';
import { InsightCard } from './InsightCard';
import { Layout } from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const { Header, Footer, Sider, Content } = Layout;
const CardsDataset = [{
    key: "Card1",
    type: 'LineChart',
    BigChartData:[2,4,55,77,99],
    phrases: [
      { type: 'entity', value: 'DAU', metadata: { entityType: 'metric_name' } },
      { type: 'text', value: ' ' },
      { type: 'entity', value: '1.23亿', metadata: { entityType: 'metric_value', origin: 123077.34 } },
      { type: 'text', value: '，环比昨日 ' },
      { type: 'entity', value: '80万', metadata: { entityType: 'delta_value', assessment: 'positive' } },
      { type: 'text', value: '（' },
      { type: 'entity', value: '2.3%', metadata: { entityType: 'ratio_value', assessment: 'positive' } },
      { type: 'text', value: '）。' },
      { type: 'text', value: '最近 3 个动态 7 天' },
      {
        type: 'entity',
        value: '趋势上涨',
        metadata: {
          entityType: 'trend_desc',
          detail: [1, 2, 6, 18, 24, 48],
        },
      },
      { type: 'text', value: '。' },
      { type: 'text', value: '按垂直行业分：' },
    ],
  },
  {
    key:"Card2",
    type: 'LineChart',
    BigChartData:[2,4,55,7,99],
    phrases: [
      { type: 'entity', value: 'DAU', metadata: { entityType: 'metric_name' } },
      { type: 'text', value: ' ' },
      { type: 'entity', value: '22.23亿', metadata: { entityType: 'metric_value', origin: 123077.34 } },
      { type: 'text', value: '，环比昨日 ' },
      { type: 'entity', value: '80万', metadata: { entityType: 'delta_value', assessment: 'positive' } },
      { type: 'text', value: '（' },
      { type: 'entity', value: '2.3%', metadata: { entityType: 'ratio_value', assessment: 'positive' } },
      { type: 'text', value: '）。' },
      { type: 'text', value: '最近 3 个动态 7 天' },
      {
        type: 'entity',
        value: '趋势上涨',
        metadata: {
          entityType: 'trend_desc',
          detail: [1, 2, 6, 18, 24, 48],
        },
      },
      { type: 'text', value: '。' },
      { type: 'text', value: '按垂直行业分：' },
    ],
  },
]
interface Phrase {
    type: string;
    value: string;
    metadata?: any;
  }
interface DatasetProps {
    type: string;
    BigChartData:number[];
    phrases: Phrase[];
  }
const InsightCards:React.FC=()=>{
    const CardNum:number = CardsDataset.length
    let CardsId:string[] = CardsDataset.map((card)=>card.key)
    // for(var i=0;i<CardNum;i++){
    //     CardsId.push("card"+i.toString())
    // }
    const [cards, setCards] = useState(CardsId);


    const swapCards = (dragIndex: string, hoverIndex: string) => {
        const dragCard = cards.find((card) => card === dragIndex)!;
        const hoverCard = cards.find((card) => card === hoverIndex)!;
        const newCards = cards.map((card) => {
        if (card === dragCard) return hoverCard;
        if (card === hoverCard) return dragCard;
        return card;
        });
        console.log(newCards)
        setCards(newCards);
    };

// const Cards = CardsDataset.map(
//     (card,index)=>{
//         // console.log(CardsId)
//         // console.log(CardsId[index])
//         return {
//             ...card,
//             key:CardsId[index],
//             id:CardsId[index]
//         }
//     }
// )
// const Cards = cards.map((cardId, index) => {
//     const card = CardsDataset[index];
//     return {
//         ...card,
//         key: cardId,
//         id: cardId
//     };
// });
const Cards = cards.map(cardId => {
    const card = CardsDataset.find(d => d.key === cardId);
    return {
        ...card,
        id: cardId
    };
});
console.log(Cards)

    return (
        <div id = "ShowInsightCards">
            <DndProvider backend={HTML5Backend}>
            {
            Cards.map(
                (dataset)=>(
                    <Content key={dataset.key}>
                       <InsightCard  {...dataset} onDrop={swapCards}></InsightCard>
                     </Content>
                )
            )
        }
            </DndProvider>
        
        </div>
    )
    
}

export default InsightCards

