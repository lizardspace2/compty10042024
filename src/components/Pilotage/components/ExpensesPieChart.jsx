import React from 'react';
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

const data = [
  { name: 'Salaires & charges', value: 35000 },
  { name: 'Loyer & charges locatives', value: 18000 },
  { name: 'Matériel & outillage', value: 12000 },
  { name: 'Déplacements', value: 8000 },
  { name: 'Télécom & fournitures', value: 5000 },
  { name: 'Formation', value: 4000 },
  { name: 'Autres', value: 3000 },
];

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];

function ExpensesPieChart() {
  const bgColor = useColorModeValue('red.50', 'gray.800');

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="red.50" p="3" boxShadow="md" borderRadius="lg" border="1px" borderColor="red.100">
          <Text fontWeight="bold">{payload[0].name}</Text>
          <Text fontSize="sm">Montant: {payload[0].value} €</Text>
          <Text fontSize="sm">
            Pourcentage: {((payload[0].value / data.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%
          </Text>
        </Box>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Répartition des dépenses par catégorie
        </Text>
      </Flex>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <Box mt={4}>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          Total des dépenses: {data.reduce((a, b) => a + b.value, 0).toLocaleString()} €
        </Text>
      </Box>
    </Box>
  );
}

export default ExpensesPieChart;
