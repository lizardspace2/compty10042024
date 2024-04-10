import React from 'react';
import { Box, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Cotisations retraite', value: 12000 },
  { name: 'Cotisations URSSAF', value: 8500 },
  { name: 'Cotisations facultatives Madelin', value: 4700 },
  { name: 'Abonnements logiciels', value: 2100 },
  { name: 'Assurance professionnelle', value: 1300 },
  { name: 'Autres dépenses', value: 500 },
];

function ExpensesBarChart() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const totalExpenses = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" boxShadow="md">
      <VStack spacing={4}>
        <Text fontSize="lg" fontWeight="semibold">
          Dépenses
        </Text>
        <Text fontSize="2xl" fontWeight="bold">
          {totalExpenses.toLocaleString()} €
        </Text>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
          >
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip />
            <Bar dataKey="value" fill="#FF6384" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </VStack>
    </Box>
  );
}

export default ExpensesBarChart;
