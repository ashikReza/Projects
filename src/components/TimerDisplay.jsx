/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// TimerDisplay.jsx
import React, { useEffect, useState } from "react";
import "../TimerDisplay.css";

const TimerDisplay = ({ minutes, seconds }) => {
  const [flipTimer, setFlipTimer] = useState([]);

  useEffect(() => {
    flipAllCards(minutes, seconds);
  }, [minutes, seconds]);

  const flipAllCards = (minutes, seconds) => {
    const minutesTens = Math.floor(minutes / 10);
    const minutesOnes = minutes % 10;
    const secondsTens = Math.floor(seconds / 10);
    const secondsOnes = seconds % 10;

    setFlipTimer([minutesTens, minutesOnes, secondsTens, secondsOnes]);
  };

  return (
    <div className="container">
      <div className="container-segment">
        <div className="segment">
          <div className="flip-card" data-minutes-tens>
            <div className="top">{flipTimer[0]}</div>
            <div className="bottom">{flipTimer[0]}</div>
          </div>
          <div className="flip-card" data-minutes-ones>
            <div className="top">{flipTimer[1]}</div>
            <div className="bottom">{flipTimer[1]}</div>
          </div>
        </div>
      </div>
      <div className="middle-pointer">:</div>
      <div className="container-segment">
        <div className="segment">
          <div className="flip-card" data-seconds-tens>
            <div className="top">{flipTimer[2]}</div>
            <div className="bottom">{flipTimer[2]}</div>
          </div>
          <div className="flip-card" data-seconds-ones>
            <div className="top">{flipTimer[3]}</div>
            <div className="bottom">{flipTimer[3]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
