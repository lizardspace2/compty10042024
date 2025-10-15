import { supabase } from '../supabaseClient';

/**
 * Récupère l'entreprise de l'utilisateur connecté
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getEntreprise = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('entreprises')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned
      throw error;
    }

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'entreprise:', err);
    return { data: null, error: err };
  }
};

/**
 * Crée une nouvelle entreprise
 * @param {Object} entrepriseData - Données de l'entreprise
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const createEntreprise = async (entrepriseData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Utilisateur non connecté');
    }

    const { data, error } = await supabase
      .from('entreprises')
      .insert([{
        ...entrepriseData,
        user_id: user.id
      }])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la création de l\'entreprise:', err);
    return { data: null, error: err };
  }
};

/**
 * Met à jour une entreprise existante
 * @param {string} entrepriseId - ID de l'entreprise
 * @param {Object} updates - Données à mettre à jour
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const updateEntreprise = async (entrepriseId, updates) => {
  try {
    const { data, error } = await supabase
      .from('entreprises')
      .update(updates)
      .eq('id', entrepriseId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'entreprise:', err);
    return { data: null, error: err };
  }
};

/**
 * Supprime une entreprise
 * @param {string} entrepriseId - ID de l'entreprise
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const deleteEntreprise = async (entrepriseId) => {
  try {
    const { error } = await supabase
      .from('entreprises')
      .delete()
      .eq('id', entrepriseId);

    if (error) throw error;

    return { data: { success: true }, error: null };
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'entreprise:', err);
    return { data: null, error: err };
  }
};

/**
 * Vérifie si un SIRET existe déjà
 * @param {string} siret - Numéro SIRET
 * @param {string} excludeId - ID de l'entreprise à exclure (pour la mise à jour)
 * @returns {Promise<{exists: boolean, error: Error|null}>}
 */
export const checkSiretExists = async (siret, excludeId = null) => {
  try {
    let query = supabase
      .from('entreprises')
      .select('id')
      .eq('siret', siret);

    if (excludeId) {
      query = query.neq('id', excludeId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return { exists: data && data.length > 0, error: null };
  } catch (err) {
    console.error('Erreur lors de la vérification du SIRET:', err);
    return { exists: false, error: err };
  }
};
