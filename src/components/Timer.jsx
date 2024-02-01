/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { useTimer } from "../contexts/TimerContext";

import clickSound from "../assets/mixkit-fast-double-click-on-mouse-275.mp3";

const Timer = () => {
  const { timerType, setTimerType } = useTimer();
  const [minutes, setMinutes] = useState(getInitialMinutes(timerType));
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMinutes(getInitialMinutes(timerType));
    setSeconds(0);
    setIsActive(false);
    setTimerStarted(false);
    setProgress(0);
  }, [timerType]);

  useEffect(() => {
    let interval;

    if (isActive) {
      setTimerStarted(true); 

      interval = setInterval(() => {
        const totalSeconds = minutes * 60 + seconds;
        const elapsedSeconds = getInitialMinutes(timerType) * 60 - totalSeconds;

        setProgress(
          (elapsedSeconds / (getInitialMinutes(timerType) * 60)) * 100
        );

        if (seconds === 0) {
          if (minutes === 0) {
            // Timer has reached 0
            resetTimer();
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, timerType]);

  const resetTimer = () => {
    // Play the click sound when the button is clicked
    playClickSound();

    setMinutes(getInitialMinutes(timerType));
    setSeconds(0);
    setIsActive(false);
    setTimerStarted(false); // Set timerStarted back to false when the timer is reset
    setProgress(0); // Reset progress when timer is reset
  };

  // Define a function to play the click sound
  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  const toggleTimer = () => {
    // Play the click sound when the button is clicked
    playClickSound();

    setIsActive((prevIsActive) => !prevIsActive);
  };

  const switchTimerType = (newType) => {
    setTimerType(newType);
  };

  return (
    <main
      className={`bg-opacity-70 transition-colors duration-500 ${getBackgroundColor(
        timerType
      )} h-screen flex items-center justify-center`}
    >
      <div
        className="backdrop-blur-lg p-10 rounded mx-4"
        style={{ backgroundColor: "rgba(225, 225, 255, 0.3)" }}
      >
        <div
          className="absolute top-0 left-0 bg-white h-1 rounded"
          style={{ width: `${progress}%` }}
        ></div>
        <div className="flex justify-center ">
          <p className="text-3xl font-extrabold">
            {getTimerTypeName(timerType)}
          </p>
        </div>
        <div className="flex justify-center relative my-5 sm:my-8">
          <p className="text-4xl font-semibold">
            {`${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`}
          </p>
        </div>
        <div className="flex justify-center gap-4 ">
          <button
            className="w-[5rem] py-2 bg-green-300 rounded font-extrabold"
            onClick={toggleTimer}
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button
            className={`px-5 py-2 bg-green-300 rounded font-extrabold ${
              timerStarted ? "" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={resetTimer}
            disabled={!timerStarted}
          >
            Reset
          </button>
        </div>
        <div className="flex gap-5 flex-wrap justify-center">
          <button
            className="px-5 py-2 bg-[#fc3030b5] rounded mt-4 text-white font-bold"
            onClick={() => switchTimerType("pomodoro")}
          >
            Pomodoro
          </button>
          <button
            className="px-5 py-2 bg-[#1C92FFB0] rounded mt-4 text-white font-bold"
            onClick={() => switchTimerType("shortBreak")}
          >
            Short Break
          </button>
          <button
            className="px-5 py-2 bg-[#00D991A1] rounded mt-4 text-white font-bold"
            onClick={() => switchTimerType("longBreak")}
          >
            Long Break
          </button>
        </div>
        <div className="flex items-center justify-center mt-4 font-semibold ">
          {getFooterTypeName(timerType)}
        </div>
      </div>
    </main>
  );
};

const getInitialMinutes = (timerType) => {
  switch (timerType) {
    case "pomodoro":
      return 25;
    case "shortBreak":
      return 5;
    case "longBreak":
      return 15;
    default:
      return 25;
  }
};

const getBackgroundColor = (timerType) => {
  switch (timerType) {
    case "pomodoro":
      return "bg-pomodoro-bg";
    case "shortBreak":
      return "bg-shortBreak-bg";
    case "longBreak":
      return "bg-longBreak-bg";
    default:
      return "bg-pomodoro-bg";
  }
};

const getTimerTypeName = (timerType) => {
  switch (timerType) {
    case "pomodoro":
      return "Pomodoro";
    case "shortBreak":
      return "Short Break";
    case "longBreak":
      return "Long Break";
    default:
      return "Pomodoro";
  }
};

const getFooterTypeName = (timerType) => {
  switch (timerType) {
    case "pomodoro":
      return "Time to focus!";
    case "shortBreak":
      return "Time for a small break!";
    case "longBreak":
      return "Time for a big break!";
    default:
      return "Time to focus!";
  }
};

export default Timer;
