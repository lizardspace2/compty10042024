import React from 'react';
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  useTheme,
  Badge,
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
  { periode: 'T1', revenus: 31250, charges: 19500, base_imposable: 11750, impots_estimes: 4113 },
  { periode: 'T2', revenus: 34500, charges: 21200, base_imposable: 13300, impots_estimes: 4655 },
  { periode: 'T3 (prév)', revenus: 33000, charges: 20500, base_imposable: 12500, impots_estimes: 4375 },
  { periode: 'T4 (prév)', revenus: 35000, charges: 22000, base_imposable: 13000, impots_estimes: 4550 },
];

function TaxProjectionChart() {
  const theme = useTheme();
  const bgColor = useColorModeValue('red.50', 'gray.800');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const tauxImposition = ((data.impots_estimes / data.base_imposable) * 100).toFixed(1);

      return (
        <Box bg="red.50" p="3" boxShadow="md" borderRadius="lg" border="1px" borderColor="red.100">
          <Text fontWeight="bold" mb={2}>{label}</Text>
          <Text fontSize="sm">Revenus: {data.revenus.toLocaleString()} €</Text>
          <Text fontSize="sm">Charges: {data.charges.toLocaleString()} €</Text>
          <Text fontSize="sm" fontWeight="bold" color="blue.600">
            Base imposable: {data.base_imposable.toLocaleString()} €
          </Text>
          <Text fontSize="sm" fontWeight="bold" color="red.600">
            Impôts estimés: {data.impots_estimes.toLocaleString()} €
          </Text>
          <Text fontSize="xs" color="gray.600" mt={1}>
            Taux effectif: {tauxImposition}%
          </Text>
        </Box>
      );
    }
    return null;
  };

  const totalImpots = data.reduce((sum, item) => sum + item.impots_estimes, 0);

  return (
    <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Projection fiscale annuelle
        </Text>
        <Badge colorScheme="red" fontSize="md" p={2} borderRadius="md">
          Impôts estimés: {totalImpots.toLocaleString()} €
        </Badge>
      </Flex>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="periode" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar
            dataKey="revenus"
            fill={theme.colors.green[400]}
            name="Revenus"
            stackId="a"
          />
          <Bar
            dataKey="charges"
            fill={theme.colors.orange[400]}
            name="Charges déductibles"
            stackId="b"
          />
          <Bar
            dataKey="impots_estimes"
            fill={theme.colors.red[500]}
            name="Impôts estimés"
          />
        </BarChart>
      </ResponsiveContainer>

      <Flex justifyContent="space-around" mt={4} pt={4} borderTop="1px" borderColor="red.100">
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.600">Revenus annuels</Text>
          <Text fontSize="lg" fontWeight="bold" color="green.600">
            {data.reduce((sum, item) => sum + item.revenus, 0).toLocaleString()} €
          </Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.600">Charges déductibles</Text>
          <Text fontSize="lg" fontWeight="bold" color="orange.600">
            {data.reduce((sum, item) => sum + item.charges, 0).toLocaleString()} €
          </Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.600">Base imposable</Text>
          <Text fontSize="lg" fontWeight="bold" color="blue.600">
            {data.reduce((sum, item) => sum + item.base_imposable, 0).toLocaleString()} €
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default TaxProjectionChart;
