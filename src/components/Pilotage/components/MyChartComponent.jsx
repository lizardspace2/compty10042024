import React from 'react';
import {
  Box,
  useColorModeValue,
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
  Rectangle,
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

const CustomBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <Rectangle radius={[10, 10, 0, 0]} fill={fill} x={x} y={y} width={width} height={height} />;
};

// Custom tooltip to match the design
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="gray.700" color="white" p="2" borderRadius="md" boxShadow="xl">
          <p>{`${label}`}</p>
          <p>{`Revenues: ${payload[0].value}€`}</p>
          <p>{`Expenses: ${payload[1].value}€`}</p>
          <p>{`Result: ${payload[2].value}€`}</p>
        </Box>
      );
    }
  
    return null;
  };

function MyChartComponent() {
  const bgColor = useColorModeValue('white', 'gray.800'); // Conditional background color
  const borderColor = useColorModeValue('gray.200', 'gray.700'); // Conditional border color

  return (
    <Box
      p={4}
      bg={bgColor}
      borderRadius="lg"
      boxShadow="md"
      borderColor={borderColor}
      borderWidth={1}
    >
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar yAxisId="left" dataKey="Expenses" barSize={20} fill="#EB6B9D" shape={<CustomBar />} />
          <Bar yAxisId="left" dataKey="Revenues" barSize={20} fill="#7DD3FC" shape={<CustomBar />} />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="Result" 
            stroke="#333333" 
            strokeWidth={2}
            dot={{ fill: '#333333', stroke: '#fff', strokeWidth: 2, r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default MyChartComponent;
