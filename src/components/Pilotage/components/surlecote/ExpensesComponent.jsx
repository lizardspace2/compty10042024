// src/components/surlecote/ExpensesComponent.js
import React from 'react';
import { Box, Text, useColorModeValue, Skeleton } from '@chakra-ui/react';
import { useDashboardData } from '../../hooks/useDashboardData';

function ExpensesComponent({ amount, currency }) {
  const { data, loading } = useDashboardData();
  const bgColor = useColorModeValue('red.50', 'red.900');
  const borderColor = useColorModeValue('red.200', 'red.700');

  const displayAmount = data?.kpi?.total_depenses || amount;

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
        Expenses
      </Text>
      <Text fontSize="2xl" fontWeight="bold" color="red.600">
        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(displayAmount)}
      </Text>
    </Box>
  );
}

export default ExpensesComponent;