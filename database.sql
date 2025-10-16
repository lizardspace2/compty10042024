-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.abonnements (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  type_abonnement character varying NOT NULL,
  statut character varying DEFAULT 'actif'::character varying,
  date_debut date NOT NULL,
  date_fin date,
  prix_mensuel numeric,
  mode_paiement character varying,
  auto_renouvellement boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT abonnements_pkey PRIMARY KEY (id),
  CONSTRAINT abonnements_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.amortissements (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  immobilisation_id uuid NOT NULL,
  exercice_fiscal_id uuid NOT NULL,
  annee integer NOT NULL,
  dotation numeric NOT NULL,
  cumul_amortissements numeric NOT NULL,
  valeur_nette_comptable numeric NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT amortissements_pkey PRIMARY KEY (id),
  CONSTRAINT amortissements_immobilisation_id_fkey FOREIGN KEY (immobilisation_id) REFERENCES public.immobilisations(id),
  CONSTRAINT amortissements_exercice_fiscal_id_fkey FOREIGN KEY (exercice_fiscal_id) REFERENCES public.exercices_fiscaux(id)
);
CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  nom text NOT NULL UNIQUE,
  type character varying NOT NULL,
  description text,
  code_comptable character varying,
  couleur character varying,
  icone text,
  ordre integer,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.cheques_non_encaisses (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  entreprise_id uuid NOT NULL,
  exercice_fiscal_id uuid NOT NULL,
  transaction_id uuid,
  numero_cheque character varying,
  emetteur text,
  montant numeric NOT NULL,
  date_emission date NOT NULL,
  date_encaissement date,
  statut character varying DEFAULT 'non_encaisse'::character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT cheques_non_encaisses_pkey PRIMARY KEY (id),
  CONSTRAINT cheques_non_encaisses_entreprise_id_fkey FOREIGN KEY (entreprise_id) REFERENCES public.entreprises(id),
  CONSTRAINT cheques_non_encaisses_exercice_fiscal_id_fkey FOREIGN KEY (exercice_fiscal_id) REFERENCES public.exercices_fiscaux(id),
  CONSTRAINT cheques_non_encaisses_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id)
);
CREATE TABLE public.compte_commun_scm (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  entreprise_id uuid NOT NULL,
  exercice_fiscal_id uuid NOT NULL,
  nom text NOT NULL,
  type character varying,
  quote_part numeric,
  montant_verse numeric DEFAULT 0,
  montant_recu numeric DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT compte_commun_scm_pkey PRIMARY KEY (id),
  CONSTRAINT compte_commun_scm_entreprise_id_fkey FOREIGN KEY (entreprise_id) REFERENCES public.entreprises(id),
  CONSTRAINT compte_commun_scm_exercice_fiscal_id_fkey FOREIGN KEY (exercice_fiscal_id) REFERENCES public.exercices_fiscaux(id)
);
CREATE TABLE public.comptes_bancaires (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  entreprise_id uuid NOT NULL,
  nom_banque text NOT NULL,
  nom_compte text NOT NULL,
  iban character varying,
  bic character varying,
  solde_initial numeric DEFAULT 0,
  solde_actuel numeric DEFAULT 0,
  type_compte character varying DEFAULT 'courant'::character varying,
  actif boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT comptes_bancaires_pkey PRIMARY KEY (id),
  CONSTRAINT comptes_bancaires_entreprise_id_fkey FOREIGN KEY (entreprise_id) REFERENCES public.entreprises(id)
);
CREATE TABLE public.cotisations_facultatives (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  entreprise_id uuid NOT NULL,
  exercice_fiscal_id uuid NOT NULL,
  type_cotisation text NOT NULL,
  organisme text,
  montant numeric NOT NULL,
  deductible boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT cotisations_facultatives_pkey PRIMARY KEY (id),
  CONSTRAINT cotisations_facultatives_entreprise_id_fkey FOREIGN KEY (entreprise_id) REFERENCES public.entreprises(id),
  CONSTRAINT cotisations_facultatives_exercice_fiscal_id_fkey FOREIGN KEY (exercice_fiscal_id) REFERENCES public.exercices_fiscaux(id)
);
CREATE TABLE public.cotisations_urssaf (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  entreprise_id uuid NOT NULL,
  exercice_fiscal_id uuid NOT NULL,
  transaction_id uuid,
  date_prelevement date NOT NULL,
  montant_total numeric NOT NULL,
  montant_maladie numeric,
  montant_allocations_familiales numeric,
  montant_cscrds numeric,
  montant_formation numeric,
  statut character varying DEFAULT 'a_ventiler'::character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT cotisations_urssaf_pkey PRIMARY KEY (id),
  CONSTRAINT cotisations_urssaf_entreprise_id_fkey FOREIGN KEY (entreprise_id) REFERENCES public.entreprises(id),
  CONSTRAINT cotisations_urssaf_exercice_fiscal_id_fkey FOREIGN KEY (exercice_fiscal_id) REFERENCES public.exercices_fiscaux(id),
  CONSTRAINT cotisations_urssaf_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id)
);
CREATE TABLE public.declaration_2035 (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  entreprise_id uuid NOT NULL,
  exercice_fiscal_id uuid NOT NULL,
  total_recettes numeric DEFAULT 0,
  total_depenses numeric DEFAULT 0,
  benefice_comptable numeric DEFAULT 0,
  benefice_fiscal numeric DEFAULT 0,
  statut character varying DEFAULT 'brouillon'::character varying,
  date_validation date,
  date_transmission date,
  fichier_pdf_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT declaration_2035_pkey PRIMARY KEY (id),
  CONSTRAINT declaration_2035_entreprise_id_fkey FOREIGN KEY (entreprise_id) REFERENCES public.entreprises(id),
  CONSTRAINT declaration_2035_exercice_fiscal_id_fkey FOREIGN KEY (exercice_fiscal_id) REFERENCES public.exercices_fiscaux(id)
);
CREATE TABLE public.documents (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  entreprise_id uuid NOT NULL,
  exercice_fiscal_id uuid,
  nom text NOT NULL,
  type_document character varying,
  categorie character varying,
  taille integer,
  format character varying,
  url_stockage text NOT NULL,
  tags ARRAY,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT documents_pkey PRIMARY KEY (id),
  CONSTRAINT documents_entreprise_id_fkey FOREIGN KEY (entreprise_id) REFERENCES public.entreprises(id),
  CONSTRAINT documents_exercice_fiscal_id_fkey FOREIGN KEY (exercice_fiscal_id) REFERENCES public.exercices_fiscaux(id)
);
CREATE TABLE public.echeances_emprunt (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  emprunt_id uuid NOT NULL,
  transaction_id uuid,
  date_echeance date NOT NULL,
  montant_total numeric NOT NULL,
  montant_capital numeric NOT NULL,
  montant_interets numeric NOT NULL,
  montant_assurance numeric DEFAULT 0,
  statut character varying DEFAULT 'a_venir'::character varying,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT echeances_emprunt_pkey PRIMARY KEY (id),
  CONSTRAINT echeances_emprunt_emprunt_id_fkey FOREIGN KEY (emprunt_id) REFERENCES public.emprunts(id),
  CONSTRAINT echeances_emprunt_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id)
);
CREATE TABLE public.emprunts (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  entreprise_id uuid NOT NULL,
  organisme_preteur text NOT NULL,
  montant_initial numeric NOT NULL,
  montant_restant numeric NOT NULL,
  taux_interet numeric,
  date_debut date NOT NULL,
  date_fin_prevue date,
  duree_mois integer,
  periodicite_remboursement character varying DEFAULT 'mensuel'::character varying,
  statut character varying DEFAULT 'en_cours'::character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT emprunts_pkey PRIMARY KEY (id),
  CONSTRAINT emprunts_entreprise_id_fkey FOREIGN KEY (entreprise_id) REFERENCES public.entreprises(id)
);
CREATE TABLE public.entreprises (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  siret character varying UNIQUE,
  denomination text NOT NULL,
  profession text,
  aga text,
  reference_obligation_fiscale character varying,
  date_creation date,
  forme_juridique character varying,
  regime_fiscal character varying,
  regime_tva character varying DEFAULT 'exonéré de TVA'::character varying,
  code_ape character varying,
  numero_rcs text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT entreprises_pkey PRIMARY KEY (id),
  CONSTRAINT entreprises_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.exercices_fiscaux (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  entreprise_id uuid NOT NULL,
  annee integer NOT NULL,
  date_debut date NOT NULL,
  date_fin date NOT NULL,
  statut character varying DEFAULT 'en_cours'::character varying,
  revenus_etranger boolean DEFAULT false,
  activite_salariee boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT exercices_fiscaux_pkey PRIMARY KEY (id),
  CONSTRAINT exercices_fiscaux_entreprise_id_fkey FOREIGN KEY (entreprise_id) REFERENCES public.entreprises(id)
);
CREATE TABLE public.exonerations_fiscales (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  entreprise_id uuid NOT NULL,
  exercice_fiscal_id uuid NOT NULL,
  type_exoneration text NOT NULL,
  montant numeric NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT exonerations_fiscales_pkey PRIMARY KEY (id),
  CONSTRAINT exonerations_fiscales_entreprise_id_fkey FOREIGN KEY (entreprise_id) REFERENCES public.entreprises(id),
  CONSTRAINT exonerations_fiscales_exercice_fiscal_id_fkey FOREIGN KEY (exercice_fiscal_id) REFERENCES public.exercices_fiscaux(id)
);
CREATE TABLE public.factures (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  abonnement_id uuid NOT NULL,
  numero_facture character varying NOT NULL UNIQUE,
  date_facture date NOT NULL,
  montant_ht numeric NOT NULL,
  montant_tva numeric DEFAULT 0,
  montant_ttc numeric NOT NULL,
  statut character varying DEFAULT 'a_payer'::character varying,
  date_paiement date,
  url_pdf text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT factures_pkey PRIMARY KEY (id),
  CONSTRAINT factures_abonnement_id_fkey FOREIGN KEY (abonnement_id) REFERENCES public.abonnements(id)
);
CREATE TABLE public.frais_blanchissage (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  entreprise_id uuid NOT NULL,
  exercice_fiscal_id uuid NOT NULL,
  montant_annuel numeric NOT NULL,
  nombre_blouses integer,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT frais_blanchissage_pkey PRIMARY KEY (id),
  CONSTRAINT frais_blanchissage_entreprise_id_fkey FOREIGN KEY (entreprise_id) REFERENCES public.entreprises(id),
  CONSTRAINT frais_blanchissage_exercice_fiscal_id_fkey FOREIGN KEY (exercice_fiscal_id) REFERENCES public.exercices_fiscaux(id)
);
CREATE TABLE public.frais_kilometriques (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  entreprise_id uuid NOT NULL,
  exercice_fiscal_id uuid NOT NULL,
  vehicule_type character varying,
  puissance_fiscale integer,
  distance_parcourue numeric NOT NULL,
  date_trajet date NOT NULL,
  motif text,
  montant_forfaitaire numeric,
  bareme_applique character varying,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT frais_kilometriques_pkey PRIMARY KEY (id),
  CONSTRAINT frais_kilometriques_entreprise_id_fkey FOREIGN KEY (entreprise_id) REFERENCES public.entreprises(id),
  CONSTRAINT frais_kilometriques_exercice_fiscal_id_fkey FOREIGN KEY (exercice_fiscal_id) REFERENCES public.exercices_fiscaux(id)
);
CREATE TABLE public.immobilisations (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  entreprise_id uuid NOT NULL,
  transaction_id uuid,
  designation text NOT NULL,
  date_acquisition date NOT NULL,
  valeur_origine numeric NOT NULL,
  valeur_residuelle numeric DEFAULT 0,
  duree_amortissement integer NOT NULL,
  methode_amortissement character varying DEFAULT 'lineaire'::character varying,
  taux_amortissement numeric,
  date_cession date,
  prix_cession numeric,
  statut character varying DEFAULT 'en_service'::character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT immobilisations_pkey PRIMARY KEY (id),
  CONSTRAINT immobilisations_entreprise_id_fkey FOREIGN KEY (entreprise_id) REFERENCES public.entreprises(id),
  CONSTRAINT immobilisations_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id)
);
CREATE TABLE public.justificatifs (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  transaction_id uuid NOT NULL,
  nom_fichier text NOT NULL,
  type_fichier character varying,
  taille_fichier integer,
  url_stockage text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT justificatifs_pkey PRIMARY KEY (id),
  CONSTRAINT justificatifs_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id)
);
CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  titre text NOT NULL,
  message text NOT NULL,
  type character varying,
  lue boolean DEFAULT false,
  url_action text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.parrainage (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  parrain_id uuid NOT NULL,
  filleul_email text NOT NULL,
  filleul_id uuid,
  code_parrainage character varying NOT NULL UNIQUE,
  statut character varying DEFAULT 'invite'::character varying,
  date_invitation date DEFAULT CURRENT_DATE,
  date_inscription date,
  date_abonnement date,
  montant_recompense numeric DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT parrainage_pkey PRIMARY KEY (id),
  CONSTRAINT parrainage_parrain_id_fkey FOREIGN KEY (parrain_id) REFERENCES auth.users(id),
  CONSTRAINT parrainage_filleul_id_fkey FOREIGN KEY (filleul_id) REFERENCES auth.users(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  email text NOT NULL UNIQUE,
  full_name text,
  phone text,
  address text,
  city text,
  postal_code text,
  country text DEFAULT 'France'::text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  first_name text,
  last_name text,
  street_number text,
  street_type text,
  street_name text,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.reduction_impot_comptabilite (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  entreprise_id uuid NOT NULL,
  exercice_fiscal_id uuid NOT NULL,
  montant_frais_comptabilite numeric NOT NULL,
  montant_reduction numeric NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT reduction_impot_comptabilite_pkey PRIMARY KEY (id),
  CONSTRAINT reduction_impot_comptabilite_entreprise_id_fkey FOREIGN KEY (entreprise_id) REFERENCES public.entreprises(id),
  CONSTRAINT reduction_impot_comptabilite_exercice_fiscal_id_fkey FOREIGN KEY (exercice_fiscal_id) REFERENCES public.exercices_fiscaux(id)
);
CREATE TABLE public.taches (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  entreprise_id uuid NOT NULL,
  exercice_fiscal_id uuid,
  titre text NOT NULL,
  description text,
  date_echeance date,
  priorite character varying DEFAULT 'moyenne'::character varying,
  statut character varying DEFAULT 'a_faire'::character varying,
  categorie character varying,
  ordre integer,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT taches_pkey PRIMARY KEY (id),
  CONSTRAINT taches_entreprise_id_fkey FOREIGN KEY (entreprise_id) REFERENCES public.entreprises(id),
  CONSTRAINT taches_exercice_fiscal_id_fkey FOREIGN KEY (exercice_fiscal_id) REFERENCES public.exercices_fiscaux(id)
);
CREATE TABLE public.transactions (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  entreprise_id uuid NOT NULL,
  exercice_fiscal_id uuid,
  compte_bancaire_id uuid,
  libelle text NOT NULL,
  date_transaction date NOT NULL,
  montant_total numeric NOT NULL,
  type_transaction character varying NOT NULL,
  moyen_paiement character varying,
  numero_cheque text,
  annotations text,
  statut character varying DEFAULT 'en_attente'::character varying,
  rapproche boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT transactions_pkey PRIMARY KEY (id),
  CONSTRAINT transactions_entreprise_id_fkey FOREIGN KEY (entreprise_id) REFERENCES public.entreprises(id),
  CONSTRAINT transactions_exercice_fiscal_id_fkey FOREIGN KEY (exercice_fiscal_id) REFERENCES public.exercices_fiscaux(id),
  CONSTRAINT transactions_compte_bancaire_id_fkey FOREIGN KEY (compte_bancaire_id) REFERENCES public.comptes_bancaires(id)
);
CREATE TABLE public.ventilations (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  transaction_id uuid NOT NULL,
  categorie_id uuid,
  categorie_nom text,
  montant numeric NOT NULL,
  pourcentage numeric NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ventilations_pkey PRIMARY KEY (id),
  CONSTRAINT ventilations_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id),
  CONSTRAINT ventilations_categorie_id_fkey FOREIGN KEY (categorie_id) REFERENCES public.categories(id)
);