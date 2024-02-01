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
    dispatch({ type: "DELETE_ALL_TASKS" });
    toast.success("All tasks deleted successfully ");
    setShowPopup(false);
  };

  const handleCancelDeleteAll = () => {
    setShowPopup(false);
  };

  return (
    <>
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

      <div className="">
        {showPopup && (
          <Popup
            message="Are you sure you want to delete all tasks?"
            onConfirm={handleConfirmDeleteAll}
            onCancel={handleCancelDeleteAll}
          />
        )}
      </div>
    </>
  );
}
