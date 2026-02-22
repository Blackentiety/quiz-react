import { useNavigate } from 'react-router';
import { categories, difficulties } from '../data/quizData.jsx'
import { useState } from "react";

const Home = () => {
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedDiff, setSelectedDiff] = useState("");
  const navigate = useNavigate();

  const canStart = selectedCat !== "" && selectedDiff !== "";

  const handleStart = () => {
    navigate(`/quiz?category={selectedCat}&difficulties={selectedDiff}`);
  };

  return (
    <div>
      <h1>Quiz App</h1>

      {/* Sélecteur de catégorie  */}
      <select onChange={(e) => setSelectedCat(e.target.value)}>
        <option value="">--Choisir une catégorie--</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      {/* Sélecteur de difficulté [cite: 34] */}
      <select onChange={(e) => setSelectedDiff(e.target.value)}>
        <option value="">--Choisir une difficulté--</option>
        {difficulties.map(diff => (
          <option key={diff.value} value={diff.value}>{diff.name}</option>
        ))}
      </select>

      <button onClick={handleStart} disabled={!canStart}>
        Démarrer le Quiz
      </button>
    </div>
  );
};

export default Home;
