import React, { useState } from "react";

const sentence = "React is powerful but sometimes confusing";

function AnnotateWords() {
  const words = sentence.split(" ");

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [annotations, setAnnotations] = useState({});

  // 🎯 Handle word click
  const handleWordClick = (index) => {
    setSelectedIndex(index);
  };

  // ✅ Mark positive
  const markPositive = () => {
    if (selectedIndex === null) return;

    setAnnotations((prev) => ({
      ...prev,
      [selectedIndex]: "positive",
    }));

    setSelectedIndex(null);
  };

  // ❌ Mark negative
  const markNegative = () => {
    if (selectedIndex === null) return;

    setAnnotations((prev) => ({
      ...prev,
      [selectedIndex]: "negative",
    }));

    setSelectedIndex(null);
  };

  // 🔄 Reset all
  const reset = () => {
    setAnnotations({});
    setSelectedIndex(null);
  };

  // 🎨 Style logic
  const getStyle = (index) => {
    if (annotations[index] === "positive") {
      return { color: "green", fontWeight: "bold" };
    }

    if (annotations[index] === "negative") {
      return { color: "red", fontWeight: "bold" };
    }

    if (selectedIndex === index) {
      return { backgroundColor: "yellow" };
    }

    return {};
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Annotate Words</h2>

      {/* Sentence */}
      <div style={{ marginBottom: "20px" }}>
        {words.map((word, index) => (
          <span
            key={index}
            onClick={() => handleWordClick(index)}
            style={{
              cursor: "pointer",
              marginRight: "5px",
              ...getStyle(index),
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <button onClick={markPositive}>Annotate Positive</button>
      <button onClick={markNegative} style={{ marginLeft: "10px" }}>
        Annotate Negative
      </button>
      <button onClick={reset} style={{ marginLeft: "10px" }}>
        Reset
      </button>
    </div>
  );
}

export default AnnotateWords;
