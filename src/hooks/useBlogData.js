import { useEffect } from "react";
import { useBlog } from "../context/SingleBlogContext.jsx";
import useToken from "./useToken.js";

const useBlogData = (id) => {
  const { state, dispatch } = useBlog();
  const { api } = useToken();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${id}`
        );
        if (response.status === 200) {
          const data = response.data;
          dispatch({ type: "FETCH_SUCCESS", payload: data });
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: "FETCH_ERROR", payload: "Failed to fetch blog data" });
      }
    };

    fetchBlogData();
  }, [api, dispatch, id]);

  return state;
};

export default useBlogData;
