/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useRef } from "react";
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
          <FlipCard value={flipTimer[0]} dataKey="minutes-tens" />
          <FlipCard value={flipTimer[1]} dataKey="minutes-ones" />
        </div>
      </div>

      <div className={styles.middlePointer}>:</div>

      <div className={styles.containerSegment}>
        <div className={styles.segment}>
          <FlipCard value={flipTimer[2]} dataKey="seconds-tens" />
          <FlipCard value={flipTimer[3]} dataKey="seconds-ones" />
        </div>
      </div>
    </div>
  );
};

const FlipCard = ({ value, dataKey }) => {
  const topRef = useRef(null);

  return (
    <div
      className={styles.flipCard}
      data-key={dataKey}
      ref={topRef}
      style={{ fontFamily: "Protest Riot, sans-serif" }}
    >
      <div className={styles.top}>{value}</div>
      <div className={styles.bottom}>{value}</div>
    </div>
  );
};

export default TimerDisplay;
