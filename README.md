# Openclassrooms - **Projet 12** - SportSee

SportSee est une application web permettant aux utilisateurs de suivre leurs activités quotidiennes et leurs données de santé, telles que la consommation de calories, l'apport en protéines et les performances.

## Screenshot

![](./public/screenshot.png)

## Fonctionnalités

> - **Dashboard utilisateur** : Affichage personnalisé des métriques de santé et d'activité.
> - **Visualisation des données** : Graphiques interactifs pour l'activité quotidienne, la durée moyenne des sessions, les performances et le score.
> - **Données mockées** : Possibilité de basculer entre API réelle et données mockées pour les tests.

## Technologies

![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![React](https://img.shields.io/badge/React-58C4DC?style=for-the-badge&logo=react&logoColor=white)
![React router](https://img.shields.io/badge/React-router-F44250?style=for-the-badge&logo=react-router&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge&logo=recharts&logoColor=white)

## Installation

### Prérequis

> - Node.js
> - npm

### Installation

1. Clonez le dépôt GitHub

```sh
git clone https://github.com/stephanievanoverberghe/ocr-p12-sportsee.git
```

2. Installez les dépendances

```sh
npm install
```

### Lancer l'application

```sh
cd api
```

puis

```sh
npm start
```

et

```sh
cd client
```

puis

```sh
npm run dev
```

## Utilisation

### Configuration API

1. Utilisez les données mockées en définissant `USE_MOCK_DATA` à `true` dans le fichier `config.js`.
2. Basculez sur les données réelle en le définissant à `false`.

### Lancer l'application

Accéder à l'application via:

```sh
http://localhost:5173/user/:id
```

Remplacez `:id` par un ID utilisateur valide, comme `12` ou `18`.

## Structure du projet

```sh
src/
├── assets/          # Images et styles
├── components/      # Composants réutilisables
├── pages/           # Pages principales
├── services/        # Gestion des appels API et des données
├── router.jsx       # Définition des routes
├── config.js        # Bascule données réelles/mockées
├── index.jsx        # Point d'entrée de l'application
└── App.jsx          # Composant racine
```
