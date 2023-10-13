import React from 'react';
import { Pie } from '@antv/g2plot';

interface PieChartData {
  type: string;
  value: number;
}

interface PieChartProps {
  data: number[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const containerRef = React.useRef(null);
  const indexAndValue:PieChartData[] = data.map((value:number,index:number)=>({type:index.toString(), value:value}));

  React.useEffect(() => {
    if (!containerRef.current) return;

    const piePlot = new Pie(containerRef.current, {
      data:indexAndValue,
      angleField: 'value',
      colorField: 'type',
      autoFit: true,
      radius: 0.8,
      innerRadius: 0.6,
    });

    piePlot.render();

    return () => {
      piePlot.destroy();
    }
  }, [data]);

  return <div ref={containerRef} style={{ height: 400, width: 600 }} />;
}

export default PieChart;
