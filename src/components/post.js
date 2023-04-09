import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingSpin from "./loadingspin.js";
import { InView } from "react-intersection-observer";
import PostCollection from "./postcollection.js";
import Postfit from "./postfit.js";
import UserPost from "components/userPost";
class Post extends Component {
  state = {};

  checkLoad = (data) => {
    if (data === true) {
      if (this.props.loading === true) {
      } else {
        this.props.loadmore(true);
      }
    }
  };

  render() {
    return (
      <div className="feeed">
        {this.props.feed.length > 0 ? (
          this.props.feed.map((item, index) => {
            if (this.props.feed.length === index + 1) {
              return (
                <InView
                  key={index}
                  onChange={(inView) => this.checkLoad(inView)}
                >
                  <UserPost postId={item} />
                </InView>
              );
            } else {
              return <UserPost key={index} postId={item} />;
            }
          })
        ) : (
          <div className="wrpsjfifkfkfjf "></div>
        )}

        {this.props.loading === true ? (
          <div className="bixnknfkfjkjrjr">
            <LoadingSpin />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateProps = (state) => {
  return {
    posts: state.posts,
    users: state.user,
  };
};

export default connect()(Post);
