import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import LoadingSpin from "components/loadingspin";
import axios from "axios";
function DeletePost() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const deletePost = useSelector((state) => state.deletePost);
  const postList = useSelector((state) => state.postList);
  const userFeeds = useSelector((state) => state.userFeeds);
  const { open, postId } = deletePost;
  const closeModal = () => {
    dispatch({
      type: "OPEN_DELETE_POST_MODAL",
      value: { open: false, postId: "" },
    });
  };
  const deleteCollecion = async () => {
    if (loading) return;
    setLoading(true);
    await axios.post("/api/deletepost", { postId: postId });
    const newPostList = postList.filter((post) => post._id !== postId);
    const newFeeds = userFeeds.filter((id) => id !== postId);
    dispatch({ type: "UPDATE_POSTIST", value: newPostList });
    dispatch({ type: "UPDATE_FEED", value: newFeeds });
    closeModal();
    setLoading(false);
  };

  return (
    <div className={`overlayrjhhntufbghjdjhb ${open ? "active" : ""}`}>
      <div className="delete-the-colletion">
        <div className="Create-a-new-list-title">
          <div
            onClick={() => {
              closeModal();
            }}
            className="close-that"
          >
            <IoCloseSharp />
          </div>
          <p>Delete Post</p>
        </div>
        <p className="rteisjr">Are you sure you want to delete this Post ? </p>
        <div className="yes-no">
          <button
            className={loading ? "active" : ""}
            onClick={() => {
              deleteCollecion();
            }}
          >
            {loading ? <LoadingSpin /> : "Yes Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePost;
