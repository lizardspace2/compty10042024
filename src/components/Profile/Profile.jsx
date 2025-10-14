import { Box } from '@chakra-ui/react';
import ProfileBanner from './components/ProfileBanner';
import ProfileTabs from './components/ProfileTabs';

const Profile = () => {
  return (
    <Box bg="gray.50" minH="100vh">
      <ProfileBanner />
      <Box p={6}>
        <ProfileTabs />
      </Box>
    </Box>
  );
};

export default Profile;
