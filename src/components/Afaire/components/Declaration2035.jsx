import React from 'react';
import { Box, Button, Text, Flex, Spacer, Stack, Badge } from '@chakra-ui/react';
import { FcOvertime } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate depuis react-router-dom

const TaskProgress = ({ title, exerciseYear, dueDate, tasksCompleted, totalTasks, remainingTime }) => {
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

  const navigate = useNavigate(); // Utilisez useNavigate pour la navigation

  // Fonction pour naviguer vers la route '/d2035'
  const handleResumeButtonClick = () => {
    navigate('/d2035');
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" w="full">
      <Flex align="center" mb={4}>
        <Box>
          <Text fontSize="lg" fontWeight="bold">{title}</Text>
          <Badge colorScheme="green" borderRadius="full">{`Exercice ${exerciseYear}`}</Badge>
        </Box>
        <Spacer />
        <Box>
          <Flex align="center">
            <Box as={FcOvertime} mr={2} />
            <Badge colorScheme="blue" borderRadius="full">{dueDate}</Badge>
          </Flex>
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
          <Box as={FcOvertime} size="20px" mr={2} />
          <Text color="gray.500">{remainingTime}h</Text>
        </Flex>
        {/* Utilisez la fonction pour la gestion de l'événement onClick */}
        <Button colorScheme="teal" onClick={handleResumeButtonClick}>Reprendre</Button>
      </Flex>
    </Box>
  );
};

// Usage of TaskProgress component with props
const Declaration2035 = () => {
  const title = "Déclaration 2035";
  const exerciseYear = "2023";
  const dueDate = "18 mai 2024";
  const tasksCompleted = 18;
  const totalTasks = 20;
  const remainingTime = Math.round((1 - (tasksCompleted / totalTasks)) * 60);

  return (
    <Flex align="center" justify="center" p={4}>
      <Box width="95%">
        <TaskProgress
          title={title}
          exerciseYear={exerciseYear}
          dueDate={dueDate}
          tasksCompleted={tasksCompleted}
          totalTasks={totalTasks}
          remainingTime={remainingTime}
        />
      </Box>
    </Flex>
  );
};

export default Declaration2035;
