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
  CloseButton,
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
      w="full"
      borderLeftWidth="10px" // Add a left border with width of 10px
      borderColor="gray.200" // Set the border color (adjust as needed)
      _first={{
        borderColor: "blue.500", // First item border color
      }}
    >
      <VStack align="start" spacing={1} flex="1">
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
      <VStack align="end">
        <Box as={FcOvertime} size="20px" />
        <Text color="gray.500">{time}</Text>
        <Button colorScheme="teal" size="sm">{buttonText}</Button>
      </VStack>
    </Flex>
  );
};

const UpcomingTasks = () => {
  return (
    <Box
      width="100%"
      maxW="400px"
      p={4}
      mr={4}
      position="relative"
      bg="white"
      _before={{
        content: '""',
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "1px",
        bgGradient: "linear(to-b, gray.100, gray.200)", // Use your gradient here
      }}
    >
      <CloseButton position="absolute" right="4" top="4" />
      <Heading size="md" mb={4}>
        À venir
      </Heading>
      <Divider mb={4} />
      <Stack spacing={4}>
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
