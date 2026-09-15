import React, { useState, useEffect, useRef } from 'react';

const questions = [
  {
    question: "What's the capital of France?",
    options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
    answer: 'Paris',
  },
  {
    question: "What's 2 + 2?",
    options: ['3', '4', '5', '22'],
    answer: '4',
  },
  {
    question: "Which is a JS framework?",
    options: ['React', 'Laravel', 'Django', 'Rails'],
    answer: 'React',
  },
];

function QuizApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [quizEnded, setQuizEnded] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    if (quizEnded) return;

    setTimeLeft(10);
    setSelectedOption(null);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentIndex, quizEnded]);

  useEffect(() => {
    if (quizEnded) return;

    if (timeLeft === 5 && selectedOption === null) {
      handleSkip();
    }

    if (timeLeft <= 0) {
      nextQuestion();
    }
  }, [timeLeft, selectedOption, quizEnded]);

  const handleOptionClick = (option) => {
    if (selectedOption !== null || quizEnded) return;

    setSelectedOption(option);
    clearInterval(timerRef.current);

    if (option === questions[currentIndex].answer) {
      setCorrectCount((c) => c + 1);
    } else {
      setWrongCount((w) => w + 1);
    }

    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const handleSkip = () => {
    if (quizEnded) return;

    clearInterval(timerRef.current);
    setSkippedCount((s) => s + 1);
    nextQuestion();
  };

  const nextQuestion = () => {
    // Check if this is last question, then end quiz
    if (currentIndex + 1 >= questions.length) {
      setQuizEnded(true);
      clearInterval(timerRef.current);
    } else {
      setCurrentIndex((idx) => idx + 1);
    }
  };

  if (quizEnded) {
    return (
      <div style={{ maxWidth: 400, margin: 'auto', fontFamily: 'sans-serif' }}>
        <h2>Quiz finished!</h2>
        <p>Correct answers: {correctCount}</p>
        <p>Wrong answers: {wrongCount}</p>
        <p>Skipped questions: {skippedCount}</p>
        <button onClick={() => {
          setCurrentIndex(0);
          setCorrectCount(0);
          setWrongCount(0);
          setSkippedCount(0);
          setQuizEnded(false);
        }}>
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div style={{ maxWidth: 400, margin: 'auto', fontFamily: 'sans-serif' }}>
      <h3>Time left: {timeLeft}s</h3>
      <h2>{currentQuestion.question}</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === currentQuestion.answer;
          let bg = 'white';

          if (selectedOption) {
            if (isSelected) {
              bg = isCorrect ? 'lightgreen' : 'salmon';
            } else if (isCorrect) {
              bg = 'lightgreen';
            }
          }

          return (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              style={{
                backgroundColor: bg,
                marginBottom: 8,
                padding: '10px 15px',
                border: '1px solid #ccc',
                borderRadius: 4,
                cursor: selectedOption || quizEnded ? 'default' : 'pointer',
              }}
            >
              {option}
            </li>
          );
        })}
      </ul>
      {!selectedOption && !quizEnded && (
        <button onClick={handleSkip} style={{ marginTop: 20 }}>
          Skip Question
        </button>
      )}

      <div style={{ marginTop: 20 }}>
        <strong>Stats:</strong>
        <p>Correct: {correctCount}</p>
        <p>Wrong: {wrongCount}</p>
        <p>Skipped: {skippedCount}</p>
      </div>
    </div>
  );
}

export default QuizApp;
