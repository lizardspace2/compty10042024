import React from 'react';
import {
  Box,
  Text,
  VStack,
  useColorModeValue,
  Progress,
  useTheme,
} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const data = [
  { name: 'Cotisations retraite', value: 12000, fill: '#FC8181' },
  { name: 'Cotisations URSSAF', value: 8500, fill: '#FEB2B2' },
  { name: 'Cotisations facultatives Madelin', value: 4700, fill: '#FED7D7' },
  { name: 'Abonnements logiciels', value: 2100, fill: '#FED7D7' },
  { name: 'Assurance professionnelle', value: 1300, fill: '#FEEBC8' },
  { name: 'Autres dépenses', value: 500, fill: '#FEEBC8' },
];

function ExpensesBarChart() {
  const theme = useTheme();
  const bgColor = useColorModeValue('white', 'gray.100');
  const barColor = theme.colors.pink[200];
  const totalExpenses = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" boxShadow="md">
      <VStack spacing={4} align="stretch">
        <Text fontSize="lg" fontWeight="semibold">
          Dépenses
        </Text>
        <Text fontSize="2xl" fontWeight="bold">
          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalExpenses)}
        </Text>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
            barCategoryGap="35%"
          >
            <XAxis
              type="number"
              hide={true}
            />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: theme.colors.gray[600] }}
              width={150}
            />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar dataKey="value" minPointSize={5} barSize={10}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill || barColor} />
              ))}
              <LabelList dataKey="value" position="right" fill={theme.colors.gray[600]} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </VStack>
    </Box>
  );
}

export default ExpensesBarChart;
