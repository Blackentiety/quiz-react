import { useLocation, useNavigate } from "react-router";

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
    <div className="score-container">
      <h2>Quiz Terminé !</h2>
      
      <div className="score-display">
        <h3>{message}</h3>
        <p className="score-big">
          {finalScore} / 10
        </p>
        <p className="score-percentage">
          {percentage}%
        </p>
      </div>
      
      <div className="score-actions">
        <button onClick={handleRestart}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default Score;
