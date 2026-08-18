import React, { useState, useEffect, useRef } from "react";

const SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "React is a powerful JavaScript library for building UIs.",
  "Typing fast improves your productivity and focus.",
  "Practice makes perfect, so type every day."
];

function Game() {
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState([]); // "correct" | "wrong" | undefined
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [finished, setFinished] = useState(false);

  const containerRef = useRef(null);
  const timerRef = useRef(null);

  // Pick a random sentence
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * SENTENCES.length);
    const sentence = SENTENCES[randomIndex];
    setText(sentence);
    setStatus(Array(sentence.length).fill(undefined));
  }, []);

  // Timer
  useEffect(() => {
    if (startTime) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [startTime]);

  // Key press handler
  const handleKeyDown = (e) => {
    if (finished) return;

    e.preventDefault(); // prevent default browser actions

    const char = e.key;

    if (!startTime) setStartTime(Date.now());

    if (char.length === 1) {
      // Compare typed char with actual
      setStatus((prev) =>
        prev.map((s, i) =>
          i === currentIndex
            ? char === text[i]
              ? "correct"
              : "wrong"
            : s
        )
      );

      if (currentIndex + 1 === text.length) {
        setFinished(true);
        clearInterval(timerRef.current);
      }

      setCurrentIndex((prev) => prev + 1);
    } else if (char === "Backspace") {
      // handle backspace
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
        setStatus((prev) =>
          prev.map((s, i) => (i === currentIndex - 1 ? undefined : s))
        );
      }
    }
  };

  const calculateWPM = () => {
    const wordsTyped = currentIndex / 5; // 5 chars per word approximation
    const minutes = timeElapsed / 60;
    return minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
  };

  const calculateAccuracy = () => {
    const correctCount = status.filter((s) => s === "correct").length;
    return currentIndex > 0 ? Math.round((correctCount / currentIndex) * 100) : 100;
  };

  const handleRestart = () => {
    const randomIndex = Math.floor(Math.random() * SENTENCES.length);
    const sentence = SENTENCES[randomIndex];
    setText(sentence);
    setStatus(Array(sentence.length).fill(undefined));
    setCurrentIndex(0);
    setStartTime(null);
    setTimeElapsed(0);
    setFinished(false);
  };

  return (
    <div
      tabIndex={0} // make div focusable
      onKeyDown={handleKeyDown}
      ref={containerRef}
      style={{ padding: "30px", fontFamily: "sans-serif", outline: "none" }}
    >
      <h2>Typing Test In-Place</h2>
      <p style={{ fontSize: "20px", lineHeight: "1.5", cursor: "text" }}>
        {text.split("").map((char, idx) => {
          let color;
          if (status[idx] === "correct") color = "green";
          else if (status[idx] === "wrong") color = "red";
          else if (idx === currentIndex) color = "blue"; // current char
          else color = "black";

          return (
            <span
              key={idx}
              style={{
                color,
                textDecoration: idx === currentIndex ? "underline" : "none",
              }}
            >
              {char}
            </span>
          );
        })}
      </p>

      <div style={{ marginTop: "20px" }}>
        <p>Time: {timeElapsed}s</p>
        <p>WPM: {calculateWPM()}</p>
        <p>Accuracy: {calculateAccuracy()}%</p>
      </div>

      {finished && (
        <button onClick={handleRestart} style={{ marginTop: "20px" }}>
          Restart
        </button>
      )}
    </div>
  );
}

export default Game;
