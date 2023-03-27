import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBoundStore } from '../state/store';
import { MonthsList } from '../components';
import Chart from 'react-apexcharts';

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
    setConfig((olsState) => ({
      ...olsState,
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: consolidatedData.map(consolidated => consolidated.month)
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
  }, [consolidatedData]);

  return (
    <>
      <h2>ConsolidatedMonths</h2>

      { consolidatedData.length > 0 && (
        <Chart
          options={config.options}
          series={config.series}
          type="area"
        />
      ) }
      <MonthsList list={ consolidatedData } />
    </>
  );
}