import { supabase } from '../supabaseClient';

/**
 * Récupère tous les comptes bancaires d'une entreprise
 * @param {string} entrepriseId - ID de l'entreprise
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export const getComptesBancaires = async (entrepriseId) => {
  try {
    const { data, error } = await supabase
      .from('comptes_bancaires')
      .select('*')
      .eq('entreprise_id', entrepriseId)
      .eq('actif', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération des comptes bancaires:', err);
    return { data: null, error: err };
  }
};

/**
 * Récupère un compte bancaire par son ID
 * @param {string} compteId - ID du compte bancaire
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getCompteBancaire = async (compteId) => {
  try {
    const { data, error } = await supabase
      .from('comptes_bancaires')
      .select('*')
      .eq('id', compteId)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération du compte bancaire:', err);
    return { data: null, error: err };
  }
};

/**
 * Crée un nouveau compte bancaire
 * @param {string} entrepriseId - ID de l'entreprise
 * @param {Object} compteData - Données du compte bancaire
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const createCompteBancaire = async (entrepriseId, compteData) => {
  try {
    const { data, error } = await supabase
      .from('comptes_bancaires')
      .insert([{
        entreprise_id: entrepriseId,
        ...compteData,
        solde_actuel: compteData.solde_initial || 0
      }])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la création du compte bancaire:', err);
    return { data: null, error: err };
  }
};

/**
 * Met à jour un compte bancaire
 * @param {string} compteId - ID du compte bancaire
 * @param {Object} updates - Données à mettre à jour
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const updateCompteBancaire = async (compteId, updates) => {
  try {
    const { data, error } = await supabase
      .from('comptes_bancaires')
      .update(updates)
      .eq('id', compteId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la mise à jour du compte bancaire:', err);
    return { data: null, error: err };
  }
};

/**
 * Désactive un compte bancaire (soft delete)
 * @param {string} compteId - ID du compte bancaire
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const desactiverCompteBancaire = async (compteId) => {
  try {
    const { data, error } = await supabase
      .from('comptes_bancaires')
      .update({ actif: false })
      .eq('id', compteId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la désactivation du compte bancaire:', err);
    return { data: null, error: err };
  }
};

/**
 * Réactive un compte bancaire
 * @param {string} compteId - ID du compte bancaire
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const reactiverCompteBancaire = async (compteId) => {
  try {
    const { data, error } = await supabase
      .from('comptes_bancaires')
      .update({ actif: true })
      .eq('id', compteId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la réactivation du compte bancaire:', err);
    return { data: null, error: err };
  }
};

/**
 * Supprime définitivement un compte bancaire
 * @param {string} compteId - ID du compte bancaire
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const deleteCompteBancaire = async (compteId) => {
  try {
    const { error } = await supabase
      .from('comptes_bancaires')
      .delete()
      .eq('id', compteId);

    if (error) throw error;

    return { data: { success: true }, error: null };
  } catch (err) {
    console.error('Erreur lors de la suppression du compte bancaire:', err);
    return { data: null, error: err };
  }
};

/**
 * Calcule le solde total de tous les comptes bancaires d'une entreprise
 * @param {string} entrepriseId - ID de l'entreprise
 * @returns {Promise<{total: number, error: Error|null}>}
 */
export const getTotalSoldes = async (entrepriseId) => {
  try {
    const { data, error } = await supabase
      .from('comptes_bancaires')
      .select('solde_actuel')
      .eq('entreprise_id', entrepriseId)
      .eq('actif', true);

    if (error) throw error;

    const total = data.reduce((sum, compte) => sum + parseFloat(compte.solde_actuel || 0), 0);

    return { total, error: null };
  } catch (err) {
    console.error('Erreur lors du calcul du solde total:', err);
    return { total: 0, error: err };
  }
};

/**
 * Met à jour le solde d'un compte bancaire
 * @param {string} compteId - ID du compte bancaire
 * @param {number} nouveauSolde - Nouveau solde
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const updateSolde = async (compteId, nouveauSolde) => {
  try {
    const { data, error } = await supabase
      .from('comptes_bancaires')
      .update({ solde_actuel: nouveauSolde })
      .eq('id', compteId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la mise à jour du solde:', err);
    return { data: null, error: err };
  }
};
