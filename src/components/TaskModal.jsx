/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { useTaskContext } from "../utils/taskUtils.jsx";

import { toast } from "react-toastify";

export default function TaskModal() {
  const { state, dispatch } = useTaskContext();
  const { taskToUpdate } = state;

  const [task, setTask] = useState(
    taskToUpdate || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      tags: [],
      priority: "",
      isFavorited: false,
    }
  );

  const [isAdd, setIsAdd] = useState(Object.is(taskToUpdate, null));

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "tags") {
      value = value.split(",");
    }

    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleAddTask = () => {
    if (
      !task.title ||
      !task.description ||
      (Array.isArray(task.tags) &&
        task.tags.every((tag) => tag.trim() === "")) ||
      !task.priority
    ) {
      toast.warn("Please fill in all the fields!");
      return;
    }

    // Check if the task is not updated
    if (!isAdd && taskToUpdate && !isTaskUpdated(task, taskToUpdate)) {
      toast.warn(`${task.title} task is not updated!`);
      handleCloseClick();
      return;
    }

    dispatch({ type: isAdd ? "ADD_TASK" : "UPDATE_TASK", payload: task });

    toast.success(
      isAdd ? "Task added successfully" : `Task edited successfully`
    );

    handleCloseClick();
  };

  const handleCloseClick = () => {
    dispatch({ type: "CLOSE_TASK_MODAL" });
  };

  const handleOutsideClick = (e) => {
    const formElement = document.getElementById("taskForm");

    if (formElement && !formElement.contains(e.target)) {
      handleCloseClick();
    }
  };

  // Helper function to check if the task is updated
  const isTaskUpdated = (newTask, oldTask) => {
    return (
      newTask.title !== oldTask.title ||
      newTask.description !== oldTask.description ||
      newTask.priority !== oldTask.priority ||
      !tags(newTask.tags, oldTask.tags)
    );
  };

  // Helper function to check if tags are equal
  const tags = (arr1, arr2) => {
    if (!arr1 && !arr2) return true;
    if ((!arr1 && arr2) || (arr1 && !arr2)) return false;
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  return (
    <div
      className="backdrop-blur-md h-full w-full z-50 flex justify-center items-center fixed top-0 "
      onClick={handleOutsideClick}
    >
      <form
        id="taskForm"
        className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 drop-animation"
      >
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          {isAdd ? "Add New Task" : "Edit Task"}
        </h2>

        {/* <!-- inputs --> */}
        <div className="space-y-9 text-white lg:space-y-10">
          {/* <!-- title --> */}
          <div className="space-y-2 lg:space-y-3">
            <label for="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              id="title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>
          {/* <!-- description --> */}
          <div className="space-y-2 lg:space-y-3">
            <label for="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              id="description"
              value={task.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          {/* <!-- input group --> */}
          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            {/* <!-- tags --> */}
            <div className="space-y-2 lg:space-y-3">
              <label for="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                id="tags"
                value={task.tags}
                onChange={handleChange}
                required
              />
            </div>
            {/* <!-- priority --> */}
            <div className="space-y-2 lg:space-y-3">
              <label for="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                id="priority"
                value={task.priority}
                onChange={handleChange}
                required
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
        {/* <!-- inputs ends --> */}
        <div className="mt-16 flex justify-between lg:mt-20">
          <button
            type="button"
            className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
            onClick={handleCloseClick}
          >
            Close
          </button>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            onClick={handleAddTask}
          >
            {isAdd ? "Create new Task" : "Save Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
