import React from 'react';
import { Column } from '@antv/g2plot';

interface BarChartProps {
  data: number[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const plotData = data.map((value, index) => ({
      category: index + 1,
      value
    }));

    const columnPlot = new Column(containerRef.current, {
      data: plotData,
      xField: 'category',
      yField: 'value',
      autoFit: true,
    });

    columnPlot.render();

    return () => {
      columnPlot.destroy();
    }
  }, [data]);

  return <div ref={containerRef} style={{ height: 400, width: 600 }} />;
}

export default BarChart;
