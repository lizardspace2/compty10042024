# 🚀 Guide d'Installation des Vues SQL

## ⚠️ Important

Les vues SQL **DOIVENT** être créées dans votre base de données Supabase avant que l'application puisse fonctionner correctement. Sans ces vues, vous verrez des erreurs 406 dans la console.

## 📋 Étapes d'Installation

### Étape 1 : Accéder à Supabase SQL Editor

1. Connectez-vous à [Supabase](https://app.supabase.com)
2. Sélectionnez votre projet
3. Dans le menu de gauche, cliquez sur **SQL Editor**
4. Cliquez sur **New Query**

### Étape 2 : Exécuter les Vues SQL

Copiez et exécutez **TOUT** le contenu du fichier `views.sql` dans l'éditeur SQL.

```sql
-- Le fichier views.sql contient toutes les vues nécessaires
-- Il faut l'exécuter en ENTIER
```

**⚡ Raccourci :**
- Utilisez `Ctrl/Cmd + A` pour sélectionner tout
- Collez le contenu de `views.sql`
- Cliquez sur **Run** ou utilisez `Ctrl/Cmd + Enter`

### Étape 3 : Vérifier la Création des Vues

Dans le SQL Editor, exécutez cette requête pour vérifier :

```sql
SELECT table_name
FROM information_schema.views
WHERE table_schema = 'public'
ORDER BY table_name;
```

Vous devriez voir ces 15 vues :
- ✅ `analyse_clients`
- ✅ `cash_flow_mensuel`
- ✅ `comparaison_annuelle`
- ✅ `donnees_mensuelles`
- ✅ `evolution_marge`
- ✅ `evolution_tresorerie`
- ✅ `kpi_globaux`
- ✅ `projection_fiscale`
- ✅ `radar_performances`
- ✅ `repartition_depenses`
- ✅ `revenus_trimestriels`
- ✅ `seuils_indicateurs`
- ✅ `stats_moyens_paiement`
- ✅ `transactions_detaillees`
- ✅ `working_capital_evolution`

### Étape 4 : Configurer les Permissions

**IMPORTANT** : Les vues doivent être accessibles par les utilisateurs authentifiés.

Exécutez ces commandes dans le SQL Editor :

```sql
-- Donner les permissions SELECT sur toutes les vues
GRANT SELECT ON kpi_globaux TO authenticated;
GRANT SELECT ON donnees_mensuelles TO authenticated;
GRANT SELECT ON stats_moyens_paiement TO authenticated;
GRANT SELECT ON repartition_depenses TO authenticated;
GRANT SELECT ON cash_flow_mensuel TO authenticated;
GRANT SELECT ON evolution_marge TO authenticated;
GRANT SELECT ON evolution_tresorerie TO authenticated;
GRANT SELECT ON revenus_trimestriels TO authenticated;
GRANT SELECT ON projection_fiscale TO authenticated;
GRANT SELECT ON radar_performances TO authenticated;
GRANT SELECT ON transactions_detaillees TO authenticated;
GRANT SELECT ON analyse_clients TO authenticated;
GRANT SELECT ON working_capital_evolution TO authenticated;
GRANT SELECT ON seuils_indicateurs TO authenticated;
GRANT SELECT ON comparaison_annuelle TO authenticated;

-- Si vous utilisez RLS (Row Level Security), vous devrez peut-être ajouter des policies
```

### Étape 5 : Activer l'API REST pour les Vues

Dans Supabase, les vues sont automatiquement exposées via l'API REST. Vérifiez que les vues apparaissent dans :

1. **Table Editor** > Cliquez sur "Views" dans le menu déroulant
2. Vous devriez voir toutes les vues listées

### Étape 6 : Tester l'Application

```bash
# Redémarrer l'application
npm start
```

Naviguez vers `/pilotage` et vérifiez la console du navigateur :
- ✅ Plus d'erreurs 406
- ✅ Les données se chargent correctement
- ✅ Message : "✅ Données chargées depuis les vues SQL"

## 🔧 Résolution des Problèmes

### Erreur 406 "Not Acceptable"

**Cause** : Les vues n'existent pas dans la base de données.

**Solution** :
1. Vérifiez que vous avez bien exécuté le fichier `views.sql` complet
2. Vérifiez les permissions avec `GRANT SELECT`
3. Rafraîchissez l'API Supabase dans Settings > API

### Erreur "Cannot coerce the result to a single JSON object"

**Cause** : La vue ne retourne aucune ligne (normal si vous n'avez pas encore de données).

**Solution** : C'est un avertissement, pas une erreur. L'application gère ce cas avec des valeurs par défaut.

### Erreur de Permission

**Cause** : L'utilisateur authentifié n'a pas accès aux vues.

**Solution** :
```sql
-- Donner toutes les permissions nécessaires
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;
```

### Les Vues Retournent des Données Vides

**Cause** : Vous n'avez pas encore de données dans les tables sources.

**Solution** :
1. Créez un exercice fiscal "en_cours"
2. Ajoutez des transactions
3. Les vues se peupleront automatiquement

## 📊 Tester une Vue Manuellement

Pour tester une vue spécifique dans le SQL Editor :

```sql
-- Remplacez VOTRE_ENTREPRISE_ID par votre ID d'entreprise
SELECT * FROM kpi_globaux
WHERE entreprise_id = 'VOTRE_ENTREPRISE_ID';

-- Vérifier les données mensuelles
SELECT * FROM donnees_mensuelles
WHERE entreprise_id = 'VOTRE_ENTREPRISE_ID'
ORDER BY mois_numero;
```

## ✅ Checklist d'Installation

- [ ] Fichier `views.sql` exécuté dans Supabase SQL Editor
- [ ] 15 vues créées (vérifiées avec la requête de vérification)
- [ ] Permissions accordées avec `GRANT SELECT`
- [ ] Vues visibles dans Table Editor
- [ ] Application redémarrée
- [ ] Plus d'erreurs 406 dans la console
- [ ] Données affichées dans le dashboard Pilotage

## 🆘 Support

Si vous rencontrez des problèmes :

1. **Vérifiez les logs Supabase** :
   - Dashboard > Logs > SQL Logs

2. **Vérifiez la console du navigateur** :
   - F12 > Console
   - Recherchez les messages de `useDashboardDataOptimized.js`

3. **Testez les vues manuellement** :
   - Utilisez les requêtes de test ci-dessus

4. **Vérifiez les prérequis** :
   - Tables `entreprises`, `exercices_fiscaux`, `transactions` existent
   - Au moins un exercice fiscal avec `statut = 'en_cours'`
   - Des transactions liées à cet exercice

## 📝 Note sur les Données de Test

Si vous n'avez pas encore de données réelles, les vues retourneront des ensembles vides. C'est normal et géré par l'application avec des valeurs par défaut.

Pour tester avec des données :
```sql
-- Créer un exercice fiscal de test
INSERT INTO exercices_fiscaux (entreprise_id, annee, date_debut, date_fin, statut)
VALUES ('VOTRE_ENTREPRISE_ID', 2024, '2024-01-01', '2024-12-31', 'en_cours');

-- Ajouter quelques transactions de test
INSERT INTO transactions (entreprise_id, exercice_fiscal_id, libelle, date_transaction, montant_total, type_transaction)
VALUES
  ('VOTRE_ENTREPRISE_ID', 'EXERCICE_ID', 'Vente Client A', '2024-01-15', 1500, 'revenu'),
  ('VOTRE_ENTREPRISE_ID', 'EXERCICE_ID', 'Achat Matériel', '2024-01-20', 500, 'depense');
```

---

**Date** : 2025-10-16
**Version** : 1.0.0
