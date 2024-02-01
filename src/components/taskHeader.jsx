/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */

import SearchTask from "./searchTask";
import TaskAction from "./taskAction";

export default function TaskHeader() {
  return (
    <div className="mb-14 items-center justify-between sm:flex">
      <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
      <div className="flex items-center space-x-5">
        <SearchTask />

        <TaskAction />
      </div>
    </div>
  );
}
