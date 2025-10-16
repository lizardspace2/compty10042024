-- ============================================================================
-- VUES SQL POUR LA FISCALITÉ DES PROFESSIONNELS LIBÉRAUX EN FRANCE
-- ============================================================================
-- À ajouter après les vues existantes dans views.sql
-- Date: 2025-10-16
-- Version: 1.0.0
-- ============================================================================

-- 16. VIEW pour le calcul Micro-BNC
CREATE OR REPLACE VIEW calcul_micro_bnc AS
SELECT
  e.id as entreprise_id,
  ef.id as exercice_fiscal_id,
  ef.annee,
  e.regime_fiscal,

  -- Chiffre d'affaires (recettes encaissées)
  COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) as chiffre_affaires,

  -- Seuil Micro-BNC pour 2025
  77700 as seuil_micro_bnc,

  -- Pourcentage du seuil atteint
  CASE
    WHEN 77700 > 0 THEN
      ROUND((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) / 77700) * 100, 1)
    ELSE 0
  END as pourcentage_seuil,

  -- Abattement forfaitaire de 34% (minimum 305€)
  GREATEST(
    COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) * 0.34,
    305
  ) as abattement_forfaitaire,

  -- Revenu imposable après abattement
  COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
  GREATEST(
    COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) * 0.34,
    305
  ) as revenu_imposable,

  -- Cotisations sociales (environ 22% du CA pour micro-BNC)
  ROUND(COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) * 0.22, 2) as cotisations_sociales_estimees,

  -- Projection annuelle basée sur les jours écoulés
  CASE
    WHEN EXTRACT(DOY FROM CURRENT_DATE) > 0 THEN
      ROUND((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) /
             EXTRACT(DOY FROM CURRENT_DATE)) * 365, 2)
    ELSE 0
  END as projection_annuelle,

  -- Risque de dépassement
  CASE
    WHEN EXTRACT(DOY FROM CURRENT_DATE) > 0 THEN
      CASE
        WHEN ((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) /
               EXTRACT(DOY FROM CURRENT_DATE)) * 365) > 77700 THEN true
        ELSE false
      END
    ELSE false
  END as risque_depassement

FROM entreprises e
JOIN exercices_fiscaux ef ON ef.entreprise_id = e.id AND ef.statut = 'en_cours'
LEFT JOIN transactions t ON t.exercice_fiscal_id = ef.id
GROUP BY e.id, ef.id, ef.annee, e.regime_fiscal;

-- 17. VIEW pour le calcul BNC Réel (Déclaration contrôlée)
CREATE OR REPLACE VIEW calcul_bnc_reel AS
SELECT
  e.id as entreprise_id,
  ef.id as exercice_fiscal_id,
  ef.annee,
  e.regime_fiscal,

  -- Recettes totales
  COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) as recettes_totales,

  -- Dépenses déductibles
  COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) as depenses_deductibles,

  -- Bénéfice net (Recettes - Dépenses)
  COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
  COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) as benefice_net,

  -- Cotisations sociales (environ 45% du bénéfice)
  ROUND((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
         COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) * 0.45, 2) as cotisations_sociales,

  -- Impôt sur le revenu estimé (barème progressif)
  CASE
    WHEN (COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
          COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) <= 11294 THEN 0
    WHEN (COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
          COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) <= 28797 THEN
      ROUND((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
             COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) - 11294) * 0.11, 2)
    WHEN (COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
          COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) <= 82341 THEN
      ROUND(1925.33 + ((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
                        COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) - 28797) * 0.30), 2)
    WHEN (COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
          COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) <= 177106 THEN
      ROUND(17988.63 + ((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
                         COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) - 82341) * 0.41), 2)
    ELSE
      ROUND(56842.28 + ((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
                         COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) - 177106) * 0.45), 2)
  END as impot_sur_revenu,

  -- Revenu net après charges et impôts
  (COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
   COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) -
  ROUND((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
         COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) * 0.45, 2) -
  CASE
    WHEN (COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
          COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) <= 11294 THEN 0
    ELSE ROUND((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
                COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) - 11294) * 0.11, 2)
  END as revenu_net_apres_tout

FROM entreprises e
JOIN exercices_fiscaux ef ON ef.entreprise_id = e.id AND ef.statut = 'en_cours'
LEFT JOIN transactions t ON t.exercice_fiscal_id = ef.id
GROUP BY e.id, ef.id, ef.annee, e.regime_fiscal;

-- 18. VIEW pour le calcul Auto-Entrepreneur
CREATE OR REPLACE VIEW calcul_auto_entrepreneur AS
SELECT
  e.id as entreprise_id,
  ef.id as exercice_fiscal_id,
  ef.annee,
  e.regime_fiscal,

  -- Chiffre d'affaires
  COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) as chiffre_affaires,

  -- Seuils
  77700 as seuil_ae,
  36800 as seuil_tva_base,
  39100 as seuil_tva_majore,

  -- Cotisations sociales (22% pour activité libérale)
  ROUND(COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) * 0.22, 2) as cotisations_sociales,

  -- Prélèvement libératoire si option choisie (2.2% du CA)
  ROUND(COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) * 0.022, 2) as prelevement_liberatoire,

  -- Total charges si prélèvement libératoire (22% + 2.2% = 24.2%)
  ROUND(COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) * 0.242, 2) as total_charges_avec_pl,

  -- Revenu net après charges
  COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
  ROUND(COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) * 0.242, 2) as revenu_net,

  -- TVA applicable ?
  CASE
    WHEN COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) <= 36800 THEN false
    WHEN COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) <= 39100 THEN true -- franchise en sursis
    ELSE true
  END as tva_applicable,

  -- Statut TVA
  CASE
    WHEN COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) <= 36800 THEN 'Franchise en base'
    WHEN COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) <= 39100 THEN 'Franchise en sursis'
    ELSE 'TVA obligatoire'
  END as statut_tva

FROM entreprises e
JOIN exercices_fiscaux ef ON ef.entreprise_id = e.id AND ef.statut = 'en_cours'
LEFT JOIN transactions t ON t.exercice_fiscal_id = ef.id
GROUP BY e.id, ef.id, ef.annee, e.regime_fiscal;

-- 19. VIEW pour le calcul Société (IS)
CREATE OR REPLACE VIEW calcul_societe_is AS
SELECT
  e.id as entreprise_id,
  ef.id as exercice_fiscal_id,
  ef.annee,
  e.regime_fiscal,
  e.forme_juridique,

  -- Chiffre d'affaires
  COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) as chiffre_affaires,

  -- Charges
  COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) as charges,

  -- Bénéfice avant IS
  COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
  COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) as benefice_avant_is,

  -- Impôt sur les sociétés (IS)
  -- Taux réduit 15% jusqu'à 42 500€, puis 25% au-delà
  CASE
    WHEN (COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
          COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) <= 42500 THEN
      ROUND((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
             COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) * 0.15, 2)
    ELSE
      ROUND(42500 * 0.15 +
            ((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
              COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) - 42500) * 0.25, 2)
  END as impot_societes,

  -- Bénéfice net après IS
  (COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
   COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) -
  CASE
    WHEN (COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
          COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) <= 42500 THEN
      ROUND((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
             COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) * 0.15, 2)
    ELSE
      ROUND(42500 * 0.15 +
            ((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
              COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) - 42500) * 0.25, 2)
  END as benefice_net_apres_is,

  -- Dividendes potentiels (70% du bénéfice net, 30% gardé en réserve)
  ROUND(((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
          COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) -
         CASE
           WHEN (COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
                 COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) <= 42500 THEN
             ROUND((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
                    COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) * 0.15, 2)
           ELSE
             ROUND(42500 * 0.15 +
                   ((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
                     COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) - 42500) * 0.25, 2)
         END) * 0.70, 2) as dividendes_potentiels,

  -- Flat tax sur dividendes (30%)
  ROUND(((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
          COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) -
         CASE
           WHEN (COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
                 COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) <= 42500 THEN
             ROUND((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
                    COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) * 0.15, 2)
           ELSE
             ROUND(42500 * 0.15 +
                   ((COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
                     COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) - 42500) * 0.25, 2)
         END) * 0.70 * 0.30, 2) as flat_tax_dividendes

FROM entreprises e
JOIN exercices_fiscaux ef ON ef.entreprise_id = e.id AND ef.statut = 'en_cours'
LEFT JOIN transactions t ON t.exercice_fiscal_id = ef.id
GROUP BY e.id, ef.id, ef.annee, e.regime_fiscal, e.forme_juridique;

-- 20. VIEW comparaison des régimes fiscaux
CREATE OR REPLACE VIEW comparaison_regimes AS
SELECT
  e.id as entreprise_id,
  ef.id as exercice_fiscal_id,

  -- Données communes
  COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) as ca,
  COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) as depenses,

  -- Micro-BNC
  COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
  ROUND(COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) * 0.22, 2) as net_micro_bnc,

  -- BNC Réel (approximation)
  (COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
   COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0)) * 0.55 as net_bnc_reel,

  -- Auto-entrepreneur
  COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) -
  ROUND(COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) * 0.242, 2) as net_auto_entrepreneur,

  -- Meilleur régime (simplifié)
  CASE
    WHEN COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) <= 77700 AND
         COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) <
         (COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) * 0.34) THEN 'Micro-BNC'
    WHEN COALESCE(SUM(CASE WHEN t.type_transaction = 'depense' THEN t.montant_total ELSE 0 END), 0) >
         (COALESCE(SUM(CASE WHEN t.type_transaction = 'revenu' THEN t.montant_total ELSE 0 END), 0) * 0.34) THEN 'BNC Réel'
    ELSE 'Auto-entrepreneur'
  END as regime_optimal

FROM entreprises e
JOIN exercices_fiscaux ef ON ef.entreprise_id = e.id AND ef.statut = 'en_cours'
LEFT JOIN transactions t ON t.exercice_fiscal_id = ef.id
GROUP BY e.id, ef.id;

-- ============================================================================
-- PERMISSIONS
-- ============================================================================

GRANT SELECT ON calcul_micro_bnc TO authenticated;
GRANT SELECT ON calcul_bnc_reel TO authenticated;
GRANT SELECT ON calcul_auto_entrepreneur TO authenticated;
GRANT SELECT ON calcul_societe_is TO authenticated;
GRANT SELECT ON comparaison_regimes TO authenticated;

-- ============================================================================
-- VÉRIFICATION
-- ============================================================================

SELECT 'Vues fiscalité créées avec succès!' as statut,
       COUNT(*) as nombre_vues_fiscalite
FROM information_schema.views
WHERE table_schema = 'public'
  AND table_name IN (
    'calcul_micro_bnc',
    'calcul_bnc_reel',
    'calcul_auto_entrepreneur',
    'calcul_societe_is',
    'comparaison_regimes'
  );
