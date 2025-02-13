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
  ChartOptions,
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

const CountryChart: React.FC = () => {
  // Data for the chart
  const data = {
    labels: [
      "Nigeria",
      "UK",
      "USA",
      "Chana",
      "Egypt",
      "Canada",
      "India",
      "Austria",
    ], // Countries
    datasets: [
      {
        label: "Donations",
        data: [500, 300, 400, 200, 100, 150, 250, 50], // Example data (replace with real data)
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Light blue color
        borderColor: "rgba(75, 192, 192, 1)", // Blue border
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options: ChartOptions<"bar"> = {
    indexAxis: "y", // Horizontal bar chart
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Donations per Country", // Chart title
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Start the x-axis from 0
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Donations per country
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CountryChart;
