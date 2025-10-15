-- ============================================
-- CRÉATION DU BUCKET STORAGE POUR LES JUSTIFICATIFS
-- ============================================

-- Créer le bucket 'documents' s'il n'existe pas
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Politique pour permettre aux utilisateurs de télécharger leurs propres fichiers
CREATE POLICY "Users can upload their own documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Politique pour permettre aux utilisateurs de voir leurs propres fichiers
CREATE POLICY "Users can view their own documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Politique pour permettre aux utilisateurs de supprimer leurs propres fichiers
CREATE POLICY "Users can delete their own documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- OU SI VOUS VOULEZ UN BUCKET PUBLIC (plus simple pour commencer) :
-- Supprimer les politiques ci-dessus et créer ces politiques plus permissives:

DROP POLICY IF EXISTS "Users can upload their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own documents" ON storage.objects;

CREATE POLICY "Public Access"
ON storage.objects FOR ALL
USING (bucket_id = 'documents');
