import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { decodeHtmlEntities } from "../utils/decode.js";

const Quiz = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

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

  // Mélange les réponses seulement quand la question change
  const shuffledAnswers = useMemo(() => {
    if (!questions[currentIdx]) return [];
    const q = questions[currentIdx];
    const all = [q.correct_answer, ...q.incorrect_answers];
    return all.sort(() => Math.random() - 0.5);
  }, [questions, currentIdx]);

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

  if (loading) return <p>Chargement des questions (L'API peut mettre 2min à vous débloquer)...</p>;
  if (questions.length === 0) return <p>Erreur : aucune question trouvée.</p>;

  const currentQuestion = questions[currentIdx];

  return (
      <div className="quiz-page">
        {/* Gestion de l'avancement */}
        <h3>Question {currentIdx + 1} / 10</h3>

        <div className="question-card">
          <p>{decodeHtmlEntities(currentQuestion.question)}</p>

          <div className="answers-grid">
            {shuffledAnswers.map((answer, index) => (
                <button key={index} onClick={() => handleAnswer(answer)}>
                  {decodeHtmlEntities(answer)}
                </button>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Quiz;