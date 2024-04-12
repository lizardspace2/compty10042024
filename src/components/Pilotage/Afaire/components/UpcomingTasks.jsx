import React from 'react';
import {
  Box,
  Stack,
  Heading,
  Text,
  Flex,
  Badge,
  Button,
  VStack,
  Divider,
  CloseButton,
  useColorModeValue,
  Spacer,
} from '@chakra-ui/react';
import { FcClock, FcOvertime } from 'react-icons/fc';

const TaskItem = ({
  title,
  startDate,
  endDate,
  exerciseYear,
  status,
  time,
  buttonText
}) => {
  const boxBg = useColorModeValue('white', 'gray.700');
  const boxShadow = useColorModeValue('md', 'dark-lg');

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      w="full"
      bg={boxBg}
      boxShadow={boxShadow}
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "4px",
        borderRadius: "1rem 0 0 1rem",
        bgGradient: "linear(to-b, blue.500, blue.300)",
      }}
    >
      <VStack align="start" spacing={1}>
        <Flex align="center" mb={1}>
          <Box as={FcOvertime} mr={2} color="gray.500" />
          <Text fontSize="sm">{`${startDate} - ${endDate}`}</Text>
          <Spacer w="100px" />
          <Text fontSize="sm" color="gray.500" display="flex" alignItems="center">
            <Box as={FcClock} mr={2} />
            {time}
          </Text>
        </Flex>
        <Text fontWeight="bold" mb={1}>{title}</Text>
        <Flex align="center">
          <Badge colorScheme="green" borderRadius="full" mr={2}>{`Exercice ${exerciseYear}`}</Badge>
          <Badge colorScheme="red" borderRadius="full">{status}</Badge>
        </Flex>
      </VStack>
      <Button colorScheme="blue" variant="outline" size="sm" position="absolute" right="4" bottom="4">
        {buttonText}
      </Button>
    </Box>
  );
};

const groupTasksByMonthAndYear = (tasks) => {
  const groupedTasks = {};

  tasks.forEach(task => {
    const startDate = new Date(task.startingDate);
    const monthYearKey = startDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    if (!groupedTasks[monthYearKey]) {
      groupedTasks[monthYearKey] = [];
    }

    groupedTasks[monthYearKey].push({
      ...task,
      startDate: startDate.toLocaleDateString('fr-FR'),
      endDate: new Date(task.dueDate).toLocaleDateString('fr-FR')
    });
  });

  return groupedTasks;
};

const UpcomingTasks = () => {
  const tasks = [
    // Sample tasks data
    {
      title: "Déclaration sociale et fiscale",
      startingDate: "2024-04-18",
      dueDate: "2024-05-31",
      exerciseYear: "2023",
      status: "En maintenance",
      time: "5min",
      buttonText: "Voir"
    },
    // Add other tasks here...
  ];

  const groupedTasks = groupTasksByMonthAndYear(tasks);

  return (
    <Box
      width="100%"
      maxW="400px"
      p={4}
      mr={4}
      position="relative"
      bg="white"
      h="100vh"
      _before={{
        content: '""',
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "1px",
        bg: "gray.200",
      }}
    >
      <CloseButton position="absolute" right="4" top="4" />
      <Heading size="md" mb={4}>
        À venir
      </Heading>
      <Divider mb={4} />
      {Object.keys(groupedTasks).map((monthYear) => (
        <Box key={monthYear}>
          <Text fontWeight="bold" mb={2}>{monthYear}</Text>
          <Stack spacing={4}>
            {groupedTasks[monthYear].map((task, index) => (
              <TaskItem
                key={index}
                title={task.title}
                startDate={task.startDate}
                endDate={task.endDate}
                exerciseYear={task.exerciseYear}
                status={task.status}
                time={task.time}
                buttonText={task.buttonText}
              />
            ))}
          </Stack>
          <Divider my={4} />
        </Box>
      ))}
    </Box>
  );
};

export default UpcomingTasks;