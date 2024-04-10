import React from 'react';
import {
  Box,
  Text,
  VStack,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

// Sample data
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
        <Box>
          <Text fontSize="xl" fontWeight="semibold" mb={1}>
            Dépenses
          </Text>
          <Text fontSize="3xl" fontWeight="bold" color={theme.colors.pink[600]}>
            {totalExpenses.toLocaleString('fr-FR')} €
          </Text>
        </Box>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 30, bottom: 0, left: 30 }}
            barSize={10}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, fill: textColor }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                borderColor: 'rgba(0,0,0,0)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
              cursor={{ fill: 'transparent' }}
            />
            <Bar
              dataKey="value"
              fill={barFillColor}
              background={{ fill: theme.colors.gray[200] }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 1 ? theme.colors.pink[400] : barFillColor} />
              ))}
              <LabelList dataKey="value" position="insideRight" fill={textColor} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </VStack>
    </Box>
  );
}

export default ExpensesBarChart;
