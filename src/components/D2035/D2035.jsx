import React from 'react';
import { Box } from '@chakra-ui/react';
import HeaderD2035 from './components/HeaderD2035';
import TaskProgressBar from './components/TaskProgressBar';
import TaskList from './components/TaskList';

const D2035 = () => {
 const tasks = [
   'Catégoriser toutes les transactions',
   'Immobilisations, amortissements et cessions',
   'Ventiler les repas hors domicile',
   'Retraiter les frais de véhicule',
   "Ventiler les échéances d'emprunts",
 ];
  return <Box>
    <HeaderD2035/>
    <TaskProgressBar completedTasks={19} totalTasks={20} timeSpent={1} />
    <TaskList tasks={tasks} />
   </Box>;
};

export default D2035;
