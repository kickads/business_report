import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useBoundStore } from '../state/store';
import { MonthsList } from '../components';
import Chart from 'react-apexcharts';
import { ChevronLeftIcon } from '@heroicons/react/24/outline/index.js';
import {FormatMoney} from "format-money-js";

const fm = new FormatMoney({
  // symbol: '$',
  decimals: 2,
  decimalPoint: '.',
  separator: ','
});

// const getProfit = (revenue = 0, spend = 0) => {
//   return parseFloat((parseFloat(revenue) - parseFloat(spend)).toFixed(2));
// }

export function ConsolidatedMonths() {
  const { year } = useParams();
  const getConsolidatedById = useBoundStore((state) => state.getConsolidatedById);
  const consolidatedData = useBoundStore((state) => state.consolidatedData);
  const [config, setConfig] = useState({
    options: {
      chart: {
        id: "basic-bar",
        width: '100%'
      },
      xaxis: {
        categories: ['Revenue', 'Spend', 'Profit']
      },
      dataLabels: {
        enabled: false
      }
    },
    series: [
      {
        name: "Revenue",
        data: []
      },
      {
        name: "Spend",
        data: []
      },
      {
        name: "Profit",
        data: []
      },
    ]
  });

  useEffect(() => {
    getConsolidatedById(year);
  }, []);

  useEffect(() => {
    // const nuevoArray = consolidatedData.map(item => ({
    //   ...item,
    //   revenue: fm.from(parseFloat(item.revenue)),
    //   spend: fm.from(parseFloat(item.spend)),
    //   profit: fm.from(getProfit(item.revenue, item.spend))
    // }));

    setConfig((olsState) => ({
      ...olsState,
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: consolidatedData.map(consolidated => consolidated.month)
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
        }
      },
      series: [
        {
          name: "Revenue",
          data: consolidatedData.map(consolidated => consolidated.revenue)
        },
        {
          name: "Spend",
          data: consolidatedData.map(consolidated => consolidated.spend)
        },
        {
          name: "Profit",
          data: consolidatedData.map(consolidated => consolidated.profit)
        },
      ]
    }))
  }, [ consolidatedData ]);

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <button type="button" className="w-fit bg-kickads text-white border-0 rounded-md">
            <Link to={ -1 } className="flex items-center gap-1 py-1 px-2">
              <ChevronLeftIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Atras
            </Link>
          </button>
        </div>
        <div className="flex flex-col gap-10">
          { consolidatedData.length > 0 && (
            <Chart
              options={config.options}
              series={config.series}
              type="area"
            />
          ) }
          <MonthsList list={ consolidatedData } />
        </div>
      </div>
    </>
  );
}