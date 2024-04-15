import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text
} from '@chakra-ui/react';

const CessionImmobilisation = () => {
  return (
    <Box maxWidth="container.xl" mx="auto" p={5} overflowX="auto">
      <Text mb={4}>
        Si vous vendez ou si vous mettez au rebut un actif immobilisé, saisissez les informations de cession pour permettre à Indy de calculer les plus ou moins-values.
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Immobilisation</Th>
            <Th>Date de cession</Th>
            <Th>Valeur d'origine</Th>
            <Th>Amort.</Th>
            <Th>Prix de cession</Th>
            <Th>Plus ou moins value court-terme</Th>
            <Th>Plus ou moins value long-terme</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* Row items will go here */}
          {/* This is just an example row below */}
          <Tr>
            <Td>Exemple d'immobilisation</Td>
            <Td>01 janv. 2024</Td>
            <Td>10,000€</Td>
            <Td>5,000€</Td>
            <Td>7,000€</Td>
            <Td>{/* Calculated value */}</Td>
            <Td>{/* Calculated value */}</Td>
          </Tr>
          {/* You would typically map over an array of asset disposals to generate these rows */}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CessionImmobilisation;
