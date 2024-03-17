/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { useBlogs } from "../../hooks/useBlogs.js";
import { actions } from "../../actions/index.js";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase.js";

export default function BlogsContent() {
  const { auth } = useAuth();
  const { state, dispatch } = useBlogs();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsRef = collection(db, "blogs");
        const q = query(blogsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const fetchedBlogs = [];
        querySnapshot.forEach((doc) => {
          fetchedBlogs.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        // console.log("Fetched Blogs:", fetchedBlogs);
        dispatch({
          type: actions.blogs.FETCH_BLOGS_SUCCESS,
          blogs: fetchedBlogs,
        });
      } catch (error) {
        console.error("Error fetching blogs: ", error);
        dispatch({
          type: actions.blogs.FETCH_BLOGS_FAILURE,
          error: error.message,
        });
      }
    };

    fetchBlogs();
  }, [auth.user.uid, dispatch]);

  console.log("State blogs:", state.blogs);
  return (
    <div className="space-y-3 md:col-span-5">
      {state.blogs.map((blog) => (
        <div key={blog.id} className="blog-card">
          <Link to={`/singleBlog/${blog.id}`}>
            <img className="blog-thumb" src={blog.thumbnailUrl} alt="" />
          </Link>
          <div className="mt-2 relative">
            <Link to={`/singleBlog/${blog.id}`}>
              <h3 className="text-slate-300 text-xl lg:text-2xl">
                {blog.title}
              </h3>

              <p className="mb-6 text-base text-slate-500 mt-1">
                {blog.content}
              </p>
            </Link>
            <div className="flex justify-between items-center">
              <Link to={`/profile/${blog.uid}`}>
                <div className="flex items-center capitalize space-x-2">
                  {blog.authorImg ? (
                    <img
                      src={blog.authorImg}
                      alt="User Avatar"
                      className="avater-img"
                    />
                  ) : (
                    <div className="avater-img bg-blue-600 text-white">
                      {blog.authorName ? blog.authorName[0].toUpperCase() : " "}
                    </div>
                  )}

                  <div>
                    <h5 className="text-slate-500 text-sm">
                      {blog.authorName}
                    </h5>
                    <div className="flex items-center text-xs text-slate-700">
                      <span>
                        {new Date(
                          blog.createdAt.seconds * 1000
                        ).toLocaleDateString("en-US", {
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
    </div>
  );
}
