import React from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import MyChartComponent from './components/MyChartComponent';
import RevenueTable from './components/RevenueTable';
import DepenseTable from './components/DepenseTable';
import ThresholdProgressBar from './components/ThresholdProgressBar';
import ExpensesBarChart from './components/ExpensesBarChart';
import TreasuryChart from './components/TreasuryChart';
import PilotageBanner from './components/PilotageBanner';
import RevenueComponent from './components/surlecote/RevenueComponent';
import ExpensesComponent from './components/surlecote/ExpensesComponent';
import ResultComponent from './components/surlecote/ResultComponent';

function Pilotage() {
  return (
    <div>
      <PilotageBanner />
      <Box maxWidth="1600px" mx="auto" overflow="hidden">
        <Grid templateColumns={{ sm: '1fr', md: '1fr 20fr' }} gap={6} textAlign="center">
          <GridItem >
            <Box mb={4}><RevenueComponent amount={127000} currency="€" /></Box>
            <Box mb={4}><ExpensesComponent amount={85000} currency="€" /></Box>
            <Box><ResultComponent amount={42000} currency="€" /></Box>
          </GridItem>
          <GridItem >
            <MyChartComponent />
          </GridItem>
        </Grid>
        <RevenueTable />
        <DepenseTable />
        <ThresholdProgressBar />
        <ExpensesBarChart />
        <TreasuryChart />
      </Box>
    </div>
  );
}

export default Pilotage;
