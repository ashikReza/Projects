export const initialState = {
  tasks: [],
  showAddModal: false,
  taskToUpdate: null,
  searchQuery: "",
  favoriteTasksCount: 0,
  showOnlyFavorites: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        showAddModal: false,
        taskToUpdate: null,
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                title: action.payload.title,
                description: action.payload.description,
                priority: action.payload.priority,
                tags: action.payload.tags,
              }
            : task
        ),
        showAddModal: false,
        taskToUpdate: null,
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "DELETE_ALL_TASKS":
      return {
        ...state,
        tasks: [],
      };
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, isFavorited: !task.isFavorited }
            : task
        ),
      };
    case "SHOW_TASK_MODAL":
      return {
        ...state,
        showAddModal: true,
        taskToUpdate: action.payload || null,
      };
    case "CLOSE_TASK_MODAL":
      return {
        ...state,
        showAddModal: false,
        taskToUpdate: null,
      };
    case "SET_SEARCH_TASK":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "TOGGLE_FAVORITE_IN_HEADER":
      return {
        ...state,
        favoriteTasksCount: state.favoriteTasksCount + action.payload,
      };
    // Add a new case for toggling between showing all tasks and favorited tasks
    case "TOGGLE_SHOW_FAVORITES":
      return {
        ...state,
        showOnlyFavorites: !state.showOnlyFavorites,
      };
    default:
      return state;
  }
};
