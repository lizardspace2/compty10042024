# Configuration de la fonctionnalité Profil et Entreprise

Ce guide explique comment mettre en place la gestion des profils utilisateurs et des entreprises dans l'application.

## Fichiers modifiés et créés

### Services créés
- `src/services/profileService.js` - Service pour gérer les profils utilisateurs
- `src/services/entrepriseService.js` - Service pour gérer les entreprises

### Composants mis à jour
- `src/components/Profile/components/Tabs/Profil/components/FormulaireComplet.jsx` - Formulaire du profil utilisateur (connecté à Supabase)
- `src/components/Profile/components/Tabs/Profil/components/InformationsComptablesForm.jsx` - Formulaire de l'entreprise (connecté à Supabase)
- `src/components/Transactions/TransactionsImproved.jsx` - Message d'erreur amélioré

### Base de données
- `database.sql` - Structure mise à jour de la table `profiles`
- `migration_profile_fields.sql` - Script de migration pour ajouter les champs manquants

## Étapes d'installation

### 1. Appliquer les migrations SQL

#### Option A : Nouvelle installation
Si vous créez une nouvelle base de données, utilisez simplement :
```sql
-- Exécutez le fichier database.sql complet
psql -U votre_utilisateur -d votre_base < database.sql
```

#### Option B : Base de données existante
Si vous avez déjà une base de données en production, appliquez uniquement la migration :
```sql
-- Exécutez uniquement le fichier de migration
psql -U votre_utilisateur -d votre_base < migration_profile_fields.sql
```

#### Via l'interface Supabase
1. Connectez-vous à votre projet Supabase
2. Allez dans l'éditeur SQL
3. Copiez le contenu de `migration_profile_fields.sql`
4. Exécutez la requête

### 2. Vérifier les politiques RLS (Row Level Security)

Assurez-vous que les politiques RLS sont bien en place pour les tables `profiles` et `entreprises` :

```sql
-- Vérifier les politiques existantes
SELECT tablename, policyname FROM pg_policies
WHERE tablename IN ('profiles', 'entreprises');
```

Les politiques nécessaires sont déjà définies dans `database.sql`.

### 3. Tester la fonctionnalité

1. **Connexion** : Connectez-vous avec un utilisateur
2. **Accéder au profil** : Allez sur `/profile`
3. **Remplir les informations personnelles** :
   - Prénom, Nom, Email (lecture seule)
   - Téléphone, Adresse complète
   - Cliquez sur "Enregistrer"
4. **Créer une entreprise** :
   - Remplissez le formulaire "Informations de l'entreprise"
   - La dénomination est obligatoire
   - Le SIRET est optionnel mais doit contenir 14 chiffres s'il est renseigné
   - Cliquez sur "Créer mon entreprise"
5. **Vérifier l'accès aux transactions** :
   - Allez sur `/transactions`
   - Vous devriez maintenant voir vos transactions au lieu du message d'erreur

## Structure des données

### Table `profiles`
```sql
- id (UUID) - ID de l'utilisateur (référence auth.users)
- email (TEXT) - Email de l'utilisateur
- first_name (TEXT) - Prénom
- last_name (TEXT) - Nom
- full_name (TEXT) - Nom complet (généré automatiquement)
- phone (TEXT) - Téléphone
- street_number (TEXT) - Numéro de rue
- street_type (TEXT) - Type de voie (rue, avenue, etc.)
- street_name (TEXT) - Nom de la voie
- address (TEXT) - Adresse complète (générée automatiquement)
- city (TEXT) - Ville
- postal_code (TEXT) - Code postal
- country (TEXT) - Pays (défaut: France)
- avatar_url (TEXT) - URL de l'avatar
- created_at (TIMESTAMPTZ) - Date de création
- updated_at (TIMESTAMPTZ) - Date de mise à jour
```

### Table `entreprises`
```sql
- id (UUID) - ID de l'entreprise
- user_id (UUID) - ID de l'utilisateur propriétaire
- siret (VARCHAR(14)) - Numéro SIRET (unique, optionnel)
- denomination (TEXT) - Nom de l'entreprise (obligatoire)
- profession (TEXT) - Profession
- aga (TEXT) - Association de Gestion Agréée
- reference_obligation_fiscale (VARCHAR(50)) - Type de régime (BNC, BIC, BA)
- date_creation (DATE) - Date de création de l'entreprise
- forme_juridique (VARCHAR(100)) - Forme juridique (EI, EURL, SARL, etc.)
- regime_fiscal (VARCHAR(100)) - Régime fiscal
- regime_tva (VARCHAR(100)) - Régime TVA (défaut: exonéré de TVA)
- code_ape (VARCHAR(10)) - Code APE
- numero_rcs (TEXT) - Numéro RCS
- created_at (TIMESTAMPTZ) - Date de création
- updated_at (TIMESTAMPTZ) - Date de mise à jour
```

## Fonctionnalités implémentées

### Profil utilisateur
- ✅ Création et modification du profil
- ✅ Champs d'adresse détaillés
- ✅ Validation côté client
- ✅ Messages de succès/erreur
- ✅ État de chargement

### Entreprise
- ✅ Création et modification de l'entreprise
- ✅ Validation du SIRET (14 chiffres)
- ✅ Champ dénomination obligatoire
- ✅ Liste complète des professions
- ✅ Liste complète des formes juridiques
- ✅ Liste complète des régimes fiscaux
- ✅ Integration avec EntrepriseContext
- ✅ Message d'aide si pas d'entreprise

### Page Transactions
- ✅ Message d'erreur amélioré avec guide étape par étape
- ✅ Bouton d'action pour créer l'entreprise
- ✅ Design visuel professionnel

## Contexte EntrepriseContext

Le contexte `EntrepriseContext` est déjà en place et fournit :
- `entreprise` - Les données de l'entreprise courante
- `loading` - État de chargement
- `error` - Erreurs éventuelles
- `createEntreprise(data)` - Créer une entreprise
- `updateEntreprise(updates)` - Mettre à jour l'entreprise
- `refreshEntreprise()` - Rafraîchir les données

## Sécurité

- ✅ Row Level Security (RLS) activé sur toutes les tables
- ✅ Les utilisateurs ne peuvent voir que leurs propres données
- ✅ Les utilisateurs ne peuvent modifier que leurs propres données
- ✅ Validation des données côté client et serveur

## Prochaines étapes recommandées

1. **Validation du SIRET via API** : Intégrer une API de validation SIRET
2. **Upload d'avatar** : Implémenter l'upload d'avatar utilisateur
3. **Gestion de plusieurs entreprises** : Permettre à un utilisateur de gérer plusieurs entreprises
4. **Historique des modifications** : Tracer les modifications du profil et de l'entreprise
5. **Export des données** : Permettre l'export du profil et des données d'entreprise

## Dépannage

### Erreur : "Column does not exist"
Assurez-vous d'avoir exécuté la migration `migration_profile_fields.sql`

### Erreur : "Permission denied"
Vérifiez que les politiques RLS sont bien en place

### L'entreprise ne se crée pas
1. Vérifiez la console du navigateur pour les erreurs
2. Vérifiez que l'utilisateur est bien connecté
3. Vérifiez que le champ dénomination est rempli
4. Vérifiez les logs Supabase

### Les données ne se chargent pas
1. Vérifiez que le `EntrepriseContext` est bien dans le composant parent
2. Vérifiez que l'utilisateur est authentifié
3. Vérifiez les politiques RLS dans Supabase
