/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";

const BlogPostGenerator = ({ onClose, onTitleChange, onContentChange }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const generateBlogPost = async () => {
    const promptMessage = `Craft an insightful blog post about the topic "${userInput}". Title (maximum ten words). Begin your post with an engaging introduction that captures the essence of the subject. Explore various aspects related to ${userInput} in a detailed and informative manner, and providing valuable insights. Avoid starting the blog post with the keyword itself; instead, seamlessly integrate it into the content to maintain flow and readability. Aim to deliver a compelling narrative that captivates readers and leaves them informed and intrigued.`;

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: promptMessage }],
          max_tokens: 300,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      const choice = response.data.choices[0];
      if (choice && choice.message && choice.message.content) {
        setTitle(choice.message.content.split("\n")[0]);
        setContent(choice.message.content);
      } else {
        setError("Failed to generate blog post. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while generating the blog post.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains("Modal")) {
      onClose();
    }
  };

  const handleYesButtonClick = () => {
    // Pass title and content up to the parent component
    onTitleChange(title);
    onContentChange(content);
    onClose();
  };

  return (
    <div
      className=" absolute left-0 top-[-0.5rem] sm:top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm Modal"
      onClick={handleModalClick}
    >
      <div className=" bg-zinc-700 popup-animation w-[20rem] sm:w-[40rem] rounded py-5 relative">
        <button className=" absolute right-2 top-2" onClick={onClose}>
          <IoIosCloseCircleOutline size={30} />
        </button>
        <div className=" flex flex-col px-12">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="w-full bg-transparent p-2 text-base text-white outline-none  rounded-lg focus:ring focus:ring-indigo-600 border-solid border-2 border-sky-500"
            placeholder="Enter blog details..."
          />
          <div className=" flex justify-center">
            <button
              onClick={generateBlogPost}
              disabled={loading}
              className="py-2 px-4 bg-slate-500 rounded my-4 hover:scale-105 duration-100"
            >
              {loading ? "Generating..." : "Create Blog Post"}
            </button>
          </div>

          {error && <p>{error}</p>}
          {title && <h1 className=" font-bold">{title}</h1>}
          <div className="h-[20rem] overflow-y-scroll overscroll-contain py-5">
            {content && <p>{content}</p>}
          </div>
        </div>

        {title && content && (
          <div className=" flex flex-col sm:flex-row justify-between px-4 my-3">
            <p className=" font-semibold">
              Would you like to include this content in your blog post?
            </p>
            <button
              className="py-1 px-3 bg-slate-500 rounded w-20 hover:scale-105 duration-100 "
              onClick={handleYesButtonClick}
            >
              Yes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostGenerator;
