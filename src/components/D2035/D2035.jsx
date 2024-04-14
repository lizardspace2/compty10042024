// dans src/components/D2035/D2035.js

import React from 'react';
import { Box } from '@chakra-ui/react';
import HeaderD2035 from './components/HeaderD2035';
import TaskProgressBar from './components/TaskProgressBar';
import DottedProgressBar from './components/DottedProgressBar';

const D2035 = () => {
  return <Box>
    <HeaderD2035/>
    <TaskProgressBar completedTasks={19} totalTasks={20} timeSpent={1} />
   </Box>;
};

export default D2035;
