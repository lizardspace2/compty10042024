import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from './AuthContext';

const EntrepriseContext = createContext({});

export const useEntreprise = () => useContext(EntrepriseContext);

export const EntrepriseProvider = ({ children }) => {
  const { session } = useAuth();
  const [entreprise, setEntreprise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchEntreprise();
    } else {
      setEntreprise(null);
      setLoading(false);
    }
  }, [session]);

  const fetchEntreprise = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('entreprises')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned
        throw error;
      }

      setEntreprise(data);
      setError(null);
    } catch (err) {
      console.error('Erreur lors de la récupération de l\'entreprise:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createEntreprise = async (entrepriseData) => {
    try {
      const { data, error } = await supabase
        .from('entreprises')
        .insert([{ ...entrepriseData, user_id: session.user.id }])
        .select()
        .single();

      if (error) throw error;

      setEntreprise(data);
      return { data, error: null };
    } catch (err) {
      console.error('Erreur lors de la création de l\'entreprise:', err);
      return { data: null, error: err };
    }
  };

  const updateEntreprise = async (updates) => {
    try {
      const { data, error } = await supabase
        .from('entreprises')
        .update(updates)
        .eq('id', entreprise.id)
        .select()
        .single();

      if (error) throw error;

      setEntreprise(data);
      return { data, error: null };
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'entreprise:', err);
      return { data: null, error: err };
    }
  };

  const value = {
    entreprise,
    loading,
    error,
    createEntreprise,
    updateEntreprise,
    refreshEntreprise: fetchEntreprise,
  };

  return (
    <EntrepriseContext.Provider value={value}>
      {children}
    </EntrepriseContext.Provider>
  );
};
