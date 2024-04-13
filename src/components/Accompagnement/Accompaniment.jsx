import React from 'react';
import { Container, Grid, VStack } from '@chakra-ui/react';
import SpecialistsComponent from './components/SpecialistsComponent';
import TitleSubtitleComponent from './components/TitleSubtitleComponent';
import KnowledgeBaseCard from './components/KnowledgeBaseCard';
import HelpCenterCard from './components/HelpCenterCard';
import AllerPlusLoin from './components/AllerPlusLoin';
import CreerUneSci from './components/CreerUneSci';
import CreerUneSociete from './components/CreerUneSociete';
import AccompagnementBanner from './components/AccompagnementBanner';

function Accompaniment() {
  return (
    <div>
    <AccompagnementBanner/>
    <Container maxW="container.xl" centerContent>
      <VStack spacing={8} align="stretch">
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
    </div>
  );
}

export default Accompaniment;
