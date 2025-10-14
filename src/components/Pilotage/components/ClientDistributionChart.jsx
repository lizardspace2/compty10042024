import React from 'react';
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react';
import {
  Treemap,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const data = [
  {
    name: 'Clients',
    children: [
      { name: 'Client A', size: 28000, transactions: 45 },
      { name: 'Client B', size: 22000, transactions: 38 },
      { name: 'Client C', size: 18000, transactions: 32 },
      { name: 'Client D', size: 15000, transactions: 25 },
      { name: 'Client E', size: 12000, transactions: 20 },
      { name: 'Client F', size: 10000, transactions: 18 },
      { name: 'Client G', size: 8000, transactions: 15 },
      { name: 'Client H', size: 6000, transactions: 12 },
      { name: 'Autres', size: 8000, transactions: 95 },
    ],
  },
];

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#D7BDE2'];

function ClientDistributionChart() {
  const bgColor = useColorModeValue('red.50', 'gray.800');

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box bg="red.50" p="3" boxShadow="md" borderRadius="lg" border="1px" borderColor="red.100">
          <Text fontWeight="bold" mb={1}>{data.name}</Text>
          <Text fontSize="sm">CA: {data.size.toLocaleString()} €</Text>
          <Text fontSize="sm">Transactions: {data.transactions}</Text>
          <Text fontSize="sm" color="gray.600">
            Moyenne: {(data.size / data.transactions).toFixed(2)} €/transaction
          </Text>
        </Box>
      );
    }
    return null;
  };

  const CustomContent = (props) => {
    const { x, y, width, height, index, name, value } = props;

    // Skip rendering if essential props are missing
    if (!x || !y || !width || !height || index === undefined) {
      return null;
    }

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: COLORS[index % COLORS.length],
            stroke: '#fff',
            strokeWidth: 2,
          }}
        />
        {width > 80 && height > 40 && name && value && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 10}
              textAnchor="middle"
              fill="#fff"
              fontSize={14}
              fontWeight="bold"
            >
              {name}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 10}
              textAnchor="middle"
              fill="#fff"
              fontSize={12}
            >
              {value.toLocaleString()} €
            </text>
          </>
        )}
      </g>
    );
  };

  return (
    <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Répartition du CA par client
        </Text>
      </Flex>

      <ResponsiveContainer width="100%" height={400}>
        <Treemap
          data={data}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
          content={<CustomContent />}
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>

      <Text fontSize="sm" color="gray.600" textAlign="center" mt={2}>
        Concentration client: Top 3 représentent 53% du CA total
      </Text>
    </Box>
  );
}

export default ClientDistributionChart;
