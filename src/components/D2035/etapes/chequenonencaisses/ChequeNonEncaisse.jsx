import React from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Link } from '@chakra-ui/react';

const ChequeNonEncaisse = () => {
  // This state would normally come from props or a data fetching hook
  const hasChecks = false; // This should be based on actual data

  return (
    <Box maxWidth="container.xl" mx="auto" p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={3}>
        Chèques non encaissés de 2023
      </Text>
      <Text mb={6}>
        {hasChecks
          ? "Voici la liste de vos chèques non encaissés."
          : "Parfait, vous avez indiqué ne pas avoir de chèque non encaissé. Vous pouvez toujours en ajouter si nécessaire."}
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Sens</Th>
            <Th>Libellé</Th>
            <Th>Montant</Th>
            <Th>Catégorie</Th>
          </Tr>
        </Thead>
        <Tbody>
          {hasChecks ? (
            // Map your checks data to rows here
            null // Placeholder for data rows
          ) : (
            <Tr>
              <Td colSpan="4" textAlign="center">
                Vous avez indiqué ne pas avoir de chèque.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      {!hasChecks && (
        <Link color="blue.500" href="#">Ajouter un chèque</Link>
      )}
    </Box>
  );
};

export default ChequeNonEncaisse;
