"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Title,
  Legend,
  Tooltip,
  BarElement,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
  registerables
} from "chart.js";

ChartJS.register(
  ...registerables,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WalletSummaryChart: React.FC<{
  walletData: {
    totalProfits: {
      month: Record<string, number>;
    };
    totalBuyAmounts: {
      month: Record<string, number>;
    };
    totalSellAmounts: {
      month: Record<string, number>;
    };
    totalBuySellTimes: {
      month: Record<string, number>;
    };
  };
}> = ({ walletData }) => {
  const [data, setData] = useState<{
    labels: string[];
    datasets: {
      type: "bar" | "line";
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string;
      yAxisID: string;
      stack?: string;
    }[];
  } | null>(null);

  const months = Object.keys(walletData.totalProfits.month);
  const buyAmounts = months.map(
    (month) => walletData.totalBuyAmounts.month[month]
  );
  const sellAmounts = months.map(
    (month) => walletData.totalSellAmounts.month[month]
  );
  const totalOperations = months.map(
    (month) => walletData.totalBuySellTimes.month[month]
  );

  const profitLossAmounts = months.map((month, index) => {
    const profitOrLoss = sellAmounts[index] - buyAmounts[index];
    return profitOrLoss;
  });

  const backgroundColors = profitLossAmounts.map((value) =>
    value >= 0 ? "green" : "red"
  );

  const datasets = [
    {
      type: "bar" as const,
      label: "Total Buy Amount",
      data: buyAmounts,
      backgroundColor: "blue",
      yAxisID: "y",
      stack: "Stack 0",
    },
    {
      type: "bar" as const,
      label: "Profit/Loss Amount",
      data: profitLossAmounts,
      backgroundColor: backgroundColors,
      yAxisID: "y",
      stack: "Stack 0",
    },
    {
      type: "line" as const,
      label: "Total Operations",
      data: totalOperations,
      borderColor: "green",
      yAxisID: "y1",
    },
  ];

  useEffect(() => {
    setData({
      labels: months,
      datasets,
    });
  }, [walletData]);

  if (!data) return <div>Loading...</div>;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Wallet Summary",
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        stacked: true,
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return <Bar data={data as any} options={options} />;
};

export default WalletSummaryChart;
