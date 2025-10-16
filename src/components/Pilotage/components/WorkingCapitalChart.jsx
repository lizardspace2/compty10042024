import React from 'react';
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  useTheme,
  HStack,
  VStack,
  Skeleton,
} from '@chakra-ui/react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { useDashboardData } from '../hooks/useDashboardData';

function WorkingCapitalChart() {
  const theme = useTheme();
  const { data: dashboardData, loading } = useDashboardData();
  const bgColor = useColorModeValue('red.50', 'gray.800');

  if (loading || !dashboardData?.workingCapital) {
    return (
      <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
        <Skeleton height="400px" />
      </Box>
    );
  }

  const data = dashboardData.workingCapital.map(item => ({
    mois: item.mois_court,
    bfr: Math.round(item.bfr || 0),
    creances: Math.round(item.creances_clients || 0),
    dettes: Math.round(item.dettes_fournisseurs || 0)
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="red.50" p="3" boxShadow="md" borderRadius="lg" border="1px" borderColor="red.100">
          <Text fontWeight="bold" mb={1}>{label}</Text>
          <Text fontSize="sm" color="orange.600">BFR: {payload[0].value.toLocaleString()} €</Text>
          <Text fontSize="sm" color="green.600">Créances: {payload[1].value.toLocaleString()} €</Text>
          <Text fontSize="sm" color="red.600">Dettes: {payload[2].value.toLocaleString()} €</Text>
        </Box>
      );
    }
    return null;
  };

  const avgBFR = data.length > 0 ? (data.reduce((sum, item) => sum + item.bfr, 0) / data.length).toFixed(0) : 0;
  const avgCreances = data.length > 0 ? (data.reduce((sum, item) => sum + item.creances, 0) / data.length).toFixed(0) : 0;
  const avgDettes = data.length > 0 ? (data.reduce((sum, item) => sum + item.dettes, 0) / data.length).toFixed(0) : 0;
  const delaiPaiement = avgCreances > 0 ? Math.round((avgCreances / (avgCreances + avgDettes)) * 60) : 0;

  return (
    <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Besoin en Fonds de Roulement (BFR)
        </Text>
      </Flex>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorBFR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.colors.orange[400]} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={theme.colors.orange[400]} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorCreances" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.colors.green[400]} stopOpacity={0.6}/>
              <stop offset="95%" stopColor={theme.colors.green[400]} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorDettes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.colors.red[400]} stopOpacity={0.6}/>
              <stop offset="95%" stopColor={theme.colors.red[400]} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mois" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="creances"
            stroke={theme.colors.green[500]}
            fillOpacity={1}
            fill="url(#colorCreances)"
            name="Créances clients"
          />
          <Area
            type="monotone"
            dataKey="dettes"
            stroke={theme.colors.red[500]}
            fillOpacity={1}
            fill="url(#colorDettes)"
            name="Dettes fournisseurs"
          />
          <Area
            type="monotone"
            dataKey="bfr"
            stroke={theme.colors.orange[500]}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorBFR)"
            name="BFR"
          />
        </AreaChart>
      </ResponsiveContainer>

      <HStack spacing={8} justify="center" mt={4} pt={4} borderTop="1px" borderColor="red.100">
        <VStack spacing={0}>
          <Text fontSize="xs" color="gray.600">BFR moyen</Text>
          <Text fontSize="lg" fontWeight="bold" color="orange.600">{avgBFR} €</Text>
        </VStack>
        <VStack spacing={0}>
          <Text fontSize="xs" color="gray.600">Créances moyennes</Text>
          <Text fontSize="lg" fontWeight="bold" color="green.600">{avgCreances} €</Text>
        </VStack>
        <VStack spacing={0}>
          <Text fontSize="xs" color="gray.600">Dettes moyennes</Text>
          <Text fontSize="lg" fontWeight="bold" color="red.600">{avgDettes} €</Text>
        </VStack>
        <VStack spacing={0}>
          <Text fontSize="xs" color="gray.600">Délai estimé</Text>
          <Text fontSize="lg" fontWeight="bold" color="blue.600">{delaiPaiement} jours</Text>
        </VStack>
      </HStack>
    </Box>
  );
}

export default WorkingCapitalChart;
