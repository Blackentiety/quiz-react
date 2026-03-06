/**
 * Gestionnaire des scores avec localStorage
 * Conserve les 10 meilleurs scores avec pseudo
 */

const SCORES_KEY = 'quizScores';
const MAX_SCORES = 10;

/**
 * Récupère tous les scores sauvegardés
 * @returns {Array} Tableau des scores triés (meilleur en premier)
 */
export const getScores = () => {
  try {
    const scores = localStorage.getItem(SCORES_KEY);
    return scores ? JSON.parse(scores) : [];
  } catch (error) {
    console.error('Erreur lors de la récupération des scores:', error);
    return [];
  }
};

/**
 * Ajoute un nouveau score et conserve les 10 meilleurs
 * @param {number} score - Le score (0-10)
 * @param {string} pseudo - Le pseudo du joueur
 * @returns {Array} Le tableau des scores mis à jour
 */
export const addScore = (score, pseudo = 'Anonyme') => {
  try {
    let scores = getScores();
    
    // Ajouter le nouveau score avec timestamp
    const newScore = {
      id: Date.now(),
      score: score,
      pseudo: pseudo.trim() || 'Anonyme',
      date: new Date().toLocaleDateString('fr-FR'),
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
    
    scores.push(newScore);
    
    // Trier par score (décroissant), puis par date (plus récent en premier)
    scores.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`);
    });
    
    // Conserver seulement les 10 meilleurs
    scores = scores.slice(0, MAX_SCORES);
    
    // Sauvegarder dans localStorage
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
    
    return scores;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du score:', error);
    return getScores();
  }
};

/**
 * Efface tous les scores
 */
export const clearScores = () => {
  try {
    localStorage.removeItem(SCORES_KEY);
  } catch (error) {
    console.error('Erreur lors de l\'effacement des scores:', error);
  }
};

/**
 * Obtient le rang du score actuel dans le top 10
 * @param {number} score - Le score à vérifier
 * @returns {number} Le rang (1-10) ou -1 si pas dans le top 10
 */
export const getScoreRank = (score) => {
  const scores = getScores();
  const rank = scores.findIndex(s => s.score === score) + 1;
  return rank <= MAX_SCORES ? rank : -1;
};
