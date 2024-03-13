/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { RiDeleteBinLine } from "react-icons/ri";

import { useAuth } from "../../hooks/useAuth.js";

import { useState } from "react";
import useToken from "../../hooks/useToken.js";

export default function Comments({ blogData }) {
  // Extract comments from blogData
  const { comments } = blogData;

  const { auth } = useAuth();
  const { api } = useToken();

  const myAvatar = auth.user.avatar;

  const [commentContent, setCommentContent] = useState("");
  const [commentsState, setComments] = useState(comments || []);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  const handleAddComment = async () => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogData.id}/comment`,
        {
          content: commentContent, // Pass the content of the new comment in the request body
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setComments(response.data.comments);

      setCommentContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setCommentIdToDelete(commentId);
    setShowConfirmation(true);
  };

  const confirmDeleteComment = async () => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${
          blogData.id
        }/comment/${commentIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedComments = commentsState.filter(
          (comment) => comment.id !== commentIdToDelete
        );

        setComments(updatedComments);
      }

      // Reset confirmation state
      setShowConfirmation(false);
      setCommentIdToDelete(null);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const isCommentOwner = (comment) => {
    return comment.author.id === auth.user.id;
  };

  return (
    <section id="comments" className="bg-[#030317] text-white py-1">
      <div className="mx-auto w-full md:w-10/12 container px-4">
        <h2 className="text-3xl font-bold my-8">
          Comments {comments && comments.length}
        </h2>

        <div className="flex items -center space-x-4">
          {myAvatar ? (
            <img
              className="avater-img"
              src={`${import.meta.env.VITE_SERVER_AVATAR_URL}/${myAvatar}`}
              alt=""
            />
          ) : (
            <div className="avater-img bg-indigo-600 text-white">
              <span className="">S</span>
            </div>
          )}

          <div className="w-full">
            <textarea
              className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
              placeholder="Write a comment"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)} // Update the comment content state
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                onClick={handleAddComment}
              >
                Comment
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Comment --> */}
        {commentsState.map((comment) => (
          <div
            key={comment.id}
            className="flex justify-between space-x-4 my-8 "
          >
            {comment.author.avatar ? (
              <img
                className="avater-img"
                src={`${import.meta.env.VITE_SERVER_AVATAR_URL}/${
                  comment.author.avatar
                }`}
                alt=""
              />
            ) : (
              <div className="avater-img bg-orange-600 text-white">
                <span>{comment.author.firstName.charAt(0)}</span>
              </div>
            )}

            <div className="w-full">
              <h5 className="text-slate-500 font-bold">{`${comment.author.firstName} ${comment.author.lastName}`}</h5>
              <p className="text-slate-300">{comment.content}</p>
            </div>

            {isCommentOwner(comment) && (
              <div className=" relative top-1 sm:top-3">
                <button
                  className="text-white hover:text-red-500"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  <RiDeleteBinLine size={22} />
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Confirmation Popup */}
        {showConfirmation && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className=" bg-slate-300 p-8 rounded-lg shadow-lg text-center popup-animation">
              <p className="text-black">
                Are you sure you want to delete this comment?
              </p>
              <div className="mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
                  onClick={confirmDeleteComment}
                >
                  Yes, Delete
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
