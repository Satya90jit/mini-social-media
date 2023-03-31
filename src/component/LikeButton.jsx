import React, { useState, useEffect } from "react";
import axios from "axios";

function LikeButton(props) {
  const { articleId, userId } = props;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleClick = () => {
    const url = `/api/v1/articles/${articleId}/likes/${userId}`;
    if (liked) {
      // Unlike the post
      axios.delete(url).then(() => {
        setLiked(false);
        setLikeCount((prevCount) => prevCount - 1);
        localStorage.setItem(`${articleId}-like-status`, false);
        localStorage.setItem(`${articleId}-like-count`, likeCount - 1);
      });
    } else {
      // Like the post
      axios.post(url, { liked: true }).then(() => {
        setLiked(true);
        setLikeCount((prevCount) => prevCount + 1);
        localStorage.setItem(`${articleId}-like-status`, true);
        localStorage.setItem(`${articleId}-like-count`, likeCount + 1);
      });
    }
  };

  useEffect(() => {
    const url = `/api/v1/articles/${articleId}/likes/${userId}`;
    
    // Check if the like status and count are stored in local storage
    const storedLikeStatus = localStorage.getItem(`${articleId}-like-status`);
    const storedLikeCount = localStorage.getItem(`${articleId}-like-count`);
    
    if (storedLikeStatus !== null && storedLikeCount !== null) {
      setLiked(JSON.parse(storedLikeStatus));
      setLikeCount(parseInt(storedLikeCount));
      return;
    }
    
    // Fetch the like status and count from the server
    axios.get(url).then((response) => {
      if (response.data && response.data.liked) {
        setLiked(true);
        localStorage.setItem(`${articleId}-like-status`, true);
      }
      setLikeCount(response.data && response.data.count ? response.data.count : 0);
      localStorage.setItem(`${articleId}-like-count`, likeCount);
    });
  }, [articleId, userId]);

  return (
    <button
      onClick={handleClick}
      className={`flex items-center ${
        liked ? "text-red-500" : "text-gray-500"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={liked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 mr-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>

      <span className="text-black mr-5">{liked ? "Unlike" : "Like"}</span>

      {likeCount > 0 && (
        <span className="text-gray-500">{`${likeCount} like${
          likeCount !== 1 ? "s" : ""
        }`}</span>
      )}
    </button>
  );
}

export default LikeButton;
