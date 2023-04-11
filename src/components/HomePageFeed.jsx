import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingSpin from "./loadingspin.js";
import { InView } from "react-intersection-observer";
import PostCollection from "./postcollection.js";
import Postfit from "./postfit.js";
import UserPost from "components/userPost";
import { useSelector } from "react-redux";
function HomePageFeed({ loading, loadmore }) {
  const userFeeds = useSelector((state) => state.userFeeds);
  const checkLoad = (data) => {
    if (data) {
      if (loading) {
      } else {
        loadmore(true);
      }
    }
  };

  return (
    <div className="feeed">
      {userFeeds.length > 0 ? (
        userFeeds.map((item, index) => {
          if (userFeeds.length === index + 1) {
            return (
              <InView key={item} onChange={(inView) => checkLoad(inView)}>
                <UserPost postId={item} />
              </InView>
            );
          } else {
            return <UserPost key={item} postId={item} />;
          }
        })
      ) : (
        <div className="wrpsjfifkfkfjf "></div>
      )}
    </div>
  );
}
export default HomePageFeed;
