import React from 'react';
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  useTheme,
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

const data = [
  { category: 'Revenus', thisYear: 120, lastYear: 95 },
  { category: 'Rentabilité', thisYear: 85, lastYear: 70 },
  { category: 'Trésorerie', thisYear: 90, lastYear: 75 },
  { category: 'Croissance', thisYear: 110, lastYear: 80 },
  { category: 'Charges maîtrisées', thisYear: 75, lastYear: 65 },
  { category: 'Liquidité', thisYear: 95, lastYear: 85 },
];

function MonthlyComparisonChart() {
  const theme = useTheme();
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

  return (
    <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Comparaison annuelle des performances
        </Text>
      </Flex>

      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis angle={90} domain={[0, 120]} />
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
