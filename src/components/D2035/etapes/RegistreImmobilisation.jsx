import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Input, Icon } from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';

const RegistreImmobilisation = () => {
  return (
    <Box maxWidth="container.xl" mx="auto" p={5} overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Catégorie</Th>
            <Th>Mode amortissement</Th>
            <Th>Durée</Th>
            <Th>Description</Th>
            <Th>Montant</Th>
            <Th>Amortissement cumulé</Th>
            <Th>Perso</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>01 févr. 2023</Td>
            <Td>Part de SCM ou équivalent</Td>
            <Td>Non amortissable</Td>
            <Td isNumeric>0</Td>
            <Td>parts de selas associé</Td>
            <Td isNumeric>1,00</Td>
            <Td isNumeric>0,00</Td>
            <Td>
              <Input size="sm" placeholder="0%" />
              <Icon as={MdEdit} ml={2} w={5} h={5} />
            </Td>
          </Tr>
          {/* ... More rows as needed */}
        </Tbody>
      </Table>
    </Box>
  );
};

export default RegistreImmobilisation;
