import React from 'react';
import {
  Box,
  Text,
  Flex,
  Button,
  IconButton,
  useColorModeValue,
  Tooltip as ChakraTooltip,
  useTheme,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { IoInformationCircleOutline } from 'react-icons/io5';

const data = [
    { month: 'Jan', value: 1200 },
    { month: 'Feb', value: 2100 },
    { month: 'Mar', value: 1800 },
    { month: 'Apr', value: 2400 },
    { month: 'May', value: 2000 },
    { month: 'Jun', value: 1900 },
    { month: 'Jul', value: 2200 },
    { month: 'Aug', value: 2300 },
    { month: 'Sep', value: 2500 },
    { month: 'Oct', value: 2600 },
    { month: 'Nov', value: 2100 },
    { month: 'Dec', value: 1700 },
  ];
  

function TreasuryChart() {
  const theme = useTheme();
  const bgColor = useColorModeValue('white', 'gray.800');
  const lineColor = theme.colors.teal[300];

  // Custom tooltip component for the recharts Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="white" p="2" boxShadow="md" borderRadius="lg">
          <Text fontWeight="bold">{`${label} : ${payload[0].value} €`}</Text>
        </Box>
      );
    }

    return null;
  };

  return (
    <Box p={5} bg={bgColor} borderRadius="lg" boxShadow="md">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Trésorerie
        </Text>
        <Button variant="outline" size="sm">
          Détail
        </Button>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Flex align="center">
          <Text fontSize="lg" fontWeight="semibold" mr={2}>
            Solde bancaire
          </Text>
          <ChakraTooltip label="Information détaillée" hasArrow>
            <IconButton
              aria-label="Details"
              variant="ghost"
              icon={<IoInformationCircleOutline />}
              size="sm"
            />
          </ChakraTooltip>
        </Flex>
        <Text fontSize="3xl" fontWeight="bold" color={theme.colors.teal[600]}>
          4 973 €
        </Text>
      </Flex>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            fill="none"
            strokeWidth={2}
            activeDot={{ r: 8 }}
            dot={false} // Remove the dots if you prefer
          />
        </LineChart>
      </ResponsiveContainer>

      <ChakraTooltip label="Mise à jour le 10 avril 2024" aria-label="Update info">
        <Text textAlign="center" mt={3} fontSize="sm">
          Mise à jour le 10 avril 2024
        </Text>
      </ChakraTooltip>
    </Box>
  );
}

export default TreasuryChart;
