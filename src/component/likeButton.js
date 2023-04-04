import React, { Component } from "react";
import axios from "axios";
import uuid from "react-uuid";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import moment from "moment";
import ApiUrl from "../url";
import Bounce from "react-reveal/Bounce";
import socket from "../socketConfig";
import { connect } from "react-redux";
class LikeButton extends Component {
  state = {
    numberlike: 0,
  };

  updatePost = (data) => {
    let Updated = this.props.postList.find((item) => item.postId === data);
    if (Updated) {
      Updated.numberlike = this.state.numberlike;
      let list = this.props.postList.filter((item) => item.postId !== data);
      let sortted = [...list, Updated];
      this.props.addPost(sortted);
    } else {
    }
  };
  nFormatter = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };
  updatenotification = (data) => {
    let option = {
      userId: this.props.posterId,
      type: "like",
      notifiyiId: this.props.userId,
      media: data.postId,
      date: moment().format(),
      extraInfo: "",
    };

    if (this.props.userId !== this.props.posterId) {
      axios.post(`/api/update-notification`, option).then((res) => {});
    }
    socket.emit("some-like-a-post", {
      postId: data.postId,
      numberlike: this.state.numberlike,
    });
  };

  handleLike = (e, data) => {
    console.log(data, "oijnmkj");
    let like = e.currentTarget;
    let numberlikes = like.parentElement.children[1];
    if (like.classList.contains("active")) {
      this.setState(
        {
          numberlike: this.state.numberlike - 1,
        },
        () => {
          this.removelike(data);
          this.updatePost(data);
        }
      );
    } else {
      this.setState(
        {
          numberlike: this.state.numberlike + 1,
        },
        () => {
          this.addLikes(data);
          this.updatePost(data);
        }
      );
    }
  };

  addLikes = (data) => {
    const option = {
      userId: this.props.userId,
      postId: data,
    };
    let info = {
      userId: this.props.userId,
      postId: data,
      _id: uuid(),
    };
    let list = [...this.props.likes, info];
    this.props.addLikes(list);
    axios.post("/api/likedpost", option).then((res) => {
      this.updatenotification(res.data);
    });
  };

  removelike = (data) => {
    const option = {
      userId: this.props.userId,
      postId: data,
    };
    let list = this.props.likes.filter((item) => item.postId !== data);
    this.props.addLikes(list);
    axios.post("/api/removelike", option).then((res) => {});
    socket.emit("some-like-a-post", {
      postId: this.props.postId,
      numberlike: this.state.numberlike,
    });
  };
  componentDidMount = () => {
    console.log(this.props.likes);
    this.setState({
      numberlike: this.props.numberlike,
    });
    socket.on("like-this-post", (data) => {
      if (data.postId === this.props.postId) {
        this.setState(
          {
            numberlike: data.numberlike,
          },
          () => {
            this.updatePost(data.postId);
          }
        );
      }
    });
  };
  componentWillUnmount = () => {
    socket.off("like-this-post");
  };
  render() {
    return (
      <div className="lik box-ac">
        {this.props.likes.some((i) => i.postId.includes(this.props.postId)) ? (
          <Bounce>
            <div
              onClick={(e) => {
                this.handleLike(e, this.props.postId);
              }}
              className="icon lik active"
            >
              <FaHeart />
            </div>
          </Bounce>
        ) : (
          <div
            onClick={(e) => {
              this.handleLike(e, this.props.postId);
            }}
            className="icon"
          >
            <FaRegHeart />
          </div>
        )}
        <p>{this.nFormatter(this.state.numberlike)}</p>
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    likes: state.likes,
    users: state.user,
    postList: state.postData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addLikes: (data) => {
      dispatch({ type: "ADD_LIKES", data: data });
    },
    addPost: (data) => {
      dispatch({ type: "UPDATE_POSTDATA", data: data });
    },
  };
};
export default connect(mapstateToProps, mapDispatchToProps)(LikeButton);
