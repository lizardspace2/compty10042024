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
  Link, 
  Button, 
  Flex 
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const ChequeNonEncaisseModification = () => {
  const checksExist = false; // Replace this with actual check data logic

  return (
    <Box maxWidth="container.xl" mx="auto" p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Chèques non encaissés de 2023
      </Text>
      <Text mb={4}>
        Pour être pris en compte dans votre déclaration 2023, les chèques non encaissés au 31 décembre 2023 doivent être saisis.
        D'une part, saisissez les chèques émis mais non encaissés par le bénéficiaire au 31/12/2023. Vous pouvez comparer votre talon de chéquier avec le résultat du moteur de recherche sur "chq" dans l'onglet <Link color="blue.500" href="/transactions">Transactions</Link>.
        D'autre part, saisissez aussi les chèques reçus en recette en 2023 mais déposés en banque en 2024. Vous pouvez vérifier vos remises de chèques de janvier pour vous en assurer.
        Compty ajoutera ainsi ces transactions à votre déclaration 2023 et les retirera pour 2024.
      </Text>
      <Text fontSize="xl" fontWeight="semibold" mb={2}>
        Liste des chèques
      </Text>
      <Table variant="simple" mb={4}>
        <Thead>
          <Tr>
            <Th>Sens</Th>
            <Th>Libellé</Th>
            <Th>Montant</Th>
            <Th>Catégorie</Th>
          </Tr>
        </Thead>
        <Tbody>
          {checksExist ? (
            // Rows of checks will be rendered here based on data
            null // Placeholder for data rows
          ) : (
            <Tr>
              <Td colSpan="4" textAlign="center">
                Vous n'avez pas encore ajouté de chèque. Vous pouvez le faire en cliquant sur "Ajouter".
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      <Flex justify="flex-end">
        <Button leftIcon={<AddIcon />} colorScheme="pink" variant="solid">
          Ajouter
        </Button>
      </Flex>
    </Box>
  );
};

export default ChequeNonEncaisseModification;
