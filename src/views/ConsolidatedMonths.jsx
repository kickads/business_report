import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useBoundStore } from '../state/store';
import { MonthsList } from '../components';
import Chart from 'react-apexcharts';
import { ChevronLeftIcon } from '@heroicons/react/24/outline/index.js';
import {FormatMoney} from "format-money-js";

const stats = [
  { id: 1, name: 'Revenue', value: '8,000+' },
  { id: 2, name: 'Spend', value: '3%' },
  { id: 3, name: 'Profit', value: '99.9%' },
]

const fm = new FormatMoney({
  symbol: '$',
  decimals: 2,
  decimalPoint: '.',
  separator: ','
});

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
  const [ annualValues, setAnnualValues ] = useState([]);


  useEffect(() => {
    getConsolidatedById(year);
    console.log(consolidatedData);
  }, []);

  useEffect(() => {
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
              return fm.from(value);
              // return "$" + fm.from(value);
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
    }));

    setAnnualValues([
      {
        name: 'Revenue',
        values: consolidatedData.reduce((acum, current) => acum + parseFloat(current.revenue), 0)
      },
      {
        name: 'Spend',
        values: consolidatedData.reduce((acum, current) => acum + parseFloat(current.spend), 0)
      },
      {
        name: 'Profit',
        values: consolidatedData.reduce((acum, current) => acum + parseFloat(current.profit), 0)
      },
    ]);

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

          <dl className="bg-kickads text-white mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
            {annualValues.map((annual) => (
                <div key={annual.name} className="flex flex-col bg-white/5 p-8">
                  <dt className="text-sm font-semibold leading-6">{annual.name}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight">{fm.from(annual.values)}</dd>
                </div>
            ))}
          </dl>

          <MonthsList list={ consolidatedData } />
        </div>
      </div>
    </>
  );
}