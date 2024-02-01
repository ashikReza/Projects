/* eslint-disable no-unused-vars */

import React from "react";
import Header from "./components/Header.jsx";
import Timer from "./components/Timer.jsx";
import { TimerProvider } from "./contexts/TimerContext.jsx";

import { TaskProvider } from "./contexts/TaskContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TaskBoard from "./components/taskBoard";

const App = () => {
  return (
    <>
      <TimerProvider>
        <div className="bg-blue-400 min-h-screen">
          <Header />
          <Timer />
        </div>
      </TimerProvider>

      <TaskProvider>
        <TaskBoard />
      </TaskProvider>

    

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
