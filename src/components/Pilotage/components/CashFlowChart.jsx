import React from 'react';
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const data = [
  { month: 'Jan', entrees: 12000, sorties: -7200, net: 4800 },
  { month: 'Fév', entrees: 11500, sorties: -7500, net: 4000 },
  { month: 'Mar', entrees: 13000, sorties: -6800, net: 6200 },
  { month: 'Avr', entrees: 10800, sorties: -7100, net: 3700 },
  { month: 'Mai', entrees: 12200, sorties: -7400, net: 4800 },
  { month: 'Jun', entrees: 11900, sorties: -7000, net: 4900 },
  { month: 'Jul', entrees: 12500, sorties: -7300, net: 5200 },
  { month: 'Aoû', entrees: 11000, sorties: -6900, net: 4100 },
  { month: 'Sep', entrees: 13200, sorties: -7200, net: 6000 },
  { month: 'Oct', entrees: 12800, sorties: -7100, net: 5700 },
  { month: 'Nov', entrees: 11700, sorties: -7000, net: 4700 },
  { month: 'Déc', entrees: 14000, sorties: -7500, net: 6500 },
];

function CashFlowChart() {
  const theme = useTheme();
  const bgColor = useColorModeValue('red.50', 'gray.800');
  const entreesColor = theme.colors.green[500];
  const sortiesColor = theme.colors.red[500];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="red.50" p="3" boxShadow="md" borderRadius="lg" border="1px" borderColor="red.100">
          <Text fontWeight="bold" mb={1}>{label}</Text>
          <Text fontSize="sm" color="green.600">Entrées: {payload[0].value.toLocaleString()} €</Text>
          <Text fontSize="sm" color="red.600">Sorties: {Math.abs(payload[1].value).toLocaleString()} €</Text>
          <Text fontSize="sm" color="blue.600" fontWeight="bold">
            Net: {payload[2].value.toLocaleString()} €
          </Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Flux de trésorerie mensuel
        </Text>
      </Flex>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="entrees" fill={entreesColor} name="Entrées" />
          <Bar dataKey="sorties" fill={sortiesColor} name="Sorties" />
          <Bar dataKey="net" fill={theme.colors.blue[400]} name="Flux net" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default CashFlowChart;
