// src/components/Pilotage/hooks/useProfitMarginData.js
import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';

/**
 * Hook personnalisé pour charger les données d'évolution de la marge
 * depuis la vue SQL evolution_marge
 */
export const useProfitMarginData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfitMarginData();
  }, []);

  const fetchProfitMarginData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Récupérer l'utilisateur connecté
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('Utilisateur non connecté');

      // Récupérer l'entreprise de l'utilisateur
      const { data: entreprise, error: entrepriseError } = await supabase
        .from('entreprises')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (entrepriseError) throw entrepriseError;
      if (!entreprise) throw new Error('Entreprise non trouvée');

      console.log('🏢 Entreprise ID:', entreprise.id);

      // Charger les données d'évolution de la marge depuis la vue SQL
      const { data: marginData, error: marginError } = await supabase
        .from('evolution_marge')
        .select('*')
        .eq('entreprise_id', entreprise.id)
        .order('mois', { ascending: true });

      if (marginError) throw marginError;

      console.log('📈 Profit Margin data chargées:', marginData?.length || 0, 'mois');

      // Formater les données pour le graphique
      const formattedData = (marginData || []).map((item) => {
        // Utiliser mois_court de la vue
        const month = item.mois_court || 'N/A';
        const revenue = parseFloat(item.chiffre_affaires) || 0;
        const expenses = parseFloat(item.total_charges) || 0;
        const margin = revenue - expenses;

        return {
          month: month,
          revenue: revenue,
          expenses: expenses,
          margin: margin,
          taux_marge: parseFloat(item.taux_marge) || 0,
          taux_charges: parseFloat(item.taux_charges) || 0
        };
      });

      setData(formattedData);
      console.log('✅ Profit Margin formatté:', formattedData);

    } catch (err) {
      console.error('❌ Erreur chargement profit margin:', err);
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchProfitMarginData
  };
};

export default useProfitMarginData;
