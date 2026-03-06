# 🏆 Fonctionnalité : Top 10 des Meilleurs Scores

## Description

Cette fonctionnalité permet aux joueurs d'enregistrer leurs scores dans un **Hall of Fame** sauvegardé dans le **localStorage** du navigateur.

## Caractéristiques

✅ **Sauvegarde des scores** : Les scores sont automatiquement sauvegardés après chaque quiz  
✅ **Top 10 uniquement** : Seuls les 10 meilleurs scores sont conservés  
✅ **Pseudo personnalisé** : Les joueurs peuvent entrer leur pseudo pour le classement  
✅ **Informations complètes** : Date et heure d'enregistrement du score  
✅ **Hall of Fame visible** : Affiché sur la page d'accueil ET la page des résultats  
✅ **Gestion des données** : Possibilité d'effacer tous les scores  
✅ **Responsive design** : Fonctionne sur tous les appareils  

## Fichiers créés/modifiés

### Fichiers créés :
- `src/utils/scoresManager.js` - Gestionnaire de localStorage pour les scores
- `src/component/hallOfFame.jsx` - Composant d'affichage du classement
- `src/component/hallOfFame.module.css` - Styles du Hall of Fame

### Fichiers modifiés :
- `src/component/score.jsx` - Ajout du formulaire d'enregistrement du pseudo
- `src/component/score.module.css` - Styles du formulaire
- `src/component/home.jsx` - Affichage du Hall of Fame sur la page d'accueil

## Utilisation

### Pour les développeurs

```javascript
import { addScore, getScores, clearScores } from './utils/scoresManager';

// Ajouter un score
addScore(8, 'Jean'); // Score: 8/10, Pseudo: Jean

// Récupérer tous les scores
const scores = getScores(); // Retourne un tableau trié

// Effacer tous les scores
clearScores();
```

### Structure des données

```javascript
{
  id: 1234567890,           // Timestamp unique
  score: 8,                 // Score (0-10)
  pseudo: "Jean",           // Pseudo du joueur
  date: "06/03/2026",       // Date en format local
  time: "14:30"             // Heure en format local
}
```

## Fonctionnement

1. **Après un quiz** : L'utilisateur accède à la page de résultats
2. **Enregistrement** : Il rentre son pseudo et clique sur "Enregistrer"
3. **Sauvegarde** : Le score est ajouté et trié avec les autres
4. **Hall of Fame** : Le classement s'affiche automatiquement avec le nouveau score

## Affichage

- **Page de résultats** : Formulaire d'enregistrement + Hall of Fame
- **Page d'accueil** : Hall of Fame (pour voir les meilleurs scores avant de jouer)

### Médailles
- 🥇 1ère place
- 🥈 2e place  
- 🥉 3e place
- #4 à #10 pour les autres

## localStorage

Les données sont stockées sous la clé : `quizScores`

Vous pouvez consulter les données dans la console du navigateur :
```javascript
console.log(JSON.parse(localStorage.getItem('quizScores')));
```

## À faire (optionnel)

- [ ] Exporter les scores en CSV
- [ ] Envoyer les scores à une base de données backend
- [ ] Classement par catégorie/difficulté
- [ ] Statistiques (moyenne, record personnel, etc.)
