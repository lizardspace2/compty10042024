-- ============================================
-- MIGRATION COMPLÈTE - APPLICATION DE COMPTABILITÉ
-- ============================================
-- Ce script ajoute tous les champs et configurations nécessaires
-- pour connecter l'application à Supabase
-- ============================================

-- ============================================
-- 1. AJOUT DES CHAMPS MANQUANTS À LA TABLE PROFILES
-- ============================================

DO $$
BEGIN
    -- Ajout du prénom
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'profiles' AND column_name = 'first_name') THEN
        ALTER TABLE profiles ADD COLUMN first_name TEXT;
        RAISE NOTICE 'Colonne first_name ajoutée à profiles';
    END IF;

    -- Ajout du nom
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'profiles' AND column_name = 'last_name') THEN
        ALTER TABLE profiles ADD COLUMN last_name TEXT;
        RAISE NOTICE 'Colonne last_name ajoutée à profiles';
    END IF;

    -- Ajout du numéro de rue
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'profiles' AND column_name = 'street_number') THEN
        ALTER TABLE profiles ADD COLUMN street_number TEXT;
        RAISE NOTICE 'Colonne street_number ajoutée à profiles';
    END IF;

    -- Ajout du type de voie
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'profiles' AND column_name = 'street_type') THEN
        ALTER TABLE profiles ADD COLUMN street_type TEXT;
        RAISE NOTICE 'Colonne street_type ajoutée à profiles';
    END IF;

    -- Ajout du nom de la voie
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'profiles' AND column_name = 'street_name') THEN
        ALTER TABLE profiles ADD COLUMN street_name TEXT;
        RAISE NOTICE 'Colonne street_name ajoutée à profiles';
    END IF;
END $$;

-- ============================================
-- 2. VÉRIFICATION ET CRÉATION DES BUCKETS STORAGE
-- ============================================

-- Note: Les buckets doivent être créés via l'interface Supabase ou l'API
-- Voici la configuration recommandée pour chaque bucket:

-- Bucket: avatars
-- - Politique: Lecture publique, écriture authentifiée
-- - Type de fichiers: images (jpg, png, gif, webp)

-- Bucket: documents
-- - Politique: Lecture et écriture authentifiées uniquement
-- - Type de fichiers: tous (pdf, images, etc.)

-- Bucket: justificatifs
-- - Politique: Lecture et écriture authentifiées uniquement
-- - Type de fichiers: tous (pdf, images, etc.)

-- ============================================
-- 3. VÉRIFICATION DES POLITIQUES RLS
-- ============================================

-- Vérifier que toutes les politiques RLS importantes sont en place
-- Si elles n'existent pas, elles seront créées

-- Politiques pour profiles
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'profiles' AND policyname = 'Users can view own profile'
    ) THEN
        CREATE POLICY "Users can view own profile" ON profiles
            FOR SELECT USING (auth.uid() = id);
        RAISE NOTICE 'Politique RLS créée pour profiles (SELECT)';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile'
    ) THEN
        CREATE POLICY "Users can insert own profile" ON profiles
            FOR INSERT WITH CHECK (auth.uid() = id);
        RAISE NOTICE 'Politique RLS créée pour profiles (INSERT)';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'profiles' AND policyname = 'Users can update own profile'
    ) THEN
        CREATE POLICY "Users can update own profile" ON profiles
            FOR UPDATE USING (auth.uid() = id);
        RAISE NOTICE 'Politique RLS créée pour profiles (UPDATE)';
    END IF;
END $$;

-- Politiques pour comptes_bancaires
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'comptes_bancaires' AND policyname = 'Users can view own comptes'
    ) THEN
        CREATE POLICY "Users can view own comptes" ON comptes_bancaires
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = comptes_bancaires.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
        RAISE NOTICE 'Politique RLS créée pour comptes_bancaires (SELECT)';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'comptes_bancaires' AND policyname = 'Users can insert own comptes'
    ) THEN
        CREATE POLICY "Users can insert own comptes" ON comptes_bancaires
            FOR INSERT WITH CHECK (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = comptes_bancaires.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
        RAISE NOTICE 'Politique RLS créée pour comptes_bancaires (INSERT)';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'comptes_bancaires' AND policyname = 'Users can update own comptes'
    ) THEN
        CREATE POLICY "Users can update own comptes" ON comptes_bancaires
            FOR UPDATE USING (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = comptes_bancaires.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
        RAISE NOTICE 'Politique RLS créée pour comptes_bancaires (UPDATE)';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'comptes_bancaires' AND policyname = 'Users can delete own comptes'
    ) THEN
        CREATE POLICY "Users can delete own comptes" ON comptes_bancaires
            FOR DELETE USING (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = comptes_bancaires.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
        RAISE NOTICE 'Politique RLS créée pour comptes_bancaires (DELETE)';
    END IF;
END $$;

-- Politiques similaires pour exercices_fiscaux
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'exercices_fiscaux' AND policyname = 'Users can view own exercices'
    ) THEN
        CREATE POLICY "Users can view own exercices" ON exercices_fiscaux
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = exercices_fiscaux.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'exercices_fiscaux' AND policyname = 'Users can insert own exercices'
    ) THEN
        CREATE POLICY "Users can insert own exercices" ON exercices_fiscaux
            FOR INSERT WITH CHECK (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = exercices_fiscaux.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'exercices_fiscaux' AND policyname = 'Users can update own exercices'
    ) THEN
        CREATE POLICY "Users can update own exercices" ON exercices_fiscaux
            FOR UPDATE USING (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = exercices_fiscaux.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
    END IF;
END $$;

-- Politiques pour documents
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'documents' AND policyname = 'Users can view own documents'
    ) THEN
        CREATE POLICY "Users can view own documents" ON documents
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = documents.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'documents' AND policyname = 'Users can insert own documents'
    ) THEN
        CREATE POLICY "Users can insert own documents" ON documents
            FOR INSERT WITH CHECK (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = documents.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'documents' AND policyname = 'Users can update own documents'
    ) THEN
        CREATE POLICY "Users can update own documents" ON documents
            FOR UPDATE USING (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = documents.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'documents' AND policyname = 'Users can delete own documents'
    ) THEN
        CREATE POLICY "Users can delete own documents" ON documents
            FOR DELETE USING (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = documents.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
    END IF;
END $$;

-- Politiques pour taches
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'taches' AND policyname = 'Users can view own taches'
    ) THEN
        CREATE POLICY "Users can view own taches" ON taches
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = taches.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'taches' AND policyname = 'Users can insert own taches'
    ) THEN
        CREATE POLICY "Users can insert own taches" ON taches
            FOR INSERT WITH CHECK (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = taches.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'taches' AND policyname = 'Users can update own taches'
    ) THEN
        CREATE POLICY "Users can update own taches" ON taches
            FOR UPDATE USING (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = taches.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'taches' AND policyname = 'Users can delete own taches'
    ) THEN
        CREATE POLICY "Users can delete own taches" ON taches
            FOR DELETE USING (
                EXISTS (
                    SELECT 1 FROM entreprises
                    WHERE entreprises.id = taches.entreprise_id
                    AND entreprises.user_id = auth.uid()
                )
            );
    END IF;
END $$;

-- Politiques pour abonnements
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'abonnements' AND policyname = 'Users can view own abonnements'
    ) THEN
        CREATE POLICY "Users can view own abonnements" ON abonnements
            FOR SELECT USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'abonnements' AND policyname = 'Users can update own abonnements'
    ) THEN
        CREATE POLICY "Users can update own abonnements" ON abonnements
            FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END $$;

-- Politiques pour factures
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'factures' AND policyname = 'Users can view own factures'
    ) THEN
        CREATE POLICY "Users can view own factures" ON factures
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM abonnements
                    WHERE abonnements.id = factures.abonnement_id
                    AND abonnements.user_id = auth.uid()
                )
            );
    END IF;
END $$;

-- Politiques pour ventilations
DO $$
BEGIN
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
        RAISE NOTICE 'Politique RLS créée pour ventilations (SELECT)';
    END IF;

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
        RAISE NOTICE 'Politique RLS créée pour ventilations (INSERT)';
    END IF;

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
        RAISE NOTICE 'Politique RLS créée pour ventilations (UPDATE)';
    END IF;

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
        RAISE NOTICE 'Politique RLS créée pour ventilations (DELETE)';
    END IF;
END $$;

-- Politiques pour justificatifs
DO $$
BEGIN
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
        RAISE NOTICE 'Politique RLS créée pour justificatifs (SELECT)';
    END IF;

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
        RAISE NOTICE 'Politique RLS créée pour justificatifs (INSERT)';
    END IF;

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
        RAISE NOTICE 'Politique RLS créée pour justificatifs (DELETE)';
    END IF;
END $$;

-- ============================================
-- 4. CRÉATION DES INDEX MANQUANTS (SI NÉCESSAIRE)
-- ============================================

-- Index pour améliorer les performances des requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_comptes_bancaires_actif ON comptes_bancaires(actif);
CREATE INDEX IF NOT EXISTS idx_exercices_fiscaux_statut ON exercices_fiscaux(statut);
CREATE INDEX IF NOT EXISTS idx_taches_statut ON taches(statut);
CREATE INDEX IF NOT EXISTS idx_taches_date_echeance ON taches(date_echeance);
CREATE INDEX IF NOT EXISTS idx_documents_type_document ON documents(type_document);
CREATE INDEX IF NOT EXISTS idx_factures_statut ON factures(statut);

-- ============================================
-- 5. COMMENTAIRES POUR DOCUMENTATION
-- ============================================

COMMENT ON COLUMN profiles.first_name IS 'Prénom de l''utilisateur';
COMMENT ON COLUMN profiles.last_name IS 'Nom de famille de l''utilisateur';
COMMENT ON COLUMN profiles.street_number IS 'Numéro de rue de l''adresse';
COMMENT ON COLUMN profiles.street_type IS 'Type de voie (rue, avenue, boulevard, etc.)';
COMMENT ON COLUMN profiles.street_name IS 'Nom de la voie';

-- ============================================
-- FIN DE LA MIGRATION
-- ============================================

DO $$
BEGIN
    RAISE NOTICE 'Migration complète terminée avec succès!';
    RAISE NOTICE 'N''oubliez pas de créer les buckets storage via l''interface Supabase:';
    RAISE NOTICE '- avatars (public read, authenticated write)';
    RAISE NOTICE '- documents (authenticated read/write)';
    RAISE NOTICE '- justificatifs (authenticated read/write)';
END $$;
