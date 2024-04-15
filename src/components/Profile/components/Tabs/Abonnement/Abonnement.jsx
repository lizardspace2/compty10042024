import React from 'react';
import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { PaymentMethod } from './components/PaymentMethod';
import { ParrainezVosProches } from './components/ParrainezVosProches';
import { ListeDesFactures } from './components/ListeDesFactures';
import { ResumeAbonnementPremium } from './components/ResumeAbonnementPremium';

export function Abonnement() {
  return (
    <Grid templateColumns={['1fr', '1fr 1fr']} gap={6} justifyItems="center">
      <GridItem w="100%">
        <VStack spacing={4} align="stretch">
          <PaymentMethod />
          <ListeDesFactures />
          <ParrainezVosProches />
        </VStack>
      </GridItem>
      <GridItem w="100%">
        <VStack spacing={4} align="stretch">
          <ResumeAbonnementPremium />
        </VStack>
      </GridItem>
    </Grid>
  );
}
