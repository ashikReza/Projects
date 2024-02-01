/* eslint-disable no-unused-vars */

import React from "react";
import Header from "./components/Header.jsx";
import Timer from "./components/Timer.jsx";
import { TimerProvider } from "./contexts/TimerContext.jsx";

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
