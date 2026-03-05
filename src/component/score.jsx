import { useLocation, useNavigate } from "react-router";
import styles from './score.module.css'

const Score = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Récupération du score depuis la navigation
  const finalScore = location.state?.finalScore ?? 0;
  
  const handleRestart = () => {
    navigate("/");
  };

  // Calcul du pourcentage
  const percentage = (finalScore / 10) * 100;
  
  // Message personnalisé selon le score
  let message = "";
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
  
  return (
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
      
      <div className={styles.actions}>
        <button className={`${styles.button} ${styles.buttonPrimary}`} onClick={handleRestart}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default Score;
