// src/components/ExpensesPieChart.js
import React from 'react';
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  Skeleton
} from '@chakra-ui/react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { useDashboardData } from '../hooks/useDashboardData';

function ExpensesPieChart() {
  const { data, loading } = useDashboardData();
  const bgColor = useColorModeValue('red.50', 'gray.800');

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="red.50" p="3" boxShadow="md" borderRadius="lg" border="1px" borderColor="red.100">
          <Text fontWeight="bold">{payload[0].name}</Text>
          <Text fontSize="sm">Montant: {payload[0].value.toLocaleString()} €</Text>
          <Text fontSize="sm">
            Pourcentage: {((payload[0].value / (data?.expenses?.reduce((a, b) => a + b.montant_total, 0) || 1)) * 100).toFixed(1)}%
          </Text>
        </Box>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (loading) {
    return (
      <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
        <Skeleton height="400px" />
      </Box>
    );
  }

  const expensesData = data?.expenses || [];

  return (
    <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Répartition des dépenses par catégorie
        </Text>
      </Flex>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={expensesData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="montant_total"
          >
            {expensesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.couleur} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <Box mt={4}>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          Total des dépenses: {expensesData.reduce((a, b) => a + b.montant_total, 0).toLocaleString()} €
        </Text>
      </Box>
    </Box>
  );
}

export default ExpensesPieChart;