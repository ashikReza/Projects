/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { useTaskContext } from "../utils/taskUtils";

import TaskHeader from "./taskHeader";
import TaskList from "./taskList";
import TaskModal from "./TaskModal";

export default function TaskBoard() {
  const { state } = useTaskContext();
  const { tasks, showAddModal } = state;

  return (
    <section
      className="py-20 flex justify-center items-center text-white bg-[#191D26] "
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
