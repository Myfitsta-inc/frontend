import React from "react";
import axios from "axios";
import usePost from "hooks/usePost";
import CollectionMedia from "components/collectionMedia";
import { Link } from "react-router-dom";
const CollectionContent = ({ collection }) => {
  const { collectionList } = collection;
  return (
    <div className="card-contain-info">
      <div className="bold-media">
        <CollectionMedia postId={collectionList[0] ?? null} />
        <CollectionMedia postId={collectionList[1] ?? null} />
        <CollectionMedia postId={collectionList[2] ?? null} />
        <CollectionMedia postId={collectionList[3] ?? null} />
      </div>
      <Link className="linkToCol" to={`collection/${collection._id}`}></Link>
      <div className="info-about-media">
        <p className="title-of-coll">{collection.collectionName}</p>
        <p>{collectionList.length} Post</p>
      </div>
    </div>
  );
};
export default CollectionContent;
