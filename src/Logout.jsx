import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { supabase } from './supabaseClient';  // Assurez-vous que le chemin vers votre client Supabase est correct

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();  // Déconnexion de Supabase
    if (error) {
      console.log('Erreur de déconnexion:', error.message);
    } else {
      navigate('/login');  // Redirige l'utilisateur vers la page de connexion après la déconnexion
    }
  };

  return (
    <Button colorScheme="blue" onClick={handleLogout}>
      Déconnexion
    </Button>
  );
};

export default Logout;
