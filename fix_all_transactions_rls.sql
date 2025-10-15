-- ============================================
-- FIX COMPLET: Politiques RLS pour le système de transactions
-- ============================================
-- Ce script crée toutes les politiques RLS nécessaires pour :
-- - profiles
-- - entreprises
-- - transactions
-- - ventilations
-- - justificatifs
-- ============================================

-- ============================================
-- 1. PROFILES
-- ============================================
DO $$
BEGIN
    -- SELECT
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'profiles' AND policyname = 'Users can view own profile'
    ) THEN
        CREATE POLICY "Users can view own profile" ON profiles
            FOR SELECT USING (auth.uid() = id);
        RAISE NOTICE '✅ Politique SELECT créée pour profiles';
    END IF;

    -- INSERT
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile'
    ) THEN
        CREATE POLICY "Users can insert own profile" ON profiles
            FOR INSERT WITH CHECK (auth.uid() = id);
        RAISE NOTICE '✅ Politique INSERT créée pour profiles';
    END IF;

    -- UPDATE
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'profiles' AND policyname = 'Users can update own profile'
    ) THEN
        CREATE POLICY "Users can update own profile" ON profiles
            FOR UPDATE USING (auth.uid() = id);
        RAISE NOTICE '✅ Politique UPDATE créée pour profiles';
    END IF;
END $$;

-- ============================================
-- 2. ENTREPRISES
-- ============================================
DO $$
BEGIN
    -- SELECT
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'entreprises' AND policyname = 'Users can view own entreprises'
    ) THEN
        CREATE POLICY "Users can view own entreprises" ON entreprises
            FOR SELECT USING (auth.uid() = user_id);
        RAISE NOTICE '✅ Politique SELECT créée pour entreprises';
    END IF;

    -- INSERT
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'entreprises' AND policyname = 'Users can insert own entreprises'
    ) THEN
        CREATE POLICY "Users can insert own entreprises" ON entreprises
            FOR INSERT WITH CHECK (auth.uid() = user_id);
        RAISE NOTICE '✅ Politique INSERT créée pour entreprises';
    END IF;

    -- UPDATE
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'entreprises' AND policyname = 'Users can update own entreprises'
    ) THEN
        CREATE POLICY "Users can update own entreprises" ON entreprises
            FOR UPDATE USING (auth.uid() = user_id);
        RAISE NOTICE '✅ Politique UPDATE créée pour entreprises';
    END IF;
END $$;

-- ============================================
-- 3. TRANSACTIONS
-- ============================================
DO $$
BEGIN
    -- SELECT
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'transactions' AND policyname = 'Users can view own transactions'
    ) THEN
        CREATE POLICY "Users can view own transactions" ON transactions
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = transactions.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
        RAISE NOTICE '✅ Politique SELECT créée pour transactions';
    END IF;

    -- INSERT
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'transactions' AND policyname = 'Users can insert own transactions'
    ) THEN
        CREATE POLICY "Users can insert own transactions" ON transactions
            FOR INSERT WITH CHECK (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = transactions.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
        RAISE NOTICE '✅ Politique INSERT créée pour transactions';
    END IF;

    -- UPDATE
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'transactions' AND policyname = 'Users can update own transactions'
    ) THEN
        CREATE POLICY "Users can update own transactions" ON transactions
            FOR UPDATE USING (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = transactions.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
        RAISE NOTICE '✅ Politique UPDATE créée pour transactions';
    END IF;

    -- DELETE
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'transactions' AND policyname = 'Users can delete own transactions'
    ) THEN
        CREATE POLICY "Users can delete own transactions" ON transactions
            FOR DELETE USING (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = transactions.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
        RAISE NOTICE '✅ Politique DELETE créée pour transactions';
    END IF;
END $$;

-- ============================================
-- 4. VENTILATIONS
-- ============================================
DO $$
BEGIN
    -- SELECT
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
        RAISE NOTICE '✅ Politique SELECT créée pour ventilations';
    END IF;

    -- INSERT
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
        RAISE NOTICE '✅ Politique INSERT créée pour ventilations';
    END IF;

    -- UPDATE
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
        RAISE NOTICE '✅ Politique UPDATE créée pour ventilations';
    END IF;

    -- DELETE
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
        RAISE NOTICE '✅ Politique DELETE créée pour ventilations';
    END IF;
END $$;

-- ============================================
-- 5. JUSTIFICATIFS
-- ============================================
DO $$
BEGIN
    -- SELECT
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'justificatifs' AND policyname = 'Users can view own justificatifs'
    ) THEN
        CREATE POLICY "Users can view own justificatifs" ON justificatifs
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM transactions
                    JOIN entreprises ON entreprises.id = transactions.entreprise_id
                    WHERE transactions.id = justificatifs.transaction_id
                    AND entreprises.user_id = auth.uid()
                )
            );
        RAISE NOTICE '✅ Politique SELECT créée pour justificatifs';
    END IF;

    -- INSERT
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'justificatifs' AND policyname = 'Users can insert own justificatifs'
    ) THEN
        CREATE POLICY "Users can insert own justificatifs" ON justificatifs
            FOR INSERT WITH CHECK (
                EXISTS (
                    SELECT 1 FROM transactions
                    JOIN entreprises ON entreprises.id = transactions.entreprise_id
                    WHERE transactions.id = justificatifs.transaction_id
                    AND entreprises.user_id = auth.uid()
                )
            );
        RAISE NOTICE '✅ Politique INSERT créée pour justificatifs';
    END IF;

    -- DELETE
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'justificatifs' AND policyname = 'Users can delete own justificatifs'
    ) THEN
        CREATE POLICY "Users can delete own justificatifs" ON justificatifs
            FOR DELETE USING (
                EXISTS (
                    SELECT 1 FROM transactions
                    JOIN entreprises ON entreprises.id = transactions.entreprise_id
                    WHERE transactions.id = justificatifs.transaction_id
                    AND entreprises.user_id = auth.uid()
                )
            );
        RAISE NOTICE '✅ Politique DELETE créée pour justificatifs';
    END IF;
END $$;

-- ============================================
-- 6. ACTIVER RLS SUR TOUTES LES TABLES
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE entreprises ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ventilations ENABLE ROW LEVEL SECURITY;
ALTER TABLE justificatifs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 7. RÉSUMÉ DES POLITIQUES CRÉÉES
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE '🎉 TOUTES LES POLITIQUES RLS SONT EN PLACE!';
    RAISE NOTICE '========================================';
    RAISE NOTICE '';
    RAISE NOTICE 'Tables configurées:';
    RAISE NOTICE '- profiles (SELECT, INSERT, UPDATE)';
    RAISE NOTICE '- entreprises (SELECT, INSERT, UPDATE)';
    RAISE NOTICE '- transactions (SELECT, INSERT, UPDATE, DELETE)';
    RAISE NOTICE '- ventilations (SELECT, INSERT, UPDATE, DELETE)';
    RAISE NOTICE '- justificatifs (SELECT, INSERT, DELETE)';
    RAISE NOTICE '';
    RAISE NOTICE 'Vous pouvez maintenant:';
    RAISE NOTICE '1. Créer votre profil';
    RAISE NOTICE '2. Créer votre entreprise';
    RAISE NOTICE '3. Créer des transactions avec ventilations';
    RAISE NOTICE '4. Ajouter des justificatifs';
    RAISE NOTICE '';
END $$;

-- Afficher toutes les politiques créées
SELECT
    tablename,
    policyname,
    cmd as operation
FROM pg_policies
WHERE tablename IN ('profiles', 'entreprises', 'transactions', 'ventilations', 'justificatifs')
ORDER BY tablename, cmd;
