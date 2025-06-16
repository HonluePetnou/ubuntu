# Système de Template pour les Pages Pays

Ce système permet de créer facilement des pages dédiées à chaque pays en utilisant un template réutilisable et des composants personnalisés.

## Structure du Système

### 1. Template Principal (`CountryTemplate.jsx`)

Le template principal fournit une structure standardisée pour toutes les pages pays :

- **Navigation** : Bouton de retour vers la carte
- **Sections Standard** : Hero, Overview, etc.
- **Sections Personnalisées** : Composants spécifiques à chaque pays
- **Thématisation** : Couleurs personnalisables selon le pays

### 2. Pages Pays Spécifiques

Chaque pays a sa propre page qui utilise le template :

- `CameroonPage.jsx` - Focus sur la diversité culturelle et les régions
- `NigeriaPage.jsx` - Accent sur l'économie et Nollywood
- `GhanaPage.jsx` - Mise en avant de l'histoire et la démocratie

## Comment Créer une Nouvelle Page Pays

### Étape 1 : Créer le fichier de page

```jsx
import React from 'react';
import CountryTemplate from '../templates/CountryTemplate';
import CountryDetails from '../data/countryDetails';
import { Icon1, Icon2 } from 'lucide-react';

export default function MonPaysPage() {
  // Données du pays
  const paysData = CountryDetails.CODE_PAYS;
  
  // Sections à afficher
  const sectionsToShow = [
    'hero',
    'overview'
  ];
  
  // Composants personnalisés
  const customSections = [
    MaSection1,
    MaSection2
  ];
  
  // Thème personnalisé
  const theme = {
    primaryColor: '#couleur1',
    secondaryColor: '#couleur2',
    accentColor: '#couleur3'
  };
  
  return (
    <CountryTemplate
      countryData={paysData}
      sections={sectionsToShow}
      customSections={customSections}
      theme={theme}
    />
  );
}
```

### Étape 2 : Créer les sections personnalisées

```jsx
function MaSection1({ countryData, sectionIndex }) {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Contenu de votre section */}
      </div>
    </section>
  );
}
```

### Étape 3 : Ajouter la route dans App.jsx

```jsx
import MonPaysPage from './pages/MonPaysPage';

// Dans les routes
<Route path="/mon-pays" element={<MonPaysPage />} />
```

## Propriétés du Template

### `countryData`

Objet contenant les informations du pays (nom, capitale, population, etc.)

### `sections`

Tableau des sections standard à afficher :

- `'hero'` : Section héro avec informations principales
- `'overview'` : Vue d'ensemble du pays

### `customSections`

Tableau de composants React personnalisés pour le pays

### `theme`

Objet de configuration des couleurs :

- `primaryColor` : Couleur principale
- `secondaryColor` : Couleur secondaire
- `accentColor` : Couleur d'accent

## Bonnes Pratiques

### 1. Cohérence Visuelle

- Utilisez les couleurs du drapeau pour le thème
- Maintenez une structure similaire entre les sections
- Utilisez les icônes Lucide React pour la cohérence

### 2. Contenu Pertinent

- Mettez en avant les spécificités uniques du pays
- Utilisez des données factuelles et vérifiées
- Adaptez le ton au contexte culturel

### 3. Performance

- Limitez le nombre de sections personnalisées (3-4 max)
- Optimisez les images et animations
- Utilisez le lazy loading si nécessaire

### 4. Responsive Design

- Testez sur différentes tailles d'écran
- Utilisez les classes Tailwind responsive
- Adaptez les grilles selon l'écran

## Exemples de Sections Personnalisées

### Section Économie

```jsx
function EconomieSection({ countryData, sectionIndex }) {
  const indicateurs = [
    { titre: "PIB", valeur: "XXX milliards USD", icon: TrendingUp },
    { titre: "Population Active", valeur: "XX millions", icon: Users }
  ];
  
  return (
    <section className="py-16">
      {/* Grille d'indicateurs économiques */}
    </section>
  );
}
```

### Section Culture

```jsx
function CultureSection({ countryData, sectionIndex }) {
  return (
    <section className="py-16">
      {/* Patrimoine culturel, traditions, arts */}
    </section>
  );
}
```

### Section Géographie

```jsx
function GeographieSection({ countryData, sectionIndex }) {
  return (
    <section className="py-16">
      {/* Régions, climat, ressources naturelles */}
    </section>
  );
}
```

## Structure des Fichiers

src/
├── templates/
│   ├── CountryTemplate.jsx
│   └── README.md
├── pages/
│   ├── CameroonPage.jsx
│   ├── NigeriaPage.jsx
│   ├── GhanaPage.jsx
│   └── [AutrePaysPage.jsx]
├── data/
│   └── countryDetails.js
└── components/
    └── [ComposantsRéutilisables]

## Maintenance et Évolution

- **Ajout de nouvelles sections standard** : Modifier `CountryTemplate.jsx`
- **Nouveaux pays** : Créer une nouvelle page et ajouter la route
- **Améliorations visuelles** : Mettre à jour les styles dans le template
- **Nouvelles données** : Enrichir `countryDetails.js`

Ce système offre une grande flexibilité tout en maintenant la cohérence visuelle et structurelle entre toutes les pages pays.
