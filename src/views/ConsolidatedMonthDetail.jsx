import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Chart from 'react-apexcharts';

export function ConsolidatedMonthDetail() {
  const { state } = useLocation();
  const [config, setConfig] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ['Revenue', 'Spend', 'Profit']
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      }
    },
    series: [
      {
        name: "series-1",
        data: [state.consolidated.revenue, state.consolidated.spend, state.consolidated.profit]
      }
    ]
  });

  return (
    <>
      <h2>ConsolidatedDetail</h2>
      <Link to={ -1 }>Atras</Link>
      <Chart
        options={config.options}
        series={config.series}
        type="bar"
        width="500"
      />
    </>
  );
}