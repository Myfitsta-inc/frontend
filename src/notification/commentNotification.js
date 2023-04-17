import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import IconProfile from "Components/Iconpicture";
import VideoPost from "Components/videopost";
import Username from "Components/Username";
import apiUrl from "apiUrl/url";
import DataPost from "Components/datePost";
class CommentNotification extends Component {
  state = {
    username: null,
    postDetails: null,
  };

  getmedia = () => {
    axios
      .get(`/api/postinfo/${this.props.item.postId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          this.setState({
            postDetails: res.data,
          });
        } else {
        }
      });
  };
  componentDidMount = () => {
    // this.getmedia();
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
              <div>Comment: {this.props.item.extraInfo} on your post </div>{" "}
              <div className="boxfj-rnj">
                {" "}
                <DataPost date={this.props.item.date} />
              </div>
            </div>
          </div>
          {this.state.postDetails !== null ? (
            <Link
              to={`/profile/${this.props.item._id}/${this.state.postDetails?.userId}`}
              className="div-that-wraper-the-imga3"
            >
              {this.state.postDetails?.mediaDetails !== null ? (
                this.state.postDetails?.mediaDetails[0].mimetype.includes(
                  "image"
                ) ? (
                  <img
                    src={`${apiUrl.content}${this.state.postDetails?.mediaDetails[0].key}`}
                    loading="lazy"
                  />
                ) : (
                  <VideoPost
                    src={this.state.postDetails?.mediaDetails[0].key}
                  />
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
          to={`/comment/${this.props.item.postId}`}
        ></Link>
      </div>
    );
  }
}

export default CommentNotification;
