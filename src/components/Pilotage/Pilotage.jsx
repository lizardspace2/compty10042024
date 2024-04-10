// Pilotage.js
import React from 'react';
import MyChartComponent from './components/MyChartComponent';
import CustomChart from './components/CustomChart';
import RevenueTable from './components/RevenueTable';
import DepenseTable from './components/DepenseTable';

function Pilotage() {
  return (
    <div>
      <h1>Pilotage Page</h1>
      <MyChartComponent/>
      <RevenueTable/>
      <DepenseTable/>
    </div>
  );
}

export default Pilotage;
