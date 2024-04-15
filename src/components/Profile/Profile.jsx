// Import du composant ProfileBanner.jsx
import ProfileBanner from './components/ProfileBanner';
import ProfileTabs from './components/ProfileTabs';

// Définition du composant qui utilise ProfileBanner
const Profile = () => {
  return (
    <div>
      {/* Utilisation du composant ProfileBanner */}
      <ProfileBanner />
      <ProfileTabs/>
    </div>
  );
};

// Export du composant Profile
export default Profile;
