import logo from "../assets/logo.svg";

import { Link } from "react-router-dom";

export default function LogoutTimeHeader() {
  return (
    <header className="w-full bg-black px-5">
      <nav className="container mx-auto bg-black flex flex-row items-center justify-between py-5 ">
        <div>
          <Link to="/">
            <img className="w-32" src={logo} alt="lws" />
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
          </ul>
        </div>
      </nav>
    </header>
  );
}
