// src/components/surlecote/RevenueComponent.js
import React from 'react';
import { Box, Text, useColorModeValue, Skeleton } from '@chakra-ui/react';
import { useDashboardData } from '../../hooks/useDashboardData';

function RevenueComponent({ amount, currency }) {
  const { data, loading } = useDashboardData();
  const bgColor = useColorModeValue('green.50', 'green.900');
  const borderColor = useColorModeValue('green.200', 'green.700');

  const displayAmount = data?.kpi?.chiffre_affaires || amount;

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
        Revenues
      </Text>
      <Text fontSize="2xl" fontWeight="bold" color="green.600">
        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(displayAmount)}
      </Text>
    </Box>
  );
}

export default RevenueComponent;