import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { decodeHtmlEntities } from "../utils/decode.js";
import styles from './quiz.module.css'

const Quiz = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10);
  
  const TIME_PER_QUESTION = 15; // Temps par question en secondes (modifiable: 8-12s)

  const cat = searchParams.get("category");
  const diff = searchParams.get("difficulty");

  useEffect(() => {
    if (!cat || !diff) return;

    const url = `https://opentdb.com/api.php?amount=10&category=${cat}&difficulty=${diff}&type=multiple`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            setQuestions(data.results);
          }
        })
        .catch((err) => console.error("Erreur API:", err))
        .finally(() => setLoading(false)); // 🔑 Arrête le chargement quoi qu'il arrive
  }, [cat, diff]);

  // Gestion du timer par question
  useEffect(() => {
    if (loading || questions.length === 0) return;

    setTimeLeft(TIME_PER_QUESTION); // Réinitialiser le timer

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeOut();
          return TIME_PER_QUESTION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Nettoyage
  }, [currentIdx, loading, questions.length]);

  // Mélange les réponses seulement quand la question change
  const shuffledAnswers = useMemo(() => {
    if (!questions[currentIdx]) return [];
    const q = questions[currentIdx];
    const all = [q.correct_answer, ...q.incorrect_answers];
    return all.sort(() => Math.random() - 0.5);
  }, [questions, currentIdx]);

  const handleTimeOut = () => {
    // Temps écoulé : question ratée, pas de point ajouté
    if (currentIdx < 9) {
      setCurrentIdx(currentIdx + 1);
    } else {
      navigate("/score", { state: { finalScore: score } });
    }
  };

  const handleAnswer = (answer) => {
    const isCorrect = answer === questions[currentIdx].correct_answer;
    const nextScore = isCorrect ? score + 1 : score;

    if (isCorrect) setScore(nextScore);

    if (currentIdx < 9) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Fin de partie : navigation automatique vers /score
      navigate("/score", { state: { finalScore: nextScore } });
    }
  };

  if (loading) return <p className={styles.loading}>Chargement des questions (L'API peut mettre 2min à vous débloquer)...</p>;
  if (questions.length === 0) return <p className={styles.error}>Erreur : aucune question trouvée.</p>;

  const currentQuestion = questions[currentIdx];

  return (
      <div className={styles.container}>
        {/* Gestion de l'avancement */}
        <h3 className={styles.progress}>Question {currentIdx + 1} / 10</h3>

        {/* Timer visuel */}
        <div className={styles.timerContainer}>
          <div className={`${styles.timer} ${timeLeft <= 3 ? styles.timerUrgent : ''}`}>
            ⏱️ {timeLeft}s
          </div>
        </div>

        <div className={styles.questionCard}>
          <p className={styles.question}>{decodeHtmlEntities(currentQuestion.question)}</p>

          <div className={styles.answersGrid}>
            {shuffledAnswers.map((answer, index) => (
                <button className={styles.answerButton} key={index} onClick={() => handleAnswer(answer)}>
                  {decodeHtmlEntities(answer)}
                </button>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Quiz;