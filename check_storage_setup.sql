-- ============================================
-- VÉRIFICATION DE LA CONFIGURATION STORAGE
-- ============================================

-- 1. Vérifier si le bucket 'documents' existe
-- ============================================
SELECT
    id,
    name,
    public,
    created_at
FROM storage.buckets
WHERE name = 'documents';

-- Si cette requête retourne une ligne, le bucket existe déjà ✅
-- Si elle ne retourne rien, exécutez la commande ci-dessous

-- 2. Créer le bucket uniquement s'il n'existe pas
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Vérifier les politiques existantes sur storage.objects
-- ============================================
SELECT
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects'
AND qual LIKE '%documents%'
ORDER BY policyname;

-- 4. Si la politique "Public Access" existe déjà, pas besoin d'en créer une nouvelle
-- Si elle n'existe pas, exécutez la commande ci-dessous:
-- ============================================

DO $$
BEGIN
    -- Vérifier si la politique existe
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'storage'
        AND tablename = 'objects'
        AND policyname = 'Public Access'
    ) THEN
        -- Créer la politique si elle n'existe pas
        CREATE POLICY "Public Access"
        ON storage.objects FOR ALL
        USING (bucket_id = 'documents');

        RAISE NOTICE 'Politique "Public Access" créée avec succès';
    ELSE
        RAISE NOTICE 'Politique "Public Access" existe déjà';
    END IF;
END $$;

-- 5. Résumé de la configuration
-- ============================================
SELECT
    'Bucket documents' as element,
    CASE
        WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE name = 'documents')
        THEN '✅ Configuré'
        ELSE '❌ Non configuré'
    END as statut
UNION ALL
SELECT
    'Politique Public Access' as element,
    CASE
        WHEN EXISTS (
            SELECT 1 FROM pg_policies
            WHERE schemaname = 'storage'
            AND tablename = 'objects'
            AND policyname = 'Public Access'
        )
        THEN '✅ Configuré'
        ELSE '❌ Non configuré'
    END as statut;
