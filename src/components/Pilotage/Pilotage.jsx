import React from 'react';
import { Box, Grid, GridItem, VStack, Heading, Divider, useColorModeValue } from '@chakra-ui/react';
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
import { useDashboardData } from './hooks/useDashboardData';
import FiscaliteSelector from './components/fiscalite/FiscaliteSelector';

function Pilotage() {
  const { data } = useDashboardData();
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box bg={bgColor} minH="100vh">
      <PilotageBanner />
      <Box maxWidth="1600px" mx="auto" p={6}>
        {/* KPI Cards Section */}
        <VStack spacing={6} align="stretch">
          <KPICards />

          {/* Main Chart with Side Stats */}
          <Grid templateColumns={{ sm: '1fr', md: '1fr 20fr' }} gap={6} textAlign="center">
            <GridItem display="flex" flexDirection="column" justifyContent="space-between">
              <Box mt={2}>
                <RevenueComponent
                  amount={data?.kpi?.chiffre_affaires || 0}
                  currency="€"
                />
              </Box>
              <Box mt={2}>
                <ExpensesComponent
                  amount={data?.kpi?.total_depenses || 0}
                  currency="€"
                />
              </Box>
              <Box mt={2} mb={2}>
                <ResultComponent
                  amount={data?.kpi?.resultat_net || 0}
                  currency="€"
                />
              </Box>
            </GridItem>
            <GridItem>
              <MyChartComponent />
            </GridItem>
          </Grid>

          {/* Section: Transactions */}
          <Box>
            <Heading size="md" mb={4} color="gray.700">Transactions</Heading>
            <VStack spacing={4} align="stretch">
              <RevenueTable />
              <DepenseTable />
            </VStack>
          </Box>

          <Divider my={6} />

          {/* Section: Analyse Financière */}
          <Box>
            <Heading size="md" mb={4} color="gray.700">Analyse Financière</Heading>
            <VStack spacing={4} align="stretch">
              <ProfitMarginChart />
              <CashFlowChart />
            </VStack>
          </Box>

          <Divider my={6} />

          {/* Section: Fiscalité et Optimisation */}
          <Box>
            <Heading size="md" mb={4} color="gray.700">Fiscalité et Optimisation</Heading>
            <FiscaliteSelector />
          </Box>

          <Divider my={6} />

          {/* Section: Seuils et Dépenses */}
          <Box>
            <Heading size="md" mb={4} color="gray.700">Seuils et Dépenses</Heading>
            <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
              <GridItem>
                <ThresholdProgressBar />
              </GridItem>
              <GridItem>
                <ExpensesBarChart />
              </GridItem>
            </Grid>
          </Box>

          <Divider my={6} />

          {/* Section: Trésorerie et Répartition */}
          <Box>
            <Heading size="md" mb={4} color="gray.700">Trésorerie et Répartition des Dépenses</Heading>
            <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
              <GridItem>
                <TreasuryChart />
              </GridItem>
              <GridItem>
                <ExpensesPieChart />
              </GridItem>
            </Grid>
          </Box>

          <Divider my={6} />

          {/* Section: Fiscalité et Fonds de Roulement */}
          <Box>
            <Heading size="md" mb={4} color="gray.700">Fiscalité et Fonds de Roulement</Heading>
            <VStack spacing={4} align="stretch">
              <TaxProjectionChart />
              <WorkingCapitalChart />
            </VStack>
          </Box>

          <Divider my={6} />

          {/* Section: Revenus et Moyens de Paiement */}
          <Box>
            <Heading size="md" mb={4} color="gray.700">Revenus et Moyens de Paiement</Heading>
            <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
              <GridItem>
                <QuarterlyRevenueChart />
              </GridItem>
              <GridItem>
                <PaymentMethodsChart />
              </GridItem>
            </Grid>
          </Box>

          <Divider my={6} />

          {/* Section: Analyse Clients et Performances */}
          <Box>
            <Heading size="md" mb={4} color="gray.700">Analyse Clients et Performances</Heading>
            <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
              <GridItem>
                <ClientDistributionChart />
              </GridItem>
              <GridItem>
                <MonthlyComparisonChart />
              </GridItem>
            </Grid>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

export default Pilotage;
