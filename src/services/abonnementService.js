import { supabase } from '../supabaseClient';

/**
 * Récupère l'abonnement actif de l'utilisateur
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getAbonnementActif = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('abonnements')
      .select('*')
      .eq('user_id', userId)
      .eq('statut', 'actif')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned
      throw error;
    }

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'abonnement actif:', err);
    return { data: null, error: err };
  }
};

/**
 * Récupère tous les abonnements de l'utilisateur
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export const getAbonnements = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('abonnements')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération des abonnements:', err);
    return { data: null, error: err };
  }
};

/**
 * Crée un nouvel abonnement
 * @param {string} userId - ID de l'utilisateur
 * @param {Object} abonnementData - Données de l'abonnement
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const createAbonnement = async (userId, abonnementData) => {
  try {
    const { data, error } = await supabase
      .from('abonnements')
      .insert([{
        user_id: userId,
        ...abonnementData
      }])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la création de l\'abonnement:', err);
    return { data: null, error: err };
  }
};

/**
 * Met à jour un abonnement
 * @param {string} abonnementId - ID de l'abonnement
 * @param {Object} updates - Données à mettre à jour
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const updateAbonnement = async (abonnementId, updates) => {
  try {
    const { data, error } = await supabase
      .from('abonnements')
      .update(updates)
      .eq('id', abonnementId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'abonnement:', err);
    return { data: null, error: err };
  }
};

/**
 * Annule un abonnement
 * @param {string} abonnementId - ID de l'abonnement
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const annulerAbonnement = async (abonnementId) => {
  try {
    const { data, error } = await supabase
      .from('abonnements')
      .update({ statut: 'annule', auto_renouvellement: false })
      .eq('id', abonnementId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de l\'annulation de l\'abonnement:', err);
    return { data: null, error: err };
  }
};

/**
 * Réactive un abonnement
 * @param {string} abonnementId - ID de l'abonnement
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const reactiverAbonnement = async (abonnementId) => {
  try {
    const { data, error } = await supabase
      .from('abonnements')
      .update({ statut: 'actif', auto_renouvellement: true })
      .eq('id', abonnementId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la réactivation de l\'abonnement:', err);
    return { data: null, error: err };
  }
};

/**
 * Récupère toutes les factures d'un abonnement
 * @param {string} abonnementId - ID de l'abonnement
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export const getFactures = async (abonnementId) => {
  try {
    const { data, error } = await supabase
      .from('factures')
      .select('*')
      .eq('abonnement_id', abonnementId)
      .order('date_facture', { ascending: false });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération des factures:', err);
    return { data: null, error: err };
  }
};

/**
 * Récupère toutes les factures d'un utilisateur (tous abonnements confondus)
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export const getFacturesUtilisateur = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('factures')
      .select(`
        *,
        abonnements (
          type_abonnement,
          user_id
        )
      `)
      .eq('abonnements.user_id', userId)
      .order('date_facture', { ascending: false });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération des factures utilisateur:', err);
    return { data: null, error: err };
  }
};

/**
 * Crée une nouvelle facture
 * @param {string} abonnementId - ID de l'abonnement
 * @param {Object} factureData - Données de la facture
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const createFacture = async (abonnementId, factureData) => {
  try {
    const { data, error } = await supabase
      .from('factures')
      .insert([{
        abonnement_id: abonnementId,
        ...factureData
      }])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la création de la facture:', err);
    return { data: null, error: err };
  }
};

/**
 * Marque une facture comme payée
 * @param {string} factureId - ID de la facture
 * @param {string} datePaiement - Date du paiement (YYYY-MM-DD)
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const marquerFacturePayee = async (factureId, datePaiement = null) => {
  try {
    const date = datePaiement || new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('factures')
      .update({
        statut: 'payee',
        date_paiement: date
      })
      .eq('id', factureId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors du marquage de la facture comme payée:', err);
    return { data: null, error: err };
  }
};

/**
 * Vérifie si l'utilisateur a un abonnement actif
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<{hasActiveSubscription: boolean, subscriptionType: string|null, error: Error|null}>}
 */
export const checkAbonnementActif = async (userId) => {
  try {
    const { data, error } = await getAbonnementActif(userId);

    if (error) throw error;

    return {
      hasActiveSubscription: !!data,
      subscriptionType: data?.type_abonnement || null,
      error: null
    };
  } catch (err) {
    console.error('Erreur lors de la vérification de l\'abonnement:', err);
    return {
      hasActiveSubscription: false,
      subscriptionType: null,
      error: err
    };
  }
};

/**
 * Récupère les informations de parrainage de l'utilisateur
 * @param {string} userId - ID de l'utilisateur (parrain)
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export const getParrainages = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('parrainage')
      .select('*')
      .eq('parrain_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération des parrainages:', err);
    return { data: null, error: err };
  }
};

/**
 * Crée une invitation de parrainage
 * @param {string} parrainId - ID du parrain
 * @param {string} filleulEmail - Email du filleul
 * @param {string} codeParrainage - Code de parrainage unique
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const createParrainage = async (parrainId, filleulEmail, codeParrainage) => {
  try {
    const { data, error } = await supabase
      .from('parrainage')
      .insert([{
        parrain_id: parrainId,
        filleul_email: filleulEmail,
        code_parrainage: codeParrainage,
        statut: 'invite'
      }])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la création du parrainage:', err);
    return { data: null, error: err };
  }
};

/**
 * Génère un code de parrainage unique
 * @param {string} userId - ID de l'utilisateur
 * @returns {string} Code de parrainage
 */
export const generateCodeParrainage = (userId) => {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  const userPart = userId.substring(0, 4).toUpperCase();
  return `${userPart}${randomPart}`;
};
