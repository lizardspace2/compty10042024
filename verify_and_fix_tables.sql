-- ============================================
-- VÉRIFICATION ET CORRECTION DES TABLES
-- ============================================

-- 1. Vérifier/Créer la table JUSTIFICATIFS
-- ============================================
CREATE TABLE IF NOT EXISTS justificatifs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    nom_fichier TEXT NOT NULL,
    type_fichier VARCHAR(50),
    taille_fichier INTEGER,
    url_stockage TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_justificatifs_transaction_id ON justificatifs(transaction_id);

-- 2. Vérifier/Créer la table VENTILATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS ventilations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    categorie_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    categorie_nom TEXT,
    montant DECIMAL(12, 2) NOT NULL,
    pourcentage DECIMAL(5, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_ventilations_transaction_id ON ventilations(transaction_id);
CREATE INDEX IF NOT EXISTS idx_ventilations_categorie_id ON ventilations(categorie_id);

-- 3. ACTIVER RLS (Row Level Security)
-- ============================================
ALTER TABLE justificatifs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ventilations ENABLE ROW LEVEL SECURITY;

-- 4. POLITIQUES RLS POUR JUSTIFICATIFS
-- ============================================

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can view own justificatifs" ON justificatifs;
DROP POLICY IF EXISTS "Users can insert own justificatifs" ON justificatifs;
DROP POLICY IF EXISTS "Users can update own justificatifs" ON justificatifs;
DROP POLICY IF EXISTS "Users can delete own justificatifs" ON justificatifs;

-- Politique SELECT
CREATE POLICY "Users can view own justificatifs" ON justificatifs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM transactions
            JOIN entreprises ON entreprises.id = transactions.entreprise_id
            WHERE transactions.id = justificatifs.transaction_id
            AND entreprises.user_id = auth.uid()
        )
    );

-- Politique INSERT
CREATE POLICY "Users can insert own justificatifs" ON justificatifs
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM transactions
            JOIN entreprises ON entreprises.id = transactions.entreprise_id
            WHERE transactions.id = justificatifs.transaction_id
            AND entreprises.user_id = auth.uid()
        )
    );

-- Politique UPDATE
CREATE POLICY "Users can update own justificatifs" ON justificatifs
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM transactions
            JOIN entreprises ON entreprises.id = transactions.entreprise_id
            WHERE transactions.id = justificatifs.transaction_id
            AND entreprises.user_id = auth.uid()
        )
    );

-- Politique DELETE
CREATE POLICY "Users can delete own justificatifs" ON justificatifs
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM transactions
            JOIN entreprises ON entreprises.id = transactions.entreprise_id
            WHERE transactions.id = justificatifs.transaction_id
            AND entreprises.user_id = auth.uid()
        )
    );

-- 5. POLITIQUES RLS POUR VENTILATIONS
-- ============================================

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can view own ventilations" ON ventilations;
DROP POLICY IF EXISTS "Users can insert own ventilations" ON ventilations;
DROP POLICY IF EXISTS "Users can update own ventilations" ON ventilations;
DROP POLICY IF EXISTS "Users can delete own ventilations" ON ventilations;

-- Politique SELECT
CREATE POLICY "Users can view own ventilations" ON ventilations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM transactions
            JOIN entreprises ON entreprises.id = transactions.entreprise_id
            WHERE transactions.id = ventilations.transaction_id
            AND entreprises.user_id = auth.uid()
        )
    );

-- Politique INSERT
CREATE POLICY "Users can insert own ventilations" ON ventilations
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM transactions
            JOIN entreprises ON entreprises.id = transactions.entreprise_id
            WHERE transactions.id = ventilations.transaction_id
            AND entreprises.user_id = auth.uid()
        )
    );

-- Politique UPDATE
CREATE POLICY "Users can update own ventilations" ON ventilations
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM transactions
            JOIN entreprises ON entreprises.id = transactions.entreprise_id
            WHERE transactions.id = ventilations.transaction_id
            AND entreprises.user_id = auth.uid()
        )
    );

-- Politique DELETE
CREATE POLICY "Users can delete own ventilations" ON ventilations
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM transactions
            JOIN entreprises ON entreprises.id = transactions.entreprise_id
            WHERE transactions.id = ventilations.transaction_id
            AND entreprises.user_id = auth.uid()
        )
    );

-- 6. VÉRIFICATION DES DONNÉES
-- ============================================

-- Vérifier les transactions sans ventilations
SELECT
    t.id,
    t.libelle,
    t.montant_total,
    COUNT(v.id) as nb_ventilations
FROM transactions t
LEFT JOIN ventilations v ON v.transaction_id = t.id
GROUP BY t.id, t.libelle, t.montant_total
HAVING COUNT(v.id) = 0;

-- Commentaire : Les transactions ci-dessus n'ont pas de ventilations
-- C'est normal si elles ont été créées avant la mise en place du système

-- 7. COMMENTAIRES SUR LES TABLES
-- ============================================
COMMENT ON TABLE justificatifs IS 'Documents justificatifs attachés aux transactions (factures, reçus, etc.)';
COMMENT ON TABLE ventilations IS 'Répartition catégorielle des montants de chaque transaction';
COMMENT ON COLUMN justificatifs.url_stockage IS 'URL Supabase Storage du fichier justificatif';
COMMENT ON COLUMN ventilations.categorie_nom IS 'Nom de la catégorie sauvegardé pour historique';
COMMENT ON COLUMN ventilations.pourcentage IS 'Pourcentage du montant total de la transaction';
