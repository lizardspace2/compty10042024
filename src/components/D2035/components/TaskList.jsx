import React from 'react';
import { Box, List, ListItem, ListIcon, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { CheckCircleIcon, ChevronRightIcon } from '@chakra-ui/icons';

const TaskList = ({ tasks }) => {
  const listItemHoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box width="full" p={4} bg={useColorModeValue('white', 'gray.800')} boxShadow="sm" borderRadius="md">
      <List spacing={3}>
        {tasks.map((task, index) => (
          <ListItem
            key={index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={2}
            px={4}
            borderBottom="1px"
            borderColor="gray.200"
            _last={{ borderBottom: 'none' }}
            _hover={{ bg: listItemHoverBg, transition: 'background-color 0.3s' }}
            cursor="pointer"
          >
            <Box display="flex" alignItems="center">
              <ListIcon as={CheckCircleIcon} color="green.500" mr={4} />
              <Text fontSize="md" fontWeight="medium">{task}</Text>
            </Box>
            <Icon as={ChevronRightIcon} color="gray.500" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;

// Usage example with tasks array.
