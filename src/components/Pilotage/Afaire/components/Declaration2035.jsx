import React from 'react';
import { Box, Button, Text, Flex, Spacer, Stack } from '@chakra-ui/react';
import { FcClock } from 'react-icons/fc';

const TaskProgress = ({ tasksCompleted, totalTasks, dueDate }) => {
  const CustomProgress = ({ value, max }) => {
    return (
      <Flex justify="center" align="center" w="full" overflow="hidden">
        {Array.from({ length: max }, (_, index) => (
          <Box
            key={index}
            flex="1"
            h="10px"
            bg={index < value ? 'pink.500' : 'gray.300'}
            mx="1px"
            borderRadius="md"
          />
        ))}
      </Flex>
    );
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" w="full">
      <Flex align="center" mb={4}>
        <Box>
          <Text fontSize="lg" fontWeight="bold">Déclaration 2035</Text>
          <Text color="gray.500">Exercice 2023</Text>
        </Box>
        <Spacer />
        <Box>
          <Text color="gray.500">{dueDate}</Text>
        </Box>
      </Flex>
      <Stack mb={4} spacing={2}>
        <Text fontSize="sm" color="gray.500">
          Tâches effectuées: {tasksCompleted} / {totalTasks}
        </Text>
        <CustomProgress value={tasksCompleted} max={totalTasks} />
      </Stack>
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Box as={FcClock} size="20px" mr={2} />
          <Text color="gray.500">{Math.round((1 - (tasksCompleted / totalTasks)) * 60)}h</Text>
        </Flex>
        <Button colorScheme="teal">Reprendre</Button>
      </Flex>
    </Box>
  );
};

// Usage of TaskProgress component
const Declaration2035 = () => {
  return (
    <Flex align="center" justify="center" p={4}>
      <Box width="95%"> {/* Adjusted to 95% of the width */}
        <TaskProgress tasksCompleted={18} totalTasks={20} dueDate="18 mai 2024" />
      </Box>
    </Flex>
  );
};

export default Declaration2035;
