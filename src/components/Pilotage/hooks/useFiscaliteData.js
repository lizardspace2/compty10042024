// src/hooks/useFiscaliteData.js - Hook pour les données fiscales
import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';

export const useFiscaliteData = (regimeFiscal = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFiscaliteData();
  }, [regimeFiscal]);

  const fetchFiscaliteData = async () => {
    try {
      setLoading(true);

      // Récupérer l'utilisateur connecté
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('Utilisateur non connecté');

      // Récupérer l'entreprise
      const { data: entreprise, error: entrepriseError } = await supabase
        .from('entreprises')
        .select('id, regime_fiscal, forme_juridique')
        .eq('user_id', user.id)
        .single();

      if (entrepriseError) throw entrepriseError;

      const regimeToUse = regimeFiscal || entreprise.regime_fiscal || 'micro-bnc';

      console.log('📊 Régime fiscal:', regimeToUse);

      // Charger les données selon le régime
      let fiscalData = {};

      // Toujours charger la comparaison
      const { data: comparaisonData } = await supabase
        .from('comparaison_regimes')
        .select('*')
        .eq('entreprise_id', entreprise.id)
        .single();

      fiscalData.comparaison = comparaisonData;

      // Charger les données spécifiques au régime
      switch (regimeToUse) {
        case 'micro-bnc':
        case 'micro-BNC':
          const { data: microBncData } = await supabase
            .from('calcul_micro_bnc')
            .select('*')
            .eq('entreprise_id', entreprise.id)
            .single();
          fiscalData.micro_bnc = microBncData;
          break;

        case 'bnc-reel':
        case 'declaration-controlee':
          const { data: bncReelData } = await supabase
            .from('calcul_bnc_reel')
            .select('*')
            .eq('entreprise_id', entreprise.id)
            .single();
          fiscalData.bnc_reel = bncReelData;
          break;

        case 'auto-entrepreneur':
        case 'micro-entreprise':
          const { data: autoEntrepreneurData } = await supabase
            .from('calcul_auto_entrepreneur')
            .select('*')
            .eq('entreprise_id', entreprise.id)
            .single();
          fiscalData.auto_entrepreneur = autoEntrepreneurData;
          break;

        case 'societe':
        case 'IS':
          const { data: societeData } = await supabase
            .from('calcul_societe_is')
            .select('*')
            .eq('entreprise_id', entreprise.id)
            .single();
          fiscalData.societe = societeData;
          break;

        default:
          // Charger toutes les données pour comparaison
          const [microBnc, bncReel, autoEnt, societe] = await Promise.all([
            supabase.from('calcul_micro_bnc').select('*').eq('entreprise_id', entreprise.id).single(),
            supabase.from('calcul_bnc_reel').select('*').eq('entreprise_id', entreprise.id).single(),
            supabase.from('calcul_auto_entrepreneur').select('*').eq('entreprise_id', entreprise.id).single(),
            supabase.from('calcul_societe_is').select('*').eq('entreprise_id', entreprise.id).single()
          ]);

          fiscalData = {
            micro_bnc: microBnc.data,
            bnc_reel: bncReel.data,
            auto_entrepreneur: autoEnt.data,
            societe: societe.data,
            comparaison: comparaisonData
          };
      }

      fiscalData.regime_actuel = regimeToUse;
      fiscalData.entreprise = entreprise;

      console.log('✅ Données fiscales chargées:', fiscalData);
      setData(fiscalData);
      setError(null);

    } catch (err) {
      console.error('❌ Erreur chargement fiscalité:', err);
      setError(err.message);

      // Données vides en cas d'erreur
      setData({
        regime_actuel: 'micro-bnc',
        comparaison: null,
        micro_bnc: null,
        bnc_reel: null,
        auto_entrepreneur: null,
        societe: null
      });
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchFiscaliteData };
};
