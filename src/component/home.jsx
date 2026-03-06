import { useNavigate } from 'react-router';
import { categories, difficulties } from '../data/quizData.jsx'
import { useState } from "react";
import Select from "./Select.jsx"
import styles from './home.module.css'

const Home = () => {
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedDiff, setSelectedDiff] = useState("");
  const navigate = useNavigate();

  const canStart = selectedCat !== "" && selectedDiff !== "";

  const handleStart = () => {
    navigate(`/quiz?category=${selectedCat}&difficulty=${selectedDiff}`);
  };

  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Quiz App</h1>

        <div className={styles.selectGroup}>
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
        </div>

        <button className={styles.startButton} onClick={handleStart} disabled={!canStart}>
          Démarrer le Quiz
        </button>
      </div>
  );
};

export default Home;
