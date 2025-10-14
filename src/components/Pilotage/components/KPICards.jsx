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
} from '@chakra-ui/react';
import { FaChartLine, FaPercentage, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';

const KPICard = ({ title, value, change, icon, color, isPositive = true }) => {
  const bgColor = useColorModeValue('red.50', 'gray.800');

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
  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={6}>
      <GridItem>
        <KPICard
          title="Chiffre d'affaires annuel"
          value="127 000 €"
          change="12% vs année précédente"
          icon={FaMoneyBillWave}
          color="green.500"
          isPositive={true}
        />
      </GridItem>
      <GridItem>
        <KPICard
          title="Taux de marge moyen"
          value="33%"
          change="2% vs mois dernier"
          icon={FaPercentage}
          color="blue.500"
          isPositive={true}
        />
      </GridItem>
      <GridItem>
        <KPICard
          title="Résultat net"
          value="42 000 €"
          change="8% vs année précédente"
          icon={FaChartLine}
          color="purple.500"
          isPositive={true}
        />
      </GridItem>
      <GridItem>
        <KPICard
          title="Jours de trésorerie"
          value="87 jours"
          change="5 jours vs mois dernier"
          icon={FaCalendarAlt}
          color="orange.500"
          isPositive={false}
        />
      </GridItem>
    </Grid>
  );
}

export default KPICards;
