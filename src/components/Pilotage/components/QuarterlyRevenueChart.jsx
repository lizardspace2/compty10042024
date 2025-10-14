import React from 'react';
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { trimestre: 'T1 2023', revenus: 28500, objectif: 30000, croissance: 5 },
  { trimestre: 'T2 2023', revenus: 31200, objectif: 32000, croissance: 9.5 },
  { trimestre: 'T3 2023', revenus: 33800, objectif: 33000, croissance: 8.3 },
  { trimestre: 'T4 2023', revenus: 35100, objectif: 35000, croissance: 3.8 },
  { trimestre: 'T1 2024', revenus: 31250, objectif: 33000, croissance: 9.6 },
  { trimestre: 'T2 2024', revenus: 34500, objectif: 35000, croissance: 10.6 },
];

function QuarterlyRevenueChart() {
  const theme = useTheme();
  const bgColor = useColorModeValue('red.50', 'gray.800');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="red.50" p="3" boxShadow="md" borderRadius="lg" border="1px" borderColor="red.100">
          <Text fontWeight="bold" mb={1}>{label}</Text>
          <Text fontSize="sm" color="blue.600">Revenus: {payload[0].value.toLocaleString()} €</Text>
          <Text fontSize="sm" color="orange.600">Objectif: {payload[1].value.toLocaleString()} €</Text>
          <Text fontSize="sm" color="green.600">Croissance: +{payload[2].value}%</Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Revenus trimestriels vs objectifs
        </Text>
      </Flex>

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="trimestre" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="revenus"
            fill={theme.colors.blue[400]}
            name="Revenus réels"
          />
          <Bar
            yAxisId="left"
            dataKey="objectif"
            fill={theme.colors.orange[300]}
            name="Objectif"
            opacity={0.5}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="croissance"
            stroke={theme.colors.green[500]}
            strokeWidth={3}
            name="Croissance (%)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default QuarterlyRevenueChart;
