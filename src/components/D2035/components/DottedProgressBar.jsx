import React from 'react';
import { Box, Text, Flex, Spacer } from '@chakra-ui/react';
import { FcAlarmClock } from "react-icons/fc";

const DottedProgressBar = ({ completedTasks, totalTasks, timeSpent }) => {
  // Générer un tableau de booléens pour indiquer si la tâche est complétée
  const tasks = new Array(totalTasks).fill(false).map((_, index) => index < completedTasks);

  return (
    <Flex p={4} align="center" justify="space-between">
      <Text fontSize="sm">Tâches effectuées : {completedTasks} / {totalTasks}</Text>
      <Flex direction="row" align="center">
        {tasks.map((isCompleted, index) => (
          <Box
            key={index}
            height="1px"
            width="2"
            bg={isCompleted ? "pink.500" : "gray.200"}
            mx="1px"
          />
        ))}
      </Flex>
      <Flex align="center">
        <FcAlarmClock />
        <Text fontSize="sm" ml={1}>{timeSpent}h</Text>
      </Flex>
    </Flex>
  );
};

export default DottedProgressBar;
