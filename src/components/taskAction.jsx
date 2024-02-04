/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { useTaskContext } from "../utils/taskUtils.jsx";

import { toast } from "react-toastify";

import Popup from "./Popup.jsx";

export default function TaskAction() {
  const { state, dispatch } = useTaskContext();

  const { tasks } = state;

  const [showPopup, setShowPopup] = useState(false);

  const handleAddClick = () => {
    dispatch({ type: "SHOW_TASK_MODAL" });
  };

  const handleDeleteAllClick = () => {
    setShowPopup(true);
  };

  const handleConfirmDeleteAll = () => {
    const favoritedTasksCount = state.tasks.reduce(
      (count, task) => (task.isFavorited ? count + 1 : count),
      0
    );

    // Decrease the count by the number of favorited tasks
    dispatch({
      type: "UPDATE_FAVORITE_COUNT_IN_HEADER",
      payload: state.favoriteTasksCount - favoritedTasksCount,
    });

    dispatch({ type: "DELETE_ALL_TASKS" });
    toast.success("All tasks deleted successfully ");
    setShowPopup(false);
  };

  const handleCancelDeleteAll = () => {
    setShowPopup(false);
  };

  return (
    <div className="w-full flex justify-center my-4 mx-auto gap-4">
      <button
        className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
        onClick={handleAddClick}
      >
        Add Task
      </button>
      <button
        className={`rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold disabledBtn ${
          tasks.length === 0 ? "opacity-60 cursor-not-allowed" : ""
        }`}
        onClick={handleDeleteAllClick}
        disabled={tasks.length === 0}
      >
        Delete All
      </button>

      <>
        {showPopup && (
          <Popup
            message="Are you sure you want to delete all tasks?"
            onConfirm={handleConfirmDeleteAll}
            onCancel={handleCancelDeleteAll}
          />
        )}
      </>
    </div>
  );
}
