// src/components/surlecote/ResultComponent.js
import React from 'react';
import { Box, Text, useColorModeValue, Skeleton } from '@chakra-ui/react';
import { useDashboardData } from '../../hooks/useDashboardData';

function ResultComponent({ amount, currency }) {
  const { data, loading } = useDashboardData();
  const bgColor = useColorModeValue('blue.50', 'blue.900');
  const borderColor = useColorModeValue('blue.200', 'blue.700');

  const displayAmount = data?.kpi?.resultat_net || amount;
  const isPositive = displayAmount >= 0;

  if (loading) {
    return (
      <Box p={4} bg={bgColor} borderRadius="lg" border="1px" borderColor={borderColor}>
        <Skeleton height="60px" />
      </Box>
    );
  }

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" border="1px" borderColor={borderColor}>
      <Text fontSize="sm" color="gray.600" mb={1}>
        Result
      </Text>
      <Text 
        fontSize="2xl" 
        fontWeight="bold" 
        color={isPositive ? 'green.600' : 'red.600'}
      >
        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(displayAmount)}
      </Text>
    </Box>
  );
}

export default ResultComponent;