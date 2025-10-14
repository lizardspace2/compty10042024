import React from 'react';
import { Box, List, ListItem, ListIcon, Divider, Text } from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

const Sidebar = ({ tasks }) => {
  const handleClick = (task) => {
    // Vous pouvez implémenter une fonction pour gérer le clic sur un élément de la liste ici
    console.log(`Clic sur : ${task}`);
  };

  return (
    <Box
      w="300px"
      bg="red.50"
      p={4}
      boxShadow="lg"
      borderRadius="md"
      border="1px"
      borderColor="red.100"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={3} color="gray.800">
        {tasks[0]} {/* Assuming the first item is the title */}
      </Text>
      <Divider my={3} />
      <List spacing={2}>
        {tasks.slice(1).map((task, index) => (
          <ListItem
            key={index}
            display="flex"
            alignItems="center"
            fontSize="md" // Légèrement plus petit que "lg"
            color="gray.600"
            _hover={{ cursor: 'pointer', color: 'blue.500', bg: 'blue.50' }}
            onClick={() => handleClick(task)}
            transition="background 0.3s, color 0.3s"
            borderRadius="md"
            px={2}
            py={1}
          >
            <ListIcon
              as={MdCheckCircle}
              color="green.500"
              boxSize={6}
              _hover={{ color: 'green.600' }}
            />
            {task}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const tasks = [
  'Compty',
  'Catégoriser toutes les transactions',
  'Immobilisations, amortissements et cessions',
  'Ventiler les repas hors domicile',
  'Retraiter les frais de véhicule',
  'Ventiler les échéances d\'emprunts',
  'Chèques non encaissés de 2022',
  'Chèques non encaissés de 2023',
  'Saisir les frais de blanchissage à domicile',
  'Barème kilométrique forfaitaire',
  'Vérifier les comptes financiers',
  'Évolution de la caisse',
  'Cotisations Urssaf à ventiler',
  'Saisie du compte commun ou de la SCM',
  'Réductions d\'impôt pour les frais de comptabilité',
  'Cotisations facultatives déductibles',
  'Exonérations fiscales et crédits d\'impôts',
  'Identité de l\'entrepreneur',
  'Informations relatives à l\'activité',
  'Informations relatives à l\'exercice fiscal',
  'Valider la clôture',
];

export default function App() {
  return <Sidebar tasks={tasks} />;
}
