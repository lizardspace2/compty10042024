# 🇫🇷 Module Fiscalité pour Professionnels Libéraux

## 📋 Vue d'ensemble

Ce module permet aux professionnels libéraux français de :
- ✅ Calculer automatiquement leurs charges selon leur régime fiscal
- ✅ Comparer les différents régimes fiscaux (Micro-BNC, BNC Réel, Auto-Entrepreneur, Société)
- ✅ Suivre les seuils fiscaux en temps réel
- ✅ Optimiser leur situation fiscale avec des recommandations personnalisées
- ✅ Visualiser les projections annuelles

## 🎯 Régimes Fiscaux Supportés

### 1. **Micro-BNC** (Micro-Bénéfices Non Commerciaux)
**Conditions :** CA ≤ 77 700 € (2025)

**Caractéristiques :**
- Abattement forfaitaire de 34% (minimum 305€)
- Cotisations sociales : ≈22% du CA
- Pas de TVA (franchise en base)
- Comptabilité simplifiée

**Composant :** `MicroBNCComponent`

**Affichage :**
- Suivi du seuil avec barre de progression
- CA actuel, abattement, revenu imposable
- Cotisations sociales estimées
- Projection annuelle
- Alerte de dépassement de seuil

### 2. **BNC Réel** (Déclaration contrôlée)
**Conditions :** CA > 77 700 € ou option volontaire

**Caractéristiques :**
- Déduction des dépenses réelles
- Comptabilité complète obligatoire
- Cotisations sociales : ≈45% du bénéfice
- Impôt sur le revenu selon barème progressif

**Composant :** `BNCReelComponent`

**Affichage :**
- Recettes totales
- Dépenses déductibles
- Bénéfice net
- Détail des charges (cotisations + IR)
- Revenu net après tout
- Taux de marge

### 3. **Auto-Entrepreneur**
**Conditions :** CA ≤ 77 700 €

**Caractéristiques :**
- Cotisations sociales : 22% du CA
- Prélèvement libératoire IR : 2.2% du CA (optionnel)
- Total charges : 24.2% du CA
- Franchise TVA jusqu'à 36 800€

**Composant :** `AutoEntrepreneurComponent`

**Affichage :**
- Suivi seuil CA auto-entrepreneur
- Statut TVA (franchise base/sursis/obligatoire)
- Détail des charges
- Revenu net
- Pourcentage net du CA

### 4. **Société (SASU/EURL - IS)**
**Conditions :** Toutes structures en société

**Caractéristiques :**
- Impôt sur les sociétés :
  - 15% jusqu'à 42 500€
  - 25% au-delà
- Dividendes : Flat tax 30%
- Protection patrimoniale

**Composant :** `SocieteISComponent`

**Affichage :**
- Chiffre d'affaires
- Bénéfice avant IS
- Montant de l'IS
- Bénéfice net après IS
- Dividendes potentiels (70% du bénéfice)
- Flat tax sur dividendes
- Dividendes nets

### 5. **Comparaison des Régimes**
**Composant :** `ComparaisonRegimesComponent`

**Affichage :**
- Classement des régimes par revenu net
- Régime optimal recommandé
- Barres de progression comparatives
- Guide de choix selon la situation

## 📊 Vues SQL Créées

Le système s'appuie sur 5 vues SQL optimisées :

### 1. `calcul_micro_bnc`
Calcule automatiquement :
- CA actuel et seuil
- Pourcentage du seuil atteint
- Abattement forfaitaire (34%, min 305€)
- Revenu imposable
- Cotisations sociales (22%)
- Projection annuelle
- Risque de dépassement

### 2. `calcul_bnc_reel`
Calcule :
- Recettes totales
- Dépenses déductibles
- Bénéfice net
- Cotisations sociales (45%)
- Impôt sur le revenu (barème progressif 2025)
- Revenu net après tout

### 3. `calcul_auto_entrepreneur`
Calcule :
- CA et seuils (AE, TVA base, TVA majoré)
- Cotisations sociales (22%)
- Prélèvement libératoire (2.2%)
- Revenu net
- Statut TVA

### 4. `calcul_societe_is`
Calcule :
- CA, charges, bénéfice
- IS (15%/25%)
- Bénéfice net après IS
- Dividendes potentiels
- Flat tax (30%)

### 5. `comparaison_regimes`
Compare les 3 régimes principaux et recommande le meilleur

## 🚀 Installation

### Étape 1 : Créer les Vues SQL

Exécutez le fichier `views_fiscalite.sql` dans Supabase SQL Editor :

```bash
# Dans Supabase Dashboard :
# 1. SQL Editor
# 2. New Query
# 3. Copier-coller TOUT le contenu de views_fiscalite.sql
# 4. Run (Ctrl/Cmd + Enter)
```

### Étape 2 : Vérifier les Vues

```sql
SELECT table_name
FROM information_schema.views
WHERE table_schema = 'public'
  AND table_name LIKE 'calcul_%'
ORDER BY table_name;
```

Vous devriez voir :
- ✅ calcul_auto_entrepreneur
- ✅ calcul_bnc_reel
- ✅ calcul_micro_bnc
- ✅ calcul_societe_is
- ✅ comparaison_regimes

### Étape 3 : Accorder les Permissions

```sql
GRANT SELECT ON calcul_micro_bnc TO authenticated;
GRANT SELECT ON calcul_bnc_reel TO authenticated;
GRANT SELECT ON calcul_auto_entrepreneur TO authenticated;
GRANT SELECT ON calcul_societe_is TO authenticated;
GRANT SELECT ON comparaison_regimes TO authenticated;
```

### Étape 4 : Définir le Régime Fiscal

Mettez à jour la table `entreprises` pour définir le régime fiscal :

```sql
UPDATE entreprises
SET regime_fiscal = 'micro-bnc'  -- ou 'bnc-reel', 'auto-entrepreneur', 'societe'
WHERE user_id = 'VOTRE_USER_ID';
```

### Étape 5 : Tester

```bash
npm start
# Allez sur /pilotage
# Le module "Fiscalité et Optimisation" devrait apparaître en haut
```

## 🎨 Utilisation

### Sélectionner un Régime

Le composant `FiscaliteSelector` affiche un menu déroulant avec tous les régimes :

```jsx
<Select>
  <option value="micro-bnc">Micro-BNC - ≤ 77 700 €</option>
  <option value="bnc-reel">BNC Réel - > 77 700 €</option>
  <option value="auto-entrepreneur">Auto-Entrepreneur - ≤ 77 700 €</option>
  <option value="societe">Société (SASU/EURL - IS)</option>
  <option value="comparaison">📊 Comparer tous les régimes</option>
</Select>
```

### Alertes Intelligentes

Le système affiche des alertes automatiques :

- ✅ **Régime optimal** : "Vous êtes dans le régime optimal"
- 💡 **Suggestion** : "Le régime X pourrait être plus avantageux"
- ⚠️ **Dépassement seuil** : "Attention, vous approchez du seuil"

### Recommandations

Le système recommande automatiquement le meilleur régime basé sur :
- Le chiffre d'affaires
- Le niveau de dépenses
- Le ratio dépenses/CA

**Exemple :**
- Si **dépenses < 34% du CA** et **CA < 77 700€** → **Micro-BNC**
- Si **dépenses > 34% du CA** → **BNC Réel**
- Pour démarrer → **Auto-Entrepreneur**

## 📈 Barèmes 2025

### Impôt sur le Revenu (IR) - Barème progressif

| Tranche | Taux |
|---------|------|
| Jusqu'à 11 294€ | 0% |
| De 11 294€ à 28 797€ | 11% |
| De 28 797€ à 82 341€ | 30% |
| De 82 341€ à 177 106€ | 41% |
| Plus de 177 106€ | 45% |

### Cotisations Sociales

| Régime | Taux |
|--------|------|
| Micro-BNC | ≈22% du CA |
| BNC Réel | ≈45% du bénéfice |
| Auto-Entrepreneur | 22% du CA |
| Prélèvement libératoire | +2.2% du CA |

### Seuils Fiscaux 2025

| Seuil | Montant |
|-------|---------|
| Micro-BNC / Auto-Entrepreneur | 77 700€ |
| Franchise TVA (base) | 36 800€ |
| Franchise TVA (majoré) | 39 100€ |
| IS taux réduit | 42 500€ |

## 🔧 Personnalisation

### Changer le Régime Par Défaut

Dans `entreprises` table :

```sql
ALTER TABLE entreprises
ADD COLUMN IF NOT EXISTS regime_fiscal VARCHAR DEFAULT 'micro-bnc';
```

### Ajouter un Nouveau Régime

1. Créer une nouvelle vue SQL
2. Ajouter un composant React
3. Mettre à jour `FiscaliteSelector.jsx`
4. Ajouter l'option dans le Select

## 📊 Données Affichées

### Pour Micro-BNC
- 📊 Suivi du seuil (barre de progression)
- 💰 CA, Abattement 34%, Revenu imposable
- 📈 Cotisations sociales 22%
- 🔮 Projection annuelle
- ⚠️ Alertes dépassement

### Pour BNC Réel
- 💵 Recettes, Dépenses, Bénéfice
- 📊 Tableau détaillé des charges
- 📈 Cotisations 45% + IR
- 💰 Revenu net après tout
- 📊 Taux de marge

### Pour Auto-Entrepreneur
- 📊 Seuil CA (barre de progression)
- 🧾 Statut TVA (avec badges)
- 💰 Cotisations 22% + PL 2.2%
- 💵 Revenu net + %
- 📈 Détail des charges

### Pour Société
- 💼 CA, Bénéfice, IS
- 📊 Dividendes potentiels
- 💰 Flat tax 30%
- 💵 Dividendes nets
- 📈 Tableau de distribution

### Pour Comparaison
- 🏆 Régime optimal (mis en avant)
- 📊 Classement par revenu net
- 📈 Barres de progression
- 💡 Guide de choix

## 🛠️ Dépendances

- React 18+
- Chakra UI 2+
- Supabase JS Client 2+
- react-icons

Aucune nouvelle dépendance nécessaire !

## 📝 Structure des Fichiers

```
src/components/Pilotage/
├── hooks/
│   └── useFiscaliteData.js          # Hook personnalisé pour les données fiscales
├── components/
│   └── fiscalite/
│       ├── FiscaliteSelector.jsx     # Composant principal (sélecteur)
│       └── RegimeComponents.jsx      # Tous les sous-composants des régimes
└── Pilotage.jsx                      # Intégration dans le dashboard
```

## 🧪 Tests

### Test 1 : Micro-BNC avec CA < seuil
```sql
-- Insérer des transactions test
INSERT INTO transactions (entreprise_id, exercice_fiscal_id, type_transaction, montant_total, date_transaction, libelle)
VALUES
  ('VOTRE_ENTREPRISE_ID', 'EXERCICE_ID', 'revenu', 5000, '2025-01-15', 'Honoraires Client A'),
  ('VOTRE_ENTREPRISE_ID', 'EXERCICE_ID', 'depense', 800, '2025-01-20', 'Achat matériel');
```

### Test 2 : Vérifier les calculs
```sql
SELECT * FROM calcul_micro_bnc WHERE entreprise_id = 'VOTRE_ENTREPRISE_ID';
```

### Test 3 : Comparaison
```sql
SELECT * FROM comparaison_regimes WHERE entreprise_id = 'VOTRE_ENTREPRISE_ID';
```

## 🐛 Résolution des Problèmes

### Erreur : "Table or view not found"
**Solution :** Exécuter `views_fiscalite.sql` dans Supabase

### Aucune donnée n'apparaît
**Solution :** Vérifier qu'il existe un exercice fiscal avec `statut = 'en_cours'`

### Régime non détecté
**Solution :** Définir `regime_fiscal` dans la table `entreprises`

## 📚 Ressources

- [Régime Micro-BNC - impots.gouv.fr](https://www.impots.gouv.fr/)
- [Auto-Entrepreneur - URSSAF](https://www.urssaf.fr/)
- [BNC Réel - Service Public](https://www.service-public.fr/)

## 🤝 Support

Pour toute question :
1. Vérifier que les vues SQL sont créées
2. Vérifier les permissions
3. Consulter les logs de la console navigateur
4. Consulter les logs Supabase

---

**Version :** 1.0.0
**Date :** 2025-10-16
**Auteur :** Claude Code
**Licence :** Propriétaire
