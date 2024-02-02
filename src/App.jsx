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
    <div id="home">
      <TimerProvider>
        <Timer />
        <TaskProvider>
          <Header />
          <TaskBoard />
        </TaskProvider>
      </TimerProvider>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;
