// Todo.js
import React from 'react';
import Declaration2035 from './components/Declaration2035';
import UpcomingTasks from './components/UpcomingTasks';
import { Box, Flex } from '@chakra-ui/react';

function Todo() {
  return (
    <Flex>
      <Box flex="1" p={4}>
        <h1>À faire</h1>
        <Declaration2035 />
      </Box>
      <UpcomingTasks />
    </Flex>
  );
}

export default Todo;
