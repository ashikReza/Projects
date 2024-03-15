import { useState, useEffect } from "react";
import { useProfile } from "../../hooks/useProfile";
import { MdOutlineEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { actions } from "../../actions/index.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useParams } from "react-router-dom";
import { doc, getDoc,setDoc } from "firebase/firestore"; // Import necessary Firebase Firestore functions
import { db } from "../../firebase"; // Assuming you have a firebase.js file where you initialize Firebase

export default function ProfileBio() {
  const { state, dispatch } = useProfile();
  const { auth } = useAuth();
  const { id } = useParams();
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const userDocRef = doc(db, "userBios", auth.user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setBio(userData.bio);
        }
      } catch (error) {
        console.error("Error fetching bio:", error);
      }
    };

    fetchBio();
  }, [auth.user.uid]);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setBio(state?.user?.bio);
  }, [state?.user?.bio]);

  const handleBioEdit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      // Update user's bio in Firestore
      const userDocRef = doc(db, "userBios", auth.user.uid);
      await setDoc(userDocRef, { uid: auth.user.uid, bio });

      // Dispatch action to update state with new bio
      dispatch({
        type: actions.profile.PROFILE_BIO_EDITED,
        user: { ...state.user, bio },
      });

      setEditMode(false); // Disable edit mode on success
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
            {bio}
          </p>
        ) : (
          <textarea
            className="p-2 leading-[188%] text-gray-600 lg:text-lg rounded-md"
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
