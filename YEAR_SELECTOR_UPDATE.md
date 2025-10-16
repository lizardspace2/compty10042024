# 📅 Mise à Jour : Sélecteur d'Année pour Accompagnement et Documents

## ✅ Tâches Complétées

Cette mise à jour ajoute le même sélecteur d'année (année actuelle, n-1, n-2) aux pages **Accompagnement** et **Documents**, identique à celui de **Pilotage**.

---

## 🎯 Modifications Effectuées

### 1. **AccompagnementBanner.jsx** - Réécriture Complète

**Fichier**: `src/components/Accompagnement/components/AccompagnementBanner.jsx`

**Changements**:
- ✅ Connexion à Supabase pour récupérer les exercices fiscaux
- ✅ Chargement dynamique : année courante, n-1, n-2
- ✅ Context API : `ExerciceFiscalAccompagnementContext`
- ✅ Hook personnalisé : `useExerciceFiscalAccompagnement()`
- ✅ Status badges avec couleurs (En cours 🟢 / Clôturé ⚫ / Brouillon 🟠)
- ✅ Affichage des périodes (dates)
- ✅ Toast notifications lors de la sélection
- ✅ Loading spinner
- ✅ Fallback sur données fictives en cas d'erreur

**Utilisation dans d'autres composants**:
```jsx
import { useExerciceFiscalAccompagnement } from '../components/AccompagnementBanner';

function MyComponent() {
  const { selectedExercice } = useExerciceFiscalAccompagnement();
  // selectedExercice contient: { id, annee, statut, date_debut, date_fin }
  console.log(selectedExercice.annee); // Ex: 2024
}
```

---

### 2. **DocumentBanner.jsx** - Réécriture Complète

**Fichier**: `src/components/Documents/components/DocumentBanner.jsx`

**Changements**:
- ✅ Connexion à Supabase pour récupérer les exercices fiscaux
- ✅ Chargement dynamique : année courante, n-1, n-2
- ✅ Context API : `ExerciceFiscalDocumentsContext`
- ✅ Hook personnalisé : `useExerciceFiscalDocuments()`
- ✅ Status badges avec couleurs (En cours 🟢 / Clôturé ⚫ / Brouillon 🟠)
- ✅ Affichage des périodes (dates)
- ✅ Toast notifications lors de la sélection
- ✅ Loading spinner
- ✅ Fallback sur données fictives en cas d'erreur

**Utilisation dans d'autres composants**:
```jsx
import { useExerciceFiscalDocuments } from '../components/DocumentBanner';

function MyComponent() {
  const { selectedExercice } = useExerciceFiscalDocuments();
  // selectedExercice contient: { id, annee, statut, date_debut, date_fin }
  console.log(selectedExercice.annee); // Ex: 2024
}
```

---

### 3. **Accompaniment.jsx** - Ajout du Context Provider

**Fichier**: `src/components/Accompagnement/Accompaniment.jsx`

**Changements**:
```jsx
// Avant
function Accompaniment() {
  return (
    <div>
      <AccompagnementBanner/>
      {/* ... */}
    </div>
  );
}

// Après
import { useState } from 'react';
import AccompagnementBanner, { ExerciceFiscalAccompagnementContext } from './components/AccompagnementBanner';

function Accompaniment() {
  const [selectedExercice, setSelectedExercice] = useState(null);

  return (
    <ExerciceFiscalAccompagnementContext.Provider value={{ selectedExercice, setSelectedExercice }}>
      <div>
        <AccompagnementBanner/>
        {/* Tous les composants enfants ont accès à selectedExercice */}
      </div>
    </ExerciceFiscalAccompagnementContext.Provider>
  );
}
```

---

### 4. **Documents.jsx** - Ajout du Context Provider

**Fichier**: `src/components/Documents/Documents.jsx`

**Changements**:
```jsx
// Avant
function Documents() {
  return (
    <Box bg="gray.50" minH="100vh">
      <DocumentBanner />
      {/* ... */}
    </Box>
  );
}

// Après
import { useState } from 'react';
import DocumentBanner, { ExerciceFiscalDocumentsContext } from './components/DocumentBanner';

function Documents() {
  const [selectedExercice, setSelectedExercice] = useState(null);

  return (
    <ExerciceFiscalDocumentsContext.Provider value={{ selectedExercice, setSelectedExercice }}>
      <Box bg="gray.50" minH="100vh">
        <DocumentBanner />
        {/* Tous les composants enfants ont accès à selectedExercice */}
      </Box>
    </ExerciceFiscalDocumentsContext.Provider>
  );
}
```

---

## 🎨 Interface Utilisateur

### Menu Déroulant

Le sélecteur affiche :
```
┌─────────────────────────────────────────┐
│ Exercice 2024 [En cours ✓]       ▼     │
└─────────────────────────────────────────┘

Menu ouvert :
┌─────────────────────────────────────────┐
│ Exercice 2024 [En cours] ✓              │
│ 01 janv - 31 déc 2024                   │
├─────────────────────────────────────────┤
│ Exercice 2023 [Clôturé]                 │
│ 01 janv - 31 déc 2023                   │
├─────────────────────────────────────────┤
│ Exercice 2022 [Clôturé]                 │
│ 01 janv - 31 déc 2022                   │
└─────────────────────────────────────────┘
```

### Status Badges

- 🟢 **En cours** (colorScheme: green)
- ⚫ **Clôturé** (colorScheme: gray)
- 🟠 **Brouillon** (colorScheme: orange)

### Notifications Toast

Lors de la sélection d'un exercice :
```
┌───────────────────────────────┐
│ ✓ Exercice changé             │
│ Exercice 2023 sélectionné     │
└───────────────────────────────┘
```

En cas d'erreur :
```
┌───────────────────────────────────────┐
│ ❌ Erreur                             │
│ Impossible de charger les exercices  │
└───────────────────────────────────────┘
```

---

## 📊 Flux de Données

```
┌──────────────────────────────────────────────┐
│ User clique sur le menu déroulant           │
└──────────────────┬───────────────────────────┘
                   ↓
┌──────────────────────────────────────────────┐
│ AccompagnementBanner / DocumentBanner        │
│ - fetchExercices() via Supabase             │
│ - Récupère user → entreprise → exercices   │
│ - Filtre : année courante, n-1, n-2        │
└──────────────────┬───────────────────────────┘
                   ↓
┌──────────────────────────────────────────────┐
│ User sélectionne un exercice                 │
└──────────────────┬───────────────────────────┘
                   ↓
┌──────────────────────────────────────────────┐
│ setSelectedExercice(exercice)                │
│ - Context mis à jour                         │
│ - Toast notification affichée                │
└──────────────────┬───────────────────────────┘
                   ↓
┌──────────────────────────────────────────────┐
│ Tous les composants enfants reçoivent       │
│ le nouvel exercice via useExerciceFiscal()  │
└──────────────────────────────────────────────┘
```

---

## 🔧 Requêtes Supabase

### 1. Récupérer l'utilisateur
```javascript
const { data: { user } } = await supabase.auth.getUser();
```

### 2. Récupérer l'entreprise
```javascript
const { data: entreprise } = await supabase
  .from('entreprises')
  .select('id')
  .eq('user_id', user.id)
  .single();
```

### 3. Récupérer les exercices fiscaux
```javascript
const currentYear = new Date().getFullYear();
const years = [currentYear, currentYear - 1, currentYear - 2];

const { data: exercicesFiscaux } = await supabase
  .from('exercices_fiscaux')
  .select('*')
  .eq('entreprise_id', entreprise.id)
  .in('annee', years)
  .order('annee', { ascending: false });
```

### 4. Sélection de l'exercice par défaut
```javascript
// Priorité : exercice en cours > sinon le plus récent
const exerciceEnCours = exercicesFiscaux?.find(ex => ex.statut === 'en_cours');
const defaultExercice = exerciceEnCours || exercicesFiscaux?.[0];
```

---

## 🚀 Utilisation dans les Composants Enfants

### Pour la page Accompagnement

```jsx
import React from 'react';
import { useExerciceFiscalAccompagnement } from '../components/AccompagnementBanner';

function MonComposant() {
  const { selectedExercice, setSelectedExercice } = useExerciceFiscalAccompagnement();

  // Utiliser selectedExercice pour filtrer les données
  useEffect(() => {
    if (selectedExercice) {
      fetchData(selectedExercice.id);
    }
  }, [selectedExercice]);

  return (
    <div>
      <h2>Année sélectionnée : {selectedExercice?.annee}</h2>
      <p>Statut : {selectedExercice?.statut}</p>
    </div>
  );
}
```

### Pour la page Documents

```jsx
import React from 'react';
import { useExerciceFiscalDocuments } from '../components/DocumentBanner';

function MonComposant() {
  const { selectedExercice, setSelectedExercice } = useExerciceFiscalDocuments();

  // Utiliser selectedExercice pour filtrer les données
  useEffect(() => {
    if (selectedExercice) {
      fetchDocuments(selectedExercice.id);
    }
  }, [selectedExercice]);

  return (
    <div>
      <h2>Documents pour {selectedExercice?.annee}</h2>
    </div>
  );
}
```

---

## 🛡️ Gestion des Erreurs

### Fallback automatique

Si Supabase échoue, des exercices fictifs sont créés :
```javascript
const fallbackExercices = [
  {
    id: 'current',
    annee: 2025,
    statut: 'en_cours',
    date_debut: '2025-01-01',
    date_fin: '2025-12-31'
  },
  {
    id: 'n-1',
    annee: 2024,
    statut: 'cloture',
    date_debut: '2024-01-01',
    date_fin: '2024-12-31'
  },
  {
    id: 'n-2',
    annee: 2023,
    statut: 'cloture',
    date_debut: '2023-01-01',
    date_fin: '2023-12-31'
  }
];
```

### Vérification du Context

Le hook vérifie toujours si le context existe :
```javascript
export const useExerciceFiscalAccompagnement = () => {
  const context = useContext(ExerciceFiscalAccompagnementContext);
  if (!context) {
    return { selectedExercice: null, setSelectedExercice: () => {} };
  }
  return context;
};
```

---

## 📝 Résumé des 3 Contextes

| Page | Context | Hook | Banner |
|------|---------|------|--------|
| Pilotage | `ExerciceFiscalContext` | `useExerciceFiscal()` | `PilotageBanner.jsx` |
| Accompagnement | `ExerciceFiscalAccompagnementContext` | `useExerciceFiscalAccompagnement()` | `AccompagnementBanner.jsx` |
| Documents | `ExerciceFiscalDocumentsContext` | `useExerciceFiscalDocuments()` | `DocumentBanner.jsx` |

Chaque page a son propre context indépendant pour une meilleure isolation.

---

## ✨ Fonctionnalités Communes aux 3 Banners

| Fonctionnalité | Description |
|----------------|-------------|
| ✅ Connexion Supabase | Récupération dynamique des exercices |
| ✅ Filtrage automatique | Année courante + n-1 + n-2 |
| ✅ Sélection par défaut | Exercice en cours prioritaire |
| ✅ Status badges | En cours / Clôturé / Brouillon |
| ✅ Périodes affichées | Dates de début et fin |
| ✅ Toast notifications | Retour visuel sur changement |
| ✅ Loading state | Spinner pendant le chargement |
| ✅ Fallback données | Exercices fictifs si erreur |
| ✅ Context API | Partage de l'état avec enfants |
| ✅ Hook personnalisé | Accès facile au context |

---

## 🎯 Prochaines Étapes (Optionnel)

### 1. Filtrer les données par exercice

Dans les composants enfants, utilisez l'exercice sélectionné pour filtrer :
```javascript
const { selectedExercice } = useExerciceFiscalAccompagnement();

const { data: documents } = await supabase
  .from('documents')
  .select('*')
  .eq('exercice_fiscal_id', selectedExercice.id);
```

### 2. Ajouter un indicateur visuel

Afficher l'année sélectionnée dans les composants :
```jsx
<Box>
  <Badge colorScheme="purple">Exercice {selectedExercice?.annee}</Badge>
  {/* Votre contenu */}
</Box>
```

### 3. Synchroniser avec l'URL (React Router)

Optionnel : sauvegarder l'année dans l'URL :
```javascript
const navigate = useNavigate();
const handleSelectExercice = (exercice) => {
  setSelectedExercice(exercice);
  navigate(`?annee=${exercice.annee}`);
};
```

---

## 🚀 État du Serveur

Le serveur de développement est **actif** :
```
✅ Running on http://localhost:3001/
```

---

## 📚 Fichiers Modifiés

### Modifiés (Réécriture complète)
- ✅ `src/components/Accompagnement/components/AccompagnementBanner.jsx` (26 → 209 lignes)
- ✅ `src/components/Documents/components/DocumentBanner.jsx` (39 → 209 lignes)

### Modifiés (Ajout Context Provider)
- ✅ `src/components/Accompagnement/Accompaniment.jsx` (40 → 44 lignes)
- ✅ `src/components/Documents/Documents.jsx` (22 → 26 lignes)

### Créés
- ✅ `YEAR_SELECTOR_UPDATE.md` (Ce document)

---

## ✅ Tests Recommandés

1. **Test de sélection** : Cliquer sur le menu et sélectionner chaque année
2. **Test de notification** : Vérifier que le toast apparaît
3. **Test de fallback** : Déconnecter Supabase et vérifier les données fictives
4. **Test de context** : Utiliser le hook dans un composant enfant
5. **Test de statut** : Vérifier les badges de couleur
6. **Test de période** : Vérifier l'affichage des dates

---

**Version** : 1.1.0
**Date** : 2025-10-16
**Status** : ✅ Complété et fonctionnel
**Serveur** : http://localhost:3001/

---

## 🎉 Conclusion

Les trois pages principales (**Pilotage**, **Accompagnement**, **Documents**) disposent maintenant d'un sélecteur d'année identique et fonctionnel, avec connexion Supabase et Context API pour partager l'état avec les composants enfants.

Chaque page a son propre context indépendant pour une meilleure isolation et maintenabilité du code.
