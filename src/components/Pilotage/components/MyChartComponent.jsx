import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Example data
const data = [
  { name: 'janv.', Revenues: 4000, Expenses: 2400, Result: 1600 },
  { name: 'févr.', Revenues: 3000, Expenses: 1398, Result: 1600 },
  // ... add all other months
];

function MyChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="Expenses" barSize={20} fill="#8884d8" />
        <Bar yAxisId="left" dataKey="Revenues" barSize={20} fill="#82ca9d" />
        <Line yAxisId="right" type="monotone" dataKey="Result" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default MyChartComponent;
