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
  useColorModeValue,
  Spacer,
} from '@chakra-ui/react';
import { FcClock, FcOvertime } from 'react-icons/fc';

const TaskItem = ({ title, dateRange, exerciseYear, status, time, buttonText }) => {
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
        borderRadius: "1rem 0 0 1rem", // Rounded border on the left
        bgGradient: "linear(to-b, blue.500, blue.300)", // Gradient for the border
      }}
    >
      <VStack align="start" spacing={1}>
        <Flex align="center" mb={1}>
          <Box as={FcOvertime} mr={2} color="gray.500" />
          <Text fontSize="sm">{dateRange}</Text>
          <Spacer />
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

const UpcomingTasks = () => {
  return (
    <Box
      width="100%"
      maxW="400px"
      p={4}
      mr={4}
      position="relative"
      bg="white"
      h="100vh" // Set the height to be 100% of the viewport height
      _before={{
        content: '""',
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "1px",
        bg: "gray.200", // Assuming a solid color is used for the border; adjust as needed
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
