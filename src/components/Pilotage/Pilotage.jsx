// Pilotage.js
import React from 'react';
import MyChartComponent from './components/MyChartComponent';
import RevenueTable from './components/RevenueTable';
import DepenseTable from './components/DepenseTable';
import ThresholdProgressBar from './components/ThresholdProgressBar';
import ExpensesBarChart from './components/ExpensesBarChart';
import TreasuryChart from './components/TreasuryChart';

function Pilotage() {
  return (
    <div>
      <h1>Pilotage Page</h1>
      <MyChartComponent/>
      <RevenueTable/>
      <DepenseTable/>
      <ThresholdProgressBar/>
      <ExpensesBarChart/>
      <TreasuryChart/>
    </div>
  );
}

export default Pilotage;
