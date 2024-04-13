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
          <GridItem display="flex" flexDirection="column" justifyContent="space-between">
            <Box mt={2}><RevenueComponent amount={127000} currency="€" /></Box>
            <Box mt={2}><ExpensesComponent amount={85000} currency="€" /></Box>
            <Box mt={2} mb={2}><ResultComponent amount={42000} currency="€" /></Box>
          </GridItem>
          <GridItem>
            <MyChartComponent />
          </GridItem>
        </Grid>
        <RevenueTable />
        <DepenseTable />
        <Grid templateColumns="1fr 1fr" gap={6}>
          <GridItem>
            <ThresholdProgressBar />
          </GridItem>
          <GridItem>
            <ExpensesBarChart />
          </GridItem>
        </Grid>
        <Grid templateColumns="1fr 1fr" gap={6}>
          <GridItem>
          <TreasuryChart />
          </GridItem>
          <GridItem>
          </GridItem>
        </Grid>
      </Box>
    </div>
  );
}

export default Pilotage;
