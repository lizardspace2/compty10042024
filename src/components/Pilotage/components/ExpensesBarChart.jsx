import React from 'react';
import {
  Box,
  Text,
  VStack,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box bg="black" color="white" p="2" borderRadius="md" boxShadow="xl">
        <Text>{`${label}`}</Text>
        <Text>{`${payload[0].name}: ${payload[0].value.toLocaleString('fr-FR')} €`}</Text>
      </Box>
    );
  }

  return null;
};

const data = [
    { name: 'Cotisations retraite', value: 12000 },
    { name: 'Cotisations URSSAF', value: 8500 },
    { name: 'Cotisations facultatives Madelin', value: 4700 },
    { name: 'Abonnements logiciels', value: 2100 },
    { name: 'Assurance professionnelle', value: 1300 },
    { name: 'Autres dépenses', value: 500 },
  ];

function ExpensesBarChart() {
  const theme = useTheme();
  const bgColor = useColorModeValue('white', 'gray.100');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const barFillColor = theme.colors.pink[300];
  const totalExpenses = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Box p={5} bg={bgColor} borderRadius="md" boxShadow="sm">
            <VStack spacing={5} align="stretch">
        <Text fontSize="xl" fontWeight="semibold" mb={1}>
          Dépenses
        </Text>
        <Text fontSize="3xl" fontWeight="bold" color={theme.colors.pink[600]}>
          {totalExpenses.toLocaleString('fr-FR')} €
        </Text>
      <ResponsiveContainer width="100%" height={300}> {/* Adjusted height for better visibility */}
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 30, bottom: 0, left: 30 }}
          barCategoryGap="15%" // Adjusted for closer bar grouping
        >
          <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: textColor }} />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: textColor }} 
            interval={0} // To show all ticks
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Bar 
            dataKey="value" 
            fill={barFillColor} 
            radius={[0, 10, 10, 0]} // Adjusted for rounded corners
            barSize={20} // Adjusted bar thickness
          >
            {/* ... Cell components for individual bar colors */}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </VStack>
    </Box>
  );
}

export default ExpensesBarChart;
