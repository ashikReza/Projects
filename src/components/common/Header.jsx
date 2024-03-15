// import logo from "../../assets/logo.svg";
import mainLogo from "../../assets/BlogioLogo.png";

import { FcSearch } from "react-icons/fc";
import { Link } from "react-router-dom";
import SearchModal from "../SearchModal.jsx";
import Logout from "../Logout.jsx";

import { useAuth } from "../../hooks/useAuth.js";
import usePortal from "../../hooks/usePortal.js";

import { useProfile } from "../../hooks/useProfile.js";

export default function Header() {
  const { auth } = useAuth();
  const { showPortal, togglePortal } = usePortal();
  const { state } = useProfile();

  // console.log(auth.user.uid);
  // console.log(auth.user.proactiveRefresh.user.uid);

  /// Extract username and profile URL if auth.user exists
  let displayName = "";

  if (auth.user) {
    const user = auth.user.providerData[0];
    displayName = user.displayName || "";
  }

  return (
    <header className="w-full bg-black">
      <nav className="container mx-auto bg-black flex flex-col md:flex-row items-center justify-between px-1 py-5 ">
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
                <span className=" text-white">Search</span>
              </button>
            </li>
            <li>
              <Logout />
            </li>
            <li className="flex items-center">
              <div className=" ">
                {state.user.avatar ? (
                  <img className="avater-img" src={state.user.avatar} alt="" />
                ) : (
                  <span className="avater-img bg-orange-600 text-white">
                    {displayName ? displayName[0].toUpperCase() : ""}
                  </span>
                )}
              </div>
              <Link to={`/profile`}>
                <span className="text-white ml-2">
                  {displayName ? `${displayName}` : ""}
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
