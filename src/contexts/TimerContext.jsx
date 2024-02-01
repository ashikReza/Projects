/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

import React, { createContext, useContext, useState } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timerState, setTimerState] = useState({
    timerType: "pomodoro",
    minutes: 25,
    seconds: 0,
    isActive: false,
    timerStarted: false,
    progress: 0,
  });

  return (
    <TimerContext.Provider value={{ timerState, setTimerState }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);

  return context;
};
