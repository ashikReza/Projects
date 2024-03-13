/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";

import useToken from "../../hooks/useToken.js";
import { useAuth } from "../../hooks/useAuth.js";

import { Link } from "react-router-dom";

export default function FavoriteBlogs() {
  const { auth } = useAuth();
  const { api } = useToken();

  const [favoriteBlogs, setFavoriteBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavoriteBlogs() {
      try {
        const response = await api.get(
          "http://localhost:3000/blogs/favourites",
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        setFavoriteBlogs(response.data.blogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorite blogs:", error);
        setLoading(false);
      }
    }

    fetchFavoriteBlogs();
  }, []);

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Your Favourites ❤️
      </h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-5 my-5">
          {favoriteBlogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/singleBlog/${blog.id}`}>
                <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                  {blog.title}
                </h3>
              </Link>
              <p className="text-slate-600 text-sm">
                {blog.tags &&
                  blog.tags
                    .split(", ")
                    .map((tag) => `#${tag}`)
                    .join(", ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
