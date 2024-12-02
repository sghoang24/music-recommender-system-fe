import { UserContext } from "context/UserContext";
import useAuthModal from "hooks/useAuthModal";
import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import api from "api";

const LikeButton = ({ songId }) => {
  const navigate = useNavigate();
  const authModal = useAuthModal();
  // const { state, updateState } = useContext(UserContext);
  const [isLiked, setLiked] = useState(false);
  const {
    state: { user },
  } = useContext(UserContext);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      try {
        // console.log(user.id);
        const response = await api.post(`/api/likedtrack/check-liked/`, {
          track_id: songId,
          user_id: user.id,
        });
        // console.log(response.data);
        if (response.status === 200) {
          setLiked(response.data.is_liked);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [songId, user?.id]);

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpenLogin();
    }

    if (isLiked) {
      // delete like song
      try {
        const response = await api.post("/api/likedtrack/unliked", {
          track_id: songId,
          user_id: user.id,
        });

        if (response.status === 200) {
          setLiked(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // like song
      try {
        const response = await api.post("/api/likedtrack/liked", {
          track_id: songId,
          user_id: user.id,
        });
        if (response.status === 200) {
          setLiked(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <button onClick={handleLike} className="hover:opacity-75 transition">
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
