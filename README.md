# Quiz App - React + Vite

Une application web de quiz interactive construite avec React et Vite. Les utilisateurs peuvent sélectionner une catégorie et une difficulté, répondre à 10 questions dans un délai limite, voir leurs résultats et consulter le classement des meilleurs scores.

## Comment lancer le projet

### Prérequis
- Node.js 16+ et npm installés

### Installation

1. Cloner ou accéder au répertoire du projet :
```bash
cd quiz-react
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer le serveur de développement :
```bash
npm run dev
```

4. Ouvrir le navigateur et accéder à `http://localhost:5173` (l'adresse sera affichée dans le terminal)

### Construire pour la production

```bash
npm run build
```

Le résultat sera dans le dossier `dist/`.

## Ce qui a été fait

### Fonctionnalités principales

1. **Sélection du quiz**
   - Choix de la catégorie parmi plusieurs options
   - Choix du niveau de difficulté (facile, moyen, difficile)
   - Récupération des questions via l'API Open Trivia

2. **Écran du quiz**
   - 10 questions par partie
   - Minuteur de 15 secondes par question
   - Réponses mélangées aléatoirement
   - Affichage de la progression

3. **Page des résultats**
   - Affichage du score final (X/10)
   - Calcul du pourcentage de réussite
   - Message personnalisé selon la performance

4. **Hall of Fame - Top 10 des meilleurs scores**
   - Sauvegarde automatique des scores dans localStorage
   - Conservation des 10 meilleurs scores uniquement
   - Enregistrement du pseudo du joueur
   - Affichage de la date et l'heure du score
   - Médailles pour les 3 premières places
   - Possibilité d'effacer tous les scores
   - Visible sur la page d'accueil et la page des résultats

### Structure du projet

```
src/
  component/           # Composants React réutilisables
    header.jsx        # Navigation principale
    home.jsx          # Page d'accueil
    quiz.jsx          # Logique du quiz
    score.jsx         # Affichage des résultats
    hallOfFame.jsx    # Classement des scores
    Select.jsx        # Sélecteur personnalisé
    *.module.css      # Styles des composants (CSS modules)
  
  pages/              # Pages de l'application
    HomePage.jsx
    QuizPage.jsx
    ScorePage.jsx
  
  data/
    quizData.jsx      # Catégories et niveaux de difficulté
  
  utils/
    decode.js         # Décodage HTML des questions
    scoresManager.js  # Gestion localStorage des scores
  
  main.jsx            # Point d'entrée de l'application
  index.css           # Styles globaux
```

### Technologies utilisées

- **React 19** - Framework UI
- **React Router 7** - Navigation entre les pages
- **Vite** - Bundler et serveur de développement
- **CSS Modules** - Stylisation avec portée limitée
- **Open Trivia DB API** - Source des questions de quiz
- **localStorage** - Stockage persistant des scores

## Notes

Les fichiers CSS des modules ont été générés avec l'aide d'une IA pour assurer une mise en page cohérente, réactive et esthétiquement agréable à travers tous les composants.

## Auteur

Blackentiety 
