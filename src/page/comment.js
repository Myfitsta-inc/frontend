import React, { useEffect, useState } from "react";
import Nav from "Components/nav";
import axios from "axios";
import Username from "Components/Username";
import IconProfile from "Components/Iconpicture";
import { Link } from "react-router-dom";
import BoxMedia from "Components/Boxmedia";
import Editable from "Components/editable";
import LoadingSpin from "Components/Loadingspin";
import { withRouter } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { IoSendSharp } from "react-icons/io5";
import moment from "moment";
import socket from "socketConfig";
import { useParams } from "react-router-dom";
import usePost from "hooks/usePost";
import { useSelector, useDispatch } from "react-redux";
import PostCommentSection from "Components/Comment/PostCommentSection";
import useUser from "hooks/useUser";
function Comment({ history }) {
  const { user } = useUser();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [numberOfComments, setnumberOfComments] = useState(0);
  const [numberToLoad, setNumberToLoad] = useState(10);
  const [loading, setLoading] = useState(false);
  const { post } = usePost(id);
  const comments = useSelector((state) => state.comments);

  const sendComment = (comment, action = "addComment") => {
    const newComment = { ...comment, action };
    socket.emit("comment:sent", newComment);
  };

  const handleComment = (event) => {
    setComment(event.target.innerText);
  };

  const goBack = (e) => {
    history.goBack();
  };

  const postComment = async () => {
    if (comment.length > 0) {
      const option = {
        userId: user.userId,
        postId: post._id,
        content: comment,
        date: moment().format(),
      };
      setComment("");
      const { data } = await axios.post("/api/newcomment", option);
      sendComment(data.comment);
      document.querySelector(".hold-edit-bio").innerHTML = "";
    }
  };

  const getComment = async () => {
    if (post) {
      const { numberOfComments } = post;
      setnumberOfComments(numberOfComments);
      loadComment(numberToLoad);
    }
  };

  const loadMore = () => {
    const newPading = numberToLoad + 10;
    setNumberToLoad(newPading);
    loadComment(newPading);
  };

  const loadComment = async (number) => {
    const { data } = await axios.get(`/api/commentonthis/${id}/${number}`, {
      withCredentials: true,
    });

    if (data.length > comments.length) {
      updateComment(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    socket.on("comment:receive", (commentToSend) => {
      const { action, commentId } = commentToSend;
      if (action === "addComment") {
        const newComment = { ...commentToSend };
        const newComments = [newComment, ...comments];
        setnumberOfComments(numberOfComments + 1);
        dispatch({ type: "UPDATE_COMMENT", value: newComments });
      } else {
        const newCommentss = [...comments].filter(
          (comment) => comment._id !== commentId
        );
        setnumberOfComments(numberOfComments - 1);
        dispatch({ type: "UPDATE_COMMENT", value: newCommentss });
      }
    });
    return () => socket.off("comment:receive");
  }, [comments]);

  const updateComment = (comments) => {
    dispatch({ type: "UPDATE_COMMENT", value: [...comments] });
  };
  useEffect(() => {
    getComment();
    if (post) {
    }
  }, [id, post]);

  return (
    <div className="conatiner">
      <Nav user={user} />
      <div id="app">
        <div id="body-tabs-comm">
          <div className="wrapper-comment">
            <div className="back-topreviews-page">
              <div onClick={goBack} className="close-that">
                <BiArrowBack />
              </div>
              <div className="title-comment-page">Comment</div>
            </div>

            <div className="hjjjnd">
              <div className="hold-that-image-sjje">
                {post?.userId ? (
                  <BoxMedia
                    file={post.filename}
                    mediaDetails={post.mediaDetails}
                  />
                ) : (
                  ""
                )}
              </div>

              <div className="box-wraper-comment">
                <div className="post-comment-render">
                  <div className="hold-comment-relater">
                    {post && (
                      <div className="nejrrrjr">
                        <div className="detail-abou-comment">
                          <div className="wraper-info-oc-post">
                            <div className="profile-usr-comment">
                              {post._id ? (
                                <IconProfile user={post.userId} />
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="info-commet-detail">
                              <div className="name-pro-dut">
                                {post._id ? (
                                  <Username user={post.userId} />
                                ) : (
                                  ""
                                )}
                              </div>

                              <div className="jfkjt">
                                <p className="name-pro-dut">
                                  {numberOfComments}
                                </p>
                                <p>Comment</p>
                              </div>
                            </div>
                          </div>
                          <div className="tags-input-comment rririr">
                            {post.tags?.map((tag) => {
                              return (
                                <div key={Math.random() * 5} className="tags">
                                  <Link to={`/discover/${tag}`}> {tag}</Link>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="caption-comment-post">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: post.caption,
                            }}
                          ></p>
                        </div>
                      </div>
                    )}

                    <PostCommentSection postId={id} loadMore={loadMore} />
                    {loading ? (
                      <div className="bixnknfkfjkjrjr">
                        <LoadingSpin />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="type-message-box">
                    <div className="watpr-contnr-mem">
                      <div className="wrappe-mmeshe">
                        <Editable
                          message="Add a comment.."
                          handleBio={handleComment}
                          html={comment}
                        />
                        {/* <div  onInput={(e)=>{handleComment(e)}} contentEditable="true" data-placeholder="Type a message..." className="hold-message rjj">{comment}eeetttte</div> */}
                        <div onClick={postComment} className="send-hold">
                          <button>
                            <IoSendSharp />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Comment);
