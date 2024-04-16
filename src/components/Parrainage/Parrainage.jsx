import { Box, Grid } from '@chakra-ui/react';
import ParrainageBanner from './components/ParrainageBanner';
import ComposantParrainage from './components/ComposantParrainage';
import CompteurFilleulsInvites from './components/CompteurFilleulsInvites';
import InformationsLegales from './components/InformationsLegales';
import OffreParrainage from './components/OffreParrainage';

const Parrainage = () => {
    return (
        <div>
            <ParrainageBanner />
            <Box p={4} >
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <OffreParrainage />
                    <ComposantParrainage />
                </Grid>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    {[...Array(3)].map((_, index) => (
                        <CompteurFilleulsInvites key={index} />
                    ))}
                </Grid>
                <InformationsLegales />
            </Box>
        </div>
    );
};

export default Parrainage;
