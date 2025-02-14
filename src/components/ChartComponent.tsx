"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartComponentProps {
  title: string;
  labels: string[];
  dataValues: number[];
  isHorizontal?: boolean;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  title,
  labels,
  dataValues,
  isHorizontal = false,
}) => {
  // Data for the chart
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataValues,
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Light blue color
        borderColor: "rgba(75, 192, 192, 1)", // Blue border
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options: ChartOptions<"bar"> = {
    indexAxis: isHorizontal ? "y" : "x", // Horizontal or vertical bar chart
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title, // Chart title
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
