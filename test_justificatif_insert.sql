-- ============================================
-- TEST: INSERTION MANUELLE D'UN JUSTIFICATIF
-- ============================================

-- 1. Récupérer l'ID d'une transaction récente
-- ============================================
SELECT
    id,
    libelle,
    created_at
FROM transactions
ORDER BY created_at DESC
LIMIT 5;

-- 2. Insérer un justificatif de test (REMPLACER transaction_id par un vrai ID ci-dessus)
-- ============================================
-- Décommentez et modifiez la ligne ci-dessous avec un vrai transaction_id
/*
INSERT INTO justificatifs (
    transaction_id,
    nom_fichier,
    type_fichier,
    taille_fichier,
    url_stockage
) VALUES (
    'REMPLACER_PAR_UN_VRAI_ID',  -- Remplacer par un ID de transaction ci-dessus
    'test_fichier.pdf',
    'application/pdf',
    1024,
    'https://test.com/fichier.pdf'
);
*/

-- 3. Vérifier que le justificatif a été inséré
-- ============================================
SELECT
    j.*,
    t.libelle
FROM justificatifs j
JOIN transactions t ON t.id = j.transaction_id
ORDER BY j.created_at DESC
LIMIT 1;
