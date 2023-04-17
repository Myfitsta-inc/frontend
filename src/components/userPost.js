import usePost from "hooks/usePost";
import React from "react";
import { useDispatch } from "react-redux";
import BoxMedia from "./Boxmedia";
import { Link } from "react-router-dom";
import LikeButton from "./likeButton";
import PostOption from "./postoption";
import DataPost from "./datePost";
import Username from "./Username";
import IconProfile from "./Iconpicture";
import useUser from "hooks/useUser";
import { GoPlus } from "react-icons/go";
import nFormatter from "utility/nFormatter";

function UserPost({ postId, handleSetting }) {
  const { user } = useUser();
  const dispatch = useDispatch();
  const openBoxCollection = (add) => {
    dispatch({ type: "UPDATE_BOXCOLLECTION", value: add });
    dispatch({ type: "UPDATE_SELECTED_POSTID", value: postId });
  };

  const { post } = usePost(postId);
  return (
    post && (
      <div className="post-box">
        <div className="info-profile top">
          <PostOption
            userId={user.userId}
            item={post}
            handleSetting={handleSetting}
            friend={post.userId}
          />
        </div>
        <BoxMedia postId={post._id} mediaDetails={post.mediaDetails} />
        <div className="bottom-wraper-pos">
          <div className="info-profile">
            <div className="img-pro-inf">
              <div className="img-pr">
                <IconProfile user={post.userId} />
              </div>
              <div className="nbovtitme">
                <Username link={true} user={post.userId} />
                <DataPost date={post.date} />
              </div>
            </div>
          </div>
          <div className="action">
            <div className="wrp-act">
              <LikeButton
                posterId={post.userId}
                userId={user.userId}
                postId={post._id}
                numberOfLikes={post.numberOfLikes}
              />

              <div className="comment box-ac">
                <Link className="linjgjc" to={`/comment/${post._id}`}>
                  <div className="icon">
                    <i className="far fa-comment"></i>
                  </div>
                  <p>{nFormatter(post.numberOfComments)}</p>
                </Link>
              </div>
              <div
                onClick={() => {
                  openBoxCollection(true);
                }}
                className="share box-ac"
              >
                <div className="icon">
                  <GoPlus />
                </div>
              </div>
            </div>
            {/* <div
            onClick={() => {
              handleSetting(true, post._id);
            }}
            className="mmenu-act"
          >
            <i className="fas fa-share"></i>
          </div> */}
          </div>
          <div className="tgs">
            {post.tags.map((tag) => {
              return (
                <div key={Math.random() * 5} className="tags">
                  <Link to={`/discover/${tag}`}> {tag}</Link>
                </div>
              );
            })}
          </div>
          <div className="caption">
            <p>{post.caption}</p>
          </div>
        </div>
      </div>
    )
  );
}

export default UserPost;
