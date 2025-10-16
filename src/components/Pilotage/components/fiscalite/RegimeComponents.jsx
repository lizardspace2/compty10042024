// src/components/fiscalite/RegimeComponents.jsx
// Tous les composants fiscaux regroupés
import React from 'react';
import {
  Box, Text, Grid, GridItem, VStack, HStack, Progress, Badge, Stat,
  StatLabel, StatNumber, StatHelpText, Table, Thead, Tbody, Tr, Th, Td,
  useColorModeValue, Divider, Icon
} from '@chakra-ui/react';
import { FaEuroSign, FaPercentage, FaCalculator, FaChartLine } from 'react-icons/fa';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount || 0);
};

// ============================================================================
// MICRO-BNC COMPONENT
// ============================================================================
export const MicroBNCComponent = ({ data }) => {
  const bgCard = useColorModeValue('red.50', 'gray.700');

  if (!data) return <Text>Aucune donnée disponible</Text>;

  const seuilPourcentage = Math.min((data.chiffre_affaires / data.seuil_micro_bnc) * 100, 100);

  return (
    <VStack spacing={6} align="stretch">
      {/* Seuil */}
      <Box p={5} bg={bgCard} borderRadius="lg">
        <Text fontSize="lg" fontWeight="bold" mb={3}>📊 Suivi du Seuil Micro-BNC</Text>
        <VStack align="stretch" spacing={3}>
          <HStack justify="space-between">
            <Text>CA actuel / Seuil</Text>
            <Text fontWeight="bold">{formatCurrency(data.chiffre_affaires)} / {formatCurrency(data.seuil_micro_bnc)}</Text>
          </HStack>
          <Progress value={seuilPourcentage} colorScheme={seuilPourcentage > 90 ? 'red' : seuilPourcentage > 75 ? 'orange' : 'green'} size="lg" borderRadius="md" />
          <HStack justify="space-between">
            <Text fontSize="sm">{data.pourcentage_seuil}% atteint</Text>
            {data.risque_depassement && <Badge colorScheme="red">⚠️ Risque dépassement</Badge>}
          </HStack>
        </VStack>
      </Box>

      {/* KPI Cards */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4}>
        <GridItem>
          <Box p={4} bg={bgCard} borderRadius="lg">
            <Stat>
              <StatLabel><Icon as={FaEuroSign} /> Chiffre d'affaires</StatLabel>
              <StatNumber fontSize="xl">{formatCurrency(data.chiffre_affaires)}</StatNumber>
              <StatHelpText>Recettes encaissées</StatHelpText>
            </Stat>
          </Box>
        </GridItem>

        <GridItem>
          <Box p={4} bg={bgCard} borderRadius="lg">
            <Stat>
              <StatLabel><Icon as={FaPercentage} /> Abattement (34%)</StatLabel>
              <StatNumber fontSize="xl">{formatCurrency(data.abattement_forfaitaire)}</StatNumber>
              <StatHelpText>Minimum 305€</StatHelpText>
            </Stat>
          </Box>
        </GridItem>

        <GridItem>
          <Box p={4} bg={bgCard} borderRadius="lg">
            <Stat>
              <StatLabel><Icon as={FaCalculator} /> Revenu imposable</StatLabel>
              <StatNumber fontSize="xl">{formatCurrency(data.revenu_imposable)}</StatNumber>
              <StatHelpText>Base IR</StatHelpText>
            </Stat>
          </Box>
        </GridItem>

        <GridItem>
          <Box p={4} bg={bgCard} borderRadius="lg">
            <Stat>
              <StatLabel><Icon as={FaChartLine} /> Cotisations (22%)</StatLabel>
              <StatNumber fontSize="xl">{formatCurrency(data.cotisations_sociales_estimees)}</StatNumber>
              <StatHelpText>Estimées</StatHelpText>
            </Stat>
          </Box>
        </GridItem>
      </Grid>

      {/* Projection */}
      {data.projection_annuelle > 0 && (
        <Box p={5} bg={bgCard} borderRadius="lg">
          <Text fontSize="lg" fontWeight="bold" mb={2}>📈 Projection annuelle</Text>
          <Text>Basée sur les {Math.floor(new Date().getDate() / 365 * 365)} jours écoulés : <Text as="span" fontWeight="bold">{formatCurrency(data.projection_annuelle)}</Text></Text>
          {data.risque_depassement && (
            <Text mt={2} color="red.500" fontWeight="bold">
              ⚠️ Vous risquez de dépasser le seuil Micro-BNC. Pensez à passer en BNC Réel.
            </Text>
          )}
        </Box>
      )}
    </VStack>
  );
};

// ============================================================================
// BNC RÉEL COMPONENT
// ============================================================================
export const BNCReelComponent = ({ data }) => {
  const bgCard = useColorModeValue('blue.50', 'gray.700');

  if (!data) return <Text>Aucune donnée disponible</Text>;

  const tauxMarge = data.recettes_totales > 0 ? ((data.benefice_net / data.recettes_totales) * 100).toFixed(1) : 0;

  return (
    <VStack spacing={6} align="stretch">
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
        <GridItem>
          <Box p={4} bg={bgCard} borderRadius="lg">
            <Stat>
              <StatLabel>Recettes totales</StatLabel>
              <StatNumber fontSize="xl">{formatCurrency(data.recettes_totales)}</StatNumber>
            </Stat>
          </Box>
        </GridItem>

        <GridItem>
          <Box p={4} bg={bgCard} borderRadius="lg">
            <Stat>
              <StatLabel>Dépenses déductibles</StatLabel>
              <StatNumber fontSize="xl" color="red.500">{formatCurrency(data.depenses_deductibles)}</StatNumber>
            </Stat>
          </Box>
        </GridItem>

        <GridItem>
          <Box p={4} bg={bgCard} borderRadius="lg">
            <Stat>
              <StatLabel>Bénéfice net</StatLabel>
              <StatNumber fontSize="xl" color="green.600">{formatCurrency(data.benefice_net)}</StatNumber>
              <StatHelpText>Marge: {tauxMarge}%</StatHelpText>
            </Stat>
          </Box>
        </GridItem>
      </Grid>

      <Box p={5} bg={bgCard} borderRadius="lg">
        <Text fontSize="lg" fontWeight="bold" mb={3}>💰 Détail des charges</Text>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Type</Th>
              <Th isNumeric>Montant</Th>
              <Th isNumeric>% du bénéfice</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td fontWeight="medium">Cotisations sociales (≈45%)</Td>
              <Td isNumeric>{formatCurrency(data.cotisations_sociales)}</Td>
              <Td isNumeric>{data.benefice_net > 0 ? ((data.cotisations_sociales / data.benefice_net) * 100).toFixed(1) : 0}%</Td>
            </Tr>
            <Tr>
              <Td fontWeight="medium">Impôt sur le revenu</Td>
              <Td isNumeric>{formatCurrency(data.impot_sur_revenu)}</Td>
              <Td isNumeric>{data.benefice_net > 0 ? ((data.impot_sur_revenu / data.benefice_net) * 100).toFixed(1) : 0}%</Td>
            </Tr>
            <Tr bg="green.50">
              <Td fontWeight="bold">Revenu net après tout</Td>
              <Td isNumeric fontWeight="bold" color="green.600">{formatCurrency(data.revenu_net_apres_tout)}</Td>
              <Td isNumeric fontWeight="bold">{data.recettes_totales > 0 ? ((data.revenu_net_apres_tout / data.recettes_totales) * 100).toFixed(1) : 0}%</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

// ============================================================================
// AUTO-ENTREPRENEUR COMPONENT
// ============================================================================
export const AutoEntrepreneurComponent = ({ data }) => {
  const bgCard = useColorModeValue('purple.50', 'gray.700');

  if (!data) return <Text>Aucune donnée disponible</Text>;

  return (
    <VStack spacing={6} align="stretch">
      {/* Seuils */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <GridItem>
          <Box p={5} bg={bgCard} borderRadius="lg">
            <Text fontSize="lg" fontWeight="bold" mb={3}>📊 Seuil CA Auto-Entrepreneur</Text>
            <VStack align="stretch" spacing={2}>
              <HStack justify="space-between">
                <Text>CA / Seuil</Text>
                <Text fontWeight="bold">{formatCurrency(data.chiffre_affaires)} / {formatCurrency(data.seuil_ae)}</Text>
              </HStack>
              <Progress value={Math.min((data.chiffre_affaires / data.seuil_ae) * 100, 100)} colorScheme="purple" size="md" />
            </VStack>
          </Box>
        </GridItem>

        <GridItem>
          <Box p={5} bg={bgCard} borderRadius="lg">
            <Text fontSize="lg" fontWeight="bold" mb={3}>🧾 Statut TVA</Text>
            <VStack align="stretch" spacing={2}>
              <HStack>
                <Badge colorScheme={data.tva_applicable ? 'orange' : 'green'} fontSize="md">{data.statut_tva}</Badge>
              </HStack>
              <Text fontSize="sm">Seuil base: {formatCurrency(data.seuil_tva_base)}</Text>
              <Text fontSize="sm">Seuil majoré: {formatCurrency(data.seuil_tva_majore)}</Text>
            </VStack>
          </Box>
        </GridItem>
      </Grid>

      {/* Charges */}
      <Box p={5} bg={bgCard} borderRadius="lg">
        <Text fontSize="lg" fontWeight="bold" mb={4}>💰 Détail des charges</Text>
        <VStack align="stretch" spacing={3}>
          <HStack justify="space-between" p={3} bg="white" borderRadius="md">
            <Text>Chiffre d'affaires</Text>
            <Text fontWeight="bold" fontSize="lg">{formatCurrency(data.chiffre_affaires)}</Text>
          </HStack>

          <Divider />

          <HStack justify="space-between" p={3}>
            <Text>Cotisations sociales (22%)</Text>
            <Text color="red.500" fontWeight="bold">- {formatCurrency(data.cotisations_sociales)}</Text>
          </HStack>

          <HStack justify="space-between" p={3}>
            <Text>Prélèvement libératoire IR (2.2%)</Text>
            <Text color="red.500" fontWeight="bold">- {formatCurrency(data.prelevement_liberatoire)}</Text>
          </HStack>

          <Divider />

          <HStack justify="space-between" p={3} bg="green.50" borderRadius="md">
            <Text fontWeight="bold">Revenu net</Text>
            <Text fontWeight="bold" fontSize="xl" color="green.600">{formatCurrency(data.revenu_net)}</Text>
          </HStack>

          <Text fontSize="sm" color="gray.600" textAlign="center">
            Soit {data.chiffre_affaires > 0 ? ((data.revenu_net / data.chiffre_affaires) * 100).toFixed(1) : 0}% du CA
          </Text>
        </VStack>
      </Box>
    </VStack>
  );
};

// ============================================================================
// SOCIÉTÉ IS COMPONENT
// ============================================================================
export const SocieteISComponent = ({ data }) => {
  const bgCard = useColorModeValue('orange.50', 'gray.700');

  if (!data) return <Text>Aucune donnée disponible</Text>;

  return (
    <VStack spacing={6} align="stretch">
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
        <GridItem>
          <Box p={4} bg={bgCard} borderRadius="lg">
            <Stat>
              <StatLabel>Chiffre d'affaires</StatLabel>
              <StatNumber fontSize="xl">{formatCurrency(data.chiffre_affaires)}</StatNumber>
            </Stat>
          </Box>
        </GridItem>

        <GridItem>
          <Box p={4} bg={bgCard} borderRadius="lg">
            <Stat>
              <StatLabel>Bénéfice avant IS</StatLabel>
              <StatNumber fontSize="xl">{formatCurrency(data.benefice_avant_is)}</StatNumber>
            </Stat>
          </Box>
        </GridItem>

        <GridItem>
          <Box p={4} bg={bgCard} borderRadius="lg">
            <Stat>
              <StatLabel>Impôt sur les sociétés</StatLabel>
              <StatNumber fontSize="xl" color="red.500">{formatCurrency(data.impot_societes)}</StatNumber>
              <StatHelpText>15% jusqu'à 42.5k€, puis 25%</StatHelpText>
            </Stat>
          </Box>
        </GridItem>
      </Grid>

      <Box p={5} bg={bgCard} borderRadius="lg">
        <Text fontSize="lg" fontWeight="bold" mb={4}>💼 Distribution et dividendes</Text>
        <Table variant="simple" size="sm">
          <Tbody>
            <Tr>
              <Td>Bénéfice net après IS</Td>
              <Td isNumeric fontWeight="bold">{formatCurrency(data.benefice_net_apres_is)}</Td>
            </Tr>
            <Tr>
              <Td>Dividendes potentiels (70%)</Td>
              <Td isNumeric fontWeight="bold" color="green.600">{formatCurrency(data.dividendes_potentiels)}</Td>
            </Tr>
            <Tr>
              <Td>Flat tax sur dividendes (30%)</Td>
              <Td isNumeric color="red.500">- {formatCurrency(data.flat_tax_dividendes)}</Td>
            </Tr>
            <Tr bg="green.50">
              <Td fontWeight="bold">Dividendes nets</Td>
              <Td isNumeric fontWeight="bold" fontSize="lg" color="green.600">
                {formatCurrency(data.dividendes_potentiels - data.flat_tax_dividendes)}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

// ============================================================================
// COMPARAISON REGIMES
// ============================================================================
export const ComparaisonRegimesComponent = ({ data }) => {
  const bgCard = useColorModeValue('teal.50', 'gray.700');

  if (!data || !data.comparaison) return <Text>Aucune donnée de comparaison disponible</Text>;

  const regimes = [
    { nom: 'Micro-BNC', net: data.comparaison.net_micro_bnc, icon: '📋' },
    { nom: 'BNC Réel', net: data.comparaison.net_bnc_reel, icon: '📊' },
    { nom: 'Auto-Entrepreneur', net: data.comparaison.net_auto_entrepreneur, icon: '🚀' }
  ].sort((a, b) => b.net - a.net);

  const meilleur = regimes[0];

  return (
    <VStack spacing={6} align="stretch">
      <Box p={5} bg="green.50" borderRadius="lg" borderWidth={2} borderColor="green.400">
        <HStack>
          <Text fontSize="3xl">{meilleur.icon}</Text>
          <VStack align="start" spacing={0}>
            <Text fontSize="sm" color="gray.600">Régime optimal pour votre situation :</Text>
            <Text fontSize="2xl" fontWeight="bold" color="green.600">{meilleur.nom}</Text>
            <Text fontSize="lg">Revenu net estimé : <Text as="span" fontWeight="bold">{formatCurrency(meilleur.net)}</Text></Text>
          </VStack>
        </HStack>
      </Box>

      <Box p={5} bg={bgCard} borderRadius="lg">
        <Text fontSize="lg" fontWeight="bold" mb={4}>📊 Comparaison des revenus nets</Text>
        <VStack spacing={4} align="stretch">
          {regimes.map((regime, index) => (
            <Box key={regime.nom} p={4} bg={index === 0 ? 'green.100' : 'white'} borderRadius="md" borderWidth={1} borderColor={index === 0 ? 'green.400' : 'gray.200'}>
              <HStack justify="space-between">
                <HStack>
                  <Text fontSize="2xl">{regime.icon}</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold">{regime.nom}</Text>
                    {index === 0 && <Badge colorScheme="green">Meilleur choix</Badge>}
                  </VStack>
                </HStack>
                <Text fontSize="xl" fontWeight="bold" color={index === 0 ? 'green.600' : 'gray.700'}>
                  {formatCurrency(regime.net)}
                </Text>
              </HStack>
              <Progress
                value={(regime.net / meilleur.net) * 100}
                colorScheme={index === 0 ? 'green' : 'gray'}
                size="sm"
                mt={2}
              />
            </Box>
          ))}
        </VStack>
      </Box>

      <Box p={5} bg="blue.50" borderRadius="lg">
        <Text fontSize="md" fontWeight="bold" mb={2}>ℹ️ Comment choisir ?</Text>
        <VStack align="start" spacing={2} fontSize="sm">
          <Text>• <Text as="span" fontWeight="bold">Micro-BNC :</Text> Simple, CA ≤ 77.7k€, abattement 34%</Text>
          <Text>• <Text as="span" fontWeight="bold">BNC Réel :</Text> Si dépenses &gt; 34% du CA, comptabilité complète</Text>
          <Text>• <Text as="span" fontWeight="bold">Auto-Entrepreneur :</Text> Très simple, charges 24.2%, adapté au démarrage</Text>
          <Text>• <Text as="span" fontWeight="bold">Société :</Text> Protection, croissance, dividendes, plus complexe</Text>
        </VStack>
      </Box>
    </VStack>
  );
};
