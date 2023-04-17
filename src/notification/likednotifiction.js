import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import apiUrl from "apiUrl/url";
import IconProfile from "Components/Iconpicture";
import Username from "Components/Username";
import VideoPost from "Components/videopost";
import DataPost from "Components/datePost";
class LikedNotification extends Component {
  state = {
    username: null,
    media: null,
  };

  render() {
    return (
      <div className="div-hold-hold-thenotification navigate">
        <div className="wjsjrhrnnff ">
          <div className="icon-of-thedube">
            {this.props.item ? (
              <IconProfile user={this.props.item.notifiyiId} />
            ) : (
              ""
            )}
          </div>
          <div className="messahrhrn-not">
            <div className="ejwjjr">
              {this.props.item ? (
                <Username link={true} user={this.props.item.notifiyiId} />
              ) : (
                ""
              )}
            </div>
            <div className="bmhjn">
              {" "}
              <div>liked your post</div>{" "}
              <div className="boxfj-rnj">
                {this.props.item ? (
                  <DataPost date={this.props.item.date} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {this.state.media !== null ? (
            <Link
              to={`/profile/${this.state.media.userId}/${this.state.media.filename}`}
              className="div-that-wraper-the-imga3"
            >
              {this.state.media !== null ? (
                this.state.media.mediaDetails[0].includes("image") ? (
                  <img
                    src={`${apiUrl.content}${
                      this.state.media.filename.split(",")[0]
                    }`}
                    loading="lazy"
                  />
                ) : (
                  <VideoPost src={this.state.media.filename.split(",")[0]} />
                )
              ) : (
                ""
              )}
            </Link>
          ) : (
            ""
          )}
        </div>

        <Link
          className="navigateToPost"
          to={`/profile/${this.props.item.notifiyiId}/${this.props.item.postId}`}
        ></Link>
      </div>
    );
  }
}

export default LikedNotification;
