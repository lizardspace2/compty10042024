import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ChakraProvider, Box, Flex, Text } from '@chakra-ui/react';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Pilotage from './components/Pilotage/Pilotage';
import Transactions from './components/Transactions/Transactions';
import TransactionsImproved from './components/Transactions/TransactionsImproved';
import Todo from './components/Afaire/Todo';
import Documents from './components/Documents/Documents';
import Accompaniment from './components/Accompagnement/Accompaniment';
import Sponsorship from './components/Sponsorship';
import Profile from './components/Profile/Profile';
import D2035 from './components/D2035/D2035';
import Parrainage from './components/Parrainage/Parrainage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { EntrepriseProvider } from './contexts/EntrepriseContext';
import PrivateRoute from './PrivateRoute';
import Logout from './Logout';

function AppContent() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Text>Chargement...</Text>
      </Box>
    );
  }

  return (
    <Routes>
      {session ? (
        <Route path="*" element={<LayoutWithSidebar />} />
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <EntrepriseProvider>
          <Router>
            <AppContent />
          </Router>
        </EntrepriseProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

const LayoutWithSidebar = () => {
  const location = useLocation(); // Utilisez le hook useLocation pour obtenir l'emplacement actuel
  const showSidebar = location.pathname !== '/d2035'; // Condition pour montrer la barre latérale

  return (
    <Flex h="100vh" overflowY="hidden" bg="gray.50">
      {showSidebar && (
        <Box position="fixed" h="full" w="250px" overflowY="auto" zIndex={10}>
          <Navbar />
        </Box>
      )}
      <Box flex="1" pl={showSidebar ? "250px" : "0"} overflowY="auto" bg="gray.50">
        <Routes>

                    <Route path="/" element={<Pilotage />} />
          <Route path="/pilotage" element={<Pilotage />} />
          <Route path="/transactions" element={<TransactionsImproved />} />
          <Route path="/transactions-old" element={<Transactions />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/accompaniment" element={<Accompaniment />} />
          <Route path="/sponsorship" element={<Sponsorship />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/parrainage" element={<Parrainage />} />
          <Route path="/d2035" element={<D2035 />} />
          <Route path="/catégoriser-toutes-les-transactions" element={<CatégoriserToutesLesTransactions />} />
          <Route path="/immobilisations-amortissements-et-cessions" element={<ImmobilisationsAmortissementsEtCessions />} />
          <Route path="/ventiler-les-repas-hors-domicile" element={<VentilerLesRepasHorsDomicile />} />
          <Route path="/retraiter-les-frais-de-véhicule" element={<RetraiterLesFraisDeVéhicule />} />
          <Route path="/ventiler-les-échéances-d-emprunts" element={<VentilerLesÉchéancesDEmprunts />} />
          <Route path="/chèques-non-encaissés-de-2022" element={<ChèquesNonEncaissésDe2022 />} />
          <Route path="/chèques-non-encaissés-de-2023" element={<ChèquesNonEncaissésDe2023 />} />
          <Route path="/saisir-les-frais-de-blanchissage-à-domicile" element={<SaisirLesFraisDeBlanchissageÀDomicile />} />
          <Route path="/barème-kilométrique-forfaitaire" element={<BarèmeKilométriqueForfaitaire />} />
          <Route path="/vérifier-les-comptes-financiers" element={<VérifierLesComptesFinanciers />} />
          <Route path="/évolution-de-la-caisse" element={<ÉvolutionDeLaCaisse />} />
          <Route path="/cotisations-urssaf-à-ventiler" element={<CotisationsUrssafÀVentiler />} />
          <Route path="/saisie-du-compte-commun-ou-de-la-scm" element={<SaisieDuCompteCommunOuDeLaSCM />} />
          <Route path="/réductions-d-impôt-pour-les-frais-de-comptabilité" element={<RéductionsDImpôtPourLesFraisDeComptabilité />} />
          <Route path="/cotisations-facultatives-déductibles" element={<CotisationsFacultativesDéductibles />} />
          <Route path="/exonérations-fiscales-et-crédits-d-impôts" element={<ExonérationsFiscalesEtCréditsDImpôts />} />
          <Route path="/identité-de-l-entrepreneur" element={<IdentitéDeLEntrepreneur />} />
          <Route path="/informations-relatives-à-l-activité" element={<InformationsRelativesÀLActivité />} />
          <Route path="/informations-relatives-à-l-exercice-fiscal" element={<InformationsRelativesÀLExerciceFiscal />} />
          <Route path="/valider-la-clôture" element={<ValiderLaClôture />} />
          <Route path="/sedeconnecter" element={<Logout />} />
        </Routes>
      </Box>
    </Flex>
  );
};

// Composants pour les nouvelles routes
const CatégoriserToutesLesTransactions = () => {
  return <div>Catégoriser toutes les transactions</div>;
};

const ImmobilisationsAmortissementsEtCessions = () => {
  return <div>Immobilisations, amortissements et cessions</div>;
};

const VentilerLesRepasHorsDomicile = () => {
  return <div>Ventiler les repas hors domicile</div>;
};

const RetraiterLesFraisDeVéhicule = () => {
  return <div>Retraiter les frais de véhicule</div>;
};

const VentilerLesÉchéancesDEmprunts = () => {
  return <div>Ventiler les échéances d'emprunts</div>;
};

const ChèquesNonEncaissésDe2022 = () => {
  return <div>Chèques non encaissés de 2022</div>;
};

const ChèquesNonEncaissésDe2023 = () => {
  return <div>Chèques non encaissés de 2023</div>;
};

const SaisirLesFraisDeBlanchissageÀDomicile = () => {
  return <div>Saisir les frais de blanchissage à domicile</div>;
};

const BarèmeKilométriqueForfaitaire = () => {
  return <div>Barème kilométrique forfaitaire</div>;
};

const VérifierLesComptesFinanciers = () => {
  return <div>Vérifier les comptes financiers</div>;
};

const ÉvolutionDeLaCaisse = () => {
  return <div>Évolution de la caisse</div>;
};

const CotisationsUrssafÀVentiler = () => {
  return <div>Cotisations Urssaf à ventiler</div>;
};

const SaisieDuCompteCommunOuDeLaSCM = () => {
  return <div>Saisie du compte commun ou de la SCM</div>;
};

const RéductionsDImpôtPourLesFraisDeComptabilité = () => {
  return <div>Réductions d'impôt pour les frais de comptabilité</div>;
};

const CotisationsFacultativesDéductibles = () => {
  return <div>Cotisations facultatives déductibles</div>;
};

const ExonérationsFiscalesEtCréditsDImpôts = () => {
  return <div>Exonérations fiscales et crédits d'impôts</div>;
};

const IdentitéDeLEntrepreneur = () => {
  return <div>Identité de l'entrepreneur</div>;
};

const InformationsRelativesÀLActivité = () => {
  return <div>Informations relatives à l'activité</div>;
};

const InformationsRelativesÀLExerciceFiscal = () => {
  return <div>Informations relatives à l'exercice fiscal</div>;
};

const ValiderLaClôture = () => {
  return <div>Valider la clôture</div>;
};

export default App;
