import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Chart from 'react-apexcharts';
import { ChevronLeftIcon } from '@heroicons/react/24/outline/index.js';

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
        name: 'total',
        data: [state.consolidated.revenue, state.consolidated.spend, state.consolidated.profit]
      }
    ]
  });

  return (
    <>
      <button type="button" className="w-fit bg-kickads text-white border-0 rounded-md">
        <Link to={ -1 } className="flex items-center gap-1 py-1 px-2">
          <ChevronLeftIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Atras
        </Link>
      </button>
      <Chart
        options={config.options}
        series={config.series}
        type="bar"
        width="100%"
      />
    </>
  );
}