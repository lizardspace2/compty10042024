import React from 'react';
import { Container, Grid, VStack } from '@chakra-ui/react';
import SpecialistsComponent from './components/SpecialistsComponent';
import TitleSubtitleComponent from './components/TitleSubtitleComponent';
import KnowledgeBaseCard from './components/KnowledgeBaseCard';
import HelpCenterCard from './components/HelpCenterCard';
import AllerPlusLoin from './components/AllerPlusLoin';
import CreerUneSci from './components/CreerUneSci';
import CreerUneSociete from './components/CreerUneSociete';

function Accompaniment() {
  return (
    <Container maxW="container.xl" centerContent>
      <VStack spacing={8} align="stretch">
        <h1>Accompaniment Page</h1>
        <SpecialistsComponent />
        <TitleSubtitleComponent />

        {/* Responsive Grid for Knowledge Base and Help Center Cards */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
          <KnowledgeBaseCard />
          <HelpCenterCard />
        </Grid>

        <AllerPlusLoin />
        
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
          <CreerUneSci />
          <CreerUneSociete />
        </Grid>
      </VStack>
    </Container>
  );
}

export default Accompaniment;
