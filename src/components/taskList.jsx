import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useTaskContext } from "../utils/taskUtils.jsx";

import { FaSearch } from "react-icons/fa";

import { toast } from "react-toastify";

import Popup from "./Popup.jsx";

export default function TaskList() {
  const { state, dispatch } = useTaskContext();
  const { tasks, searchQuery } = state;

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleEditTask(task) {
    dispatch({ type: "SHOW_TASK_MODAL", payload: task });
  }

  function handleFavoriteToggle(taskId) {
    dispatch({ type: "TOGGLE_FAVORITE", payload: taskId });
  }

  const handleDeleteTask = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeletePopup(true);
  };

  const handleConfirmDeleteTask = () => {
    dispatch({ type: "DELETE_TASK", payload: taskToDelete });
    toast.success("Task deleted successfully ");
    setShowDeletePopup(false);
  };

  const handleCancelDeleteTask = () => {
    setShowDeletePopup(false);
  };

  const tagColors = [
    "bg-[#FE1A1AB5]",
    "bg-[#1C92FFB0]",
    "bg-[#00D991A1]",
    "bg-[#8407E6A8]",
    "bg-[#00B2D9CC]",
    "bg-[#BD560BB2]",
  ];

  return (
    <div className="overflow-auto">
      <table className="table-fixed overflow-auto xl:w-full">
        <thead>
          <tr>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px] ">
              Title
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
              Description
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
              Tags
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
              Priority
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
              Options
            </th>
          </tr>
        </thead>
        {filteredTasks.length > 0 ? (
          <tbody>
            {filteredTasks.map((task) => (
              <tr
                className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2"
                key={task.id}
              >
                <td className="cursor-pointer">
                  <button onClick={() => handleFavoriteToggle(task.id)}>
                    {task.isFavorited ? (
                      <FaStar color="yellow" size={22} />
                    ) : (
                      <FaStar color="gray" size={22} />
                    )}
                  </button>
                </td>
                <td className="flex">{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <ul className="flex justify-center gap-1.5 flex-wrap">
                    {task.tags.map((tag, index) => (
                      <li key={tag}>
                        <span
                          className={`inline-block h-5 whitespace-nowrap rounded-[45px] px-2.5 text-sm capitalize text-[#F4F5F6] ${
                            tagColors[index % tagColors.length]
                          }`}
                        >
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="text-center">{task.priority}</td>
                <td>
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="text-blue-500"
                      onClick={() => handleEditTask(task)}
                    >
                      Edit
                    </button>
                  </div>
                </td>

                <div className="">
                  {showDeletePopup && (
                    <Popup
                      message="Are you sure you want to delete "
                      title={task.title}
                      onConfirm={handleConfirmDeleteTask}
                      onCancel={handleCancelDeleteTask}
                    />
                  )}
                </div>
              </tr>
            ))}
          </tbody>
        ) : (
          <p className="absolute left-1/2 transform -translate-x-1/2 text-white text-center font-bold text-lg sm:text-xl flex items-center gap-2">
            <FaSearch color="white" /> No tasks found with the provided{" "}
            <span className="font-bold text-green-400">{searchQuery}</span>{" "}
            keyword
          </p>
        )}
      </table>
    </div>
  );
}
