-- ============================================
-- DEBUG: VÉRIFICATION DES JUSTIFICATIFS
-- ============================================

-- 1. Vérifier combien de justificatifs existent dans la base
-- ============================================
SELECT COUNT(*) as total_justificatifs FROM justificatifs;

-- 2. Voir tous les justificatifs avec leurs transactions
-- ============================================
SELECT
    j.id as justificatif_id,
    j.transaction_id,
    j.nom_fichier,
    j.type_fichier,
    j.taille_fichier,
    j.url_stockage,
    j.created_at,
    t.libelle as transaction_libelle,
    t.montant_total,
    e.user_id
FROM justificatifs j
LEFT JOIN transactions t ON t.id = j.transaction_id
LEFT JOIN entreprises e ON e.id = t.entreprise_id
ORDER BY j.created_at DESC;

-- 3. Vérifier les politiques RLS sur justificatifs
-- ============================================
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE tablename = 'justificatifs'
ORDER BY policyname;

-- 4. Tester si RLS bloque l'accès
-- ============================================
-- Désactiver temporairement RLS pour tester (NE PAS FAIRE EN PRODUCTION)
-- ALTER TABLE justificatifs DISABLE ROW LEVEL SECURITY;

-- 5. Vérifier les fichiers dans le bucket Storage
-- ============================================
SELECT
    name,
    id,
    bucket_id,
    created_at,
    updated_at
FROM storage.objects
WHERE bucket_id = 'documents'
ORDER BY created_at DESC
LIMIT 10;

-- 6. Compter transactions avec/sans justificatifs
-- ============================================
SELECT
    CASE
        WHEN j.id IS NOT NULL THEN 'Avec justificatifs'
        ELSE 'Sans justificatifs'
    END as type,
    COUNT(DISTINCT t.id) as nb_transactions
FROM transactions t
LEFT JOIN justificatifs j ON j.transaction_id = t.id
GROUP BY CASE WHEN j.id IS NOT NULL THEN 'Avec justificatifs' ELSE 'Sans justificatifs' END;

-- 7. Vérifier les 5 dernières transactions créées
-- ============================================
SELECT
    t.id,
    t.libelle,
    t.created_at,
    COUNT(j.id) as nb_justificatifs,
    STRING_AGG(j.nom_fichier, ', ') as fichiers
FROM transactions t
LEFT JOIN justificatifs j ON j.transaction_id = t.id
GROUP BY t.id, t.libelle, t.created_at
ORDER BY t.created_at DESC
LIMIT 5;
