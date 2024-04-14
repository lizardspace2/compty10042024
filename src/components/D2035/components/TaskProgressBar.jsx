import React from 'react';
import { Box, Button, Progress, Text } from '@chakra-ui/react';

const TaskProgressBar = ({ completedTasks, totalTasks, timeSpent }) => {
  const progressValue = (completedTasks / totalTasks) * 100;

  return (
    <Box width="full" p={4}>
      <Button
        mb={4}
        size="lg"
        bg="pink.300"
        color="white"
        _hover={{ bg: 'pink.400' }}
      >
        Finaliser
      </Button>
      <Box mb={4} display="flex" alignItems="center" justifyContent="space-between">
        <Text>Tâches effectuées : {completedTasks} / {totalTasks}</Text>
        <Text>{timeSpent}h</Text>
      </Box>
      <Progress value={progressValue} colorScheme="pink" size="lg" />
    </Box>
  );
};

export default TaskProgressBar;
