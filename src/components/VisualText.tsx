import React, { useRef, useEffect } from 'react';
import { renderLineChart, renderBarChart,renderPieChart } from '../utils/SparkLineFuncs';
interface Phrase {
  type: string;
  value: string;
  metadata?: any;
}

interface DatasetProps {
  type: string;
  phrases: Phrase[];
}

const Dataset: React.FC<DatasetProps> = ({ type, phrases }) => {
  return (
    <div>
      {phrases.map((phrase, index) => (
        //每一个phrase都经过这个处理
        <PhraseComponent key={index} {...phrase} />
        //jsx中的js表达式需要{}
        // key: 这是一个特殊的prop，React用它来在列表中唯一标识每一个元素。
        //这并不是传递给PhraseComponent的真实prop，它只是帮助React进行优化。所以PhraseComponent只接收3个props,不接收index
      ))}
    </div>
  );
};

const PhraseComponent: React.FC<Phrase> = ({ type, value, metadata }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (type === 'entity' && metadata?.entityType === 'trend_desc' && svgRef.current && tooltipRef.current) {
      renderPieChart(svgRef.current, metadata.detail, tooltipRef.current);
    }
  }, [type, metadata]);

  if (type === 'entity') {
    let wordColor:string = 'black'
    switch(metadata.entityType){
      case 'metric_value':
        wordColor = 'blue';
        break;
      case 'ratio_value':
        wordColor = 'red'
        break;
      case 'delta_value':
        wordColor = 'red'
        break;

    }
    return (
      <span style={{ color: wordColor }}>
        {metadata?.entityType === 'trend_desc' ? (
          <span>
          <svg ref={svgRef} width="100" height="20"></svg>
          {/* 在此处把变量svgRef和真实的dom元素绑定起来，当组件被渲染后，svgRef.current将会指向这个SVG元素 */}
          <div ref={tooltipRef} className="tooltip"></div>
          </span>
          
        ) : (
          value
        )//这是一个三目运算符 ？：
      }
      </span>
    );
  }

  return <span>{value}</span>;
};

// 使用你的数据集渲染组件
const dataset = {
  type: 'normal',
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
};



const VisualText: React.FC = () => {
  return <Dataset {...dataset} />;
  //等同于这个写法： <Dataset type='normal' phrases={[...]} />

};

export default VisualText;
