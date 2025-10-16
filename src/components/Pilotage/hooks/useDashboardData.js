// src/hooks/useDashboardData.js - Version optimisée utilisant les vues SQL
import { useDashboardDataOptimized } from './useDashboardDataOptimized';

// Re-exporter le hook optimisé pour compatibilité avec les composants existants
export const useDashboardData = () => {
  return useDashboardDataOptimized();
};

// Ancienne version conservée pour référence (commentée)
/*
import { useState, useEffect } from 'react';
import { supabase } from './../../../supabaseClient';

export const useDashboardDataOld = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Fonction pour calculer les KPI à partir des transactions brutes
  const calculateKPIFromTransactions = (transactions) => {
    if (!transactions || transactions.length === 0) {
      return {
        chiffre_affaires: 0,
        total_depenses: 0,
        resultat_net: 0,
        taux_marge: 0,
        jours_tresorerie: 0,
        total_transactions: 0,
        nb_transactions_revenus: 0,
        nb_transactions_depenses: 0
      };
    }

    const revenues = transactions.filter(t => t.type_transaction === 'revenu');
    const depenses = transactions.filter(t => t.type_transaction === 'depense');
    
    const chiffre_affaires = revenues.reduce((sum, t) => sum + (t.montant_total || 0), 0);
    const total_depenses = depenses.reduce((sum, t) => sum + (t.montant_total || 0), 0);
    const resultat_net = chiffre_affaires - total_depenses;
    const taux_marge = chiffre_affaires > 0 ? (resultat_net / chiffre_affaires) * 100 : 0;

    return {
      chiffre_affaires,
      total_depenses,
      resultat_net,
      taux_marge: Math.round(taux_marge * 10) / 10,
      jours_tresorerie: 0, // À calculer avec les comptes bancaires
      total_transactions: transactions.length,
      nb_transactions_revenus: revenues.length,
      nb_transactions_depenses: depenses.length
    };
  };

  // Fonction pour calculer la projection fiscale
  const calculateTaxProjection = (kpiData) => {
    const resultat_fiscal = kpiData.resultat_net;
    
    // Calcul simplifié de l'impôt (régime micro-fiscal)
    let impot_estime = 0;
    if (resultat_fiscal > 0) {
      if (resultat_fiscal <= 42000) {
        impot_estime = resultat_fiscal * 0.15;
      } else {
        impot_estime = 42000 * 0.15 + (resultat_fiscal - 42000) * 0.28;
      }
    }

    // Cotisations sociales estimées (45% du CA pour un indépendant)
    const cotisations_sociales_estimees = kpiData.chiffre_affaires * 0.45;

    return {
      resultat_fiscal,
      impot_estime: Math.round(impot_estime),
      cotisations_sociales_estimees: Math.round(cotisations_sociales_estimees),
      total_prelevements: Math.round(impot_estime + cotisations_sociales_estimees)
    };
  };

  // Fonction pour calculer les performances
  const calculatePerformance = (kpiData, transactions) => {
    if (!transactions || transactions.length === 0) {
      return {
        score_revenus: 0,
        score_rentabilite: 0,
        score_tresorerie: 0,
        score_croissance: 0,
        score_charges: 0,
        score_liquidite: 0
      };
    }

    // Score revenus (basé sur le CA)
    const score_revenus = Math.min(100, Math.round((kpiData.chiffre_affaires / 10000) * 10));
    
    // Score rentabilité
    const score_rentabilite = kpiData.taux_marge > 0 ? Math.min(100, Math.round(kpiData.taux_marge * 2)) : 0;
    
    // Score charges (inversé - moins de charges = meilleur score)
    const ratio_charges = kpiData.chiffre_affaires > 0 ? (kpiData.total_depenses / kpiData.chiffre_affaires) * 100 : 100;
    const score_charges = Math.max(0, 100 - Math.round(ratio_charges));

    return {
      score_revenus: Math.max(10, score_revenus),
      score_rentabilite: Math.max(10, score_rentabilite),
      score_tresorerie: 50, // À calculer avec les données de trésorerie
      score_croissance: 60, // À calculer avec l'historique
      score_charges: Math.max(10, score_charges),
      score_liquidite: 70 // À calculer avec les données de liquidité
    };
  };

  // Fonction pour regrouper les données mensuelles
  const calculateMonthlyData = (transactions) => {
    if (!transactions || transactions.length === 0) return [];

    const monthlyMap = {};
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date_transaction);
      const monthKey = date.toLocaleDateString('fr-FR', { month: 'short' });
      const yearMonth = date.toISOString().substring(0, 7);
      
      if (!monthlyMap[yearMonth]) {
        monthlyMap[yearMonth] = {
          mois: yearMonth,
          mois_court: monthKey,
          mois_numero: date.getMonth() + 1,
          revenues: 0,
          expenses: 0,
          result: 0
        };
      }

      if (transaction.type_transaction === 'revenu') {
        monthlyMap[yearMonth].revenues += transaction.montant_total || 0;
      } else if (transaction.type_transaction === 'depense') {
        monthlyMap[yearMonth].expenses += transaction.montant_total || 0;
      }

      monthlyMap[yearMonth].result = monthlyMap[yearMonth].revenues - monthlyMap[yearMonth].expenses;
    });

    return Object.values(monthlyMap).sort((a, b) => a.mois_numero - b.mois_numero);
  };

  // Fonction pour analyser les moyens de paiement
  const calculatePaymentMethods = (transactions) => {
    if (!transactions || transactions.length === 0) return [];

    const paymentMap = {};
    
    transactions.forEach(transaction => {
      const method = transaction.moyen_paiement || 'Non spécifié';
      
      if (!paymentMap[method]) {
        paymentMap[method] = {
          moyen_paiement: method,
          montant_total: 0,
          nombre_transactions: 0
        };
      }

      paymentMap[method].montant_total += transaction.montant_total || 0;
      paymentMap[method].nombre_transactions += 1;
    });

    return Object.values(paymentMap)
      .sort((a, b) => b.montant_total - a.montant_total);
  };

  // Fonction pour analyser les dépenses par catégorie
  const calculateExpensesDistribution = (transactions) => {
    if (!transactions || transactions.length === 0) return [];

    const expenses = transactions.filter(t => t.type_transaction === 'depense');
    if (expenses.length === 0) return [];

    const categoryMap = {};
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
    
    expenses.forEach(expense => {
      const category = expense.categorie_nom || 'Non catégorisé';
      
      if (!categoryMap[category]) {
        categoryMap[category] = {
          categorie: category,
          montant_total: 0,
          nombre_transactions: 0,
          couleur: colors[Object.keys(categoryMap).length % colors.length]
        };
      }

      categoryMap[category].montant_total += expense.montant_total || 0;
      categoryMap[category].nombre_transactions += 1;
    });

    return Object.values(categoryMap)
      .sort((a, b) => b.montant_total - a.montant_total);
  };

  // Fonction pour analyser les clients
  const calculateClientsAnalysis = (transactions) => {
    const revenues = transactions?.filter(t => t.type_transaction === 'revenu') || [];
    if (revenues.length === 0) return [];

    const clientMap = {};
    
    revenues.forEach(transaction => {
      // Logique simplifiée d'extraction du nom du client
      let clientName = 'Divers';
      if (transaction.libelle) {
        // Vous pouvez adapter cette logique selon vos besoins
        const libelle = transaction.libelle.toLowerCase();
        if (libelle.includes('client')) clientName = 'Client ' + libelle.split('client')[1]?.substring(0, 10) || 'Divers';
        else if (libelle.includes('société')) clientName = 'Société ' + libelle.split('société')[1]?.substring(0, 10) || 'Divers';
        else clientName = transaction.libelle.substring(0, 20);
      }

      if (!clientMap[clientName]) {
        clientMap[clientName] = {
          nom_client: clientName,
          chiffre_affaires: 0,
          nombre_transactions: 0,
          panier_moyen: 0
        };
      }

      clientMap[clientName].chiffre_affaires += transaction.montant_total || 0;
      clientMap[clientName].nombre_transactions += 1;
      clientMap[clientName].panier_moyen = clientMap[clientName].chiffre_affaires / clientMap[clientName].nombre_transactions;
    });

    return Object.values(clientMap)
      .sort((a, b) => b.chiffre_affaires - a.chiffre_affaires);
  };

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

      // Récupérer TOUTES les transactions (sans limite)
      const { data: allTransactions, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .eq('entreprise_id', entreprise.id)
        .order('date_transaction', { ascending: false });

      if (transactionsError) throw transactionsError;

      console.log('📊 Transactions chargées:', allTransactions?.length || 0);

      // Calculer toutes les données à partir des transactions
      const kpiData = calculateKPIFromTransactions(allTransactions);
      const monthlyData = calculateMonthlyData(allTransactions);
      const paymentMethods = calculatePaymentMethods(allTransactions);
      const expensesDistribution = calculateExpensesDistribution(allTransactions);
      const clientsAnalysis = calculateClientsAnalysis(allTransactions);
      const taxProjection = calculateTaxProjection(kpiData);
      const performance = calculatePerformance(kpiData, allTransactions);

      // Préparer les données finales
      const finalData = {
        kpi: kpiData,
        monthly: monthlyData,
        paymentMethods: paymentMethods,
        expenses: expensesDistribution,
        cashFlow: [], // À calculer si nécessaire
        profitMargin: [], // À calculer si nécessaire
        treasury: [], // À calculer si nécessaire
        quarterlyRevenue: [], // À calculer si nécessaire
        taxProjection: taxProjection,
        performance: performance,
        transactions: allTransactions || [],
        clientsAnalysis: clientsAnalysis
      };

      console.log('✅ Données calculées à partir des transactions:', finalData);
      setData(finalData);

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
        clientsAnalysis: []
      };
      
      setData(emptyData);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchDashboardData };
};
*/