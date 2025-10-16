// src/components/MyChartComponent.js
import React from 'react';
import {
  Box,
  useColorModeValue,
  Skeleton
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
import { useDashboardData } from '../hooks/useDashboardData';

const CustomBarShape = (props) => {
  const { fill, x, y, width, height } = props;
  const borderRadius = 5;
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
        rx={borderRadius}
        ry={borderRadius}
        fill={`url(#${gradientId})`}
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box bg="red.50" p="2" borderRadius="md" boxShadow="xl">
        <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{label}</p>
        <p style={{ color: '#7DD3FC' }}>{`Revenues: ${payload[0]?.value?.toLocaleString()}€`}</p>
        <p style={{ color: '#EB6B9D' }}>{`Expenses: ${payload[1]?.value?.toLocaleString()}€`}</p>
        <p style={{ color: '#333333' }}>{`Result: ${payload[2]?.value?.toLocaleString()}€`}</p>
      </Box>
    );
  }
  return null;
};

const CustomTick = (props) => {
  const { x, y, stroke, payload } = props;
  return (
    <Text x={x} y={y + 16} textAnchor="middle" fill={stroke}>
      {payload.value}
    </Text>
  );
};

function MyChartComponent() {
  const { data, loading } = useDashboardData();
  const bgColor = useColorModeValue('red.50', 'gray.800');
  const borderColor = useColorModeValue('red.100', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const barSize = 50;

  // Transformer les données pour le graphique
  const chartData = React.useMemo(() => {
    if (!data?.monthly) return [];

    return data.monthly.map(item => ({
      name: item.mois_court,
      Revenues: item.revenues,
      Expenses: item.expenses,
      Result: item.result
    }));
  }, [data?.monthly]);

  if (loading) {
    return (
      <Box p={4} bg={bgColor} borderRadius="lg" boxShadow="md" borderColor={borderColor} borderWidth={1}>
        <Skeleton height="300px" />
      </Box>
    );
  }

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
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 0,
          }}
          barCategoryGap={30}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="name"
            stroke={textColor}
            tick={<CustomTick stroke={textColor} />}
            tickLine={false}
            interval={0}
            padding={{ left: barSize, right: barSize }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={textColor}
            tick={{ fill: textColor }}
            tickLine={false}
            tickFormatter={(value) => `${value}€`}
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