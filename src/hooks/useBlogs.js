import { useContext } from "react";
import { BlogsContext } from "../context";

export const useBlogs = () => {
  return useContext(BlogsContext);
};
