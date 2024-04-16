// Import du composant ParrainageBanner.jsx
import { Box } from '@chakra-ui/react';
import ParrainageBanner from './components/ParrainageBanner';

// Définition du composant qui utilise ParrainageBanner
const Parrainage = () => {
  return (
    <div>
        <ParrainageBanner/>
      <Box p={4} >

      </Box>
    </div>
  );
};

// Export du composant Parrainage
export default Parrainage;