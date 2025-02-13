"use client"

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
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DonationChart: React.FC = () => {
  // Data for the chart
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // Days of the week
    datasets: [
      {
        label: "Funds Donated",
        data: [200, 300, 400, 500, 600, 700, 800], // Example data (replace with real data)
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Light blue color
        borderColor: "rgba(75, 192, 192, 1)", // Blue border
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Funds Donated Over Time", // Chart title
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis from 0
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Funds donated
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DonationChart;
