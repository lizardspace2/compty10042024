-- ============================================
-- SCHEMA DE BASE DE DONNÉES - APPLICATION DE COMPTABILITÉ
-- ============================================
-- Ce fichier contient la structure complète de la base de données
-- pour l'application de gestion comptable
-- ============================================

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: users (gérée par Supabase Auth)
-- ============================================
-- Note: Cette table est automatiquement créée par Supabase Auth
-- On crée seulement une table de profil utilisateur supplémentaire

-- ============================================
-- TABLE: profiles
-- Description: Profils utilisateurs étendus
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    postal_code TEXT,
    country TEXT DEFAULT 'France',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: entreprises
-- Description: Informations sur les entreprises des utilisateurs
-- ============================================
CREATE TABLE IF NOT EXISTS entreprises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    siret VARCHAR(14) UNIQUE,
    denomination TEXT NOT NULL,
    profession TEXT,
    aga TEXT, -- Association de Gestion Agréée
    reference_obligation_fiscale VARCHAR(50),
    date_creation DATE,
    forme_juridique VARCHAR(100),
    regime_fiscal VARCHAR(100),
    regime_tva VARCHAR(100) DEFAULT 'exonéré de TVA',
    code_ape VARCHAR(10),
    numero_rcs TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: exercices_fiscaux
-- Description: Exercices fiscaux de l'entreprise
-- ============================================
CREATE TABLE IF NOT EXISTS exercices_fiscaux (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entreprise_id UUID NOT NULL REFERENCES entreprises(id) ON DELETE CASCADE,
    annee INTEGER NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    statut VARCHAR(50) DEFAULT 'en_cours', -- en_cours, cloture, valide
    revenus_etranger BOOLEAN DEFAULT FALSE,
    activite_salariee BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(entreprise_id, annee)
);

-- ============================================
-- TABLE: comptes_bancaires
-- Description: Comptes bancaires de l'entreprise
-- ============================================
CREATE TABLE IF NOT EXISTS comptes_bancaires (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entreprise_id UUID NOT NULL REFERENCES entreprises(id) ON DELETE CASCADE,
    nom_banque TEXT NOT NULL,
    nom_compte TEXT NOT NULL,
    iban VARCHAR(34),
    bic VARCHAR(11),
    solde_initial DECIMAL(12, 2) DEFAULT 0,
    solde_actuel DECIMAL(12, 2) DEFAULT 0,
    type_compte VARCHAR(50) DEFAULT 'courant', -- courant, epargne, caisse
    actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: categories
-- Description: Catégories de transactions
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom TEXT NOT NULL UNIQUE,
    type VARCHAR(50) NOT NULL, -- Revenues, Remunerations, Functionnement, etc.
    description TEXT,
    code_comptable VARCHAR(20),
    couleur VARCHAR(7), -- Code couleur hexadécimal
    icone TEXT,
    ordre INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertion des catégories par défaut
INSERT INTO categories (nom, type, ordre) VALUES
-- Revenues
('Apport personnel', 'Revenues', 1),
('Recette', 'Revenues', 2),
('Recette secondaire', 'Revenues', 3),
('Redevance de collaboration perçue', 'Revenues', 4),
('Autre gain divers', 'Revenues', 5),
('Vente d''une immobilisation', 'Revenues', 6),
('Emprunt', 'Revenues', 7),
('Caution reçue', 'Revenues', 8),

-- Rémunérations
('Prélèvement personnel', 'Remunerations', 9),
('Dépense personnelle', 'Remunerations', 10),
('Rétrocession versée', 'Remunerations', 11),
('Redevance de collaboration versée', 'Remunerations', 12),
('Honoraires payés', 'Remunerations', 13),
('[Salariés] Salaire net', 'Remunerations', 14),
('[Salariés] Impôt à la source', 'Remunerations', 15),
('[Salariés] Charge sociale', 'Remunerations', 16),

-- Fonctionnement
('Immobilisation', 'Functionnement', 17),
('Matériel et outillage', 'Functionnement', 18),
('Achat', 'Functionnement', 19),
('Frais divers', 'Functionnement', 20),
('Télécom, fournitures, documents', 'Functionnement', 21),
('Frais d''acte et de contentieux', 'Functionnement', 22),
('Débours pour vos clients', 'Functionnement', 23),
('Virement interne', 'Functionnement', 24),

-- Déplacements
('À catégoriser', 'Deplacements', 25),
('Formation', 'Deplacements', 26),
('Réception et congrès', 'Deplacements', 27),
('Restaurant et repas d''affaires', 'Deplacements', 28),
('Frais de repas hors domicile', 'Deplacements', 29),
('Frais de déplacement', 'Deplacements', 30),
('Véhicule et carburant', 'Deplacements', 31),
('Location de matériel', 'Deplacements', 32),

-- Frais fixes
('Compte commun ou SCM', 'FraisFixes', 33),
('Loyer et charge locative', 'FraisFixes', 34),
('Caution versée', 'FraisFixes', 35),
('Entretien et réparation', 'FraisFixes', 36),
('Abonnement logiciel', 'FraisFixes', 37),
('Eau, gaz, électricité', 'FraisFixes', 38),
('Assurance professionnelle', 'FraisFixes', 39),

-- Cotisations et taxes
('Cotisation sociale Urssaf', 'CotisationsEtTaxes', 40),
('Cotisation retraite', 'CotisationsEtTaxes', 41),
('Cotisation facultative', 'CotisationsEtTaxes', 42),
('Cotisation professionnelle', 'CotisationsEtTaxes', 43),
('CFE', 'CotisationsEtTaxes', 44),
('Autre impôt', 'CotisationsEtTaxes', 45),
('Amende et pénalité', 'CotisationsEtTaxes', 46)
ON CONFLICT (nom) DO NOTHING;

-- ============================================
-- TABLE: transactions
-- Description: Transactions financières
-- ============================================
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entreprise_id UUID NOT NULL REFERENCES entreprises(id) ON DELETE CASCADE,
    exercice_fiscal_id UUID REFERENCES exercices_fiscaux(id) ON DELETE SET NULL,
    compte_bancaire_id UUID REFERENCES comptes_bancaires(id) ON DELETE SET NULL,
    libelle TEXT NOT NULL,
    date_transaction DATE NOT NULL,
    montant_total DECIMAL(12, 2) NOT NULL,
    type_transaction VARCHAR(50) NOT NULL, -- recette, depense, virement
    moyen_paiement VARCHAR(50), -- virement, carte, cheque, especes, prelevement
    numero_cheque TEXT,
    annotations TEXT,
    statut VARCHAR(50) DEFAULT 'en_attente', -- en_attente, validee, rapprochee, annulee
    rapproche BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: ventilations
-- Description: Ventilation des transactions par catégorie
-- ============================================
CREATE TABLE IF NOT EXISTS ventilations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    categorie_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    categorie_nom TEXT, -- Nom de la catégorie pour historique
    montant DECIMAL(12, 2) NOT NULL,
    pourcentage DECIMAL(5, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: justificatifs
-- Description: Justificatifs (documents) attachés aux transactions
-- ============================================
CREATE TABLE IF NOT EXISTS justificatifs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    nom_fichier TEXT NOT NULL,
    type_fichier VARCHAR(50), -- pdf, image/png, image/jpeg
    taille_fichier INTEGER, -- en octets
    url_stockage TEXT NOT NULL, -- URL Supabase Storage
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: immobilisations
-- Description: Immobilisations et amortissements
-- ============================================
CREATE TABLE IF NOT EXISTS immobilisations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entreprise_id UUID NOT NULL REFERENCES entreprises(id) ON DELETE CASCADE,
    transaction_id UUID REFERENCES transactions(id) ON DELETE SET NULL,
    designation TEXT NOT NULL,
    date_acquisition DATE NOT NULL,
    valeur_origine DECIMAL(12, 2) NOT NULL,
    valeur_residuelle DECIMAL(12, 2) DEFAULT 0,
    duree_amortissement INTEGER NOT NULL, -- en années
    methode_amortissement VARCHAR(50) DEFAULT 'lineaire', -- lineaire, degressif
    taux_amortissement DECIMAL(5, 2),
    date_cession DATE,
    prix_cession DECIMAL(12, 2),
    statut VARCHAR(50) DEFAULT 'en_service', -- en_service, cede, reforme
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: amortissements
-- Description: Plan d'amortissement des immobilisations
-- ============================================
CREATE TABLE IF NOT EXISTS amortissements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    immobilisation_id UUID NOT NULL REFERENCES immobilisations(id) ON DELETE CASCADE,
    exercice_fiscal_id UUID NOT NULL REFERENCES exercices_fiscaux(id) ON DELETE CASCADE,
    annee INTEGER NOT NULL,
    dotation DECIMAL(12, 2) NOT NULL,
    cumul_amortissements DECIMAL(12, 2) NOT NULL,
    valeur_nette_comptable DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: cheques_non_encaisses
-- Description: Suivi des chèques non encaissés
-- ============================================
CREATE TABLE IF NOT EXISTS cheques_non_encaisses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entreprise_id UUID NOT NULL REFERENCES entreprises(id) ON DELETE CASCADE,
    exercice_fiscal_id UUID NOT NULL REFERENCES exercices_fiscaux(id) ON DELETE CASCADE,
    transaction_id UUID REFERENCES transactions(id) ON DELETE SET NULL,
    numero_cheque VARCHAR(50),
    emetteur TEXT,
    montant DECIMAL(12, 2) NOT NULL,
    date_emission DATE NOT NULL,
    date_encaissement DATE,
    statut VARCHAR(50) DEFAULT 'non_encaisse', -- non_encaisse, encaisse, annule
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: frais_kilometriques
-- Description: Suivi des frais kilométriques
-- ============================================
CREATE TABLE IF NOT EXISTS frais_kilometriques (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entreprise_id UUID NOT NULL REFERENCES entreprises(id) ON DELETE CASCADE,
    exercice_fiscal_id UUID NOT NULL REFERENCES exercices_fiscaux(id) ON DELETE CASCADE,
    vehicule_type VARCHAR(50), -- voiture, moto, scooter
    puissance_fiscale INTEGER,
    distance_parcourue DECIMAL(10, 2) NOT NULL, -- en km
    date_trajet DATE NOT NULL,
    motif TEXT,
    montant_forfaitaire DECIMAL(12, 2),
    bareme_applique VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: cotisations_urssaf
-- Description: Cotisations URSSAF à ventiler
-- ============================================
CREATE TABLE IF NOT EXISTS cotisations_urssaf (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entreprise_id UUID NOT NULL REFERENCES entreprises(id) ON DELETE CASCADE,
    exercice_fiscal_id UUID NOT NULL REFERENCES exercices_fiscaux(id) ON DELETE CASCADE,
    transaction_id UUID REFERENCES transactions(id) ON DELETE SET NULL,
    date_prelevement DATE NOT NULL,
    montant_total DECIMAL(12, 2) NOT NULL,
    montant_maladie DECIMAL(12, 2),
    montant_allocations_familiales DECIMAL(12, 2),
    montant_cscrds DECIMAL(12, 2),
    montant_formation DECIMAL(12, 2),
    statut VARCHAR(50) DEFAULT 'a_ventiler', -- a_ventiler, ventile
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: emprunts
-- Description: Emprunts et prêts
-- ============================================
CREATE TABLE IF NOT EXISTS emprunts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entreprise_id UUID NOT NULL REFERENCES entreprises(id) ON DELETE CASCADE,
    organisme_preteur TEXT NOT NULL,
    montant_initial DECIMAL(12, 2) NOT NULL,
    montant_restant DECIMAL(12, 2) NOT NULL,
    taux_interet DECIMAL(5, 2),
    date_debut DATE NOT NULL,
    date_fin_prevue DATE,
    duree_mois INTEGER,
    periodicite_remboursement VARCHAR(50) DEFAULT 'mensuel',
    statut VARCHAR(50) DEFAULT 'en_cours', -- en_cours, rembourse, anticipe
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: echeances_emprunt
-- Description: Échéances de remboursement d'emprunts
-- ============================================
CREATE TABLE IF NOT EXISTS echeances_emprunt (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    emprunt_id UUID NOT NULL REFERENCES emprunts(id) ON DELETE CASCADE,
    transaction_id UUID REFERENCES transactions(id) ON DELETE SET NULL,
    date_echeance DATE NOT NULL,
    montant_total DECIMAL(12, 2) NOT NULL,
    montant_capital DECIMAL(12, 2) NOT NULL,
    montant_interets DECIMAL(12, 2) NOT NULL,
    montant_assurance DECIMAL(12, 2) DEFAULT 0,
    statut VARCHAR(50) DEFAULT 'a_venir', -- a_venir, paye, retard
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: compte_commun_scm
-- Description: Compte commun ou SCM
-- ============================================
CREATE TABLE IF NOT EXISTS compte_commun_scm (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entreprise_id UUID NOT NULL REFERENCES entreprises(id) ON DELETE CASCADE,
    exercice_fiscal_id UUID NOT NULL REFERENCES exercices_fiscaux(id) ON DELETE CASCADE,
    nom TEXT NOT NULL,
    type VARCHAR(50), -- compte_commun, scm
    quote_part DECIMAL(5, 2), -- Pourcentage de participation
    montant_verse DECIMAL(12, 2) DEFAULT 0,
    montant_recu DECIMAL(12, 2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: frais_blanchissage
-- Description: Frais de blanchissage à domicile
-- ============================================
CREATE TABLE IF NOT EXISTS frais_blanchissage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entreprise_id UUID NOT NULL REFERENCES entreprises(id) ON DELETE CASCADE,
    exercice_fiscal_id UUID NOT NULL REFERENCES exercices_fiscaux(id) ON DELETE CASCADE,
    montant_annuel DECIMAL(12, 2) NOT NULL,
    nombre_blouses INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: reduction_impot_comptabilite
-- Description: Réductions d'impôt pour frais de comptabilité
-- ============================================
CREATE TABLE IF NOT EXISTS reduction_impot_comptabilite (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entreprise_id UUID NOT NULL REFERENCES entreprises(id) ON DELETE CASCADE,
    exercice_fiscal_id UUID NOT NULL REFERENCES exercices_fiscaux(id) ON DELETE CASCADE,
    montant_frais_comptabilite DECIMAL(12, 2) NOT NULL,
    montant_reduction DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: cotisations_facultatives
-- Description: Cotisations facultatives déductibles
-- ============================================
CREATE TABLE IF NOT EXISTS cotisations_facultatives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entreprise_id UUID NOT NULL REFERENCES entreprises(id) ON DELETE CASCADE,
    exercice_fiscal_id UUID NOT NULL REFERENCES exercices_fiscaux(id) ON DELETE CASCADE,
    type_cotisation TEXT NOT NULL, -- Madelin, PER, prévoyance, etc.
    organisme TEXT,
    montant DECIMAL(12, 2) NOT NULL,
    deductible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: exonerations_fiscales
-- Description: Exonérations fiscales et crédits d'impôts
-- ============================================
CREATE TABLE IF NOT EXISTS exonerations_fiscales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entreprise_id UUID NOT NULL REFERENCES entreprises(id) ON DELETE CASCADE,
    exercice_fiscal_id UUID NOT NULL REFERENCES exercices_fiscaux(id) ON DELETE CASCADE,
    type_exoneration TEXT NOT NULL,
    montant DECIMAL(12, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: declaration_2035
-- Description: Déclaration 2035 (BNC)
-- ============================================
CREATE TABLE IF NOT EXISTS declaration_2035 (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entreprise_id UUID NOT NULL REFERENCES entreprises(id) ON DELETE CASCADE,
    exercice_fiscal_id UUID NOT NULL REFERENCES exercices_fiscaux(id) ON DELETE CASCADE,
    total_recettes DECIMAL(12, 2) DEFAULT 0,
    total_depenses DECIMAL(12, 2) DEFAULT 0,
    benefice_comptable DECIMAL(12, 2) DEFAULT 0,
    benefice_fiscal DECIMAL(12, 2) DEFAULT 0,
    statut VARCHAR(50) DEFAULT 'brouillon', -- brouillon, validee, transmise
    date_validation DATE,
    date_transmission DATE,
    fichier_pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: taches
-- Description: Tâches à faire (Todo)
-- ============================================
CREATE TABLE IF NOT EXISTS taches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entreprise_id UUID NOT NULL REFERENCES entreprises(id) ON DELETE CASCADE,
    exercice_fiscal_id UUID REFERENCES exercices_fiscaux(id) ON DELETE SET NULL,
    titre TEXT NOT NULL,
    description TEXT,
    date_echeance DATE,
    priorite VARCHAR(50) DEFAULT 'moyenne', -- basse, moyenne, haute, urgente
    statut VARCHAR(50) DEFAULT 'a_faire', -- a_faire, en_cours, terminee, annulee
    categorie VARCHAR(100), -- declaration_2035, rapprochement, etc.
    ordre INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: documents
-- Description: Documents stockés
-- ============================================
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entreprise_id UUID NOT NULL REFERENCES entreprises(id) ON DELETE CASCADE,
    exercice_fiscal_id UUID REFERENCES exercices_fiscaux(id) ON DELETE SET NULL,
    nom TEXT NOT NULL,
    type_document VARCHAR(100), -- declaration, justificatif, facture, contrat, etc.
    categorie VARCHAR(100),
    taille INTEGER,
    format VARCHAR(50),
    url_stockage TEXT NOT NULL,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: notifications
-- Description: Notifications utilisateur
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    titre TEXT NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50), -- info, warning, error, success
    lue BOOLEAN DEFAULT FALSE,
    url_action TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: parrainage
-- Description: Système de parrainage
-- ============================================
CREATE TABLE IF NOT EXISTS parrainage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parrain_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    filleul_email TEXT NOT NULL,
    filleul_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    code_parrainage VARCHAR(50) UNIQUE NOT NULL,
    statut VARCHAR(50) DEFAULT 'invite', -- invite, inscrit, abonne
    date_invitation DATE DEFAULT CURRENT_DATE,
    date_inscription DATE,
    date_abonnement DATE,
    montant_recompense DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: abonnements
-- Description: Abonnements utilisateur
-- ============================================
CREATE TABLE IF NOT EXISTS abonnements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type_abonnement VARCHAR(50) NOT NULL, -- gratuit, premium, expert
    statut VARCHAR(50) DEFAULT 'actif', -- actif, suspendu, annule, expire
    date_debut DATE NOT NULL,
    date_fin DATE,
    prix_mensuel DECIMAL(10, 2),
    mode_paiement VARCHAR(50),
    auto_renouvellement BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: factures
-- Description: Factures d'abonnement
-- ============================================
CREATE TABLE IF NOT EXISTS factures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    abonnement_id UUID NOT NULL REFERENCES abonnements(id) ON DELETE CASCADE,
    numero_facture VARCHAR(50) UNIQUE NOT NULL,
    date_facture DATE NOT NULL,
    montant_ht DECIMAL(10, 2) NOT NULL,
    montant_tva DECIMAL(10, 2) DEFAULT 0,
    montant_ttc DECIMAL(10, 2) NOT NULL,
    statut VARCHAR(50) DEFAULT 'a_payer', -- a_payer, payee, annulee
    date_paiement DATE,
    url_pdf TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES pour optimiser les performances
-- ============================================

-- Indexes sur les clés étrangères
CREATE INDEX idx_entreprises_user_id ON entreprises(user_id);
CREATE INDEX idx_exercices_fiscaux_entreprise_id ON exercices_fiscaux(entreprise_id);
CREATE INDEX idx_comptes_bancaires_entreprise_id ON comptes_bancaires(entreprise_id);
CREATE INDEX idx_transactions_entreprise_id ON transactions(entreprise_id);
CREATE INDEX idx_transactions_exercice_fiscal_id ON transactions(exercice_fiscal_id);
CREATE INDEX idx_transactions_compte_bancaire_id ON transactions(compte_bancaire_id);
CREATE INDEX idx_ventilations_transaction_id ON ventilations(transaction_id);
CREATE INDEX idx_ventilations_categorie_id ON ventilations(categorie_id);
CREATE INDEX idx_justificatifs_transaction_id ON justificatifs(transaction_id);
CREATE INDEX idx_immobilisations_entreprise_id ON immobilisations(entreprise_id);
CREATE INDEX idx_amortissements_immobilisation_id ON amortissements(immobilisation_id);
CREATE INDEX idx_taches_entreprise_id ON taches(entreprise_id);
CREATE INDEX idx_documents_entreprise_id ON documents(entreprise_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_parrainage_parrain_id ON parrainage(parrain_id);
CREATE INDEX idx_abonnements_user_id ON abonnements(user_id);

-- Indexes sur les dates pour les requêtes temporelles
CREATE INDEX idx_transactions_date ON transactions(date_transaction);
CREATE INDEX idx_taches_date_echeance ON taches(date_echeance);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- Indexes sur les statuts pour les filtres
CREATE INDEX idx_transactions_statut ON transactions(statut);
CREATE INDEX idx_taches_statut ON taches(statut);
CREATE INDEX idx_immobilisations_statut ON immobilisations(statut);

-- ============================================
-- TRIGGERS pour mise à jour automatique
-- ============================================

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_entreprises_updated_at BEFORE UPDATE ON entreprises
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exercices_fiscaux_updated_at BEFORE UPDATE ON exercices_fiscaux
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_immobilisations_updated_at BEFORE UPDATE ON immobilisations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_taches_updated_at BEFORE UPDATE ON taches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_abonnements_updated_at BEFORE UPDATE ON abonnements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE entreprises ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercices_fiscaux ENABLE ROW LEVEL SECURITY;
ALTER TABLE comptes_bancaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ventilations ENABLE ROW LEVEL SECURITY;
ALTER TABLE justificatifs ENABLE ROW LEVEL SECURITY;
ALTER TABLE immobilisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE amortissements ENABLE ROW LEVEL SECURITY;
ALTER TABLE cheques_non_encaisses ENABLE ROW LEVEL SECURITY;
ALTER TABLE frais_kilometriques ENABLE ROW LEVEL SECURITY;
ALTER TABLE cotisations_urssaf ENABLE ROW LEVEL SECURITY;
ALTER TABLE emprunts ENABLE ROW LEVEL SECURITY;
ALTER TABLE echeances_emprunt ENABLE ROW LEVEL SECURITY;
ALTER TABLE compte_commun_scm ENABLE ROW LEVEL SECURITY;
ALTER TABLE frais_blanchissage ENABLE ROW LEVEL SECURITY;
ALTER TABLE reduction_impot_comptabilite ENABLE ROW LEVEL SECURITY;
ALTER TABLE cotisations_facultatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE exonerations_fiscales ENABLE ROW LEVEL SECURITY;
ALTER TABLE declaration_2035 ENABLE ROW LEVEL SECURITY;
ALTER TABLE taches ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE parrainage ENABLE ROW LEVEL SECURITY;
ALTER TABLE abonnements ENABLE ROW LEVEL SECURITY;
ALTER TABLE factures ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour profiles
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Politiques RLS pour entreprises
CREATE POLICY "Users can view own entreprises" ON entreprises
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own entreprises" ON entreprises
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own entreprises" ON entreprises
    FOR UPDATE USING (auth.uid() = user_id);

-- Politiques RLS pour transactions (via entreprise)
CREATE POLICY "Users can view own transactions" ON transactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM entreprises
            WHERE entreprises.id = transactions.entreprise_id
            AND entreprises.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own transactions" ON transactions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM entreprises
            WHERE entreprises.id = transactions.entreprise_id
            AND entreprises.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own transactions" ON transactions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM entreprises
            WHERE entreprises.id = transactions.entreprise_id
            AND entreprises.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own transactions" ON transactions
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM entreprises
            WHERE entreprises.id = transactions.entreprise_id
            AND entreprises.user_id = auth.uid()
        )
    );

-- Politiques similaires pour les autres tables (par souci de brièveté, on en montre quelques-unes)

CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- VUES UTILES
-- ============================================

-- Vue pour le tableau de bord (résumé financier)
CREATE OR REPLACE VIEW v_tableau_bord AS
SELECT
    e.id AS entreprise_id,
    e.user_id,
    ef.annee,
    COALESCE(SUM(CASE WHEN t.type_transaction = 'recette' THEN t.montant_total ELSE 0 END), 0) AS total_recettes,
    COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) AS total_depenses,
    COALESCE(SUM(CASE WHEN t.type_transaction = 'recette' THEN t.montant_total ELSE 0 END), 0) -
    COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) AS resultat
FROM entreprises e
LEFT JOIN exercices_fiscaux ef ON ef.entreprise_id = e.id
LEFT JOIN transactions t ON t.exercice_fiscal_id = ef.id
GROUP BY e.id, e.user_id, ef.annee;

-- Vue pour les transactions avec leurs catégories
CREATE OR REPLACE VIEW v_transactions_categories AS
SELECT
    t.id,
    t.entreprise_id,
    t.libelle,
    t.date_transaction,
    t.montant_total,
    t.type_transaction,
    v.categorie_nom,
    v.montant AS montant_categorie,
    v.pourcentage
FROM transactions t
LEFT JOIN ventilations v ON v.transaction_id = t.id;

-- ============================================
-- FONCTIONS UTILES
-- ============================================

-- Fonction pour calculer le solde d'un compte bancaire
CREATE OR REPLACE FUNCTION calculer_solde_compte(compte_id UUID)
RETURNS DECIMAL AS $$
DECLARE
    solde DECIMAL;
BEGIN
    SELECT
        cb.solde_initial +
        COALESCE(SUM(CASE
            WHEN t.type_transaction = 'recette' THEN t.montant_total
            WHEN t.type_transaction = 'depense' THEN -t.montant_total
            ELSE 0
        END), 0)
    INTO solde
    FROM comptes_bancaires cb
    LEFT JOIN transactions t ON t.compte_bancaire_id = cb.id
    WHERE cb.id = compte_id
    GROUP BY cb.id, cb.solde_initial;

    RETURN COALESCE(solde, 0);
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- COMMENTAIRES SUR LES TABLES
-- ============================================

COMMENT ON TABLE profiles IS 'Profils utilisateurs étendus avec informations personnelles';
COMMENT ON TABLE entreprises IS 'Informations sur les entreprises des utilisateurs';
COMMENT ON TABLE exercices_fiscaux IS 'Exercices fiscaux annuels de chaque entreprise';
COMMENT ON TABLE comptes_bancaires IS 'Comptes bancaires professionnels';
COMMENT ON TABLE categories IS 'Catégories de classification des transactions';
COMMENT ON TABLE transactions IS 'Transactions financières (recettes et dépenses)';
COMMENT ON TABLE ventilations IS 'Répartition des transactions par catégorie';
COMMENT ON TABLE justificatifs IS 'Documents justificatifs des transactions';
COMMENT ON TABLE immobilisations IS 'Biens immobilisés de l''entreprise';
COMMENT ON TABLE amortissements IS 'Plan d''amortissement des immobilisations';
COMMENT ON TABLE declaration_2035 IS 'Déclaration 2035 (Bénéfices Non Commerciaux)';
COMMENT ON TABLE taches IS 'Liste des tâches à réaliser';
COMMENT ON TABLE documents IS 'Documents stockés dans l''application';
COMMENT ON TABLE parrainage IS 'Système de parrainage entre utilisateurs';
COMMENT ON TABLE abonnements IS 'Abonnements des utilisateurs';

-- ============================================
-- FIN DU SCRIPT
-- ============================================
