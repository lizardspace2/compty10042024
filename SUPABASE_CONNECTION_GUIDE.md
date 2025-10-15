# Guide de Connexion Supabase - Application Comptabilité

Ce guide complet explique comment connecter toute votre application à Supabase.

## Table des matières
1. [Services créés](#services-créés)
2. [Composants connectés](#composants-connectés)
3. [Installation et migration](#installation-et-migration)
4. [Configuration des Buckets Storage](#configuration-des-buckets-storage)
5. [Tests de fonctionnalité](#tests-de-fonctionnalité)
6. [Dépannage](#dépannage)

---

## Services créés

Tous les services nécessaires ont été créés dans `/src/services/` :

### 1. **profileService.js** ✅
Gestion des profils utilisateurs
- `getProfile(userId)` - Récupère le profil
- `createProfile(profileData)` - Crée un profil
- `updateProfile(userId, updates)` - Met à jour le profil
- `uploadAvatar(file, userId)` - Upload d'avatar

### 2. **entrepriseService.js** ✅
Gestion des entreprises
- `getEntreprise(userId)` - Récupère l'entreprise
- `createEntreprise(entrepriseData)` - Crée une entreprise
- `updateEntreprise(entrepriseId, updates)` - Met à jour
- `deleteEntreprise(entrepriseId)` - Supprime
- `checkSiretExists(siret)` - Vérifie l'unicité du SIRET

### 3. **compteBancaireService.js** ✅
Gestion des comptes bancaires
- `getComptesBancaires(entrepriseId)` - Liste les comptes
- `getCompteBancaire(compteId)` - Récupère un compte
- `createCompteBancaire(entrepriseId, compteData)` - Crée un compte
- `updateCompteBancaire(compteId, updates)` - Met à jour
- `desactiverCompteBancaire(compteId)` - Désactive (soft delete)
- `reactiverCompteBancaire(compteId)` - Réactive
- `getTotalSoldes(entrepriseId)` - Calcule le solde total

### 4. **exerciceFiscalService.js** ✅
Gestion des exercices fiscaux
- `getExercicesFiscaux(entrepriseId)` - Liste les exercices
- `getExerciceFiscalEnCours(entrepriseId)` - Exercice en cours
- `getExerciceFiscalParAnnee(entrepriseId, annee)` - Par année
- `createExerciceFiscal(entrepriseId, exerciceData)` - Crée
- `updateExerciceFiscal(exerciceId, updates)` - Met à jour
- `cloturerExerciceFiscal(exerciceId)` - Clôture
- `validerExerciceFiscal(exerciceId)` - Valide
- `createExerciceAnnuel(entrepriseId)` - Crée automatiquement

### 5. **transactionsService.js** ✅ (déjà existant)
Gestion des transactions

### 6. **documentService.js** ✅
Gestion des documents
- `getDocuments(entrepriseId, filters)` - Liste avec filtres
- `getDocument(documentId)` - Récupère un document
- `uploadFile(file, bucket, path)` - Upload dans Storage
- `createDocument(entrepriseId, documentData)` - Crée l'entrée DB
- `uploadAndCreateDocument(entrepriseId, file, metadata)` - Upload + DB
- `updateDocument(documentId, updates)` - Met à jour
- `deleteDocument(documentId)` - Supprime (fichier + DB)
- `searchDocumentsByTags(entrepriseId, tags)` - Recherche par tags

### 7. **tacheService.js** ✅
Gestion des tâches (To-do)
- `getTaches(entrepriseId, filters)` - Liste avec filtres
- `getTache(tacheId)` - Récupère une tâche
- `getTachesAVenir(entrepriseId, jours)` - Tâches à venir
- `getTachesEnRetard(entrepriseId)` - Tâches en retard
- `createTache(entrepriseId, tacheData)` - Crée
- `updateTache(tacheId, updates)` - Met à jour
- `terminerTache(tacheId)` - Marque comme terminée
- `annulerTache(tacheId)` - Annule
- `deleteTache(tacheId)` - Supprime
- `reordonnerTaches(taches)` - Réordonne
- `getTachesStats(entrepriseId)` - Statistiques

### 8. **abonnementService.js** ✅
Gestion des abonnements et factures
- `getAbonnementActif(userId)` - Abonnement actif
- `getAbonnements(userId)` - Liste tous les abonnements
- `createAbonnement(userId, abonnementData)` - Crée
- `updateAbonnement(abonnementId, updates)` - Met à jour
- `annulerAbonnement(abonnementId)` - Annule
- `reactiverAbonnement(abonnementId)` - Réactive
- `getFactures(abonnementId)` - Factures d'un abonnement
- `getFacturesUtilisateur(userId)` - Toutes les factures
- `createFacture(abonnementId, factureData)` - Crée une facture
- `marquerFacturePayee(factureId, datePaiement)` - Marque comme payée
- `checkAbonnementActif(userId)` - Vérifie l'abonnement
- `getParrainages(userId)` - Parrainages
- `createParrainage(parrainId, filleulEmail, code)` - Crée parrainage
- `generateCodeParrainage(userId)` - Génère un code unique

---

## Composants connectés

### Page Profile (/profile)

#### Onglet "Profil" ✅
- **FormulaireComplet.jsx** - Connecté à `profileService`
  - Chargement automatique du profil
  - Création/mise à jour du profil utilisateur
  - Validation des champs
  - Messages de succès/erreur

- **InformationsComptablesForm.jsx** - Connecté à `entrepriseService` via `EntrepriseContext`
  - Chargement automatique de l'entreprise
  - Création/mise à jour de l'entreprise
  - Validation SIRET et dénomination
  - Listes déroulantes complètes

#### Onglet "Banques" ✅
- **Banques.jsx** - Connecté à `compteBancaireService`
  - Chargement des comptes bancaires
  - Affichage des soldes
  - États de chargement

- **AccountSection.jsx** - Composant enrichi avec :
  - Modal d'ajout de compte
  - Formulaire complet (IBAN, BIC, solde initial)
  - Boutons Suspendre/Réactiver fonctionnels
  - Alertes si pas d'entreprise
  - Gestion des erreurs

#### Onglet "Déclarations" 🔄
- Composants de base présents
- À connecter avec `exerciceFiscalService` (structure prête)

#### Onglet "Abonnement" 🔄
- Composants de base présents
- À connecter avec `abonnementService` (structure prête)

#### Onglet "Options" 🔄
- Composants de base présents
- Formulaire de facturation à connecter

### Page Transactions (/transactions) ✅
- **TransactionsImproved.jsx** - Déjà connecté
  - Message d'erreur amélioré si pas d'entreprise
  - Guide étape par étape
  - Design professionnel

### Autres pages 🔄
- Documents - À connecter avec `documentService`
- À faire (Todo) - À connecter avec `tacheService`
- Pilotage - Déjà connecté via `transactionsService`

---

## Installation et migration

### Étape 1 : Exécuter la migration SQL

#### Option A : Nouvelle installation
```bash
# Si vous créez une nouvelle base de données
psql -U votre_utilisateur -d votre_base < database.sql
```

#### Option B : Base de données existante
```bash
# Si vous avez déjà une base de données
psql -U votre_utilisateur -d votre_base < migration_complete.sql
```

#### Option C : Via l'interface Supabase (RECOMMANDÉ)
1. Connectez-vous à votre projet Supabase
2. Allez dans **SQL Editor**
3. Créez une nouvelle requête
4. Copiez le contenu de `migration_complete.sql`
5. Exécutez la requête
6. Vérifiez les messages de succès

### Étape 2 : Vérifier les politiques RLS

La migration crée automatiquement toutes les politiques nécessaires. Vérifiez-les :

```sql
-- Voir toutes les politiques
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

### Étape 3 : Créer les buckets Storage

#### Via l'interface Supabase :

1. **Storage** → **Create a new bucket**

2. **Bucket "avatars"** :
   - Nom: `avatars`
   - Public: ✅ Oui
   - File size limit: 2 MB
   - Allowed MIME types: `image/*`

3. **Bucket "documents"** :
   - Nom: `documents`
   - Public: ❌ Non
   - File size limit: 10 MB
   - Allowed MIME types: `application/pdf, image/*`

4. **Bucket "justificatifs"** :
   - Nom: `justificatifs`
   - Public: ❌ Non
   - File size limit: 10 MB
   - Allowed MIME types: `application/pdf, image/*`

#### Politiques Storage :

Pour chaque bucket privé (documents, justificatifs), créez ces politiques :

```sql
-- Lecture
CREATE POLICY "Authenticated users can read own files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Écriture
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Suppression
CREATE POLICY "Authenticated users can delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
```

---

## Configuration des Buckets Storage

### Structure des dossiers recommandée :

```
avatars/
  ├─ {user_id}/
  │   └─ avatar.jpg

documents/
  ├─ entreprise_{entreprise_id}/
  │   ├─ declarations/
  │   ├─ factures/
  │   └─ autres/

justificatifs/
  ├─ entreprise_{entreprise_id}/
  │   └─ transaction_{transaction_id}/
  │       ├─ justificatif1.pdf
  │       └─ justificatif2.jpg
```

---

## Tests de fonctionnalité

### Test 1 : Profil utilisateur
1. Connexion avec un utilisateur
2. Aller sur `/profile` → Onglet "Profil"
3. Remplir les informations personnelles
4. Cliquer sur "Enregistrer"
5. Vérifier le message de succès
6. Recharger la page → Les données doivent persister

### Test 2 : Création d'entreprise
1. Sur `/profile` → Onglet "Profil"
2. Remplir le formulaire "Informations de l'entreprise"
3. Dénomination (obligatoire), SIRET (optionnel)
4. Cliquer sur "Créer mon entreprise"
5. Vérifier le message de succès
6. L'entreprise doit apparaître dans le contexte

### Test 3 : Comptes bancaires
1. Sur `/profile` → Onglet "Banques"
2. Vérifier que l'alerte "Créez d'abord votre entreprise" n'apparaît plus
3. Cliquer sur "Ajouter"
4. Remplir le formulaire de compte bancaire
5. Enregistrer
6. Le compte doit apparaître dans la liste
7. Tester "Suspendre" → le compte devient grisé
8. Tester "Réactiver" → le compte redevient normal

### Test 4 : Transactions
1. Aller sur `/transactions`
2. Si entreprise créée → affichage normal
3. Si pas d'entreprise → message d'erreur amélioré avec guide
4. Créer une transaction
5. Vérifier qu'elle apparaît dans la liste

### Test 5 : Persistance des données
1. Déconnexion
2. Reconnexion
3. Toutes les données doivent être présentes

---

## Dépannage

### Erreur : "Column does not exist"
**Cause** : La migration n'a pas été exécutée
**Solution** : Exécuter `migration_complete.sql` via l'éditeur SQL Supabase

### Erreur : "Permission denied for table"
**Cause** : Politiques RLS manquantes ou incorrectes
**Solution** :
```sql
-- Vérifier les politiques
SELECT * FROM pg_policies WHERE tablename = 'nom_de_la_table';

-- Réexécuter la section RLS de la migration
```

### Les données ne se chargent pas
**Causes possibles** :
1. Utilisateur non authentifié → Vérifier `AuthContext`
2. Entreprise non créée → Vérifier `EntrepriseContext`
3. Politiques RLS bloquent l'accès → Voir logs Supabase

**Solution** :
```javascript
// Dans la console du navigateur
console.log('Session:', session);
console.log('Entreprise:', entreprise);
```

### Erreur d'upload de fichier
**Causes possibles** :
1. Bucket n'existe pas
2. Politiques Storage incorrectes
3. Taille de fichier trop grande

**Solution** :
1. Vérifier que les buckets existent dans Supabase Storage
2. Vérifier les politiques Storage
3. Vérifier la taille du fichier (limites définies)

### SIRET déjà existant
**Message** : "Le SIRET existe déjà"
**Solution** : Normal si le SIRET est déjà utilisé. Choisir un autre SIRET ou laisser vide.

### Les comptes bancaires ne s'affichent pas
**Causes possibles** :
1. Pas d'entreprise créée
2. Politiques RLS sur `comptes_bancaires`

**Solution** :
```sql
-- Vérifier les politiques
SELECT * FROM pg_policies WHERE tablename = 'comptes_bancaires';

-- Vérifier qu'il y a une entreprise
SELECT * FROM entreprises WHERE user_id = '{votre_user_id}';
```

---

## Architecture des données

### Hiérarchie :
```
User (auth.users)
  └─ Profile (profiles)
  └─ Entreprise (entreprises)
      ├─ Comptes Bancaires (comptes_bancaires)
      ├─ Exercices Fiscaux (exercices_fiscaux)
      ├─ Transactions (transactions)
      ├─ Documents (documents)
      └─ Tâches (taches)
  └─ Abonnement (abonnements)
      └─ Factures (factures)
```

### Relations importantes :
- Un **User** a un **Profile** (1:1)
- Un **User** peut avoir plusieurs **Entreprises** (1:N)
- Une **Entreprise** peut avoir plusieurs **Comptes bancaires** (1:N)
- Une **Entreprise** peut avoir plusieurs **Exercices fiscaux** (1:N)
- Un **Exercice** contient plusieurs **Transactions** (1:N)

---

## Prochaines étapes

### Composants à finaliser :
1. ✅ **Profil** - Entièrement connecté
2. ✅ **Banques** - Entièrement connecté
3. ✅ **Transactions** - Déjà connecté
4. 🔄 **Déclarations** - Services prêts, à intégrer
5. 🔄 **Abonnement** - Services prêts, à intégrer
6. 🔄 **Documents** - Services prêts, à intégrer
7. 🔄 **Tâches** - Services prêts, à intégrer

### Fonctionnalités additionnelles recommandées :
- 📊 Dashboard avec statistiques temps réel
- 📄 Export PDF des déclarations
- 🔔 Notifications par email (Supabase Functions)
- 📱 Mode hors ligne avec sync (Local Storage + Supabase)
- 🔐 Authentification à deux facteurs
- 💳 Intégration Stripe pour les paiements

---

## Support

Pour toute question ou problème :
1. Vérifier les logs Supabase (Dashboard → Logs)
2. Vérifier la console du navigateur (F12)
3. Consulter la documentation Supabase : https://supabase.com/docs
4. Vérifier les politiques RLS dans le dashboard Supabase

---

**Date de mise à jour** : 2025-10-15
**Version** : 1.0.0
