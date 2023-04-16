import React, { useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import CommentBox from "Components/commentBox";

function PostCommentSection({ loadMore,postId }) {
  const myDivRef = useRef(null);
  const comments = useSelector((state) => state.comments);
  const handleScroll = useCallback(() => {
    const div = myDivRef.current;
    if (div.scrollTop + div.clientHeight === div.scrollHeight) {
      loadMore();
    }
  }, []);

  return (
    <div ref={myDivRef} onScroll={handleScroll} className="wraperjrrnrnnrnr">
      {comments?.filter((comment)=>comment.postId===postId).map((elment) => {
        return (
          <div className="fhknrbhfiknrbhj" key={elment._id}>
            <CommentBox item={elment} />
          </div>
        );
      })}
    </div>
  );
}

export default PostCommentSection;
