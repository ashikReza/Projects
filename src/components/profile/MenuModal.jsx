/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

import { Link } from "react-router-dom";

import useToken from "../../hooks/useToken.js";
import { actions } from "../../actions/index.js";

import { useAuth } from "../../hooks/useAuth.js";

import { toast } from "react-toastify";
import { useProfile } from "../../hooks/useProfile.js";

export default function ActionMenusModal({ blogId }) {
  const { dispatch } = useProfile();
  const { api } = useToken();
  const { auth } = useAuth();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteBlog = async () => {
    try {
      // Make a DELETE request to the API endpoint with the blog ID
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      // Check if the deletion was successful
      if (response.status === 200) {
        // Dispatch the POST_DELETED action with the blogId as payload
        dispatch({ type: actions.profile.DELETE_BLOG, blogId });

        // Close the confirmation modal
        setShowConfirmation(false);

        toast.success("Blog deleted successfully", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const confirmDeleteBlog = () => {
    setShowConfirmation(true);
  };

  const cancelDeleteBlog = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="action-modal-container popup-animation">
      <Link to={`/updateBlog/${blogId}`}>
          <button className="action-menu-item hover:text-lwsGreen">
            <MdOutlineEdit />
            Edit
          </button>
        </Link>
        <button
          className="action-menu-item hover:text-red-500"
          onClick={confirmDeleteBlog}
        >
          <RiDeleteBinLine />
          Delete
        </button>
      </div>
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-40">
          <div className=" bg-slate-300 p-8 rounded-lg shadow-lg text-center popup-animation">
            <p className="text-black">
              Are you sure you want to delete this blog?
            </p>
            <div className="mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
                onClick={handleDeleteBlog}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={cancelDeleteBlog}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
