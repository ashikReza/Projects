/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

import useToken from "../hooks/useToken";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Search({ onClose }) {
  const { api } = useToken();
  const { auth } = useAuth();

  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  const debounceTimer = useRef(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(handleSearch, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/search?q=${query}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.authToken}`,
          },
        }
      );
      if (response.status === 200) {
        const searchData = response.data;

        setSearchResults(searchData.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains("Modal")) {
      onClose();
    }
  };

  return (
    <section
      className=" fixed left-0 top-[-0.5rem] sm:top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-[100] Modal"
      onClick={handleModalClick}
    >
      <div className="relative w-[95%] sm:w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10 popup-animation">
        <div>
          <h3 className="font-bold text-xl pl-2 pt-6 text-slate-400 my-2">
            Search for Your Desired Blogs
          </h3>
          <input
            type="text"
            placeholder="Start Typing to Search"
            value={query}
            onChange={handleInputChange}
            className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
          />
        </div>

        <div className="h-[25rem] overflow-y-scroll overscroll-contain">
          <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>

          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <div
                key={result.id}
                className="my-4 divide-slate-500/30 max-h-80  "
              >
                <Link to={`/singleBlog/${result.id}`}>
                  <div
                    className="flex gap-6 py-2 flex-col sm:flex-row"
                    onClick={onClose}
                  >
                    <img
                      className="h-28 object-cover sm:object-contain"
                      src={`${import.meta.env.VITE_SERVER_BLOG_URL}/${
                        result.thumbnail
                      }`}
                      alt=""
                    />
                    <div className="mt-2">
                      <h3 className="text-slate-300 text-xl font-bold">
                        {result.title}
                      </h3>

                      <p className="mb-6 text-sm text-slate-500 mt-1 line-clamp-3">
                        {result.content}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-slate-400">No results found</p>
          )}
        </div>

        <button className="absolute top-5 right-5" onClick={onClose}>
          <IoIosCloseCircleOutline size={30} />
        </button>
      </div>
    </section>
  );
}
