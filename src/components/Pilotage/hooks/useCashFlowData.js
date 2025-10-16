// src/components/Pilotage/hooks/useCashFlowData.js
import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';

/**
 * Hook personnalisé pour charger les données de flux de trésorerie mensuel
 * depuis la vue SQL cash_flow_mensuel
 */
export const useCashFlowData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCashFlowData();
  }, []);

  const fetchCashFlowData = async () => {
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

      // Charger les données de cash flow depuis la vue SQL
      const { data: cashFlowData, error: cashFlowError } = await supabase
        .from('cash_flow_mensuel')
        .select('*')
        .eq('entreprise_id', entreprise.id)
        .order('mois', { ascending: true });

      if (cashFlowError) throw cashFlowError;

      console.log('💰 Cash Flow data chargées:', cashFlowData?.length || 0, 'mois');

      // Formater les données pour le graphique
      const formattedData = (cashFlowData || []).map((item) => {
        // Extraire le mois court depuis mois_annee (format "2024-01" -> "Jan")
        const date = new Date(item.mois);
        const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
                           'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
        const month = monthNames[date.getMonth()];

        return {
          month: month,
          entrees: parseFloat(item.cash_in) || 0,
          sorties: -Math.abs(parseFloat(item.cash_out)) || 0, // Négatif pour l'affichage
          net: parseFloat(item.cash_flow_net) || 0,
          mois_annee: item.mois_annee,
          cumule: parseFloat(item.cash_flow_cumule) || 0
        };
      });

      setData(formattedData);
      console.log('✅ Cash Flow formatté:', formattedData);

    } catch (err) {
      console.error('❌ Erreur chargement cash flow:', err);
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
    refetch: fetchCashFlowData
  };
};

export default useCashFlowData;
