import { supabase } from '../supabaseClient';

/**
 * Récupère toutes les tâches d'une entreprise
 * @param {string} entrepriseId - ID de l'entreprise
 * @param {Object} filters - Filtres optionnels
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export const getTaches = async (entrepriseId, filters = {}) => {
  try {
    let query = supabase
      .from('taches')
      .select('*')
      .eq('entreprise_id', entrepriseId);

    if (filters.statut) {
      query = query.eq('statut', filters.statut);
    }

    if (filters.priorite) {
      query = query.eq('priorite', filters.priorite);
    }

    if (filters.categorie) {
      query = query.eq('categorie', filters.categorie);
    }

    if (filters.exercice_fiscal_id) {
      query = query.eq('exercice_fiscal_id', filters.exercice_fiscal_id);
    }

    query = query.order('ordre', { ascending: true });

    const { data, error } = await query;

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération des tâches:', err);
    return { data: null, error: err };
  }
};

/**
 * Récupère une tâche par son ID
 * @param {string} tacheId - ID de la tâche
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getTache = async (tacheId) => {
  try {
    const { data, error } = await supabase
      .from('taches')
      .select('*')
      .eq('id', tacheId)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération de la tâche:', err);
    return { data: null, error: err };
  }
};

/**
 * Récupère les tâches à venir (non terminées avec échéance proche)
 * @param {string} entrepriseId - ID de l'entreprise
 * @param {number} jours - Nombre de jours à regarder en avance
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export const getTachesAVenir = async (entrepriseId, jours = 30) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + jours);
    const futureDateStr = futureDate.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('taches')
      .select('*')
      .eq('entreprise_id', entrepriseId)
      .in('statut', ['a_faire', 'en_cours'])
      .gte('date_echeance', today)
      .lte('date_echeance', futureDateStr)
      .order('date_echeance', { ascending: true });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération des tâches à venir:', err);
    return { data: null, error: err };
  }
};

/**
 * Récupère les tâches en retard
 * @param {string} entrepriseId - ID de l'entreprise
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export const getTachesEnRetard = async (entrepriseId) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('taches')
      .select('*')
      .eq('entreprise_id', entrepriseId)
      .in('statut', ['a_faire', 'en_cours'])
      .lt('date_echeance', today)
      .order('date_echeance', { ascending: true });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération des tâches en retard:', err);
    return { data: null, error: err };
  }
};

/**
 * Crée une nouvelle tâche
 * @param {string} entrepriseId - ID de l'entreprise
 * @param {Object} tacheData - Données de la tâche
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const createTache = async (entrepriseId, tacheData) => {
  try {
    // Récupérer le dernier ordre
    const { data: existingTaches } = await supabase
      .from('taches')
      .select('ordre')
      .eq('entreprise_id', entrepriseId)
      .order('ordre', { ascending: false })
      .limit(1);

    const nextOrdre = existingTaches && existingTaches.length > 0
      ? (existingTaches[0].ordre || 0) + 1
      : 1;

    const { data, error } = await supabase
      .from('taches')
      .insert([{
        entreprise_id: entrepriseId,
        ordre: nextOrdre,
        ...tacheData
      }])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la création de la tâche:', err);
    return { data: null, error: err };
  }
};

/**
 * Met à jour une tâche
 * @param {string} tacheId - ID de la tâche
 * @param {Object} updates - Données à mettre à jour
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const updateTache = async (tacheId, updates) => {
  try {
    const { data, error } = await supabase
      .from('taches')
      .update(updates)
      .eq('id', tacheId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la mise à jour de la tâche:', err);
    return { data: null, error: err };
  }
};

/**
 * Marque une tâche comme terminée
 * @param {string} tacheId - ID de la tâche
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const terminerTache = async (tacheId) => {
  try {
    const { data, error } = await supabase
      .from('taches')
      .update({ statut: 'terminee' })
      .eq('id', tacheId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la finalisation de la tâche:', err);
    return { data: null, error: err };
  }
};

/**
 * Annule une tâche
 * @param {string} tacheId - ID de la tâche
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const annulerTache = async (tacheId) => {
  try {
    const { data, error } = await supabase
      .from('taches')
      .update({ statut: 'annulee' })
      .eq('id', tacheId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de l\'annulation de la tâche:', err);
    return { data: null, error: err };
  }
};

/**
 * Supprime une tâche
 * @param {string} tacheId - ID de la tâche
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const deleteTache = async (tacheId) => {
  try {
    const { error } = await supabase
      .from('taches')
      .delete()
      .eq('id', tacheId);

    if (error) throw error;

    return { data: { success: true }, error: null };
  } catch (err) {
    console.error('Erreur lors de la suppression de la tâche:', err);
    return { data: null, error: err };
  }
};

/**
 * Réordonne les tâches
 * @param {Array<{id: string, ordre: number}>} taches - Liste des tâches avec leur nouvel ordre
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const reordonnerTaches = async (taches) => {
  try {
    const updates = taches.map(tache =>
      supabase
        .from('taches')
        .update({ ordre: tache.ordre })
        .eq('id', tache.id)
    );

    await Promise.all(updates);

    return { data: { success: true }, error: null };
  } catch (err) {
    console.error('Erreur lors du réordonnancement des tâches:', err);
    return { data: null, error: err };
  }
};

/**
 * Récupère les statistiques des tâches
 * @param {string} entrepriseId - ID de l'entreprise
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getTachesStats = async (entrepriseId) => {
  try {
    const { data, error } = await supabase
      .from('taches')
      .select('statut')
      .eq('entreprise_id', entrepriseId);

    if (error) throw error;

    const stats = {
      total: data.length,
      a_faire: data.filter(t => t.statut === 'a_faire').length,
      en_cours: data.filter(t => t.statut === 'en_cours').length,
      terminee: data.filter(t => t.statut === 'terminee').length,
      annulee: data.filter(t => t.statut === 'annulee').length
    };

    return { data: stats, error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération des statistiques:', err);
    return { data: null, error: err };
  }
};
