// src/hooks/useDashboardDataOptimized.js - Version optimisée utilisant les vues SQL
import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';

export const useDashboardDataOptimized = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

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

      console.log('🏢 Entreprise ID:', entreprise.id);

      // Paralléliser toutes les requêtes vers les vues SQL
      const [
        kpiResult,
        monthlyResult,
        paymentMethodsResult,
        expensesResult,
        cashFlowResult,
        profitMarginResult,
        treasuryResult,
        quarterlyRevenueResult,
        taxProjectionResult,
        performanceResult,
        transactionsResult,
        clientsResult,
        workingCapitalResult,
        thresholdResult,
        comparisonResult
      ] = await Promise.all([
        // 1. KPI Globaux
        supabase
          .from('kpi_globaux')
          .select('*')
          .eq('entreprise_id', entreprise.id)
          .single(),

        // 2. Données mensuelles
        supabase
          .from('donnees_mensuelles')
          .select('*')
          .eq('entreprise_id', entreprise.id)
          .order('mois_numero', { ascending: true }),

        // 3. Moyens de paiement
        supabase
          .from('stats_moyens_paiement')
          .select('*')
          .eq('entreprise_id', entreprise.id)
          .order('montant_total', { ascending: false }),

        // 4. Répartition des dépenses
        supabase
          .from('repartition_depenses')
          .select('*')
          .eq('entreprise_id', entreprise.id)
          .order('montant_total', { ascending: false }),

        // 5. Cash Flow mensuel
        supabase
          .from('cash_flow_mensuel')
          .select('*')
          .eq('entreprise_id', entreprise.id)
          .order('mois', { ascending: true }),

        // 6. Évolution de la marge
        supabase
          .from('evolution_marge')
          .select('*')
          .eq('entreprise_id', entreprise.id)
          .order('mois', { ascending: true }),

        // 7. Évolution de la trésorerie
        supabase
          .from('evolution_tresorerie')
          .select('*')
          .eq('entreprise_id', entreprise.id)
          .order('mois', { ascending: true }),

        // 8. Revenus trimestriels
        supabase
          .from('revenus_trimestriels')
          .select('*')
          .eq('entreprise_id', entreprise.id)
          .order('trimestre', { ascending: true }),

        // 9. Projection fiscale
        supabase
          .from('projection_fiscale')
          .select('*')
          .eq('entreprise_id', entreprise.id)
          .single(),

        // 10. Radar des performances
        supabase
          .from('radar_performances')
          .select('*')
          .eq('entreprise_id', entreprise.id)
          .single(),

        // 11. Transactions détaillées (limitées aux 100 dernières)
        supabase
          .from('transactions_detaillees')
          .select('*')
          .eq('entreprise_id', entreprise.id)
          .order('date_transaction', { ascending: false })
          .limit(100),

        // 12. Analyse des clients
        supabase
          .from('analyse_clients')
          .select('*')
          .eq('entreprise_id', entreprise.id)
          .order('chiffre_affaires', { ascending: false })
          .limit(10),

        // 13. Working Capital
        supabase
          .from('working_capital_evolution')
          .select('*')
          .eq('entreprise_id', entreprise.id)
          .order('mois', { ascending: true }),

        // 14. Seuils et indicateurs
        supabase
          .from('seuils_indicateurs')
          .select('*')
          .eq('entreprise_id', entreprise.id)
          .single(),

        // 15. Comparaison annuelle
        supabase
          .from('comparaison_annuelle')
          .select('*')
          .eq('entreprise_id', entreprise.id)
          .order('mois_numero', { ascending: true })
      ]);

      // Vérifier les erreurs
      if (kpiResult.error) console.warn('⚠️ KPI:', kpiResult.error);
      if (monthlyResult.error) console.warn('⚠️ Monthly:', monthlyResult.error);
      if (paymentMethodsResult.error) console.warn('⚠️ Payment:', paymentMethodsResult.error);
      if (expensesResult.error) console.warn('⚠️ Expenses:', expensesResult.error);
      if (cashFlowResult.error) console.warn('⚠️ CashFlow:', cashFlowResult.error);
      if (profitMarginResult.error) console.warn('⚠️ Margin:', profitMarginResult.error);
      if (treasuryResult.error) console.warn('⚠️ Treasury:', treasuryResult.error);
      if (quarterlyRevenueResult.error) console.warn('⚠️ Quarterly:', quarterlyRevenueResult.error);
      if (taxProjectionResult.error) console.warn('⚠️ Tax:', taxProjectionResult.error);
      if (performanceResult.error) console.warn('⚠️ Performance:', performanceResult.error);
      if (transactionsResult.error) console.warn('⚠️ Transactions:', transactionsResult.error);
      if (clientsResult.error) console.warn('⚠️ Clients:', clientsResult.error);
      if (workingCapitalResult.error) console.warn('⚠️ Working Capital:', workingCapitalResult.error);
      if (thresholdResult.error) console.warn('⚠️ Threshold:', thresholdResult.error);
      if (comparisonResult.error) console.warn('⚠️ Comparison:', comparisonResult.error);

      // Construire l'objet de données final
      const finalData = {
        kpi: kpiResult.data || {
          chiffre_affaires: 0,
          total_depenses: 0,
          resultat_net: 0,
          taux_marge: 0,
          tresorerie_totale: 0,
          jours_tresorerie: 0,
          total_transactions: 0,
          nb_transactions_revenus: 0,
          nb_transactions_depenses: 0
        },
        monthly: monthlyResult.data || [],
        paymentMethods: paymentMethodsResult.data || [],
        expenses: expensesResult.data || [],
        cashFlow: cashFlowResult.data || [],
        profitMargin: profitMarginResult.data || [],
        treasury: treasuryResult.data || [],
        quarterlyRevenue: quarterlyRevenueResult.data || [],
        taxProjection: taxProjectionResult.data || {
          resultat_fiscal: 0,
          impot_estime: 0,
          cotisations_sociales_estimees: 0,
          total_prelevements: 0
        },
        performance: performanceResult.data || {
          score_revenus: 0,
          score_rentabilite: 0,
          score_tresorerie: 0,
          score_croissance: 0,
          score_charges: 0,
          score_liquidite: 0
        },
        transactions: transactionsResult.data || [],
        clientsAnalysis: clientsResult.data || [],
        workingCapital: workingCapitalResult.data || [],
        threshold: thresholdResult.data || {
          ca_actuel: 0,
          seuil_micro_bnc: 77700,
          pourcentage_seuil: 0,
          ca_restant_avant_seuil: 77700,
          projection_annuelle: 0,
          risque_depassement: false
        },
        comparison: comparisonResult.data || []
      };

      console.log('✅ Données chargées depuis les vues SQL:', {
        kpi: !!finalData.kpi,
        monthly: finalData.monthly.length,
        paymentMethods: finalData.paymentMethods.length,
        expenses: finalData.expenses.length,
        transactions: finalData.transactions.length,
        clients: finalData.clientsAnalysis.length
      });

      setData(finalData);
      setError(null);

    } catch (err) {
      console.error('❌ Erreur chargement dashboard:', err);
      setError(err.message);

      // Données vides mais structurées en cas d'erreur
      const emptyData = {
        kpi: {
          chiffre_affaires: 0,
          total_depenses: 0,
          resultat_net: 0,
          taux_marge: 0,
          tresorerie_totale: 0,
          jours_tresorerie: 0,
          total_transactions: 0,
          nb_transactions_revenus: 0,
          nb_transactions_depenses: 0
        },
        monthly: [],
        paymentMethods: [],
        expenses: [],
        cashFlow: [],
        profitMargin: [],
        treasury: [],
        quarterlyRevenue: [],
        taxProjection: {
          resultat_fiscal: 0,
          impot_estime: 0,
          cotisations_sociales_estimees: 0,
          total_prelevements: 0
        },
        performance: {
          score_revenus: 0,
          score_rentabilite: 0,
          score_tresorerie: 0,
          score_croissance: 0,
          score_charges: 0,
          score_liquidite: 0
        },
        transactions: [],
        clientsAnalysis: [],
        workingCapital: [],
        threshold: {
          ca_actuel: 0,
          seuil_micro_bnc: 77700,
          pourcentage_seuil: 0,
          ca_restant_avant_seuil: 77700,
          projection_annuelle: 0,
          risque_depassement: false
        },
        comparison: []
      };

      setData(emptyData);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchDashboardData };
};
