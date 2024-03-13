/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { blogsReducer, initialState } from "../reducers/blogsReducer";

import { BlogsContext } from "../context";

const BlogsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogsReducer, initialState);

  return (
    <BlogsContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogsContext.Provider>
  );
};

export default BlogsProvider;
