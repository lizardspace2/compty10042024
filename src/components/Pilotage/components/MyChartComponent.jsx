import React from 'react';
import {
  Box,
  useColorModeValue,
  Text,
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

// Define a custom shape for the bars
const CustomBarShape = (props) => {
  const { fill, x, y, width, height } = props;
  
  // Define the gradient id based on the fill color to ensure uniqueness
  const gradientId = `gradient-${fill.replace('#', '')}`;

  return (
    <g>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={fill} stopOpacity={0.8}/>
          <stop offset="95%" stopColor={fill} stopOpacity={0.5}/>
        </linearGradient>
      </defs>
      <rect
        radius={[5, 5, 0, 0]} // Adjust corner radius here
        fill={`url(#${gradientId})`}
        x={x}
        y={y}
        width={width}
        height={height}
      />
    </g>
  );
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
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.700', 'gray.200'); // This should match the text color in your theme
    const barSize = 50; // Updated bar size to be twice as wide
  
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
            <XAxis 
              dataKey="name" 
              scale="band" 
              stroke={textColor}
              tick={{ fill: textColor }}
              tickLine={false}
            />
            {/* Remove the left YAxis and update the right YAxis as the primary axis */}
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke={textColor}
              tick={{ fill: textColor }}
              tickLine={false}
              tickFormatter={(value) => `${value}€`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="right" dataKey="Expenses" barSize={barSize} fill="#EB6B9D" shape={<CustomBarShape />} />
            <Bar yAxisId="right" dataKey="Revenues" barSize={barSize} fill="#7DD3FC" shape={<CustomBarShape />} />
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
  