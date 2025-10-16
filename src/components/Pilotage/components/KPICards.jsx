// src/components/KPICards.js
import React from 'react';
import {
  Box,
  Text,
  Flex,
  Grid,
  GridItem,
  Icon,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Skeleton
} from '@chakra-ui/react';
import { FaChartLine, FaPercentage, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';
import { useDashboardData } from '../hooks/useDashboardData';

const KPICard = ({ title, value, change, icon, color, isPositive = true, isLoading }) => {
  const bgColor = useColorModeValue('red.50', 'gray.800');

  if (isLoading) {
    return (
      <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
        <Skeleton height="80px" />
      </Box>
    );
  }

  return (
    <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
      <Flex justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Text fontSize="sm" color="gray.600" fontWeight="medium">
            {title}
          </Text>
        </Box>
        <Icon as={icon} w={8} h={8} color={color} />
      </Flex>
      <Stat>
        <StatNumber fontSize="2xl" fontWeight="bold">
          {value}
        </StatNumber>
        {change && (
          <StatHelpText mb={0}>
            <StatArrow type={isPositive ? 'increase' : 'decrease'} />
            {change}
          </StatHelpText>
        )}
      </Stat>
    </Box>
  );
};

function KPICards() {
  const { data, loading } = useDashboardData();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount || 0);
  };

  if (loading || !data?.kpi) {
    return (
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={6}>
        {[...Array(4)].map((_, i) => (
          <GridItem key={i}>
            <Skeleton height="120px" borderRadius="xl" />
          </GridItem>
        ))}
      </Grid>
    );
  }

  const { kpi } = data;

  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={6}>
      <GridItem>
        <KPICard
          title="Chiffre d'affaires annuel"
          value={formatCurrency(kpi.chiffre_affaires)}
          change="12% vs année précédente"
          icon={FaMoneyBillWave}
          color="green.500"
          isPositive={true}
          isLoading={loading}
        />
      </GridItem>
      <GridItem>
        <KPICard
          title="Taux de marge moyen"
          value={`${kpi.taux_marge}%`}
          change="2% vs mois dernier"
          icon={FaPercentage}
          color="blue.500"
          isPositive={kpi.taux_marge > 0}
          isLoading={loading}
        />
      </GridItem>
      <GridItem>
        <KPICard
          title="Résultat net"
          value={formatCurrency(kpi.resultat_net)}
          change="8% vs année précédente"
          icon={FaChartLine}
          color="purple.500"
          isPositive={kpi.resultat_net >= 0}
          isLoading={loading}
        />
      </GridItem>
      <GridItem>
        <KPICard
          title="Jours de trésorerie"
          value={`${kpi.jours_tresorerie} jours`}
          change="5 jours vs mois dernier"
          icon={FaCalendarAlt}
          color="orange.500"
          isPositive={kpi.jours_tresorerie > 60}
          isLoading={loading}
        />
      </GridItem>
    </Grid>
  );
}

export default KPICards;