import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Chart from 'react-apexcharts';
import { ChevronLeftIcon } from '@heroicons/react/24/outline/index.js';
import { FormatMoney } from "format-money-js";

const fm = new FormatMoney({
  decimals: 2,
  decimalPoint: '.',
  separator: ','
});

export function ConsolidatedMonthDetail() {
  const { state } = useLocation();
  const [config, setConfig] = useState({
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: [ 'Revenue', 'Spend', 'Profit' ],
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return "$" + fm.from(value);
          }
        },
      },
      dataLabels: {
        enabled: false
      },
    },
    series: [
      {
        name: 'Revenue',
        data: [state.consolidated.revenue]
      },
      {
        name: 'Spend',
        data: [state.consolidated.spend]
      },
      {
        name: 'Profit',
        data: [state.consolidated.profit]
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