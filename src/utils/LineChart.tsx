import React from 'react';
import { Line } from '@antv/g2plot';

interface LineChartProps {
  data: number[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const plotData = data.map((value, index) => ({
      date: index + 1,
      value
    }));

    const linePlot = new Line(containerRef.current, {
      data: plotData,
      xField: 'date',
      yField: 'value',
      smooth: true,
      autoFit: true,
    });

    linePlot.render();

    return () => {
      linePlot.destroy();
    }
  }, [data]);

  return <div ref={containerRef} style={{ height: 400, width: 600 }} />;
}

export default LineChart;
