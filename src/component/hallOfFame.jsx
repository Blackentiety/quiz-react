import { useEffect, useState } from "react";
import { getScores, clearScores } from "../utils/scoresManager.js";
import styles from './hallOfFame.module.css';

const HallOfFame = () => {
  const [scores, setScores] = useState([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    // Charger les scores au montage du composant
    setScores(getScores());
  }, []);

  const handleClearScores = () => {
    clearScores();
    setScores([]);
    setShowClearConfirm(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🏆 Hall of Fame - Top 10</h2>
      
      {scores.length === 0 ? (
        <p className={styles.empty}>
          Aucun score enregistré. Commence un quiz pour apparaître dans le classement ! 🎮
        </p>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.rank}>Rang</th>
                <th className={styles.player}>Joueur</th>
                <th className={styles.score}>Score</th>
                <th className={styles.date}>Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((entry, index) => (
                <tr key={entry.id} className={`${styles.row} ${index === 0 ? styles.firstPlace : ''} ${index === 1 ? styles.secondPlace : ''} ${index === 2 ? styles.thirdPlace : ''}`}>
                  <td className={styles.rankCell}>
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && `#${index + 1}`}
                  </td>
                  <td className={styles.playerCell}>{entry.pseudo}</td>
                  <td className={styles.scoreCell}>
                    <span className={styles.scoreBadge}>{entry.score}/10</span>
                  </td>
                  <td className={styles.dateCell}>
                    <span className={styles.dateText}>{entry.date}</span>
                    <span className={styles.timeText}>{entry.time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {scores.length > 0 && (
        <div className={styles.actions}>
          {!showClearConfirm ? (
            <button 
              className={styles.clearButton} 
              onClick={() => setShowClearConfirm(true)}
            >
              🗑️ Effacer les scores
            </button>
          ) : (
            <div className={styles.confirmBox}>
              <p>Êtes-vous sûr de vouloir effacer tous les scores ?</p>
              <button 
                className={styles.confirmYes} 
                onClick={handleClearScores}
              >
                Oui, effacer
              </button>
              <button 
                className={styles.confirmNo} 
                onClick={() => setShowClearConfirm(false)}
              >
                Non, annuler
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HallOfFame;
