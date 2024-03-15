/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useBlog } from "../context/SingleBlogContext.jsx";

import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";

const useBlogData = (id) => {
  const { state, dispatch } = useBlog();

  console.log(id);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        dispatch({ type: "FETCH_START" });

        const blogDocRef = doc(db, "blogs", id);
        const blogDocSnapshot = await getDoc(blogDocRef);

        if (blogDocSnapshot.exists()) {
          const blogData = blogDocSnapshot.data();
          dispatch({ type: "FETCH_SUCCESS", payload: blogData });
        } else {
          dispatch({ type: "FETCH_ERROR", payload: "Blog not found" });
        }
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };

    fetchBlog();
  }, [id, dispatch]);

  console.log(state);

  return state;
};

export default useBlogData;
