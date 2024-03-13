import { useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import { actions } from "../../actions/index.js";

import { HiDotsVertical } from "react-icons/hi";
import MenuModal from "./MenuModal.jsx";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

export default function ProfileBlogs() {
  const { state, dispatch } = useProfile();

  const { auth } = useAuth();
  const { id } = useParams();

  // Function to toggle blog content display
  const toggleContentDisplay = (blogId) => {
    dispatch({
      type: actions.profile.TOGGLE_BLOG_CONTENT_DISPLAY,
      blogId: blogId,
    });
  };

  const [openBlogId, setOpenBlogId] = useState(null);

  const toggleModal = (blogId) => {
    setOpenBlogId(blogId === openBlogId ? null : blogId);
  };

  return (
    <div className="my-6 space-y-4">
      {state.blogs.length === 0 ? (
        <div className=" w-full h-32">
          <div className="text-center">
            <p className=" text-white">No blogs available</p>
            <p className="text-white font-semibold">Create a new blog now!</p>
            <Link to="/createBlog">
              <button className="bg-indigo-600 text-white px-4 py-2 mt-4 rounded-md hover:bg-indigo-700 transition-all duration-200">
                Create Blog
              </button>
            </Link>
          </div>
        </div>
      ) : (
        state.blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <img
              className="blog-thumb"
              src={`${import.meta.env.VITE_SERVER_BLOG_URL}/${blog.thumbnail}`}
              alt=""
            />
            <div className="mt-2">
              <div className="flex justify-between">
                <Link to={`/singleBlog/${blog.id}`}>
                  <h3 className="text-slate-300 text-xl lg:text-2xl">
                    {blog.title}
                  </h3>
                </Link>
                {/* <!-- action dot --> */}
                {auth?.user?.id === id && (
                  <div className=" relative right-0">
                    <button onClick={() => toggleModal(blog.id)}>
                      <HiDotsVertical color="white" />
                    </button>

                    {/* <!-- Action Menus Popup --> */}
                    {openBlogId === blog.id && <MenuModal blogId={blog.id} />}
                  </div>
                )}

                {/* <!-- action dot ends --> */}
              </div>

              {/* Conditional rendering for content */}
              {blog.showFullContent ? (
                <p className="mb-6 text-base text-slate-500 mt-1">
                  {blog.content}
                </p>
              ) : (
                <p
                  className="mb-6 text-base text-slate-500 mt-1"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {blog.content}
                </p>
              )}
              {/* Read more button */}
              <button
                className="text-slate-400 hover:text-slate-200 relative bottom-5"
                onClick={() => toggleContentDisplay(blog.id)}
              >
                {blog.showFullContent ? "Read Less" : "Read More"}
              </button>

              {/* <!-- Meta Informations --> */}
              <div className="flex justify-between items-center">
                <div className="flex items-center capitalize space-x-2">
                  <div className="">
                    {blog.author.avatar ? (
                      <img
                        src={`${import.meta.env.VITE_SERVER_AVATAR_URL}/${
                          state.user.avatar
                        }`}
                        alt=""
                        className="avater-img"
                      />
                    ) : (
                      <div className="avater-img bg-blue-600 text-white">
                        {blog.author.firstName
                          ? blog.author.firstName[0].toUpperCase()
                          : " "}
                      </div>
                    )}
                  </div>
                  <div>
                    <h5 className="text-slate-500 text-sm">{`${blog.author.firstName} ${blog.author.lastName}`}</h5>
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
                <div className="text-sm px-2 py-1 text-slate-700">
                  <span>{blog.likes.length} Likes</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
