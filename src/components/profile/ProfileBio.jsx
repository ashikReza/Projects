import { useState } from "react";

import { useProfile } from "../../hooks/useProfile";
import { MdOutlineEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

import { actions } from "../../actions/index.js";
import usetoken from "../../hooks/useToken.js";

import { useAuth } from "../../hooks/useAuth.js";

import { useParams } from "react-router-dom";

export default function ProfileBio() {
  const { state, dispatch } = useProfile();
  const { api } = usetoken();

  const { auth } = useAuth();
  const { id } = useParams();

  const [bio, setBio] = useState(state?.user?.bio);
  const [editMode, setEditMode] = useState(false);

  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile`, // Endpoint for updating the authenticated user's profile
        { bio }, // Payload containing the updated bio
        {
          headers: {
            Authorization: `Bearer ${auth?.authToken}`, // Include authorization header
          },
        }
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.PROFILE_BIO_EDITED,
          user: response.data.user,
        });
        setEditMode(false); // Disable edit mode on success
      }
    } catch (err) {
      dispatch({
        type: actions.profile.PROFILE_DATA_FETCH_ERROR,
        error: err.message,
      });
      console.error("Error updating bio:", err);
    }
  };

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state.user?.bio}
          </p>
        ) : (
          <textarea
            className='p-2 className="leading-[188%] text-gray-600 lg:text-lg rounded-md'
            value={bio}
            rows={4}
            cols={55}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>

      {auth?.user?.id === id &&
        (!editMode ? (
          <button
            className="flex-center h-7 w-7 rounded-full"
            onClick={() => setEditMode(true)}
          >
            <MdOutlineEdit color="white" />
          </button>
        ) : (
          <button
            className="flex-center h-7 w-7 rounded-full"
            onClick={handleBioEdit}
          >
            <FaCheck color="white" />
          </button>
        ))}
    </div>
  );
}
