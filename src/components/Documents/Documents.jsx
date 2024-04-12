// Documents.js
import React from 'react';
import DeclarationDocument from './components/DeclarationDocument';
import Justificatifs from './components/Justificatifs';
import DossierDocument from './components/DossierDocument';

function Documents() {
  return (
    <div>
      <h1>Documents Page</h1>
      <DeclarationDocument/>
      <Justificatifs/>
      <DossierDocument/>
    </div>
  );
}

export default Documents;
