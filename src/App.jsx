/* eslint-disable no-unused-vars */

import React from "react";
import Header from "./Header.jsx";
import Timer from "./components/Timer.jsx";
import { TimerProvider } from "./contexts/TimerContext.jsx";

import { TaskProvider } from "./contexts/TaskContext.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TaskBoard from "./components/taskBoard.jsx";

const App = () => {
  return (
    <>
      <TimerProvider>
        <Header />
        <Timer />
      </TimerProvider>

      <TaskProvider>
        <TaskBoard />
      </TaskProvider>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
