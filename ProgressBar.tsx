import React, { useEffect, useState } from "react";

function ProgressBar() {
  const width = 100;
  const [bar, setBar] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setBar(prev => {
        if (prev >= width) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]); // ✅ depends on control state

  return (
    <>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ transform: `translateX(${bar - width}%)` }}
        />
      </div>

      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Pause</button>
    </>
  );
}

export default ProgressBar;
