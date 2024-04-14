import React from 'react';
import { Box, List, ListItem, ListIcon, Text, Icon } from '@chakra-ui/react';
import { CheckCircleIcon, ChevronRightIcon } from '@chakra-ui/icons';

const TaskList = ({ tasks }) => {
  return (
    <Box width="full" p={4} bg="white" boxShadow="sm" borderRadius="md">
      <List spacing={3}>
        {tasks.map((task, index) => (
          <ListItem 
            key={index} 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            py={2} 
            borderBottom="1px" 
            borderColor="gray.200"
            _last={{ borderBottom: "none" }}
          >
            <Box display="flex" alignItems="center">
              <ListIcon as={CheckCircleIcon} color="green.500" mr={4} />
              <Text fontSize="md">{task}</Text>
            </Box>
            <Icon as={ChevronRightIcon} color="gray.500" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;

// Example of usage:
// const tasks = [
//   'Catégoriser toutes les transactions',
//   'Immobilisations, amortissements et cessions',
//   'Ventiler les repas hors domicile',
//   'Retraiter les frais de véhicule',
//   'Ventiler les échéances d'emprunts'
// ];

// <TaskList tasks={tasks} />
