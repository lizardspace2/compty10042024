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
import ProfitMarginChart from './components/ProfitMarginChart';
import ExpensesPieChart from './components/ExpensesPieChart';
import CashFlowChart from './components/CashFlowChart';
import KPICards from './components/KPICards';
import MonthlyComparisonChart from './components/MonthlyComparisonChart';
import QuarterlyRevenueChart from './components/QuarterlyRevenueChart';
import PaymentMethodsChart from './components/PaymentMethodsChart';
import TaxProjectionChart from './components/TaxProjectionChart';
import ClientDistributionChart from './components/ClientDistributionChart';
import WorkingCapitalChart from './components/WorkingCapitalChart';

function Pilotage() {
  return (
    <Box bg="gray.50" minH="100vh">
      <PilotageBanner />
      <Box maxWidth="1600px" mx="auto" p={6}>
        {/* KPI Cards Section */}
        <KPICards />

        {/* Main Chart with Side Stats */}
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

        {/* Revenue and Expense Tables */}
        <Box py={2}>
          <RevenueTable/>
        </Box>
        <Box py={2}>
          <DepenseTable/>
        </Box>

        {/* Profit Margin Chart - Full Width */}
        <Box py={4}>
          <ProfitMarginChart />
        </Box>

        {/* Cash Flow Chart - Full Width */}
        <Box py={4}>
          <CashFlowChart />
        </Box>

        {/* Threshold and Expenses Bar Charts */}
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6} py={4}>
          <GridItem>
            <ThresholdProgressBar />
          </GridItem>
          <GridItem>
            <ExpensesBarChart />
          </GridItem>
        </Grid>

        {/* Treasury Chart and Expenses Pie Chart */}
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6} py={4}>
          <GridItem>
            <TreasuryChart />
          </GridItem>
          <GridItem>
            <ExpensesPieChart />
          </GridItem>
        </Grid>

        {/* Tax Projection - Full Width */}
        <Box py={4}>
          <TaxProjectionChart />
        </Box>

        {/* Working Capital Chart - Full Width */}
        <Box py={4}>
          <WorkingCapitalChart />
        </Box>

        {/* Quarterly Revenue and Payment Methods */}
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6} py={4}>
          <GridItem>
            <QuarterlyRevenueChart />
          </GridItem>
          <GridItem>
            <PaymentMethodsChart />
          </GridItem>
        </Grid>

        {/* Client Distribution and Monthly Comparison */}
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6} py={4}>
          <GridItem>
            <ClientDistributionChart />
          </GridItem>
          <GridItem>
            <MonthlyComparisonChart />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}

export default Pilotage;
