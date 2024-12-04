import React, { useState, useEffect } from "react";

const App = () => {
  const [word, setWord] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("es"); // Default: Spanish
  const [flashcards, setFlashcards] = useState([]);

  const addFlashcard = async () => {
    const response = await fetch("http://127.0.0.1:5000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word, targetLanguage }),
    });
    const data = await response.json();
    setFlashcards([...flashcards, data]);
    setWord("");
  };

  const fetchFlashcards = async () => {
    const response = await fetch("http://127.0.0.1:5000/flashcards");
    const data = await response.json();
    setFlashcards(data);
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  return (
    <div>
      <h1>Language Learning Flashcards</h1>
      <input
        type="text"
        placeholder="Enter word or phrase"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
      >
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="it">Italian</option>
      </select>
      <button onClick={addFlashcard}>Add Flashcard</button>
      <h2>Flashcards</h2>
      <ul>
        {flashcards.map((card, index) => (
          <li key={index}>
            {card.native} → {card.translation} ({card.language})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
