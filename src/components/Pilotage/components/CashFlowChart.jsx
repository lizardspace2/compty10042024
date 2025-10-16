import React from 'react';
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  useTheme,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
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
import { useCashFlowData } from '../hooks/useCashFlowData';

function CashFlowChart() {
  const theme = useTheme();
  const bgColor = useColorModeValue('red.50', 'gray.800');
  const entreesColor = theme.colors.green[500];
  const sortiesColor = theme.colors.red[500];

  // Charger les données depuis Supabase
  const { data, loading, error } = useCashFlowData();

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

  // Gestion du chargement
  if (loading) {
    return (
      <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
        <Flex justifyContent="center" alignItems="center" minH="400px">
          <Spinner size="xl" color="red.500" thickness="4px" />
        </Flex>
      </Box>
    );
  }

  // Gestion des erreurs
  if (error) {
    return (
      <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          <Box>
            <AlertTitle>Erreur de chargement</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Box>
        </Alert>
      </Box>
    );
  }

  // Gestion des données vides
  if (!data || data.length === 0) {
    return (
      <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Text fontSize="xl" fontWeight="bold">
            Flux de trésorerie mensuel
          </Text>
        </Flex>
        <Alert status="info" borderRadius="lg">
          <AlertIcon />
          <AlertDescription>
            Aucune donnée de flux de trésorerie disponible pour le moment.
          </AlertDescription>
        </Alert>
      </Box>
    );
  }

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
