import React from 'react';
import { Box, VStack, Heading, Flex, Text, Button, useColorModeValue, Icon } from '@chakra-ui/react';
import { FcTodoList } from 'react-icons/fc'; // Importing a similar icon, as I cannot see the exact icon used

const TaskList = ({ title, tasks }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      p={5}
      bg={cardBg}
      shadow="sm"
    >
      <Flex align="center" mb={5}>
        <Icon as={FcTodoList} boxSize={6} mr={2} />
        <Heading size="md">{title}</Heading>
      </Flex>
      <VStack spacing={4}>
        {tasks.map((task, index) => (
          <Flex
            key={index}
            justify="space-between"
            align="center"
            borderWidth="1px"
            borderRadius="md"
            borderColor={borderColor}
            p={4}
            bg={useColorModeValue('gray.50', 'gray.600')}
            _hover={{ bg: useColorModeValue('gray.100', 'gray.500') }}
          >
            <Text fontWeight="bold">{task.name}</Text>
            <Text color={useColorModeValue('gray.500', 'gray.400')}>{task.status}</Text>
            <Button colorScheme="blue" variant="outline" size="sm">{task.buttonText}</Button>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

// Usage example
const DeclarationDocument = () => {
  const tasks = [
    { name: 'Déclaration 2042 C-Pro', status: 'Non clôturée', buttonText: 'Visualiser' },
    { name: 'Déclaration PAMC', status: 'Non clôturée', buttonText: 'Visualiser' },
    // ... more tasks
  ];

  return (
    <Box p={5}>
      <TaskList title="Déclaration sociale et fiscale" tasks={tasks} />
    </Box>
  );
};

export default DeclarationDocument;
