export const getInitialMinutes = (timerType) => {
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

export const getBackgroundColor = (timerType) => {
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

export const getTimerTypeName = (timerType) => {
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

export const getFooterTypeName = (timerType) => {
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
