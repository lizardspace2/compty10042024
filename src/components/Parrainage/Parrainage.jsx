import { Box, Grid } from '@chakra-ui/react';
import ParrainageBanner from './components/ParrainageBanner';
import ComposantParrainage from './components/ComposantParrainage';
import CompteurFilleulsInvites from './components/CompteurFilleulsInvites';
import InformationsLegales from './components/InformationsLegales';
import OffreParrainage from './components/OffreParrainage';
import CompteurFilleulsInscrits from './components/CompteurFilleulsInscrits';
import CompteurFilleulsAbonnes from './components/CompteurFilleulsAbonnes';

const Parrainage = () => {
    return (
        <Box bg="gray.50" minH="100vh">
            <ParrainageBanner />
            <Box p={6}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <OffreParrainage />
                    <ComposantParrainage />
                </Grid>
                <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={6}>
                    <CompteurFilleulsInvites />
                    <CompteurFilleulsInscrits />
                    <CompteurFilleulsAbonnes />
                </Grid>
                <Box mt={6}>
                    <InformationsLegales />
                </Box>
            </Box>
        </Box>
    );
};

export default Parrainage;
