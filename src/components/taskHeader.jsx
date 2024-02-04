/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */

import SearchTask from "./searchTask.jsx";
import TaskAction from "./taskAction.jsx";

export default function TaskHeader() {
  return (
    <div className="w-full mb-14 items-center justify-between sm:flex">
      <h2 className="text-2xl font-semibold max-sm:mb-4 pb-6 sm:pb-0">
        Your Tasks
      </h2>
      <div className="max-sm:flex-col sm:flex justify-center items-center gap-5">
        <SearchTask />

        <TaskAction />
      </div>
    </div>
  );
}
