/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";
import { useTimer } from "../contexts/TimerContext.jsx";
import {
  getInitialMinutes,
  getBackgroundColor,
  getTimerTypeName,
  getFooterTypeName,
} from "../utils/TimerUtils.jsx";
import clickSound from "../assets/mixkit-fast-double-click-on-mouse-275 (mp3cut.net).mp3";
import clickSound2 from "../assets/mixkit-fast-small-sweep-transition-166 (mp3cut.net).mp3";

const Timer = () => {
  const { timerState, setTimerState } = useTimer();
  const { timerType, minutes, seconds, isActive, timerStarted, progress } =
    timerState;

  useEffect(() => {
    setTimerState((prevState) => ({
      ...prevState,
      minutes: getInitialMinutes(timerType),
      seconds: 0,
      isActive: false,
      timerStarted: false,
      progress: 0,
    }));
  }, [timerType]);

  useEffect(() => {
    let interval;

    if (isActive) {
      setTimerState((prevState) => ({
        ...prevState,
        timerStarted: true,
      }));

      interval = setInterval(() => {
        const totalSeconds = minutes * 60 + seconds;
        const elapsedSeconds = getInitialMinutes(timerType) * 60 - totalSeconds;

        setTimerState((prevState) => ({
          ...prevState,
          progress:
            (elapsedSeconds / (getInitialMinutes(timerType) * 60)) * 100,
        }));

        if (seconds === 0) {
          if (minutes === 0) {
            // Timer has reached 0
            resetTimer();
          } else {
            setTimerState((prevState) => ({
              ...prevState,
              minutes: prevState.minutes - 1,
              seconds: 59,
            }));
          }
        } else {
          setTimerState((prevState) => ({
            ...prevState,
            seconds: prevState.seconds - 1,
          }));
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, timerType]);

  const resetTimer = () => {
    // Play the click sound when the button is clicked
    playClickSound(clickSound);

    setTimerState((prevState) => ({
      ...prevState,
      minutes: getInitialMinutes(timerType),
      seconds: 0,
      isActive: false,
      timerStarted: false,
      progress: 0,
    }));
  };

  const playClickSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const toggleTimer = () => {
    // Play the click sound when the button is clicked
    playClickSound(clickSound);

    setTimerState((prevState) => ({
      ...prevState,
      isActive: !prevState.isActive,
    }));
  };

  const switchTimerType = (newType, soundFile) => {
    playClickSound(soundFile);
    setTimerState((prevState) => ({
      ...prevState,
      timerType: newType,
    }));
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
            className="px-5 py-2 bg-[#fc3030b5] rounded mt-4 text-white font-bold transform hover:scale-125 transition duration-300 ease-in-out"
            onClick={() => switchTimerType("pomodoro", clickSound2)}
          >
            Pomodoro
          </button>
          <button
            className="px-5 py-2 bg-[#1C92FFB0] rounded mt-4 text-white font-bold transform hover:scale-125 transition duration-300 ease-in-out"
            onClick={() => switchTimerType("shortBreak", clickSound2)}
          >
            Short Break
          </button>
          <button
            className="px-5 py-2 bg-[#8FA6AC] rounded mt-4 text-white font-bold transform hover:scale-125 transition duration-300 ease-in-out"
            onClick={() => switchTimerType("longBreak", clickSound2)}
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

export default Timer;
