import { supabase } from '../supabaseClient';

/**
 * Service pour gérer les transactions
 */

// Récupérer toutes les transactions d'une entreprise
export const getTransactions = async (entrepriseId, filters = {}) => {
  try {
    let query = supabase
      .from('transactions')
      .select(`
        *,
        ventilations (
          id,
          categorie_nom,
          montant,
          pourcentage
        ),
        compte_bancaire:comptes_bancaires (
          id,
          nom_compte,
          nom_banque
        ),
        justificatifs (
          id,
          nom_fichier,
          type_fichier,
          taille_fichier,
          url_stockage,
          created_at
        )
      `)
      .eq('entreprise_id', entrepriseId)
      .order('date_transaction', { ascending: false });

    // Filtres optionnels
    if (filters.type_transaction) {
      query = query.eq('type_transaction', filters.type_transaction);
    }

    if (filters.moyen_paiement) {
      query = query.eq('moyen_paiement', filters.moyen_paiement);
    }

    if (filters.statut) {
      query = query.eq('statut', filters.statut);
    }

    if (filters.date_debut) {
      query = query.gte('date_transaction', filters.date_debut);
    }

    if (filters.date_fin) {
      query = query.lte('date_transaction', filters.date_fin);
    }

    if (filters.montant_min) {
      query = query.gte('montant_total', filters.montant_min);
    }

    if (filters.montant_max) {
      query = query.lte('montant_total', filters.montant_max);
    }

    if (filters.search) {
      query = query.or(`libelle.ilike.%${filters.search}%,annotations.ilike.%${filters.search}%`);
    }

    // Pagination
    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Erreur lors de la récupération des transactions:', error);
    return { data: null, error };
  }
};

// Créer une nouvelle transaction
export const createTransaction = async (transactionData) => {
  try {
    const { ventilations, ...transactionMain } = transactionData;

    // Insérer la transaction
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert([transactionMain])
      .select()
      .single();

    if (transactionError) throw transactionError;

    // Insérer les ventilations
    if (ventilations && ventilations.length > 0) {
      const ventilationsData = ventilations.map(v => ({
        transaction_id: transaction.id,
        categorie_id: v.categorie_id,
        categorie_nom: v.categorie_nom,
        montant: v.montant,
        pourcentage: v.pourcentage
      }));

      const { error: ventilationsError } = await supabase
        .from('ventilations')
        .insert(ventilationsData);

      if (ventilationsError) throw ventilationsError;
    }

    return { data: transaction, error: null };
  } catch (error) {
    console.error('Erreur lors de la création de la transaction:', error);
    return { data: null, error };
  }
};

// Mettre à jour une transaction
export const updateTransaction = async (transactionId, updates) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', transactionId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la transaction:', error);
    return { data: null, error };
  }
};

// Supprimer une transaction
export const deleteTransaction = async (transactionId) => {
  try {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', transactionId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Erreur lors de la suppression de la transaction:', error);
    return { error };
  }
};

// Récupérer les statistiques des transactions
export const getTransactionStats = async (entrepriseId, exerciceFiscalId = null) => {
  try {
    let query = supabase
      .from('transactions')
      .select('montant_total, type_transaction')
      .eq('entreprise_id', entrepriseId);

    if (exerciceFiscalId) {
      query = query.eq('exercice_fiscal_id', exerciceFiscalId);
    }

    const { data, error } = await query;

    if (error) throw error;

    const stats = {
      total_recettes: 0,
      total_depenses: 0,
      solde: 0,
      nombre_transactions: data.length,
      nombre_recettes: 0,
      nombre_depenses: 0
    };

    data.forEach(transaction => {
      if (transaction.type_transaction === 'recette') {
        stats.total_recettes += parseFloat(transaction.montant_total);
        stats.nombre_recettes++;
      } else if (transaction.type_transaction === 'depense') {
        stats.total_depenses += Math.abs(parseFloat(transaction.montant_total));
        stats.nombre_depenses++;
      }
    });

    stats.solde = stats.total_recettes - stats.total_depenses;

    return { data: stats, error: null };
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error);
    return { data: null, error };
  }
};

// Récupérer les catégories
export const getCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('ordre', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return { data: null, error };
  }
};

// Récupérer les comptes bancaires
export const getComptesBancaires = async (entrepriseId) => {
  try {
    const { data, error } = await supabase
      .from('comptes_bancaires')
      .select('*')
      .eq('entreprise_id', entrepriseId)
      .eq('actif', true)
      .order('nom_banque', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Erreur lors de la récupération des comptes bancaires:', error);
    return { data: null, error };
  }
};

// Uploader un justificatif
export const uploadJustificatif = async (transactionId, file) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${transactionId}_${Date.now()}.${fileExt}`;
    const filePath = `justificatifs/${fileName}`;

    // Upload fichier vers Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Récupérer l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);

    // Enregistrer dans la base de données
    const { data, error } = await supabase
      .from('justificatifs')
      .insert([{
        transaction_id: transactionId,
        nom_fichier: file.name,
        type_fichier: file.type,
        taille_fichier: file.size,
        url_stockage: publicUrl
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Erreur lors de l\'upload du justificatif:', error);
    return { data: null, error };
  }
};
