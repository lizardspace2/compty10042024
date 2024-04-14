import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { FcAlarmClock } from 'react-icons/fc';

const TaskProgressBar = ({ completedTasks, totalTasks, timeSpent }) => {
  const progressBarHeight = '8px'; // Height for completed tasks
  const incompleteBarHeight = '2px'; // Height for incomplete tasks

  return (
    <Box width="full" p={4} bg="gray.100" borderRadius="lg">
      <Flex mb={4} justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold">Tâches effectuées : {completedTasks} / {totalTasks}</Text>
        <Flex alignItems="center">
          <FcAlarmClock size="1.5em" />
          <Text ml={2} fontWeight="bold">{timeSpent}h</Text>
        </Flex>
      </Flex>

      <Flex height={progressBarHeight} mb={4}>
        {Array.from({ length: totalTasks }).map((_, index) => (
          <Box
            key={index}
            flex="1"
            height={index < completedTasks ? progressBarHeight : incompleteBarHeight}
            bg={index < completedTasks ? 'pink.500' : 'gray.200'}
            mx="1px"
            borderRadius="md"
          />
        ))}
      </Flex>
    </Box>
  );
};

export default TaskProgressBar;
