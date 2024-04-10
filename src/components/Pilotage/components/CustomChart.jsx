import React from 'react';
import {
  Box,
  Flex,
  useTheme,
} from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
} from 'recharts';

const data = [
  // ... data in the same format as your chart
];

const CustomChart = () => {
  const theme = useTheme();

  return (
    <Box width="100%" height="400px">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke={theme.colors.blue[600]} />
          <YAxis yAxisId="right" orientation="right" stroke={theme.colors.pink[600]} />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="pv" fill={theme.colors.blue[200]} />
          <Bar yAxisId="left" dataKey="uv" fill={theme.colors.red[200]} />
          <Line yAxisId="right" type="monotone" dataKey="amt" stroke={theme.colors.black} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CustomChart;
