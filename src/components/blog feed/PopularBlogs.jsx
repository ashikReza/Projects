/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import useToken from "../../hooks/useToken.js";

import { Link } from "react-router-dom";

export default function PopularBlogs() {
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { api } = useToken();

  useEffect(() => {
    const fetchPopularBlogs = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular`
        );

        setPopularBlogs(response.data.blogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching popular blogs:", error);
        setLoading(false);
      }
    };

    fetchPopularBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-5 my-5">
          {popularBlogs.map((blog) => (
            <li key={blog.id}>
              <>
                <Link to={`/singleBlog/${blog.id}`}>
                  <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                    {blog.title}
                  </h3>
                </Link>
                <Link to={`/profile/${blog.author.id}`}>
                  <p className="text-slate-600 text-sm">
                    by {blog.author.firstName} {blog.author.lastName}
                    <span>·</span> {blog.likes.length} Likes
                  </p>
                </Link>
              </>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
