import React from 'react';
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 10417, expenses: 7200, margin: 3217 },
  { month: 'Fév', revenue: 10417, expenses: 7500, margin: 2917 },
  { month: 'Mar', revenue: 10417, expenses: 6800, margin: 3617 },
  { month: 'Avr', revenue: 10417, expenses: 7100, margin: 3317 },
  { month: 'Mai', revenue: 10417, expenses: 7400, margin: 3017 },
  { month: 'Jun', revenue: 10417, expenses: 7000, margin: 3417 },
  { month: 'Jul', revenue: 10417, expenses: 7300, margin: 3117 },
  { month: 'Aoû', revenue: 10417, expenses: 6900, margin: 3517 },
  { month: 'Sep', revenue: 10417, expenses: 7200, margin: 3217 },
  { month: 'Oct', revenue: 10694, expenses: 7100, margin: 3594 },
  { month: 'Nov', revenue: 10417, expenses: 7000, margin: 3417 },
  { month: 'Déc', revenue: 10417, expenses: 7500, margin: 2917 },
];

function ProfitMarginChart() {
  const theme = useTheme();
  const bgColor = useColorModeValue('red.50', 'gray.800');
  const revenueColor = theme.colors.green[400];
  const expensesColor = theme.colors.red[400];
  const marginColor = theme.colors.blue[400];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="red.50" p="3" boxShadow="md" borderRadius="lg" border="1px" borderColor="red.100">
          <Text fontWeight="bold" mb={1}>{label}</Text>
          <Text fontSize="sm" color="green.600">Revenus: {payload[0].value} €</Text>
          <Text fontSize="sm" color="red.600">Dépenses: {payload[1].value} €</Text>
          <Text fontSize="sm" color="blue.600">Marge: {payload[2].value} €</Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Évolution de la marge bénéficiaire
        </Text>
      </Flex>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={revenueColor} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={revenueColor} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={expensesColor} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={expensesColor} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={marginColor} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={marginColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke={revenueColor}
            fillOpacity={1}
            fill="url(#colorRevenue)"
            name="Revenus"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke={expensesColor}
            fillOpacity={1}
            fill="url(#colorExpenses)"
            name="Dépenses"
          />
          <Area
            type="monotone"
            dataKey="margin"
            stroke={marginColor}
            fillOpacity={1}
            fill="url(#colorMargin)"
            name="Marge"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default ProfitMarginChart;
