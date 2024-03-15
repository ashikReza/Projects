/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Comments from "../single blog/Comments.jsx";
import FloatingActions from "../single blog/FloatingActions.jsx";

import { Link, useParams } from "react-router-dom";

import Load from "../../assets/load-loading.gif";

import useBlogData from "../../hooks/useBlogData";

export default function SingleBlogsContent() {
  const { id } = useParams();

  const { blogData } = useBlogData(id);

  console.log(blogData);
  console.log(blogData.tags);

  // if (loading) {
  //   return (
  //     <div className="w-full h-screen flex justify-center">
  //       <img src={Load} alt="Loading..." className="" />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // if (!blogData) {
  //   return <p>No data available for this blog</p>;
  // }

  // const tagsArray = blogData.tags?.split(",").map((tag) => tag.trim()) || [];

  return (
    <>
      <section className="bg-[#030317] text-white px-4">
        <div className="w-full flex flex-col justify-center text-center py-8">
          <h1 className="font-bold text-3xl md:text-5xl">{blogData.title}</h1>
          <div className="flex justify-center items-center my-4 gap-4">
            <Link to={`/profile/`}>
              <div className="flex items-center capitalize space-x-2">
                {blogData.authorImg ? (
                  <>
                    <div className="avater-img bg-indigo-600 text-white">
                      <img
                        src={blogData.authorImg}
                        alt=""
                        className="rounded-full"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="avater-img bg-indigo-600 text-white">
                      {blogData.authorName && (
                        <span className="">
                          {blogData.authorName[0].toUpperCase()}
                        </span>
                      )}
                    </div>
                  </>
                )}

                <h5 className="text-slate-500 text-sm">
                  {blogData.authorName}
                </h5>
              </div>
            </Link>
            {blogData.createdAt && (
              <span className="text-sm text-slate-700 dot">
                {new Date(blogData.createdAt.seconds * 1000).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            )}

            <span className="text-sm text-slate-700 dot">
              {/* {blogData.likes.length} Likes */}
            </span>
          </div>
          <img
            className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96 rounded"
            src={blogData.thumbnailUrl}
            alt=""
          />

          {/* Tags */}
          {blogData.tags && (
            <ul className="tags">
              {blogData.tags.map((tag, index) => (
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
