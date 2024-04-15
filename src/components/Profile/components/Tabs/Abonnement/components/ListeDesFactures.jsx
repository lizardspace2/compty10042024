import React from 'react';
import { Box, Flex, Text, Tag, Icon } from '@chakra-ui/react';
import { FiPrinter } from 'react-icons/fi';

const factures = [
  { date: '14/04/2024', type: 'Abonnement mensuel', montant: '14,40 €', payee: 'Payée' },
  { date: '14/03/2024', type: 'Abonnement mensuel', montant: '26,40 €', payee: 'Payée' },
];

export function ListeDesFactures() {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Text fontSize="lg" fontWeight="bold" p={4}>Factures</Text>
      {factures.map((facture, index) => (
        <Flex
          key={index}
          align="center"
          justify="space-between"
          p={4}
          borderBottomWidth={index < factures.length - 1 ? '1px' : '0'}
        >
          <Text>{facture.date}</Text>
          <Text>{facture.type}</Text>
          <Text>{facture.montant}</Text>
          <Tag size="sm" variant="solid" colorScheme="green">
            {facture.payee}
          </Tag>
          <Icon as={FiPrinter} cursor="pointer" />
        </Flex>
      ))}
    </Box>
  );
}
