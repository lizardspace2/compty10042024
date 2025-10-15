-- ============================================
-- FIX RAPIDE: Politiques RLS pour la table ventilations
-- ============================================
-- Ce script corrige le problème "new row violates row-level security policy"
-- pour la table ventilations
-- ============================================

-- Politiques pour ventilations (via transactions)
DO $$
BEGIN
    -- Politique SELECT
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'ventilations' AND policyname = 'Users can view own ventilations'
    ) THEN
        CREATE POLICY "Users can view own ventilations" ON ventilations
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM transactions
                    JOIN entreprises ON entreprises.id = transactions.entreprise_id
                    WHERE transactions.id = ventilations.transaction_id
                    AND entreprises.user_id = auth.uid()
                )
            );
        RAISE NOTICE 'Politique SELECT créée pour ventilations';
    ELSE
        RAISE NOTICE 'Politique SELECT existe déjà pour ventilations';
    END IF;

    -- Politique INSERT
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'ventilations' AND policyname = 'Users can insert own ventilations'
    ) THEN
        CREATE POLICY "Users can insert own ventilations" ON ventilations
            FOR INSERT WITH CHECK (
                EXISTS (
                    SELECT 1 FROM transactions
                    JOIN entreprises ON entreprises.id = transactions.entreprise_id
                    WHERE transactions.id = ventilations.transaction_id
                    AND entreprises.user_id = auth.uid()
                )
            );
        RAISE NOTICE 'Politique INSERT créée pour ventilations';
    ELSE
        RAISE NOTICE 'Politique INSERT existe déjà pour ventilations';
    END IF;

    -- Politique UPDATE
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'ventilations' AND policyname = 'Users can update own ventilations'
    ) THEN
        CREATE POLICY "Users can update own ventilations" ON ventilations
            FOR UPDATE USING (
                EXISTS (
                    SELECT 1 FROM transactions
                    JOIN entreprises ON entreprises.id = transactions.entreprise_id
                    WHERE transactions.id = ventilations.transaction_id
                    AND entreprises.user_id = auth.uid()
                )
            );
        RAISE NOTICE 'Politique UPDATE créée pour ventilations';
    ELSE
        RAISE NOTICE 'Politique UPDATE existe déjà pour ventilations';
    END IF;

    -- Politique DELETE
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'ventilations' AND policyname = 'Users can delete own ventilations'
    ) THEN
        CREATE POLICY "Users can delete own ventilations" ON ventilations
            FOR DELETE USING (
                EXISTS (
                    SELECT 1 FROM transactions
                    JOIN entreprises ON entreprises.id = transactions.entreprise_id
                    WHERE transactions.id = ventilations.transaction_id
                    AND entreprises.user_id = auth.uid()
                )
            );
        RAISE NOTICE 'Politique DELETE créée pour ventilations';
    ELSE
        RAISE NOTICE 'Politique DELETE existe déjà pour ventilations';
    END IF;

    RAISE NOTICE '✅ Politiques RLS pour ventilations configurées avec succès!';
END $$;

-- Vérifier que RLS est activé sur la table ventilations
ALTER TABLE ventilations ENABLE ROW LEVEL SECURITY;

-- Afficher toutes les politiques de la table ventilations
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE tablename = 'ventilations'
ORDER BY policyname;
