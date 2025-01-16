import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const data = [
  { name: "Nov 1, 2024", visits: 16 },
  { name: "Nov 2, 2024", visits: 11 },
  { name: "Nov 3, 2024", visits: 15 },
  { name: "Nov 4, 2024", visits: 11 },
  { name: "Nov 5, 2024", visits: 3 },
  { name: "Nov 6, 2024", visits: 6 },
  { name: "Nov 7, 2024", visits: 11 },
];

function VisitChart() {
  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <LineChart data={data} margin={{ top: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="linear"
          dataKey="visits"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        >
          <LabelList position="top" offset={5} />
        </Line>
      </LineChart>
    </ResponsiveContainer>
  );
}

export default VisitChart;
