import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { AxisOptions, Chart } from 'react-charts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import api from '@/services';
export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const getData = useCallback(async () => {
    await api
      .get('/transactions')
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => console.log(err.data));
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Meu Volume',
      },
    },
  };
  const labels = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: transactions?.perMonth?.map((item) => item.total),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <Box h='100vh'>
      <Bar options={options} data={data} />
    </Box>
  );
}
