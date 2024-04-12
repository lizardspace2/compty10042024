// UpcomingTasks.js
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
} from '@chakra-ui/react';
import { FcOvertime } from 'react-icons/fc';

const TaskItem = ({ title, dateRange, exerciseYear, status, time, buttonText }) => {
  return (
    <Flex
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      align="center"
      justify="space-between"
    >
      <VStack align="start" spacing={1}>
        <Flex align="center">
          <Box as={FcOvertime} mr={2} />
          <Text fontSize="sm" color="gray.500">{dateRange}</Text>
        </Flex>
        <Text fontWeight="bold">{title}</Text>
        <Flex align="center">
          <Badge colorScheme="green" borderRadius="full">{`Exercice ${exerciseYear}`}</Badge>
          <Badge ml={2} colorScheme="red" borderRadius="full">{status}</Badge>
        </Flex>
      </VStack>
      <Flex align="center">
        <Box as={FcOvertime} size="20px" mr={2} />
        <Text color="gray.500" mr={4}>{time}</Text>
        <Button colorScheme="teal">{buttonText}</Button>
      </Flex>
    </Flex>
  );
};

const UpcomingTasks = () => {
  return (
    <Box width="100%" maxW="400px" p={4} mr={4}>
      <Heading size="md" mb={4}>
        À venir
      </Heading>
      <Divider mb={4} />
      <Stack spacing={4}>
        {/* You can map over your tasks here */}
        <TaskItem
          title="Déclaration sociale et fiscale"
          dateRange="18 avr. 2024 - 31 mai 2024"
          exerciseYear="2023"
          status="En maintenance"
          time="5min"
          buttonText="Voir"
        />
        {/* Repeat for other tasks */}
      </Stack>
    </Box>
  );
};

export default UpcomingTasks;
