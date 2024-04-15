import React from 'react';
import { 
  Box, 
  Text, 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Badge
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const SoldeFinancierCoherent = () => {
  return (
    <Box maxWidth="container.xl" mx="auto" p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Vérifier les comptes financiers
      </Text>
      <Text mb={4}>
        Nous avons vérifié pour chacun de vos comptes bancaires si les transactions de l'exercice ont bien été récupérées par Indy.
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Compte</Th>
            <Th>État</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1. M Recipon Guillaume - BoursaBank (ex Boursorama)</Td>
            <Td>
              <Badge colorScheme="green" variant="solid">
                <CheckIcon mr={2} />
                Situation cohérente
              </Badge>
            </Td>
            <Td>-</Td>
          </Tr>
          {/* More rows as needed */}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SoldeFinancierCoherent;
