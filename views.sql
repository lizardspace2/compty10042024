-- 1. VIEW pour les KPI Globaux (CORRECT)
CREATE OR REPLACE VIEW kpi_globaux AS
SELECT 
  e.id as entreprise_id,
  ef.id as exercice_fiscal_id,
  ef.annee,
  
  -- Chiffre d'affaires et revenus
  COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) as chiffre_affaires,
  
  -- Dépenses totales
  COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) as total_depenses,
  
  -- Résultat net
  COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) - 
           SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) as resultat_net,
  
  -- Taux de marge
  CASE 
    WHEN SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) > 0 THEN
      ROUND(((SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) - 
              SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END)) / 
             SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END)) * 100, 1)
    ELSE 0
  END as taux_marge,
  
  -- Trésorerie
  COALESCE(SUM(cb.solde_actuel), 0) as tresorerie_totale,
  
  -- Nombre de jours de trésorerie (estimation)
  CASE 
    WHEN SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END) > 0 THEN
      ROUND((COALESCE(SUM(cb.solde_actuel), 0) / 
             (SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END) / 365)), 0)
    ELSE 0
  END as jours_tresorerie,

  -- Statistiques transactions
  COUNT(t.id) as total_transactions,
  COUNT(CASE WHEN t.type_transaction = 'revenu' THEN 1 END) as nb_transactions_revenus,
  COUNT(CASE WHEN t.type_transaction = 'depense' THEN 1 END) as nb_transactions_depenses

FROM entreprises e
JOIN exercices_fiscaux ef ON ef.entreprise_id = e.id AND ef.statut = 'en_cours'
LEFT JOIN transactions t ON t.exercice_fiscal_id = ef.id
LEFT JOIN comptes_bancaires cb ON cb.entreprise_id = e.id AND cb.actif = true
GROUP BY e.id, ef.id, ef.annee;

-- 2. VIEW pour les Données Mensuelles (CORRECT)
CREATE OR REPLACE VIEW donnees_mensuelles AS
SELECT 
  t.entreprise_id,
  t.exercice_fiscal_id,
  DATE_TRUNC('month', t.date_transaction) as mois,
  TO_CHAR(t.date_transaction, 'Mon') as mois_court,
  EXTRACT(MONTH FROM t.date_transaction) as mois_numero,
  
  -- Revenus par mois
  COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) as revenues,
  
  -- Dépenses par mois
  COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) as expenses,
  
  -- Résultat par mois
  COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) - 
           SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) as result,
  
  -- Comparaison avec année précédente (placeholder)
  COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) * 0.85, 0) as revenues_annee_precedente,
  COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END) * 0.90, 0) as expenses_annee_precedente

FROM transactions t
JOIN exercices_fiscaux ef ON ef.id = t.exercice_fiscal_id AND ef.statut = 'en_cours'
GROUP BY t.entreprise_id, t.exercice_fiscal_id, DATE_TRUNC('month', t.date_transaction), TO_CHAR(t.date_transaction, 'Mon'), EXTRACT(MONTH FROM t.date_transaction)
ORDER BY mois_numero;

-- 3. VIEW pour les Moyens de Paiement (CORRECT)
CREATE OR REPLACE VIEW stats_moyens_paiement AS
SELECT 
  t.entreprise_id,
  t.exercice_fiscal_id,
  COALESCE(t.moyen_paiement, 'Non spécifié') as moyen_paiement,
  COUNT(*) as nombre_transactions,
  SUM(t.montant_total) as montant_total,
  ROUND(AVG(t.montant_total), 2) as moyenne_transaction,
  
  -- Pourcentage du total
  ROUND((SUM(t.montant_total) / 
         NULLIF(SUM(SUM(t.montant_total)) OVER (PARTITION BY t.entreprise_id, t.exercice_fiscal_id), 0)) * 100, 1) as pourcentage_total

FROM transactions t
JOIN exercices_fiscaux ef ON ef.id = t.exercice_fiscal_id AND ef.statut = 'en_cours'
WHERE t.moyen_paiement IS NOT NULL
GROUP BY t.entreprise_id, t.exercice_fiscal_id, t.moyen_paiement
HAVING SUM(t.montant_total) > 0;

-- 4. VIEW pour la Répartition des Dépenses (CORRIGÉE - sans categorie_id)
CREATE OR REPLACE VIEW repartition_depenses AS
SELECT 
  t.entreprise_id,
  t.exercice_fiscal_id,
  -- Utiliser les ventilations si disponibles, sinon "Non catégorisé"
  COALESCE(v.categorie_nom, 'Non catégorisé') as categorie,
  -- Couleur par défaut basée sur la catégorie
  CASE COALESCE(v.categorie_nom, 'Non catégorisé')
    WHEN 'Salaires & charges' THEN '#FF6B6B'
    WHEN 'Loyer & charges locatives' THEN '#4ECDC4'
    WHEN 'Matériel & outillage' THEN '#45B7D1'
    WHEN 'Déplacements' THEN '#FFA07A'
    WHEN 'Télécom & fournitures' THEN '#98D8C8'
    WHEN 'Formation' THEN '#F7DC6F'
    ELSE '#BB8FCE'
  END as couleur,
  
  SUM(t.montant_total) as montant_total,
  COUNT(*) as nombre_transactions,
  
  -- Pourcentage du total des dépenses
  ROUND((SUM(t.montant_total) / 
         NULLIF(SUM(SUM(t.montant_total)) OVER (PARTITION BY t.entreprise_id, t.exercice_fiscal_id), 0)) * 100, 1) as pourcentage_total

FROM transactions t
JOIN exercices_fiscaux ef ON ef.id = t.exercice_fiscal_id AND ef.statut = 'en_cours'
-- Jointure avec ventilations pour avoir les catégories
LEFT JOIN ventilations v ON v.transaction_id = t.id
WHERE t.type_transaction = 'depense'
GROUP BY t.entreprise_id, t.exercice_fiscal_id, v.categorie_nom
HAVING SUM(t.montant_total) > 0
ORDER BY montant_total DESC;

-- 5. VIEW pour le Cash Flow (CORRECT)
CREATE OR REPLACE VIEW cash_flow_mensuel AS
SELECT 
  t.entreprise_id,
  t.exercice_fiscal_id,
  DATE_TRUNC('month', t.date_transaction) as mois,
  TO_CHAR(t.date_transaction, 'YYYY-MM') as mois_annee,
  
  -- Cash flow opérationnel
  SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) as cash_in,
  SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END) as cash_out,
  SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE -t.montant_total END) as cash_flow_net,
  
  -- Cash flow cumulé
  SUM(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE -t.montant_total END)) 
    OVER (PARTITION BY t.entreprise_id, t.exercice_fiscal_id ORDER BY DATE_TRUNC('month', t.date_transaction)) as cash_flow_cumule

FROM transactions t
JOIN exercices_fiscaux ef ON ef.id = t.exercice_fiscal_id AND ef.statut = 'en_cours'
GROUP BY t.entreprise_id, t.exercice_fiscal_id, DATE_TRUNC('month', t.date_transaction), TO_CHAR(t.date_transaction, 'YYYY-MM')
ORDER BY mois;

-- 6. VIEW pour la Marge (CORRECT)
CREATE OR REPLACE VIEW evolution_marge AS
SELECT 
  t.entreprise_id,
  t.exercice_fiscal_id,
  DATE_TRUNC('month', t.date_transaction) as mois,
  TO_CHAR(t.date_transaction, 'Mon') as mois_court,
  
  SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) as chiffre_affaires,
  SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END) as total_charges,
  
  CASE 
    WHEN SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) > 0 THEN
      ROUND(((SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) - 
              SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END)) / 
             SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END)) * 100, 1)
    ELSE 0
  END as taux_marge,
  
  CASE 
    WHEN SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) > 0 THEN
      ROUND((SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END) / 
             SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END)) * 100, 1)
    ELSE 0
  END as taux_charges

FROM transactions t
JOIN exercices_fiscaux ef ON ef.id = t.exercice_fiscal_id AND ef.statut = 'en_cours'
GROUP BY t.entreprise_id, t.exercice_fiscal_id, DATE_TRUNC('month', t.date_transaction), TO_CHAR(t.date_transaction, 'Mon')
ORDER BY mois;

-- 7. VIEW pour le Trésorerie (CORRECT)
CREATE OR REPLACE VIEW evolution_tresorerie AS
SELECT 
  cb.entreprise_id,
  ef.id as exercice_fiscal_id,
  DATE_TRUNC('month', t.date_transaction) as mois,
  TO_CHAR(t.date_transaction, 'Mon') as mois_court,
  
  -- Solde bancaire estimé
  COALESCE(SUM(cb.solde_initial) + 
           SUM(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE -t.montant_total END)) 
           OVER (PARTITION BY cb.entreprise_id, ef.id ORDER BY DATE_TRUNC('month', t.date_transaction)), 0) as solde_estime,
  
  -- Variation de trésorerie
  SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) as entrees,
  SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END) as sorties,
  
  -- Besoin en fonds de roulement (estimation simplifiée)
  COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END) * 0.3, 0) as bfr_estime

FROM comptes_bancaires cb
JOIN entreprises e ON e.id = cb.entreprise_id
JOIN exercices_fiscaux ef ON ef.entreprise_id = e.id AND ef.statut = 'en_cours'
LEFT JOIN transactions t ON t.exercice_fiscal_id = ef.id AND t.compte_bancaire_id = cb.id
WHERE cb.actif = true
GROUP BY cb.entreprise_id, ef.id, DATE_TRUNC('month', t.date_transaction), TO_CHAR(t.date_transaction, 'Mon')
ORDER BY mois;

-- 8. VIEW pour les Revenus Trimestriels (CORRECT)
CREATE OR REPLACE VIEW revenus_trimestriels AS
SELECT 
  t.entreprise_id,
  t.exercice_fiscal_id,
  EXTRACT(QUARTER FROM t.date_transaction) as trimestre,
  CASE EXTRACT(QUARTER FROM t.date_transaction)
    WHEN 1 THEN 'T1'
    WHEN 2 THEN 'T2' 
    WHEN 3 THEN 'T3'
    WHEN 4 THEN 'T4'
  END as trimestre_nom,
  
  SUM(t.montant_total) as chiffre_affaires,
  COUNT(*) as nombre_transactions,
  AVG(t.montant_total) as panier_moyen,
  
  -- Croissance trimestrielle
  LAG(SUM(t.montant_total)) OVER (PARTITION BY t.entreprise_id, t.exercice_fiscal_id ORDER BY EXTRACT(QUARTER FROM t.date_transaction)) as ca_trimestre_precedent,
  
  CASE 
    WHEN LAG(SUM(t.montant_total)) OVER (PARTITION BY t.entreprise_id, t.exercice_fiscal_id ORDER BY EXTRACT(QUARTER FROM t.date_transaction)) > 0 THEN
      ROUND(((SUM(t.montant_total) - 
              LAG(SUM(t.montant_total)) OVER (PARTITION BY t.entreprise_id, t.exercice_fiscal_id ORDER BY EXTRACT(QUARTER FROM t.date_transaction))) / 
             LAG(SUM(t.montant_total)) OVER (PARTITION BY t.entreprise_id, t.exercice_fiscal_id ORDER BY EXTRACT(QUARTER FROM t.date_transaction))) * 100, 1)
    ELSE 0
  END as croissance_trimestrielle

FROM transactions t
JOIN exercices_fiscaux ef ON ef.id = t.exercice_fiscal_id AND ef.statut = 'en_cours'
WHERE t.type_transaction = 'revenu'
GROUP BY t.entreprise_id, t.exercice_fiscal_id, EXTRACT(QUARTER FROM t.date_transaction)
ORDER BY trimestre;

-- 9. VIEW pour la Projection Fiscale (CORRECT)
CREATE OR REPLACE VIEW projection_fiscale AS
SELECT 
  e.id as entreprise_id,
  ef.id as exercice_fiscal_id,
  ef.annee,
  
  -- Résultat fiscal estimé
  COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) - 
           SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) as resultat_fiscal,
  
  -- Impôt estimé (simplifié)
  CASE 
    WHEN (SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) - 
          SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END)) <= 42000 THEN
      ROUND((SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) - 
             SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END)) * 0.15, 2)
    ELSE
      ROUND(42000 * 0.15 + 
            ((SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) - 
              SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END)) - 42000) * 0.28, 2)
  END as impot_estime,
  
  -- Cotisations sociales estimées
  ROUND(COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) * 0.45, 0), 2) as cotisations_sociales_estimees,

  -- Total des prélèvements
  ROUND(
    CASE 
      WHEN (SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) - 
            SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END)) <= 42000 THEN
        (SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) - 
         SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END)) * 0.15
      ELSE
        42000 * 0.15 + 
        ((SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) - 
          SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END)) - 42000) * 0.28
    END + 
    COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) * 0.45, 0), 2
  ) as total_prelevements

FROM entreprises e
JOIN exercices_fiscaux ef ON ef.entreprise_id = e.id AND ef.statut = 'en_cours'
LEFT JOIN transactions t ON t.exercice_fiscal_id = ef.id
GROUP BY e.id, ef.id, ef.annee;

-- 10. VIEW pour le Radar des Performances (CORRECT)
CREATE OR REPLACE VIEW radar_performances AS
SELECT 
  e.id as entreprise_id,
  ef.id as exercice_fiscal_id,
  
  -- Score Revenus (0-100)
  LEAST(100, GREATEST(0, 
    ROUND((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) / 
           NULLIF(MAX(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END)) OVER (), 0)) * 100, 0)
  )) as score_revenus,
  
  -- Score Rentabilité (0-100)
  LEAST(100, GREATEST(0,
    CASE 
      WHEN SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) > 0 THEN
        ROUND(((SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) - 
                SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END)) / 
               SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END)) * 200, 0)
      ELSE 0
    END
  )) as score_rentabilite,
  
  -- Score Trésorerie (0-100)
  LEAST(100, GREATEST(0,
    CASE 
      WHEN COALESCE(SUM(cb.solde_actuel), 0) > 0 THEN
        ROUND((COALESCE(SUM(cb.solde_actuel), 0) / 
               (COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 1) / 30)) / 10, 0)
      ELSE 0
    END
  )) as score_tresorerie,
  
  -- Score Croissance (0-100) - placeholder
  85 as score_croissance,
  
  -- Score Charges (0-100)
  LEAST(100, GREATEST(0,
    CASE 
      WHEN SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END) > 0 THEN
        100 - ROUND((SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END) / 
                     SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END)) * 100, 0)
      ELSE 0
    END
  )) as score_charges,
  
  -- Score Liquidité (0-100)
  LEAST(100, GREATEST(0,
    CASE 
      WHEN COALESCE(SUM(cb.solde_actuel), 0) > 0 AND 
           COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) > 0 THEN
        ROUND((COALESCE(SUM(cb.solde_actuel), 0) / 
               (COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 1) / 30)) / 3, 0)
      ELSE 0
    END
  )) as score_liquidite

FROM entreprises e
JOIN exercices_fiscaux ef ON ef.entreprise_id = e.id AND ef.statut = 'en_cours'
LEFT JOIN transactions t ON t.exercice_fiscal_id = ef.id
LEFT JOIN comptes_bancaires cb ON cb.entreprise_id = e.id AND cb.actif = true
GROUP BY e.id, ef.id;

-- 11. VIEW pour les Tables (RevenueTable, DepenseTable) - CORRIGÉE
CREATE OR REPLACE VIEW transactions_detaillees AS
SELECT 
  t.id,
  t.entreprise_id,
  t.exercice_fiscal_id,
  t.date_transaction,
  t.libelle,
  t.montant_total,
  t.type_transaction,
  t.moyen_paiement,
  t.statut,
  t.rapproche,
  -- Utiliser les ventilations pour la catégorie
  COALESCE(v.categorie_nom, 'Non catégorisé') as categorie_nom,
  -- Couleur par défaut
  CASE COALESCE(v.categorie_nom, 'Non catégorisé')
    WHEN 'Salaires & charges' THEN '#FF6B6B'
    WHEN 'Loyer & charges locatives' THEN '#4ECDC4'
    WHEN 'Matériel & outillage' THEN '#45B7D1'
    WHEN 'Déplacements' THEN '#FFA07A'
    WHEN 'Télécom & fournitures' THEN '#98D8C8'
    WHEN 'Formation' THEN '#F7DC6F'
    ELSE '#BB8FCE'
  END as categorie_couleur,
  cb.nom_compte as compte_bancaire,
  TO_CHAR(t.date_transaction, 'Mon') as mois_court,
  EXTRACT(MONTH FROM t.date_transaction) as mois_numero
  
FROM transactions t
-- Jointure avec ventilations pour la catégorie
LEFT JOIN ventilations v ON v.transaction_id = t.id
LEFT JOIN comptes_bancaires cb ON cb.id = t.compte_bancaire_id
JOIN exercices_fiscaux ef ON ef.id = t.exercice_fiscal_id AND ef.statut = 'en_cours'
ORDER BY t.date_transaction DESC;

-- View pour l'analyse des clients
CREATE OR REPLACE VIEW analyse_clients AS
SELECT 
  t.entreprise_id,
  t.exercice_fiscal_id,
  -- Extraire le client du libellé (logique à adapter)
  CASE 
    WHEN t.libelle ILIKE '%client a%' OR t.libelle ILIKE '%société a%' THEN 'Client A'
    WHEN t.libelle ILIKE '%client b%' OR t.libelle ILIKE '%société b%' THEN 'Client B'
    WHEN t.libelle ILIKE '%client c%' OR t.libelle ILIKE '%société c%' THEN 'Client C'
    WHEN t.libelle ILIKE '%client d%' OR t.libelle ILIKE '%société d%' THEN 'Client D'
    WHEN t.libelle ILIKE '%client e%' OR t.libelle ILIKE '%société e%' THEN 'Client E'
    WHEN t.libelle ILIKE '%client f%' OR t.libelle ILIKE '%société f%' THEN 'Client F'
    WHEN t.libelle ILIKE '%client g%' OR t.libelle ILIKE '%société g%' THEN 'Client G'
    WHEN t.libelle ILIKE '%client h%' OR t.libelle ILIKE '%société h%' THEN 'Client H'
    ELSE 'Autres clients'
  END as nom_client,
  
  SUM(t.montant_total) as chiffre_affaires,
  COUNT(*) as nombre_transactions,
  AVG(t.montant_total) as panier_moyen

FROM transactions t
JOIN exercices_fiscaux ef ON ef.id = t.exercice_fiscal_id AND ef.statut = 'en_cours'
WHERE t.type_transaction = 'revenu'
GROUP BY t.entreprise_id, t.exercice_fiscal_id, 
  CASE 
    WHEN t.libelle ILIKE '%client a%' OR t.libelle ILIKE '%société a%' THEN 'Client A'
    WHEN t.libelle ILIKE '%client b%' OR t.libelle ILIKE '%société b%' THEN 'Client B'
    WHEN t.libelle ILIKE '%client c%' OR t.libelle ILIKE '%société c%' THEN 'Client C'
    WHEN t.libelle ILIKE '%client d%' OR t.libelle ILIKE '%société d%' THEN 'Client D'
    WHEN t.libelle ILIKE '%client e%' OR t.libelle ILIKE '%société e%' THEN 'Client E'
    WHEN t.libelle ILIKE '%client f%' OR t.libelle ILIKE '%société f%' THEN 'Client F'
    WHEN t.libelle ILIKE '%client g%' OR t.libelle ILIKE '%société g%' THEN 'Client G'
    WHEN t.libelle ILIKE '%client h%' OR t.libelle ILIKE '%société h%' THEN 'Client H'
    ELSE 'Autres clients'
  END
HAVING SUM(t.montant_total) > 0
ORDER BY chiffre_affaires DESC;