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
    <Box bg="gray.50" minH="100vh">
      <PilotageBanner />
      <Box maxWidth="1600px" mx="auto" p={6}>
        <Grid templateColumns={{ sm: '1fr', md: '1fr 20fr' }} gap={6} textAlign="center" py={4}>
          <GridItem display="flex" flexDirection="column" justifyContent="space-between">
            <Box mt={2}><RevenueComponent amount={127000} currency="€" /></Box>
            <Box mt={2}><ExpensesComponent amount={85000} currency="€" /></Box>
            <Box mt={2} mb={2}><ResultComponent amount={42000} currency="€" /></Box>
          </GridItem>
          <GridItem>
            <MyChartComponent />
          </GridItem>
        </Grid>
        <Box py={2}>
        <RevenueTable/>
        </Box>
        <Box py={2}>
        <DepenseTable/>
        </Box>
        <Grid templateColumns="1fr 1fr" gap={6} py={4}>
          <GridItem py={4}> {/* Added padding to create space */}
            <ThresholdProgressBar />
          </GridItem>
          <GridItem py={4}> {/* Added padding to create space */}
            <ExpensesBarChart />
          </GridItem>
        </Grid>
        <Grid templateColumns="1fr 1fr" gap={6}>
          <GridItem py={4}> {/* Added padding to create space */}
            <TreasuryChart />
          </GridItem>
          <GridItem>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}

export default Pilotage;
