import { supabase } from '../supabaseClient';

/**
 * Récupère le profil de l'utilisateur connecté
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned
      throw error;
    }

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération du profil:', err);
    return { data: null, error: err };
  }
};

/**
 * Crée un nouveau profil utilisateur
 * @param {Object} profileData - Données du profil
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const createProfile = async (profileData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Utilisateur non connecté');
    }

    const { data, error } = await supabase
      .from('profiles')
      .insert([{
        id: user.id,
        email: user.email,
        ...profileData
      }])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la création du profil:', err);
    return { data: null, error: err };
  }
};

/**
 * Met à jour le profil utilisateur
 * @param {string} userId - ID de l'utilisateur
 * @param {Object} updates - Données à mettre à jour
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const updateProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la mise à jour du profil:', err);
    return { data: null, error: err };
  }
};

/**
 * Télécharge l'avatar de l'utilisateur
 * @param {File} file - Fichier image
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<{url: string|null, error: Error|null}>}
 */
export const uploadAvatar = async (file, userId) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return { url: publicUrl, error: null };
  } catch (err) {
    console.error('Erreur lors du téléchargement de l\'avatar:', err);
    return { url: null, error: err };
  }
};

/**
 * Supprime l'avatar de l'utilisateur
 * @param {string} avatarPath - Chemin de l'avatar
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const deleteAvatar = async (avatarPath) => {
  try {
    const path = avatarPath.split('/avatars/')[1];

    const { error } = await supabase.storage
      .from('avatars')
      .remove([`avatars/${path}`]);

    if (error) throw error;

    return { success: true, error: null };
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'avatar:', err);
    return { success: false, error: err };
  }
};
