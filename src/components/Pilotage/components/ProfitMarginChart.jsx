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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useProfitMarginData } from '../hooks/useProfitMarginData';

function ProfitMarginChart() {
  const theme = useTheme();
  const bgColor = useColorModeValue('red.50', 'gray.800');
  const revenueColor = theme.colors.green[400];
  const expensesColor = theme.colors.red[400];
  const marginColor = theme.colors.blue[400];

  // Charger les données depuis Supabase
  const { data, loading, error } = useProfitMarginData();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="red.50" p="3" boxShadow="md" borderRadius="lg" border="1px" borderColor="red.100">
          <Text fontWeight="bold" mb={1}>{label}</Text>
          <Text fontSize="sm" color="green.600">
            Revenus: {payload[0]?.value?.toLocaleString('fr-FR')} €
          </Text>
          <Text fontSize="sm" color="red.600">
            Dépenses: {payload[1]?.value?.toLocaleString('fr-FR')} €
          </Text>
          <Text fontSize="sm" color="blue.600">
            Marge: {payload[2]?.value?.toLocaleString('fr-FR')} €
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
            Évolution de la marge bénéficiaire
          </Text>
        </Flex>
        <Alert status="info" borderRadius="lg">
          <AlertIcon />
          <AlertDescription>
            Aucune donnée de marge disponible pour le moment.
          </AlertDescription>
        </Alert>
      </Box>
    );
  }

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
