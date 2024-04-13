// Pilotage.js
import React from 'react';
import MyChartComponent from './components/MyChartComponent';
import RevenueTable from './components/RevenueTable';
import DepenseTable from './components/DepenseTable';
import ThresholdProgressBar from './components/ThresholdProgressBar';
import ExpensesBarChart from './components/ExpensesBarChart';
import TreasuryChart from './components/TreasuryChart';
import PilotageBanner from './components/PilotageBanner';
import { Box } from '@chakra-ui/react';
import RevenueComponent from './components/surlecote/RevenueComponent';

function Pilotage() {
  return (
    <div>
      <PilotageBanner/>
      <Box maxWidth="1400px" textAlign="center" mx="auto" >
        <RevenueComponent/>
      <MyChartComponent/>
      <RevenueTable/>
      <DepenseTable/>
      <ThresholdProgressBar/>
      <ExpensesBarChart/>
      <TreasuryChart/>
      </Box>
    </div>
  );
}

export default Pilotage;
