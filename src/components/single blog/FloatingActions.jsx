/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegHeart, FaHeart, FaRegMessage } from "react-icons/fa6";
import { useAuth } from "../../hooks/useAuth";
import useToken from "../../hooks/useToken";

export default function FloatingActions({ blogData }) {
  const { auth } = useAuth();
  const { api } = useToken();

  const [liked, setLiked] = useState(
    blogData?.likes?.some((like) => like.id === auth?.user?.id)
  );
  const [likesCount, setLikesCount] = useState(blogData?.likes?.length || 0);

  const [isFavorited, setIsFavorited] = useState(
    blogData?.isFavourite || false
  );

  const handleLike = async () => {
    try {
      const response = await api.post(
        `http://localhost:3000/blogs/${blogData.id}/like`
      );

      if (response.status === 200) {
        if (response.data.isLiked === true) {
          setLiked(true);
          setLikesCount(response.data.likes.length);
        } else {
          setLiked(false);
          setLikesCount(response.data.likes.length);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavorite = async () => {
    try {
      const response = await api.patch(
        `http://localhost:3000/blogs/${blogData.id}/favourite`,
        null,
        {
          headers: {
            Authorization: `Bearer ${auth?.authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setIsFavorited(!isFavorited);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li onClick={handleLike}>
          {liked ? (
            <AiFillLike size={20} color="white" />
          ) : (
            <AiOutlineLike size={20} color="white" />
          )}
          <span className="text-white">{likesCount}</span>
        </li>

        <li onClick={handleFavorite}>
          {isFavorited ? (
            <FaHeart size={20} color="red" />
          ) : (
            <FaRegHeart size={20} color="white" />
          )}
        </li>

        <a href="#comments">
          <li>
            <FaRegMessage size={20} color="white" />
            <span className="text-white">
              {blogData.comments && blogData.comments.length > 0
                ? blogData.comments.length
                : ""}
            </span>
          </li>
        </a>
      </ul>
    </div>
  );
}
