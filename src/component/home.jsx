import { useNavigate } from 'react-router';
import { categories, difficulties } from '../data/quizData.jsx'
import { useState } from "react";
import Select from "./Select.jsx"

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
      <Select
        setter={setSelectedCat}
        data={categories}
        valueKey="id"
        labelKey="name"
        defaultText="Choisir une catégorie"
      />

      {/* Sélecteur de difficulté */}
      <Select
        setter={setSelectedDiff}
        data={difficulties}
        valueKey="value"
        labelKey="name"
        defaultText="Choisir une difficulté"
      />
      <button onClick={handleStart} disabled={!canStart}>
        Démarrer le Quiz
      </button>
    </div>
  );
};

export default Home;
