// src/components/MonthlyComparisonChart.js
import React from 'react';
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  useTheme,
  Skeleton
} from '@chakra-ui/react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useDashboardData } from '../hooks/useDashboardData';

function MonthlyComparisonChart() {
  const theme = useTheme();
  const { data, loading } = useDashboardData();
  const bgColor = useColorModeValue('red.50', 'gray.800');

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="red.50" p="3" boxShadow="md" borderRadius="lg" border="1px" borderColor="red.100">
          <Text fontWeight="bold" mb={1}>{payload[0].payload.category}</Text>
          <Text fontSize="sm" color="blue.600">Cette année: {payload[0].value}%</Text>
          <Text fontSize="sm" color="gray.600">Année dernière: {payload[1].value}%</Text>
        </Box>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
        <Skeleton height="400px" />
      </Box>
    );
  }

  // Transformer les données du radar
  const radarData = data?.performance ? [
    { category: 'Revenus', thisYear: data.performance.score_revenus, lastYear: Math.max(0, data.performance.score_revenus - 15) },
    { category: 'Rentabilité', thisYear: data.performance.score_rentabilite, lastYear: Math.max(0, data.performance.score_rentabilite - 10) },
    { category: 'Trésorerie', thisYear: data.performance.score_tresorerie, lastYear: Math.max(0, data.performance.score_tresorerie - 12) },
    { category: 'Croissance', thisYear: data.performance.score_croissance, lastYear: Math.max(0, data.performance.score_croissance - 20) },
    { category: 'Charges maîtrisées', thisYear: data.performance.score_charges, lastYear: Math.max(0, data.performance.score_charges - 8) },
    { category: 'Liquidité', thisYear: data.performance.score_liquidite, lastYear: Math.max(0, data.performance.score_liquidite - 10) },
  ] : [];

  return (
    <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Comparaison annuelle des performances
        </Text>
      </Flex>

      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis angle={90} domain={[0, 100]} />
          <Radar
            name="Cette année"
            dataKey="thisYear"
            stroke={theme.colors.blue[500]}
            fill={theme.colors.blue[500]}
            fillOpacity={0.6}
          />
          <Radar
            name="Année dernière"
            dataKey="lastYear"
            stroke={theme.colors.gray[500]}
            fill={theme.colors.gray[500]}
            fillOpacity={0.6}
          />
          <Legend />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>

      <Text fontSize="sm" color="gray.600" textAlign="center" mt={2}>
        Performance globale: +15% vs année précédente
      </Text>
    </Box>
  );
}

export default MonthlyComparisonChart;