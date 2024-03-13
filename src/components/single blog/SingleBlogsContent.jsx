/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Comments from "../single blog/Comments.jsx";
import FloatingActions from "../single blog/FloatingActions.jsx";

import { Link, useParams } from "react-router-dom";

import Load from "../../assets/load-loading.gif";

import useBlogData from "../../hooks/useBlogData";

export default function SingleBlogsContent() {
  const { id } = useParams();

  const { blogData, loading, error } = useBlogData(id);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center">
        <img src={Load} alt="Loading..." className="" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blogData) {
    return <p>No data available for this blog</p>;
  }

  const tagsArray = blogData.tags?.split(",").map((tag) => tag.trim()) || [];

  return (
    <>
      <section className="bg-[#030317] text-white px-4">
        <div className="w-full flex flex-col justify-center text-center py-8">
          <h1 className="font-bold text-3xl md:text-5xl">{blogData.title}</h1>
          <div className="flex justify-center items-center my-4 gap-4">
            <Link to={`/profile/${blogData.author.id}`}>
              <div className="flex items-center capitalize space-x-2">
                {blogData.author.avatar ? (
                  <>
                    <div className="avater-img bg-indigo-600 text-white">
                      <img
                        src={`${import.meta.env.VITE_SERVER_AVATAR_URL}/${
                          blogData.author.avatar
                        }`}
                        alt=""
                        className="rounded-full"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="avater-img bg-indigo-600 text-white">
                      <span className="">
                        {blogData.author.firstName[0].toUpperCase()}
                      </span>
                    </div>
                  </>
                )}

                <h5 className="text-slate-500 text-sm">
                  {blogData.author.firstName} {blogData.author.lastName}
                </h5>
              </div>
            </Link>
            <span className="text-sm text-slate-700 dot">
              {new Date(blogData.createdAt).toLocaleDateString()}
            </span>
            <span className="text-sm text-slate-700 dot">
              {blogData.likes.length} Likes
            </span>
          </div>
          <img
            className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96 rounded"
            src={`${import.meta.env.VITE_SERVER_BLOG_URL}/${
              blogData.thumbnail
            }`}
            alt=""
          />

          {/* Tags */}
          {tagsArray && (
            <ul className="tags">
              {tagsArray.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          )}

          {/* Content */}
          <div
            className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left"
            dangerouslySetInnerHTML={{ __html: blogData.content }}
          />
        </div>
      </section>

      <FloatingActions blogData={blogData} />

      <Comments blogData={blogData} />
    </>
  );
}
