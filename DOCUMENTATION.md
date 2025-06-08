# Ubuntu Cultural Platform - Documentation

## Project Overview
This project is a cultural platform showcasing African countries, their heritage, traditions, and cultural richness. The platform features an interactive map as the main page, with detailed country-specific pages accessible through navigation.

## Architecture

### Folder Structure
```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.jsx   # Button component with variants
│   │   └── Card.jsx     # Card component with variants
│   ├── country/         # Country-specific components
│   │   └── CountryHero.jsx  # Generic country hero section
│   ├── map/             # Map-related components
│   │   └── InteractiveMap.jsx  # Interactive map with navigation
│   └── layout/          # Layout components
│       └── Navbar.jsx
├── pages/               # Page components for routing
│   ├── HomePage.jsx     # Main page with interactive map
│   └── CountryPage.jsx  # Individual country pages
├── data/                # Static data files
│   ├── countries.js     # Map SVG data
│   ├── countryDetails.js    # Detailed country information
│   └── countryDescriptions.js  # Country descriptions
├── hooks/               # Custom React hooks
│   └── useCountryData.js    # Hook for fetching country data
├── utils/               # Utility functions and constants
│   └── constants.js     # Centralized constants
└── App.jsx              # Main application with routing
```

## Key Components

### HomePage Component
The main landing page that displays the interactive map and platform introduction.

**Features:**
- Displays the interactive map as the central element
- Includes platform title and description
- Responsive design with container layout

### CountryPage Component
Individual country pages accessible via routing.

**Features:**
- Uses URL parameters to determine which country to display
- Includes back navigation to the main map
- Displays CountryHero component for the specific country
- Placeholder sections for future content (History, Arts, Music, etc.)

### CountryHero Component
A generic, reusable component that displays country information based on a `countryCode` prop.

**Props:**
- `countryCode`: String (e.g., "CM" for Cameroon)

**Features:**
- Automatically fetches country data using the `useCountryData` hook
- Displays country flag, name, description, and quick facts
- Uses reusable UI components (Button, Card)
- Responsive design with Tailwind CSS

### InteractiveMap Component
The main map component with navigation capabilities.

**Features:**
- Displays SVG map of Africa with clickable countries
- Shows modal with country information on click
- "Explore more" button navigates to country-specific pages
- Uses React Router for navigation

**Utilisation:**
```jsx
import CountryHero from './components/country/CountryHero';

<CountryHero countryCode="CM" />
```

### Button

Composant bouton réutilisable avec différentes variantes.

**Props:**
- `variant` (string): 'primary' | 'secondary' | 'outline'
- `size` (string): 'sm' | 'md' | 'lg'
- `children` (ReactNode): Contenu du bouton
- `onClick` (function): Fonction de clic
- `disabled` (boolean): État désactivé

**Utilisation:**
```jsx
import Button from './components/ui/Button';

<Button variant="primary" size="lg" onClick={handleClick}>
  Explorer le pays
</Button>
```

### Card

Composant carte réutilisable pour afficher du contenu.

**Props:**
- `variant` (string): 'default' | 'glass' | 'solid' | 'dark'
- `padding` (string): 'none' | 'sm' | 'md' | 'lg' | 'xl'
- `children` (ReactNode): Contenu de la carte

**Utilisation:**
```jsx
import Card from './components/ui/Card';

<Card variant="glass" padding="md">
  <h3>Titre</h3>
  <p>Contenu...</p>
</Card>
```

## Routing Structure

The application uses React Router for navigation:

- `/` - HomePage with interactive map
- `/country/:countryCode` - Individual country pages (e.g., `/country/CM` for Cameroon)

### Navigation Flow
1. User lands on HomePage with interactive map
2. User clicks on a country in the map
3. Modal appears with country information and "Explore more" button
4. Clicking "Explore more" navigates to `/country/:countryCode`
5. Country page displays detailed information with back navigation

## Data Management

### Country Data Structure
Country information is stored in `src/data/countryDetails.js` with the following structure:

```javascript
export const countryDetails = {
  CM: {
    name: "Cameroon",
    flag: "🇨🇲",
    continent: "Africa",
    region: "Central Africa",
    // ... other properties
  }
};
```

### CountryDetails

Contient les informations détaillées de chaque pays:

```javascript
{
  name: "Nom du pays",
  fullName: "Nom officiel complet",
  capital: "Capitale",
  population: "Population",
  languages: ["Langues parlées"],
  currency: "Monnaie",
  independence: "Année d'indépendance",
  motto: "Devise nationale",
  nickname: "Surnom",
  flagColors: ["#couleur1", "#couleur2"],
  keyFacts: ["Faits marquants"],
  // ... autres propriétés
}
```

### Adding New Countries
1. Add country data to `countryDetails.js`
2. Add country description to `countryDescriptions.js`
3. Ensure the country code matches the SVG path ID in `countries.js`
4. The routing system will automatically handle the new country pages

### Ajouter un Nouveau Pays

1. **Ajouter les données dans `countryDetails.js`:**
```javascript
SN: {
  name: "Sénégal",
  fullName: "République du Sénégal",
  capital: "Dakar",
  // ... autres propriétés
}
```

2. **Ajouter la description dans `countryDescriptions.js`:**
```javascript
SN: "Le Sénégal est un pays d'Afrique de l'Ouest..."
```

3. **Ajouter les coordonnées SVG dans `countries.js`:**
```javascript
{
  id: "SN",
  title: "Senegal",
  d: "coordonnées SVG du pays"
}
```

4. **Ajouter l'image de la carte (optionnel):**
   - Créer `public/sn-map.svg`

## Hooks

### useCountryData

Hook pour récupérer les données d'un pays.

```jsx
import { useCountryData } from '../hooks/useCountryData';

const { country, loading, error } = useCountryData('CM');
```

### useAllCountries

Hook pour récupérer tous les pays.

```jsx
import { useAllCountries } from '../hooks/useCountryData';

const { countries, loading } = useAllCountries();
```

## Constantes

Les constantes sont centralisées dans `utils/constants.js`:

- `THEME_COLORS`: Couleurs du thème
- `MAP_CONFIG`: Configuration de la carte
- `AFRICAN_REGIONS`: Régions d'Afrique
- `CULTURAL_CONTENT_TYPES`: Types de contenu culturel

## Next Steps

1. **Content Sections**: Implement the placeholder sections in CountryPage (History, Arts, Music, etc.)
2. **Enhanced Navigation**: Add breadcrumbs and improved navigation between countries
3. **Search Functionality**: Add search and filtering capabilities to the map
4. **Performance**: Implement lazy loading for country data and code splitting
5. **Animations**: Add smooth transitions between pages and map interactions
6. **Mobile Experience**: Enhance responsive design for mobile devices
7. **Accessibility**: Improve accessibility features for the map and navigation
8. **Testing**: Add unit and integration tests for routing and components
9. **SEO**: Implement proper meta tags and SEO optimization for country pages
10. **Content Management**: Create a system for easily adding and managing country content

## Prochaines Étapes

1. **Système de Routing**
   - Implémenter React Router
   - Créer des routes dynamiques `/country/:code`

2. **Sections de Pays**
   - Créer `CountryHistory.jsx`
   - Créer `CountryArts.jsx`
   - Créer `CountryGastronomy.jsx`
   - Créer `CountryMusic.jsx`

3. **Optimisations**
   - Lazy loading des composants
   - Code splitting par pays
   - Optimisation des images

4. **Fonctionnalités Avancées**
   - Recherche de pays
   - Filtres par région
   - Mode sombre/clair
   - Multilingue

## Conventions de Code

- **Nommage**: PascalCase pour les composants, camelCase pour les variables
- **Imports**: Grouper les imports (React, libraries, composants locaux)
- **Props**: Utiliser la destructuration avec valeurs par défaut
- **Styles**: Utiliser Tailwind CSS avec des classes utilitaires
- **Fichiers**: Un composant par fichier, nommage cohérent

## Contribution

Pour contribuer au projet:

1. Suivre la structure des dossiers établie
2. Utiliser les composants UI existants
3. Ajouter les données dans les fichiers appropriés
4. Tester les modifications
5. Documenter les nouveaux composants