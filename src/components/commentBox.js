import React, { useState } from "react";
import MenuComment from "Components/menucommnet";
import Username from "Components/Username";
import IconProfile from "./Iconpicture";
import DataPost from "Components/datePost";

function CommentBox({ item }) {
  return (
    <div className="wrapwer-comment-post">
      <div className="wjfjsnrt">
        <div className="hold-profile-url">
          <IconProfile user={item.userId} />
        </div>
        <div className="hold-comment">
          <div className="name-commenter">
            <Username user={item.userId} />
            <MenuComment item={item} commentId={item._id} />
          </div>
          <div className="actuel-comment">{item.content}</div>
        </div>
      </div>

      <div className="wrepr-cjf">
        <div className="tjtrj">
          <DataPost date={item.date} />
        </div>
      </div>
    </div>
  );
}
export default CommentBox;
