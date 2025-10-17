# 🏠 Airbnb-Like App - Modern Property Rental Platform

<div align="center">
  <h3>Une application de location de propriétés moderne et complète</h3>
  <p>Construite avec React Native, Expo Router et Zustand</p>
</div>

---

## Fonctionnalités Principales

### 🏡 Gestion des Propriétés
- **API Intégrée** - Récupération de données réelles depuis une API REST
- **Store Zustand** - Gestion d'état performante et moderne
- **Recherche Avancée** - Filtrage et tri des propriétés
- **Refresh Control** - Pull-to-refresh pour actualiser les données

### 🎨 Interface Utilisateur
- **Thème Clair/Sombre** - Système de thème dynamique avec détection automatique
- **Glassmorphism** - Effets de flou modernes (Expo Blur)
- **Animations Fluides** - Animations avec React Native Reanimated
- **Design Responsive** - Interface adaptée à toutes les tailles d'écran

### 🧭 Navigation Complète
- **Tabs Navigation** - Navigation par onglets (Home, Explore, Settings)
- **Stack Navigation** - Navigation entre écrans avec historique
- **Drawer Navigation** - Menu latéral pour accès rapide
- **Modal Navigation** - Fenêtres modales pour les actions importantes

### 🛠️ SANDBOX
- **Caméra** - Intégration de la caméra native
- **Géolocalisation** - Accès à la position de l'utilisateur
- **TodoList** - Exemple de gestion de tâches
- **Counter** - Exemple d'état local avec animations

---

## 🚀 Installation et Démarrage

### Prérequis
```bash
Node.js >= 18.x
npm ou yarn
Expo CLI (installé automatiquement)
```

### Installation
```bash
# Cloner le dépôt
git clone <votre-repo>
cd AIRBNB_LIKE

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

### Lancement sur différentes plateformes
```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Navigateur Web
npm run web
```

---

## 📁 Structure du Projet

```
AIRBNB_LIKE/
├── app/                             # Écrans de l'application (Expo Router)
│   ├── _layout.js                   # Layout racine avec ThemeProvider
│   └── (tabs)/                      # Navigation par onglets
│       ├── _layout.js               # Layout des tabs
│       ├── index.js                 # 🏠 Home - Liste des propriétés
│       ├── explore.js               # 🔍 Explore - Recherche et filtres
│       ├── property-detail.js       # 📝 Détails d'une propriété
│       ├── settings.js              # ⚙️ Paramètres et profil
│       └── (sandbox)/               # Bac à sable pour tests
│           ├── _layout.js
│           ├── index.js             # Dashboard sandbox
│           ├── camera.js            # Exemple caméra
│           ├── location.js          # Exemple géolocalisation
│           ├── todolist.js          # Exemple TodoList
│           ├── counter.js           # Exemple compteur
│           └── navigation/          # Exemples de navigation
│               ├── drawer/          # Navigation drawer
│               ├── modal/           # Navigation modal
│               ├── stack/           # Navigation stack
│               └── tabs/            # Navigation tabs
│
├── components/                     # Composants réutilisables
│   ├── common/                     # Composants communs
│   │   ├── Header.js               # Header avec effet glassmorphism
│   │   └── ThemeToggleButton.js    # Bouton de changement de thème
│   ├── explore/                    # Composants page Explore
│   │   ├── EmptyState.js           # État vide
│   │   ├── FilterChip.js           # Chips de filtre
│   │   ├── QuickSearches.js        # Recherches rapides
│   │   ├── ScrollIndicator.js      # Indicateur de scroll
│   │   ├── SearchBar.js            # Barre de recherche
│   │   └── SearchStats.js          # Statistiques de recherche
│   ├── home/                       # Composants page Home
│   │   ├── CategoryList.js         # Liste de catégories
│   │   └── InspirationBanner.js    # Bannière d'inspiration
│   └── property/                   # Composants propriété
│       ├── PropertyCard.js         # Carte de propriété
│       └── PropertyDetail.js       # Détails complets
│
├── constants/                      # Constantes de l'app
│   ├── colors.js                   # Système de couleurs (DARK/LIGHT_THEME)
│   └── data.js                     # Données de démo (catégories)
│
├── contexts/                       # Contextes React
│   └── ThemeContext.js             # Gestion du thème global
│
├── stores/                         # Stores Zustand
│   ├── PropertyStore.js            # Store des propriétés (API, search, filter)
│   └── TaskStore.js                # Store des tâches (TodoList)
│
├── utils/                          # Utilitaires
│
├── assets/                         # Ressources statiques
│   └── images/                     # Images et icônes
│
├── app.json                        # Configuration Expo
├── babel.config.js                 # Configuration Babel
└── package.json                    # Dépendances npm
```

---

## 🎨 Système de Design

### Palette de Couleurs

#### Mode Sombre (Par défaut)
```javascript
{
  primary: '#00FF94',      // Vert néon électrique
  background: '#000000',   // Noir profond
  surface: '#1A1A1A',      // Surface sombre
  text: '#FFFFFF',         // Texte blanc
  textSecondary: '#AAAAAA' // Texte gris
}
```

#### Mode Clair
```javascript
{
  primary: '#00D17A',      // Vert vif
  background: '#FFFFFF',   // Blanc pur
  surface: '#F5F5F5',      // Surface claire
  text: '#000000',         // Texte noir
  textSecondary: '#666666' // Texte gris foncé
}
```

### Composants Principaux

#### `<Header />` - En-tête avec Glassmorphism
- Effet de flou avec `expo-blur`
- Badge de localisation
- Icône de filtre
- Animations fluides

#### `<PropertyCard />` - Carte de Propriété
- Image optimisée avec `expo-image`
- Badge de catégorie
- Note et avis
- Prix par nuit
- Favoris avec animation

#### `<SearchBar />` - Barre de Recherche
- Auto-focus intelligent
- Boutons de clear et cancel
- Intégration avec le store
- Animations d'apparition

---

## 🔧 Technologies Utilisées

### Core
- **React Native** `0.81.4` - Framework mobile
- **Expo** `~54.0.13` - Plateforme de développement
- **Expo Router** `~6.0.11` - Routing file-based

### État et Navigation
- **Zustand** `^5.0.8` - Gestion d'état moderne
- **React Navigation** `^7.x` - Navigation native
  - Bottom Tabs
  - Drawer
  - Stack
  - Native Stack

### UI et Animations
- **React Native Reanimated** `~4.1.1` - Animations performantes
- **Expo Blur** `~15.0.7` - Effets de flou
- **Expo Linear Gradient** `~15.0.7` - Dégradés
- **Expo Image** `~3.0.9` - Images optimisées
- **@expo/vector-icons** `^15.0.2` - Icônes

### Fonctionnalités Natives
- **Expo Camera** `^17.0.8` - Accès caméra
- **Expo Location** `^19.0.7` - Géolocalisation
- **Expo Haptics** `~15.0.7` - Retour haptique

### Développement
- **TypeScript** `~5.9.2` - Typage statique
- **Babel Module Resolver** `^5.0.2` - Alias de chemins (`@/`)
- **ESLint** `^9.25.0` - Linting

---

## 📊 Architecture de l'État

### PropertyStore (Zustand)
```javascript
{
  properties: [],           // Liste des propriétés
  isLoading: false,        // État de chargement
  error: null,             // Erreurs éventuelles
  lastFetchTime: null,     // Timestamp du dernier fetch
  
  // Actions
  fetchProperties(),       // Récupère depuis l'API
  searchProperties(),      // Recherche par texte
  sortByPriceLowToHigh(), // Tri par prix croissant
  sortByPriceHighToLow(), // Tri par prix décroissant
  filterByRating(),       // Filtre par note
  searchAndFilter()       // Recherche + filtre combinés
}
```

### ThemeContext
```javascript
{
  theme: {},              // Objet thème actuel
  isDarkMode: boolean,    // Mode sombre actif ?
  toggleTheme()          // Basculer le thème
}
```

---

## 🌐 API

### Endpoint
```
https://ondes.space/reactdata.json
```

### Structure des Données
```javascript
{
  id: string,
  title: string,
  location: string,
  price: number,
  rating: number,
  reviews: number,
  image: string,
  category: string,
  host: {
    name: string,
    image: string
  },
  // ... autres champs
}
```

---

## 🎯 Écrans Principaux

### 🏠 Home (`index.js`)
- Liste de toutes les propriétés
- Catégories horizontales scrollables
- Bannière d'inspiration
- Pull-to-refresh
- Navigation vers les détails

### 🔍 Explore (`explore.js`)
- Barre de recherche avec auto-focus
- Filtres multiples (prix, note, nouveautés)
- Recherches rapides prédéfinies
- Statistiques de recherche
- État vide si aucun résultat

### 📝 Property Detail (`property-detail.js`)
- Vue détaillée de la propriété
- Galerie d'images
- Informations hôte
- Équipements
- Réservation

### ⚙️ Settings (`settings.js`)
- Profil utilisateur
- Bouton toggle thème
- Paramètres de l'app
- À propos

### 🧪 Sandbox
Environnement de test avec exemples de :
- Caméra native
- Géolocalisation
- TodoList avec Zustand
- Compteur avec animations
- Tous types de navigation

---

## 🎨 Commandes Utiles

```bash
# Démarrage
npm start                 # Ouvre le menu Expo
npm run ios              # Lance sur iOS
npm run android          # Lance sur Android
npm run web              # Lance dans le navigateur

# Développement
npm run lint             # Vérifie le code avec ESLint

# Reset (si nécessaire)
npm run reset-project    # Réinitialise le projet
```

---

## � Bonnes Pratiques Implémentées

✅ **Architecture modulaire** - Composants réutilisables  
✅ **Gestion d'état moderne** - Zustand au lieu de Redux  
✅ **Routing file-based** - Expo Router pour une navigation simple  
✅ **Typage progressif** - Migration vers TypeScript en cours  
✅ **Responsive design** - Adapté mobile et tablette  
✅ **Dark mode** - Support complet avec Context API  
✅ **API REST** - Intégration avec fetch et gestion d'erreurs  
✅ **Animations natives** - Reanimated pour des performances optimales  
✅ **Alias de chemins** - `@/` pour imports propres  

---

## 🚧 Roadmap

### En cours
- [x] Écran Home avec liste de propriétés
- [x] Écran Explore avec recherche et filtres
- [x] Écran Property Detail
- [x] Thème clair/sombre
- [x] Store Zustand pour propriétés
- [x] Intégration API

### À venir
- [ ] Authentification utilisateur
- [ ] Système de favoris persistant
- [ ] Réservation de propriétés
- [ ] Historique des réservations
- [ ] Chat avec les hôtes
- [ ] Carte interactive (MapView)
- [ ] Notifications push
- [ ] Paiement intégré

---

## 👨‍💻 Auteur

**Martin Bellot**  
Projet réalisé dans le cadre d'un cours React Native  
École Supérieure

---

## 📄 Licence

Ce projet est à usage éducatif. N'hésitez pas à l'utiliser pour apprendre ! 🎓

---

</div>