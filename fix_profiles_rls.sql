-- ============================================
-- FIX RAPIDE: Politiques RLS pour la table profiles
-- ============================================
-- Ce script corrige le problème "new row violates row-level security policy"
-- pour la table profiles en ajoutant la politique INSERT manquante
-- ============================================

-- Vérifier si la politique INSERT existe déjà
DO $$
BEGIN
    -- Politique pour INSERT
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile'
    ) THEN
        CREATE POLICY "Users can insert own profile" ON profiles
            FOR INSERT WITH CHECK (auth.uid() = id);
        RAISE NOTICE 'Politique INSERT créée pour profiles';
    ELSE
        RAISE NOTICE 'Politique INSERT existe déjà pour profiles';
    END IF;

    -- Vérifier la politique SELECT
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'profiles' AND policyname = 'Users can view own profile'
    ) THEN
        CREATE POLICY "Users can view own profile" ON profiles
            FOR SELECT USING (auth.uid() = id);
        RAISE NOTICE 'Politique SELECT créée pour profiles';
    ELSE
        RAISE NOTICE 'Politique SELECT existe déjà pour profiles';
    END IF;

    -- Vérifier la politique UPDATE
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'profiles' AND policyname = 'Users can update own profile'
    ) THEN
        CREATE POLICY "Users can update own profile" ON profiles
            FOR UPDATE USING (auth.uid() = id);
        RAISE NOTICE 'Politique UPDATE créée pour profiles';
    ELSE
        RAISE NOTICE 'Politique UPDATE existe déjà pour profiles';
    END IF;

    RAISE NOTICE '✅ Politiques RLS pour profiles configurées avec succès!';
END $$;

-- Vérifier que RLS est activé sur la table profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Afficher toutes les politiques de la table profiles
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'profiles'
ORDER BY policyname;
