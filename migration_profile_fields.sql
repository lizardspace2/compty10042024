-- ============================================
-- MIGRATION: Ajout de champs au profil utilisateur
-- ============================================
-- Ce script ajoute les champs manquants à la table profiles
-- pour permettre un stockage détaillé des informations d'adresse
-- ============================================

-- Ajouter les nouveaux champs à la table profiles s'ils n'existent pas déjà
DO $$
BEGIN
    -- Ajout du prénom
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'profiles' AND column_name = 'first_name') THEN
        ALTER TABLE profiles ADD COLUMN first_name TEXT;
    END IF;

    -- Ajout du nom
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'profiles' AND column_name = 'last_name') THEN
        ALTER TABLE profiles ADD COLUMN last_name TEXT;
    END IF;

    -- Ajout du numéro de rue
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'profiles' AND column_name = 'street_number') THEN
        ALTER TABLE profiles ADD COLUMN street_number TEXT;
    END IF;

    -- Ajout du type de voie
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'profiles' AND column_name = 'street_type') THEN
        ALTER TABLE profiles ADD COLUMN street_type TEXT;
    END IF;

    -- Ajout du nom de la voie
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'profiles' AND column_name = 'street_name') THEN
        ALTER TABLE profiles ADD COLUMN street_name TEXT;
    END IF;

    RAISE NOTICE 'Migration des champs du profil terminée avec succès';
END $$;

-- Mettre à jour le commentaire de la table
COMMENT ON TABLE profiles IS 'Profils utilisateurs étendus avec informations personnelles détaillées';

-- Commentaires sur les nouvelles colonnes
COMMENT ON COLUMN profiles.first_name IS 'Prénom de l''utilisateur';
COMMENT ON COLUMN profiles.last_name IS 'Nom de famille de l''utilisateur';
COMMENT ON COLUMN profiles.street_number IS 'Numéro de rue de l''adresse';
COMMENT ON COLUMN profiles.street_type IS 'Type de voie (rue, avenue, boulevard, etc.)';
COMMENT ON COLUMN profiles.street_name IS 'Nom de la voie';

-- ============================================
-- FIN DE LA MIGRATION
-- ============================================
