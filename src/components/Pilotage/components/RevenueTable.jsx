// src/components/RevenueTable.js
import React from 'react';
import {
  Box,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Icon,
  Skeleton
} from '@chakra-ui/react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useDashboardData } from '../hooks/useDashboardData';

function RevenueTable() {
  const { data, loading } = useDashboardData();
  const bgColor = useColorModeValue('red.50', 'gray.800');
  const borderColor = useColorModeValue('red.100', 'gray.700');

  // Filtrer seulement les revenus
  const revenueTransactions = data?.transactions?.filter(t => t.type_transaction === 'revenu') || [];

  if (loading) {
    return (
      <Box p={4} bg={bgColor} borderRadius="lg" boxShadow="md" borderColor={borderColor} borderWidth={1}>
        <Skeleton height="200px" />
      </Box>
    );
  }

  return (
    <Box
      p={4}
      bg={bgColor}
      borderRadius="lg"
      boxShadow="md"
      borderColor={borderColor}
      borderWidth={1}
      maxW="100%"
      overflowX="auto"
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>
              <Flex align="center">
                <Icon as={MdKeyboardArrowRight} mr={2} />
                Revenues
              </Flex>
            </Th>
            <Th>Date</Th>
            <Th>Catégorie</Th>
            <Th isNumeric>Montant</Th>
            <Th>Moyen de paiement</Th>
          </Tr>
        </Thead>
        <Tbody>
          {revenueTransactions.map((transaction) => (
            <Tr key={transaction.id}>
              <Td>{transaction.libelle}</Td>
              <Td>{new Date(transaction.date_transaction).toLocaleDateString('fr-FR')}</Td>
              <Td>{transaction.categorie_nom}</Td>
              <Td isNumeric fontWeight="bold">
                {transaction.montant_total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </Td>
              <Td>{transaction.moyen_paiement}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default RevenueTable;