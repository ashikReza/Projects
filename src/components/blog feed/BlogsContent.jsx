/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import ActionMenuModal from "./ActionMenuModal.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { useBlogs } from "../../hooks/useBlogs.js";
import { actions } from "../../actions/index.js";
// import { toast } from "react-toastify";

import {
  collection,
  query,
  getDocs,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase.js"; // Your Firebase configuration file

export default function BlogsContent() {
  const [openBlogId, setOpenBlogId] = useState(null);
  const [lastBlog, setLastBlog] = useState(null); // Track the last blog fetched
  const [hasMore, setHasMore] = useState(true); // Track if there are more blogs to load
  const sentinelRef = useRef(null);

  const toggleModal = (blogId) => {
    setOpenBlogId(blogId === openBlogId ? null : blogId);
  };

  const { auth } = useAuth();
  const { state, dispatch } = useBlogs();

  useEffect(() => {
    fetchBlogs(); // Fetch the initial batch of blogs
  }, []);

  const fetchBlogs = async () => {
    try {
      const blogsRef = collection(db, "blogs");
      const q = query(blogsRef, orderBy("createdAt", "desc"), limit(10));
      const querySnapshot = await getDocs(q);

      const fetchedBlogs = [];
      querySnapshot.forEach((doc) => {
        fetchedBlogs.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      console.log("Fetched Blogs:", fetchedBlogs); // Log the fetched data

      dispatch({
        type: actions.blogs.FETCH_BLOGS_SUCCESS,
        blogs: fetchedBlogs,
      });

      // Update hasMore state based on whether there are more blogs to fetch
      setHasMore(querySnapshot.size > 0);

      // Update lastBlog state
      if (querySnapshot.size > 0) {
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastBlog(lastVisible);
      }
    } catch (error) {
      console.error("Error fetching blogs: ", error);
      dispatch({
        type: actions.blogs.FETCH_BLOGS_FAILURE,
        error: error.message,
      });
    }
  };

  const fetchMoreBlogs = async () => {
    try {
      const blogsRef = collection(db, "blocks");
      const q = query(
        blogsRef,
        orderBy("createdAt", "desc"),
        startAfter(lastBlog),
        limit(10)
      );
      const querySnapshot = await getDocs(q);

      const fetchedBlogs = [];
      querySnapshot.forEach((doc) => {
        fetchedBlogs.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      dispatch({
        type: actions.blogs.FETCH_MORE_BLOGS_SUCCESS,
        blogs: fetchedBlogs,
      });

      // Update hasMore state based on whether there are more blogs to fetch
      setHasMore(querySnapshot.size > 0);

      // Update lastBlog state
      if (querySnapshot.size > 0) {
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastBlog(lastVisible);
      }
    } catch (error) {
      console.error("Error fetching more blogs: ", error);
      dispatch({
        type: actions.blogs.FETCH_MORE_BLOGS_FAILURE,
        error: error.message,
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const sentinel = entries[0];
        if (sentinel.isIntersecting && hasMore) {
          fetchMoreBlogs();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [hasMore, lastBlog]);

  // Define custom loader component
  const CustomLoader = () => {
    return (
      <div className="blog-card animate-pulse p-4 py-16 border border-gray-300 rounded-lg">
        <div className="flex space-x-4">
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  };

  console.log(state);

  return (
    <div className="space-y-3 md:col-span-5">
      {state.blogs.map((blog) => (
        <div key={blog.id} className="blog-card">
          <Link to={`/singleBlog/`}>
            <img className="blog-thumb" src={blog.thumbnailUrl} alt="" />
          </Link>
          <div className="mt-2 relative">
            <Link to={`/singleBlog/`}>
              <h3 className="text-slate-300 text-xl lg:text-2xl">
                {blog.title}
              </h3>

              <p className="mb-6 text-base text-slate-500 mt-1">
                {blog.content}
              </p>
            </Link>
            <div className="flex justify-between items-center">
              <Link to={`/profile/`}>
                <div className="flex items-center capitalize space-x-2">
                  {blog.authorImg ? (
                    <img
                      src={`${import.meta.env.VITE_SERVER_AVATAR_URL}/${
                        blog.author.avatar
                      }`}
                      alt=""
                      className="avater-img"
                    />
                  ) : (
                    <div className="avater-img bg-blue-600 text-white">
                      {blog.authorName ? blog.authorName[0].toUpperCase() : " "}
                    </div>
                  )}

                  <div>
                    <h5 className="text-slate-500 text-sm"></h5>
                    <div className="flex items-center text-xs text-slate-700">
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="text-sm px-2 py-1 text-slate-700">
                <span>{blog.likes?.length ?? 0} Likes</span>{" "}
                {/* Safely access likes property */}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div ref={sentinelRef}></div>
      {hasMore && <CustomLoader />}
    </div>
  );
}
