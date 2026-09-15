import React, { useEffect, useState } from "react";


const GREEN_TIME = 30;
const YELLOW_TIME = 5;
const SLOT_TIME = GREEN_TIME + YELLOW_TIME;

function TrafficLight({ signals = 4 }) {
  // Initialize each signal with its own timer
  const initialTimers = Array.from({ length: signals }, (_, i) => ({
    light: i === 0 ? "GREEN" : "RED",
    timer: i === 0 ? GREEN_TIME : SLOT_TIME * i,
  }));

  const [signalTimers, setSignalTimers] = useState(initialTimers);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignalTimers((prev) => {
        const newTimers = prev.map((signal, index) => {
          // Active signal
          if (index === activeIndex) {
            return { ...signal, timer: signal.timer - 1 };
          } else {
            // Inactive signals: decrement RED timer if >0
            return { ...signal, timer: signal.timer > 0 ? signal.timer - 1 : 0 };
          }
        });
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  // Handle transitions
  useEffect(() => {
    const activeSignal = signalTimers[activeIndex];
  
    if (activeSignal.timer === 0) {
      // GREEN → YELLOW
      if (activeSignal.light === "GREEN") {
        setSignalTimers(prev =>
          prev.map((signal, i) =>
            i === activeIndex
              ? { ...signal, light: "YELLOW", timer: YELLOW_TIME }
              : signal
          )
        );
      }
      // YELLOW → next signal GREEN
      else if (activeSignal.light === "YELLOW") {
        const nextIndex = (activeIndex + 1) % signals;
  
        setSignalTimers(prev =>
          prev.map((signal, i) => {
            if (i === nextIndex) {
              return { ...signal, light: "GREEN", timer: GREEN_TIME };
            }
            return { ...signal, light: "RED" };
          })
        );
  
        setActiveIndex(nextIndex);
      }
    }
  }, [signalTimers, activeIndex, signals]);
  

  return (
    <div>
      <h2>Sequential Traffic Light Simulation</h2>
      <div className="signals">
        {signalTimers.map((signal, index) => (
          <div className="traffic-light" key={index}>
            <div className={`light red ${signal.light === "RED" ? "on" : ""}`} />
            <div className={`light yellow ${signal.light === "YELLOW" ? "on" : ""}`} />
            <div className={`light green ${signal.light === "GREEN" ? "on" : ""}`} />
            <div className="timer">{signal.timer}s</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrafficLight  
