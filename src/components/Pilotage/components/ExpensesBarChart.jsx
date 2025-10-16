import React from 'react';
import {
  Box,
  Text,
  VStack,
  useColorModeValue,
  useTheme,
  Skeleton
} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useDashboardData } from '../hooks/useDashboardData';

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box bg="red.50" p="2" borderRadius="md" boxShadow="xl">
        <Text>{`${label}`}</Text>
        <Text>{`${payload[0].name}: ${payload[0].value.toLocaleString('fr-FR')} €`}</Text>
      </Box>
    );
  }

  return null;
};

function ExpensesBarChart() {
  const theme = useTheme();
  const { data, loading } = useDashboardData();
  const bgColor = useColorModeValue('red.50', 'gray.100');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const barFillColor = theme.colors.pink[300];

  // Transformer les données pour le graphique à barres
  const chartData = React.useMemo(() => {
    if (!data?.expenses) return [];
    
    return data.expenses
      .slice(0, 6) // Prendre les 6 premières catégories
      .map(item => ({
        name: item.categorie,
        value: item.montant_total,
        color: item.couleur
      }));
  }, [data?.expenses]);

  const totalExpenses = chartData.reduce((sum, item) => sum + item.value, 0);

  if (loading) {
    return (
      <Box p={5} bg={bgColor} borderRadius="md" boxShadow="sm" border="1px" borderColor="red.100">
        <VStack spacing={5} align="stretch">
          <Skeleton height="24px" width="150px" />
          <Skeleton height="40px" width="200px" />
          <Skeleton height="300px" />
        </VStack>
      </Box>
    );
  }

  return (
    <Box p={5} bg={bgColor} borderRadius="md" boxShadow="sm" border="1px" borderColor="red.100">
      <VStack spacing={5} align="stretch">
        <Text fontSize="xl" fontWeight="semibold" mb={1}>
          Dépenses par catégorie
        </Text>
        <Text fontSize="3xl" fontWeight="bold" color={theme.colors.pink[600]}>
          {totalExpenses.toLocaleString('fr-FR')} €
        </Text>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 30, bottom: 0, left: 30 }}
            barCategoryGap="15%"
          >
            <XAxis 
              type="number" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: textColor }}
              tickFormatter={(value) => `${value.toLocaleString('fr-FR')} €`}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: textColor }} 
              interval={0}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar 
              dataKey="value" 
              radius={[0, 10, 10, 0]}
              barSize={20}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || barFillColor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        <Text fontSize="sm" color="gray.600" textAlign="center">
          {chartData.length} catégories principales
        </Text>
      </VStack>
    </Box>
  );
}

export default ExpensesBarChart;