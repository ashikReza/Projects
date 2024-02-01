/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { useTaskContext } from "../utils/taskUtils";

import TaskHeader from "./taskHeader.jsx";
import TaskList from "./taskList.jsx";
import TaskModal from "./TaskModal.jsx";

import { useTimer } from "../contexts/TimerContext.jsx";
import { getBackgroundColor } from "../utils/TimerUtils.jsx";

export default function TaskBoard() {
  const { state } = useTaskContext();
  const { tasks, showAddModal } = state;

  const timerContext = useTimer(); // Use useTimer hook
  const timerType = timerContext ? timerContext.timerState.timerType : null;

  return (
    <section
      className={`pb-20 flex justify-center items-center text-white bg-opacity-70 transition-colors duration-500 ${getBackgroundColor(
        timerType
      )}`}
      id="tasks"
    >
      {showAddModal && <TaskModal />}

      <div className="container my-2">
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 mx-2 md:px-9 md:py-16">
          <TaskHeader />
          {tasks.length === 0 ? (
            <p className="text-white text-center font-bold text-xl sm:text-2xl">
              Task List is empty!
            </p>
          ) : (
            <TaskList />
          )}
        </div>
      </div>
    </section>
  );
}
