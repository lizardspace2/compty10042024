import { supabase } from '../supabaseClient';

/**
 * Récupère tous les exercices fiscaux d'une entreprise
 * @param {string} entrepriseId - ID de l'entreprise
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export const getExercicesFiscaux = async (entrepriseId) => {
  try {
    const { data, error } = await supabase
      .from('exercices_fiscaux')
      .select('*')
      .eq('entreprise_id', entrepriseId)
      .order('annee', { ascending: false });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération des exercices fiscaux:', err);
    return { data: null, error: err };
  }
};

/**
 * Récupère un exercice fiscal par son ID
 * @param {string} exerciceId - ID de l'exercice fiscal
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getExerciceFiscal = async (exerciceId) => {
  try {
    const { data, error } = await supabase
      .from('exercices_fiscaux')
      .select('*')
      .eq('id', exerciceId)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'exercice fiscal:', err);
    return { data: null, error: err };
  }
};

/**
 * Récupère l'exercice fiscal en cours d'une entreprise
 * @param {string} entrepriseId - ID de l'entreprise
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getExerciceFiscalEnCours = async (entrepriseId) => {
  try {
    const { data, error } = await supabase
      .from('exercices_fiscaux')
      .select('*')
      .eq('entreprise_id', entrepriseId)
      .eq('statut', 'en_cours')
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned
      throw error;
    }

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'exercice fiscal en cours:', err);
    return { data: null, error: err };
  }
};

/**
 * Récupère l'exercice fiscal pour une année donnée
 * @param {string} entrepriseId - ID de l'entreprise
 * @param {number} annee - Année de l'exercice
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getExerciceFiscalParAnnee = async (entrepriseId, annee) => {
  try {
    const { data, error } = await supabase
      .from('exercices_fiscaux')
      .select('*')
      .eq('entreprise_id', entrepriseId)
      .eq('annee', annee)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'exercice fiscal par année:', err);
    return { data: null, error: err };
  }
};

/**
 * Crée un nouvel exercice fiscal
 * @param {string} entrepriseId - ID de l'entreprise
 * @param {Object} exerciceData - Données de l'exercice fiscal
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const createExerciceFiscal = async (entrepriseId, exerciceData) => {
  try {
    const { data, error } = await supabase
      .from('exercices_fiscaux')
      .insert([{
        entreprise_id: entrepriseId,
        ...exerciceData
      }])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la création de l\'exercice fiscal:', err);
    return { data: null, error: err };
  }
};

/**
 * Met à jour un exercice fiscal
 * @param {string} exerciceId - ID de l'exercice fiscal
 * @param {Object} updates - Données à mettre à jour
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const updateExerciceFiscal = async (exerciceId, updates) => {
  try {
    const { data, error } = await supabase
      .from('exercices_fiscaux')
      .update(updates)
      .eq('id', exerciceId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'exercice fiscal:', err);
    return { data: null, error: err };
  }
};

/**
 * Clôture un exercice fiscal
 * @param {string} exerciceId - ID de l'exercice fiscal
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const cloturerExerciceFiscal = async (exerciceId) => {
  try {
    const { data, error } = await supabase
      .from('exercices_fiscaux')
      .update({ statut: 'cloture' })
      .eq('id', exerciceId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la clôture de l\'exercice fiscal:', err);
    return { data: null, error: err };
  }
};

/**
 * Valide un exercice fiscal
 * @param {string} exerciceId - ID de l'exercice fiscal
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const validerExerciceFiscal = async (exerciceId) => {
  try {
    const { data, error } = await supabase
      .from('exercices_fiscaux')
      .update({ statut: 'valide' })
      .eq('id', exerciceId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la validation de l\'exercice fiscal:', err);
    return { data: null, error: err };
  }
};

/**
 * Supprime un exercice fiscal
 * @param {string} exerciceId - ID de l'exercice fiscal
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const deleteExerciceFiscal = async (exerciceId) => {
  try {
    const { error } = await supabase
      .from('exercices_fiscaux')
      .delete()
      .eq('id', exerciceId);

    if (error) throw error;

    return { data: { success: true }, error: null };
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'exercice fiscal:', err);
    return { data: null, error: err };
  }
};

/**
 * Crée automatiquement un exercice fiscal pour l'année en cours
 * @param {string} entrepriseId - ID de l'entreprise
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const createExerciceAnnuel = async (entrepriseId) => {
  try {
    const anneeEnCours = new Date().getFullYear();

    // Vérifier si l'exercice existe déjà
    const { data: existingExercice } = await getExerciceFiscalParAnnee(entrepriseId, anneeEnCours);

    if (existingExercice) {
      return { data: existingExercice, error: null };
    }

    // Créer un nouvel exercice
    const exerciceData = {
      annee: anneeEnCours,
      date_debut: `${anneeEnCours}-01-01`,
      date_fin: `${anneeEnCours}-12-31`,
      statut: 'en_cours',
      revenus_etranger: false,
      activite_salariee: false
    };

    return await createExerciceFiscal(entrepriseId, exerciceData);
  } catch (err) {
    console.error('Erreur lors de la création de l\'exercice annuel:', err);
    return { data: null, error: err };
  }
};
