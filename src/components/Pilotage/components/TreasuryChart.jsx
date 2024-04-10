import React from 'react';
import {
  Box,
  Text,
  Flex,
  IconButton,
  useColorModeValue,
  Tooltip as ChakraTooltip,
  useTheme,
} from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IoInformationCircleOutline } from 'react-icons/io5'; // Importing the icon from react-icons

const data = [
  { date: '08/01', amount: 3000 },
  { date: '15/01', amount: 2000 },
  // ... more data
];

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <Box bg="white" p={3} boxShadow="md" borderRadius="lg">
        <Text>{`${label} : ${payload[0].value}€`}</Text>
      </Box>
    );
  }
  return null;
}

function TreasuryChart() {
  const theme = useTheme();
  const bgColor = useColorModeValue('white', 'gray.800');
  const lineColor = theme.colors.teal[300];

  return (
    <Box p={5} bg={bgColor} borderRadius="lg" boxShadow="md">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Trésorerie
        </Text>
        <IconButton
          aria-label="Information"
          icon={<IoInformationCircleOutline />}
          variant="ghost"
        />
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="lg" fontWeight="semibold">
          Solde bancaire
        </Text>
        <Text fontSize="xl" fontWeight="bold" color={theme.colors.teal[600]}>
          4 973 €
        </Text>
        <IconButton
          aria-label="Détail"
          icon={<IoInformationCircleOutline />}
          size="sm"
          variant="outline"
          isRound // This makes the button round
        >
          Détail
        </IconButton>
      </Flex>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, bottom: 5, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="amount" stroke={lineColor} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <ChakraTooltip label="Mise à jour le 10 avril 2024" aria-label="Update info">
        <Text textAlign="center" mt={3}>
          Mise à jour le 10 avril 2024
        </Text>
      </ChakraTooltip>
    </Box>
  );
}

export default TreasuryChart;
