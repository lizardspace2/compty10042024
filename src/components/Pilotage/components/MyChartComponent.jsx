import React from 'react';
import {
  Box, // Importing the Box component from Chakra UI
  useColorModeValue, // Hook to handle color mode
} from '@chakra-ui/react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
    { name: 'janv.', Revenues: 4000, Expenses: 2400, Result: 1600 },
    { name: 'févr.', Revenues: 3000, Expenses: 1398, Result: 1602 },
    { name: 'mars', Revenues: 2000, Expenses: 9800, Result: -7800 },
    { name: 'avr.', Revenues: 2780, Expenses: 3908, Result: -1128 },
    { name: 'mai', Revenues: 1890, Expenses: 4800, Result: -2910 },
    { name: 'juin', Revenues: 2390, Expenses: 3800, Result: -1410 },
    { name: 'juil.', Revenues: 3490, Expenses: 4300, Result: -810 },
    { name: 'août', Revenues: 4000, Expenses: 2400, Result: 1600 },
    { name: 'sept.', Revenues: 3000, Expenses: 1398, Result: 1602 },
    { name: 'oct.', Revenues: 2000, Expenses: 9800, Result: -7800 },
    { name: 'nov.', Revenues: 2780, Expenses: 3908, Result: -1128 },
    { name: 'déc.', Revenues: 1890, Expenses: 4800, Result: -2910 }
  ];  

function MyChartComponent() {
  const bgColor = useColorModeValue('white', 'gray.800'); // Conditional background color
  const borderColor = useColorModeValue('gray.200', 'gray.700'); // Conditional border color
  
  return (
    <Box
      p={4} // Padding from Chakra UI
      bg={bgColor} // Background color from Chakra UI
      borderRadius="lg" // Border radius from Chakra UI
      boxShadow="md" // Shadow from Chakra UI
      borderColor={borderColor} // Border color from Chakra UI
      borderWidth={1} // Border width from Chakra UI
    >
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
    </Box>
  );
}

export default MyChartComponent;
