import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { addScore, getScores } from "../utils/scoresManager.js";
import styles from './score.module.css'
import HallOfFame from './hallOfFame.jsx';

const Score = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState("");
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  
  // Récupération du score depuis la navigation
  const finalScore = location.state?.finalScore;

  const handleRestart = () => {
    navigate("/");
  };

  const handleSubmitScore = () => {
    if (pseudo.trim() === "") {
      alert("Veuillez entrer un pseudo !");
      return;
    }
    // Sauvegarder le score avec le pseudo
    addScore(finalScore, pseudo);
    setScoreSubmitted(true);
  };

  // Déterminer si un quiz a été complété
  const hasCompletedQuiz = finalScore !== undefined && finalScore !== null;

  // Calcul du pourcentage (seulement si quiz complété)
  let percentage = 0;
  let message = "";
  
  if (hasCompletedQuiz) {
    percentage = (finalScore / 10) * 100;
    
    // Message personnalisé selon le score
    if (percentage === 100) {
      message = "Parfait ! 🎉";
    } else if (percentage >= 80) {
      message = "Excellent travail ! 🌟";
    } else if (percentage >= 60) {
      message = "Bien joué ! 👍";
    } else if (percentage >= 40) {
      message = "Pas mal, mais tu peux faire mieux ! 💪";
    } else {
      message = "Continue à t'entraîner ! 📚";
    }
  }
  
  return (
    <>
      {hasCompletedQuiz && (
        <div className={styles.container}>
          <h2 className={styles.title}>Quiz Terminé !</h2>
          
          <div className={styles.scoreDisplay}>
            <h3 className={styles.message}>{message}</h3>
            <p className={styles.scoreBig}>
              {finalScore} / 10
            </p>
            <p className={styles.scorePercentage}>
              {percentage}%
            </p>
          </div>

          {!scoreSubmitted ? (
            <div className={styles.pseudoSection}>
              <p className={styles.pseudoLabel}>Enregistrez votre score au Hall of Fame :</p>
              <div className={styles.pseudoInputGroup}>
                <input
                  type="text"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmitScore()}
                  placeholder="Entrez votre pseudo..."
                  maxLength="20"
                  className={styles.pseudoInput}
                />
                <button 
                  className={`${styles.button} ${styles.buttonSuccess}`} 
                  onClick={handleSubmitScore}
                >
                  ✓ Enregistrer
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.successMessage}>
              ✅ Score enregistré ! Bravo {pseudo} !
            </div>
          )}
          
          <div className={styles.actions}>
            <button className={`${styles.button} ${styles.buttonPrimary}`} onClick={handleRestart}>
              Retour à l'accueil
            </button>
          </div>
        </div>
      )}

      <HallOfFame />
    </>
  );
};

export default Score;
