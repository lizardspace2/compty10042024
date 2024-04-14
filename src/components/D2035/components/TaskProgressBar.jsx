import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { FcAlarmClock } from "react-icons/fc";

const TaskProgressBar = ({ completedTasks, totalTasks, timeSpent }) => {
  return (
    <Box width="full" p={4}>
      {/* Task information and time spent */}
      <Flex mb={4} justifyContent="space-between" alignItems="center">
        <Text>Tâches effectuées : {completedTasks} / {totalTasks}</Text>
        <Flex alignItems="center">
          <FcAlarmClock />
          <Text ml={2}>{timeSpent}h</Text>
        </Flex>
      </Flex>

      {/* Dotted progress bar */}
      <Flex height="2px" mb={4}>
        {Array.from({ length: totalTasks }).map((_, index) => (
          <Box
            key={index}
            flex="1"
            height="2px"
            bg={index < completedTasks ? "pink.500" : "gray.300"}
            mx="2px"
          />
        ))}
      </Flex>
    </Box>
  );
};

export default TaskProgressBar;
