"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
  // Transform data into the format Recharts expects
  const data = labels.map((label, index) => ({
    name: label,
    value: dataValues[index],
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout={isHorizontal ? "vertical" : "horizontal"}>
          <CartesianGrid strokeDasharray="3 3" />
          {isHorizontal ? (
            <>
              <YAxis type="category" dataKey="name" />
              <XAxis type="number" />
            </>
          ) : (
            <>
              <XAxis type="category" dataKey="name" />
              <YAxis type="number" />
            </>
          )}
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="rgba(75, 192, 192, 0.6)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
