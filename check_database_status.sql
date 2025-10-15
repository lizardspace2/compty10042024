-- ============================================
-- VÉRIFICATION DE L'ÉTAT DE LA BASE DE DONNÉES
-- ============================================

-- 1. Vérifier si les tables existent
-- ============================================
SELECT
    schemaname,
    tablename
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('transactions', 'ventilations', 'justificatifs', 'entreprises')
ORDER BY tablename;

-- 2. Vérifier la structure de la table justificatifs
-- ============================================
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'justificatifs'
ORDER BY ordinal_position;

-- 3. Vérifier la structure de la table ventilations
-- ============================================
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'ventilations'
ORDER BY ordinal_position;

-- 4. Vérifier les relations (foreign keys)
-- ============================================
SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_name IN ('justificatifs', 'ventilations')
ORDER BY tc.table_name;

-- 5. Vérifier les politiques RLS
-- ============================================
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename IN ('justificatifs', 'ventilations')
ORDER BY tablename, policyname;

-- 6. Compter les données actuelles
-- ============================================
SELECT
    'transactions' as table_name,
    COUNT(*) as row_count
FROM transactions
UNION ALL
SELECT
    'ventilations' as table_name,
    COUNT(*) as row_count
FROM ventilations
UNION ALL
SELECT
    'justificatifs' as table_name,
    COUNT(*) as row_count
FROM justificatifs;

-- 7. Vérifier les transactions avec/sans ventilations
-- ============================================
SELECT
    'Avec ventilations' as type,
    COUNT(DISTINCT t.id) as nb_transactions
FROM transactions t
INNER JOIN ventilations v ON v.transaction_id = t.id
UNION ALL
SELECT
    'Sans ventilations' as type,
    COUNT(DISTINCT t.id) as nb_transactions
FROM transactions t
LEFT JOIN ventilations v ON v.transaction_id = t.id
WHERE v.id IS NULL;

-- 8. Vérifier les transactions avec/sans justificatifs
-- ============================================
SELECT
    'Avec justificatifs' as type,
    COUNT(DISTINCT t.id) as nb_transactions
FROM transactions t
INNER JOIN justificatifs j ON j.transaction_id = t.id
UNION ALL
SELECT
    'Sans justificatifs' as type,
    COUNT(DISTINCT t.id) as nb_transactions
FROM transactions t
LEFT JOIN justificatifs j ON j.transaction_id = t.id
WHERE j.id IS NULL;

-- 9. Détail des transactions récentes avec leurs ventilations et justificatifs
-- ============================================
SELECT
    t.id,
    t.libelle,
    t.montant_total,
    t.date_transaction,
    COUNT(DISTINCT v.id) as nb_ventilations,
    COUNT(DISTINCT j.id) as nb_justificatifs,
    STRING_AGG(DISTINCT v.categorie_nom, ', ') as categories,
    STRING_AGG(DISTINCT j.nom_fichier, ', ') as fichiers
FROM transactions t
LEFT JOIN ventilations v ON v.transaction_id = t.id
LEFT JOIN justificatifs j ON j.transaction_id = t.id
GROUP BY t.id, t.libelle, t.montant_total, t.date_transaction
ORDER BY t.created_at DESC
LIMIT 10;

-- 10. Vérifier le bucket Storage
-- ============================================
SELECT
    id,
    name,
    public
FROM storage.buckets
WHERE name = 'documents';
