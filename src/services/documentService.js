import { supabase } from '../supabaseClient';

/**
 * Récupère tous les documents d'une entreprise
 * @param {string} entrepriseId - ID de l'entreprise
 * @param {Object} filters - Filtres optionnels
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export const getDocuments = async (entrepriseId, filters = {}) => {
  try {
    let query = supabase
      .from('documents')
      .select('*')
      .eq('entreprise_id', entrepriseId);

    if (filters.type_document) {
      query = query.eq('type_document', filters.type_document);
    }

    if (filters.categorie) {
      query = query.eq('categorie', filters.categorie);
    }

    if (filters.exercice_fiscal_id) {
      query = query.eq('exercice_fiscal_id', filters.exercice_fiscal_id);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération des documents:', err);
    return { data: null, error: err };
  }
};

/**
 * Récupère un document par son ID
 * @param {string} documentId - ID du document
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getDocument = async (documentId) => {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération du document:', err);
    return { data: null, error: err };
  }
};

/**
 * Upload un fichier dans Supabase Storage
 * @param {File} file - Fichier à uploader
 * @param {string} bucket - Nom du bucket
 * @param {string} path - Chemin dans le bucket
 * @returns {Promise<{url: string|null, error: Error|null}>}
 */
export const uploadFile = async (file, bucket = 'documents', path = '') => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = path ? `${path}/${fileName}` : fileName;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return { url: publicUrl, path: filePath, error: null };
  } catch (err) {
    console.error('Erreur lors de l\'upload du fichier:', err);
    return { url: null, path: null, error: err };
  }
};

/**
 * Crée un nouveau document
 * @param {string} entrepriseId - ID de l'entreprise
 * @param {Object} documentData - Données du document
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const createDocument = async (entrepriseId, documentData) => {
  try {
    const { data, error } = await supabase
      .from('documents')
      .insert([{
        entreprise_id: entrepriseId,
        ...documentData
      }])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la création du document:', err);
    return { data: null, error: err };
  }
};

/**
 * Upload et crée un document
 * @param {string} entrepriseId - ID de l'entreprise
 * @param {File} file - Fichier à uploader
 * @param {Object} metadata - Métadonnées du document
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const uploadAndCreateDocument = async (entrepriseId, file, metadata = {}) => {
  try {
    // Upload le fichier
    const { url, path, error: uploadError } = await uploadFile(
      file,
      'documents',
      `entreprise_${entrepriseId}`
    );

    if (uploadError) throw uploadError;

    // Créer le document dans la base de données
    const documentData = {
      nom: metadata.nom || file.name,
      type_document: metadata.type_document || 'autre',
      categorie: metadata.categorie,
      taille: file.size,
      format: file.type,
      url_stockage: url,
      tags: metadata.tags || [],
      exercice_fiscal_id: metadata.exercice_fiscal_id
    };

    const result = await createDocument(entrepriseId, documentData);

    return result;
  } catch (err) {
    console.error('Erreur lors de l\'upload et création du document:', err);
    return { data: null, error: err };
  }
};

/**
 * Met à jour un document
 * @param {string} documentId - ID du document
 * @param {Object} updates - Données à mettre à jour
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const updateDocument = async (documentId, updates) => {
  try {
    const { data, error } = await supabase
      .from('documents')
      .update(updates)
      .eq('id', documentId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Erreur lors de la mise à jour du document:', err);
    return { data: null, error: err };
  }
};

/**
 * Supprime un document (fichier + entrée DB)
 * @param {string} documentId - ID du document
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const deleteDocument = async (documentId) => {
  try {
    // Récupérer le document pour obtenir l'URL
    const { data: document, error: fetchError } = await getDocument(documentId);
    if (fetchError) throw fetchError;

    // Extraire le path du fichier depuis l'URL
    const url = document.url_stockage;
    const path = url.split('/documents/')[1];

    // Supprimer le fichier du storage
    if (path) {
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([path]);

      if (storageError) console.error('Erreur lors de la suppression du fichier:', storageError);
    }

    // Supprimer l'entrée de la base de données
    const { error: deleteError } = await supabase
      .from('documents')
      .delete()
      .eq('id', documentId);

    if (deleteError) throw deleteError;

    return { data: { success: true }, error: null };
  } catch (err) {
    console.error('Erreur lors de la suppression du document:', err);
    return { data: null, error: err };
  }
};

/**
 * Télécharge un document
 * @param {string} url - URL du document
 * @returns {Promise<{blob: Blob|null, error: Error|null}>}
 */
export const downloadDocument = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return { blob, error: null };
  } catch (err) {
    console.error('Erreur lors du téléchargement du document:', err);
    return { blob: null, error: err };
  }
};

/**
 * Recherche des documents par tags
 * @param {string} entrepriseId - ID de l'entreprise
 * @param {Array<string>} tags - Tags à rechercher
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export const searchDocumentsByTags = async (entrepriseId, tags) => {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('entreprise_id', entrepriseId)
      .contains('tags', tags)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (err) {
    console.error('Erreur lors de la recherche de documents par tags:', err);
    return { data: null, error: err };
  }
};
