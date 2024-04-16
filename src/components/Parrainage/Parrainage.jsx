// Import du composant ParrainageBanner.jsx
import { Box } from '@chakra-ui/react';
import ParrainageBanner from './components/ParrainageBanner';
import ComposantParrainage from './components/ComposantParrainage';
import CompteurFilleulsInvites from './components/CompteurFilleulsInvites';
import InformationsLegales from './components/InformationsLegales';
import OffreParrainage from './components/OffreParrainage';

// Définition du composant qui utilise ParrainageBanner
const Parrainage = () => {
    return (
        <div>
            <ParrainageBanner />
            <Box p={4} >
                <OffreParrainage />
                <ComposantParrainage />
                <CompteurFilleulsInvites />
                <InformationsLegales />

            </Box>
        </div>
    );
};

// Export du composant Parrainage
export default Parrainage;