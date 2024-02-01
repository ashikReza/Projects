/* eslint-disable no-unused-vars */
// App.js
import React from "react";
import Header from "./components/Header";
import Timer from "./components/Timer";
import { TimerProvider } from "./contexts/TimerContext";

const App = () => {
  return (
    <div className="h-screen w-full">
      <TimerProvider>
        <div className="bg-blue-400 min-h-screen">
          <Header />
          <Timer />
        </div>
      </TimerProvider>
    </div>
  );
};

export default App;
