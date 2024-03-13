/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const SingleBlogContext = createContext();

const initialState = {
  blogData: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        blogData: action.payload,
        loading: false,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const SingleBlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SingleBlogContext.Provider value={{ state, dispatch }}>
      {children}
    </SingleBlogContext.Provider>
  );
};

const useBlog = () => {
  const context = useContext(SingleBlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { SingleBlogProvider, useBlog };
