import React from 'react';
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
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
  Cell,
} from 'recharts';

const data = [
  { moyen: 'Virement', montant: 45000, nombre: 145 },
  { moyen: 'Carte bancaire', montant: 32000, nombre: 420 },
  { moyen: 'Prélèvement', montant: 28000, nombre: 86 },
  { moyen: 'Espèces', montant: 8500, nombre: 112 },
  { moyen: 'Chèque', montant: 13500, nombre: 48 },
];

const COLORS = ['#4ECDC4', '#FF6B6B', '#45B7D1', '#F7DC6F', '#BB8FCE'];

function PaymentMethodsChart() {
  const bgColor = useColorModeValue('red.50', 'gray.800');

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="red.50" p="3" boxShadow="md" borderRadius="lg" border="1px" borderColor="red.100">
          <Text fontWeight="bold" mb={1}>{payload[0].payload.moyen}</Text>
          <Text fontSize="sm">Montant: {payload[0].value.toLocaleString()} €</Text>
          <Text fontSize="sm">Transactions: {payload[0].payload.nombre}</Text>
          <Text fontSize="sm" color="gray.600">
            Moyenne: {(payload[0].value / payload[0].payload.nombre).toFixed(2)} €
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
          Répartition par moyen de paiement
        </Text>
      </Flex>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="moyen" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="montant" name="Montant total (€)">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <Text fontSize="sm" color="gray.600" textAlign="center" mt={2}>
        Total: {data.reduce((a, b) => a + b.montant, 0).toLocaleString()} € sur {data.reduce((a, b) => a + b.nombre, 0)} transactions
      </Text>
    </Box>
  );
}

export default PaymentMethodsChart;
