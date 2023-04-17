import React, { useEffect, useState } from "react";
import axios from "axios";
import uuid from "react-uuid";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Bounce from "react-reveal/Bounce";
import socket from "socketConfig";
import { useSelector, useDispatch } from "react-redux";
import nFormatter from "utility/nFormatter";
function LikeButton({ numberOfLikes, userId, posterId, postId }) {
  const [numberOfLikesForThisPost, setNumberOfLikesForThisPost] =
    useState(numberOfLikes);
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);
  const likes = useSelector((state) => state.likes);

  const saveLikes = (data) => {
    const option = {
      userId: userId,
      postId: data,
    };
    let info = {
      userId: userId,
      postId: data,
      _id: uuid(),
    };
    let list = [...likes, info];
    dispatch({ type: "UPDATE_LIKES", value: list });
    axios.post("/api/likedpost", option).then((res) => {});
  };
  const addPost = (data) => {
    dispatch({ type: "UPDATE_POSTIST", value: data });
  };
  const updatePost = (data) => {
    let Updated = postList.find((item) => item.postId === data);
    if (Updated) {
      Updated.numberOfLikes = numberOfLikesForThisPost;
      let list = postList.filter((item) => item.postId !== data);
      let sortted = [...list, Updated];
      addPost(sortted);
    } else {
    }
  };

  // socket.emit("some-like-a-post", {
  //   postId: data.postId,
  //   numberOfLikes: numberOfLikesForThisPost,
  // });

  const handleLike = (data) => {
    setNumberOfLikesForThisPost(numberOfLikesForThisPost + 1);
    saveLikes(data);
    updatePost(data);
  };

  const removelike = (data) => {
    const option = {
      userId: userId,
      postId: data,
    };
    setNumberOfLikesForThisPost(numberOfLikesForThisPost - 1);
    let list = likes.filter((item) => item.postId !== data);
    dispatch({ type: "UPDATE_LIKES", value: list });
    axios.post("/api/removelike", option).then((res) => {});
    socket.emit("some-like-a-post", {
      postId: postId,
      numberOfLikes: numberOfLikesForThisPost - 1,
    });
  };

  useEffect(() => {
    socket.on("like-this-post", (data) => {
      if (data.postId === postId) {
        setNumberOfLikesForThisPost(data.numberOfLikes);
        updatePost(data.postId);
      }
    });
    return () => socket.off("like-this-post");
  }, [postId]);

  return (
    <div className="lik box-ac">
      {likes?.some((i) => i.postId.includes(postId)) ? (
        <Bounce>
          <div
            onClick={(e) => {
              removelike(postId);
            }}
            className="icon lik active"
          >
            <FaHeart />
          </div>
        </Bounce>
      ) : (
        <div
          onClick={(e) => {
            handleLike(postId);
          }}
          className="icon"
        >
          <FaRegHeart />
        </div>
      )}
      <p>{nFormatter(numberOfLikesForThisPost)}</p>
    </div>
  );
}

export default LikeButton;
