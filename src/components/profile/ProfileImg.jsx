import { useRef, useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
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
import { useParams } from "react-router-dom";

export default function ProfileImg() {
  const { auth } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const fileUploaderRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch user's avatar
        const usersRef = collection(db, "usersImg");
        const userQuery = query(usersRef, where("uid", "==", id));
        const userSnapshot = await getDocs(userQuery);
        userSnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData && userData.avatar) {
            setUserAvatar(userData.avatar);
          }
        });

        // Fetch author's name from blogs
        const blogsRef = collection(db, "blogs");
        const authorQuery = query(blogsRef, where("uid", "==", id));
        const authorSnapshot = await getDocs(authorQuery);
        authorSnapshot.forEach((doc) => {
          const blogData = doc.data();
          setAuthorName(blogData.authorName);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

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

      await addDoc(collection(db, "usersImg"), {
        uid: auth.user.uid,
        avatar: downloadURL,
        createdAt: serverTimestamp(),
      });

      setUserAvatar(downloadURL);

      const blogsRef = collection(db, "blogs");
      const userBlogsQuery = query(blogsRef, where("uid", "==", auth.user.uid));
      const userBlogsSnapshot = await getDocs(userBlogsQuery);

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
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
        {userAvatar ? (
          <img src={userAvatar} className="rounded-full" alt="User Avatar" />
        ) : (
          <div className="w-full h-full text-white bg-orange-600 flex items-center justify-center rounded-full">
            <span className="text-5xl">
              {authorName ? authorName[0].toUpperCase() : ""}
            </span>
          </div>
        )}

        {auth.user.uid === id && (
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
