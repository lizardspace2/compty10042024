import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { PaymentMethod } from './components/PaymentMethod';
import { ParrainezVosProches } from './components/ParrainezVosProches';
import { ListeDesFactures } from './components/ListeDesFactures';
import { ResumeAbonnementPremium } from './components/ResumeAbonnementPremium';

export function Abonnement() {
  return (
    <Grid templateColumns={['1fr', '1fr 1fr']} gap={6}>
      <GridItem>
        <PaymentMethod />
        <ListeDesFactures />
        <ParrainezVosProches />
      </GridItem>
      <GridItem>
        <ResumeAbonnementPremium />
      </GridItem>
    </Grid>
  );
}
