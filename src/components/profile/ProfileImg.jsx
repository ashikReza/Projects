import { useRef, useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { useProfile } from "../../hooks/useProfile";
import { actions } from "../../actions";
import { useAuth } from "../../hooks/useAuth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function ProfileImg() {
  const { state, dispatch } = useProfile();
  const { auth } = useAuth();

  console.log(auth.user.uid);

  const fileUploaderRef = useRef();
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const fetchAvatarURL = async () => {
      setLoading(true); // Set loading to true when fetching
      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("uid", "==", auth.user.uid));
      const querySnapshot = await getDocs(userQuery);
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.avatar) {
          dispatch({
            type: actions.profile.IMAGE_UPDATED,
            data: { avatar: userData.avatar },
          });
        }
      });
      setLoading(false); // Set loading to false when done fetching
    };

    fetchAvatarURL();
  }, [auth.user.uid, dispatch]);

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploaderRef.current.click();
  };

  const updateImageDisplay = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const storage = getStorage();
    const avatarRef = ref(storage, `avatars/${auth.user.uid}/${file.name}`);

    try {
      await uploadBytes(avatarRef, file);
      const downloadURL = await getDownloadURL(avatarRef);

      await addDoc(collection(db, "users"), {
        uid: auth.user.uid,
        avatar: downloadURL,
        createdAt: serverTimestamp(),
      });

      dispatch({
        type: actions.profile.IMAGE_UPDATED,
        data: { avatar: downloadURL },
      });

      // Query Firestore to find all blogs authored by the current user
      const blogsRef = collection(db, "blogs");
      const userBlogsQuery = query(blogsRef, where("uid", "==", auth.user.uid));
      const userBlogsSnapshot = await getDocs(userBlogsQuery);

      // Iterate through each blog document and update the authorImg field
      userBlogsSnapshot.forEach(async (doc) => {
        const blogRef = doc.ref;
        await updateDoc(blogRef, { authorImg: downloadURL });
      });
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  // Render loading indicator if loading
  if (loading) {
    return <div className=" text-white">Loading...</div>;
  }

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
        {state.user.avatar ? (
          <img
            src={state.user.avatar}
            className="rounded-full"
            alt="User Avatar"
          />
        ) : (
          <div className="w-full h-full text-white bg-orange-600 flex items-center justify-center rounded-full">
            <span className="text-5xl">
              {auth.user.displayName && auth.user.displayName[0].toUpperCase()}
            </span>
          </div>
        )}
        {auth.user && (
          <form className="avatar-upload-form">
            <button
              className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
              onClick={handleImageUpload}
              type="button"
            >
              <MdOutlineEdit color="white" />
            </button>
            <input
              type="file"
              ref={fileUploaderRef}
              hidden
              onChange={updateImageDisplay}
            />
          </form>
        )}
      </div>
    </div>
  );
}
