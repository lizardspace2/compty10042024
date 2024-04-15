// Import du composant ProfileBanner.jsx
import { Box } from '@chakra-ui/react';
import ProfileBanner from './components/ProfileBanner';
import ProfileTabs from './components/ProfileTabs';

// Définition du composant qui utilise ProfileBanner
const Profile = () => {
  return (
    <div>
      {/* Utilisation du composant ProfileBanner avec un espace en dessous */}
      <ProfileBanner  />
      <Box p={4} >
      <ProfileTabs />
      </Box>
    </div>
  );
};

// Export du composant Profile
export default Profile;
