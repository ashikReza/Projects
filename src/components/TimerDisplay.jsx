/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useRef } from "react";
import styles from "../TimerDisplay.module.css";

const TimerDisplay = ({ minutes, seconds }) => {
  const [flipTimer, setFlipTimer] = React.useState([]);

  React.useEffect(() => {
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
    <div className={styles.container}>
      <div className={styles.containerSegment}>
        <div className={styles.segment}>
          <FlipCard
            top={flipTimer[0]}
            bottom={flipTimer[0]}
            dataKey="minutes-tens"
          />
          <FlipCard
            top={flipTimer[1]}
            bottom={flipTimer[1]}
            dataKey="minutes-ones"
          />
        </div>
      </div>
      <div className={styles.middlePointer}>:</div>
      <div className={styles.containerSegment}>
        <div className={styles.segment}>
          <FlipCard
            top={flipTimer[2]}
            bottom={flipTimer[2]}
            dataKey="seconds-tens"
          />
          <FlipCard
            top={flipTimer[3]}
            bottom={flipTimer[3]}
            dataKey="seconds-ones"
          />
        </div>
      </div>
    </div>
  );
};

const FlipCard = ({ top, bottom, dataKey }) => {
  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) {
      const topHalf = topRef.current.querySelector(".top");
      const bottomHalf = topRef.current.querySelector(".bottom");

      const topFlip = document.createElement("div");
      topFlip.classList.add(`${styles.topFlip}`); // Use the CSS module class
      const bottomFlip = document.createElement("div");
      bottomFlip.classList.add(`${styles.bottomFlip}`); // Use the CSS module class

      topFlip.textContent = top;
      bottomFlip.textContent = top;

      topFlip.addEventListener("animationstart", () => {
        topHalf.textContent = "";
      });
      topFlip.addEventListener("animationend", () => {
        topHalf.textContent = bottom;
        topFlip.remove();
      });
      bottomFlip.addEventListener("animationend", () => {
        bottomHalf.textContent = bottom;
        bottomFlip.remove();
      });

      topRef.current.append(topFlip, bottomFlip);
    }
  }, [top, bottom]);

  return (
    <div
      className={styles.flipCard}
      data-key={dataKey}
      ref={topRef}
      style={{ fontFamily: "Protest Riot, sans-serif" }}
    >
      <div className={styles.top}>{top}</div>
      <div className={styles.bottom}>{bottom}</div>
    </div>
  );
};

export default TimerDisplay;
