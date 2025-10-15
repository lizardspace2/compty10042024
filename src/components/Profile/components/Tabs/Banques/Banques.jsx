import React, { useState, useEffect } from 'react';
import { Box, Spinner, Flex, useToast } from '@chakra-ui/react';
import AccountSection from './components/AccountSection';
import { useEntreprise } from '../../../../../contexts/EntrepriseContext';
import { getComptesBancaires } from '../../../../../services/compteBancaireService';

export function Banques() {
  const { entreprise, loading: entrepriseLoading } = useEntreprise();
  const [comptes, setComptes] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (entreprise?.id) {
      loadComptes();
    } else {
      setLoading(false);
    }
  }, [entreprise]);

  const loadComptes = async () => {
    setLoading(true);
    const { data, error } = await getComptesBancaires(entreprise.id);

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les comptes bancaires',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setComptes(data || []);
    }
    setLoading(false);
  };

  if (entrepriseLoading || loading) {
    return (
      <Flex justify="center" align="center" h="400px">
        <Spinner size="xl" color="red.500" />
      </Flex>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" w="100%">
      <Box maxWidth="1000px" w="100%">
        <AccountSection accounts={comptes} onRefresh={loadComptes} />
      </Box>
    </Box>
  );
}
