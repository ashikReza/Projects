import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import mainLogo from "../../assets/BlogioLogo.png";
import { useAuth } from "../../hooks/useAuth";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase";
import Logout from "../Logout";
import SearchModal from "../SearchModal";
import usePortal from "../../hooks/usePortal";

import { useParams } from "react-router-dom";

export default function Header() {
  const { auth } = useAuth();
  const { id } = useParams();

  const [userAvatar, setUserAvatar] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const { showPortal, togglePortal } = usePortal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user's avatar
        const blogsImgRef = collection(db, "blogs");
        const authorImgQuery = query(blogsImgRef, where("uid", "==", id));
        const authorImgSnapshot = await getDocs(authorImgQuery);

        authorImgSnapshot.forEach((doc) => {
          const authorData = doc.data();
          if (authorData && authorData.authorImg) {
            setUserAvatar(authorData.authorImg);
          }
        });

        // Fetch author's name from blogs
        const blogsRef = collection(db, "blogs");
        const authorQuery = query(blogsRef, where("uid", "==", auth.user.uid));
        const authorSnapshot = await getDocs(authorQuery);
        authorSnapshot.forEach((doc) => {
          const blogData = doc.data();
          setAuthorName(blogData.authorName);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [auth.user.uid]);

  return (
    <header className="w-full bg-black">
      <nav className="container mx-auto bg-black flex flex-col md:flex-row items-center justify-between px-1 py-5">
        <div>
          <Link to="/">
            <img className="w-12 rounded-full" src={mainLogo} alt="lws" />
          </Link>
        </div>
        <div>
          <ul className="flex items-center space-x-5">
            <li>
              <Link to="/createBlog">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-all duration-200">
                  Write
                </button>
              </Link>
            </li>
            <li>
              <button
                className="flex items-center gap-2 cursor-pointer"
                onClick={togglePortal}
              >
                <FcSearch size={30} />
                <span className="text-white">Search</span>
              </button>
            </li>
            <li>
              <Logout />
            </li>
            <li className="flex items-center">
              <div>
                {userAvatar ? (
                  <img
                    className="avater-img"
                    src={userAvatar}
                    alt="User Avatar"
                  />
                ) : (
                  <span className="avatar-img bg-orange-600 text-white">
                    {authorName ? authorName[0].toUpperCase() : ""}
                  </span>
                )}
              </div>
              <Link to={`/profile/${auth.user.uid}`}>
                <span className="text-white ml-2">
                  {authorName ? authorName : ""}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {showPortal && <SearchModal onClose={togglePortal} />}
    </header>
  );
}
