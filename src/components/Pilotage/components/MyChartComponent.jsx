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
  Text,
} from 'recharts';

// Define the data array outside of the component for simplicity
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
const CustomBarShape = (props) => {
    const { fill, x, y, width, height } = props;
    const borderRadius = 5; // This sets the border-radius for the bar's top corners
  
    // Define the gradientId dynamically to ensure it's unique for multiple instances
    const gradientId = `gradient-${Math.floor(Math.random() * 100000)}`;
  
    return (
      <g>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={fill} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={fill} stopOpacity={0.5}/>
          </linearGradient>
        </defs>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={borderRadius} // Apply border-radius to the x-axis of the rectangle
          ry={borderRadius} // Apply border-radius to the y-axis of the rectangle
          fill={`url(#${gradientId})`}
        />
      </g>
    );
  };
  
// Custom tooltip to match the design
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="red.50" p="2" borderRadius="md" boxShadow="xl">
          <p>{`${label}`}</p>
          <p>{`Revenues: ${payload[0].value}€`}</p>
          <p>{`Expenses: ${payload[1].value}€`}</p>
          <p>{`Result: ${payload[2].value}€`}</p>
        </Box>
      );
    }
  
    return null;
  };

// Custom tick component to adjust the label position
const CustomTick = (props) => {
  const { x, y, stroke, payload } = props;

  return (
    <Text x={x} y={y + 16} textAnchor="middle" fill={stroke}>
      {payload.value}
    </Text>
  );
};

// ... CustomBarShape, CustomTooltip, and data array remain unchanged

function MyChartComponent() {
  const bgColor = useColorModeValue('red.50', 'gray.800');
  const borderColor = useColorModeValue('red.100', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const barSize = 50; // Set the size of the bars

  // Prepare the data with a fake bar to manipulate label position
  const newData = data.map(item => ({
    ...item,
    Fake: Math.max(item.Revenues, item.Expenses),
  }));

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
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 0, // Adjust bottom margin to fit custom tick
          }}
          barCategoryGap={30} // Adjust the space between bars
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="name"
            stroke={textColor}
            tick={<CustomTick stroke={textColor} />} // Apply the custom tick
            tickLine={false}
            interval={0}
            // Added padding to center the ticks between the bars
            padding={{ left: barSize, right: barSize }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={textColor}
            tick={{ fill: textColor }}
            tickLine={false}
            tickFormatter={(value) => `${value}€`}
            // Hide the axis line
            axisLine={false}
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
