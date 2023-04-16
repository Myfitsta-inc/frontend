import React, { Component } from "react";
import BoxMedia from "./Boxmedia";
import { Link } from "react-router-dom";
import LikeButton from "./likeButton";
import PostOption from "./postoption";
import DataPost from "./datePost";
import Username from "./Username";
import { connect } from "react-redux";
import IconProfile from "./Iconpicture";
import axios from "axios";
import socket from "socketConfig";
import { GoPlus } from "react-icons/go";
class PostCollection extends Component {
  state = {
    likeks: [],
    data: null,
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

  loadPost = () => {
    let list = this.props.postList;
    let found = list.find((item) => item._id === this.props.item);
    if (found) {
      this.setState({
        data: found,
      });
    } else {
      axios
        .get(`/api/postinfo/${this.props.item}`, { withCredentials: true })
        .then((res) => {
          if (res.data) {
            this.setState(
              {
                data: res.data,
              },
              () => {
                let list = [...this.props.postList, res.data];
                this.props.addPost(list);
              }
            );
          }
        });
    }
  };

  componentWillUnmount = () => {
    socket.off("update-this-comment");
  };

  updatePost = (data, count) => {
    if (this.props.postList.length > 0) {
      let Updated = this.props.postList.find((item) => item._id === data);
      if (Updated) {
        Updated.numberOfComments = count;
        let list = this.props.postList.filter((item) => item._id !== data);
        let sortted = [...list, Updated];
        this.setState(
          {
            data: Updated,
          },
          () => {
            this.props.addPost(sortted);
          }
        );
      } else {
      }
    }
  };
  componentDidMount = () => {
    socket.on("update-this-comment", (data) => {
      if (data._id === this.props.item) {
        this.updatePost(data._id, data.count);
      }
    });
    this.loadPost();
  };
  render() {
    return this.state.data !== null ? (
      <div className="post-box">
        <div className="info-profile">
          <div className="img-pro-inf">
            <div className="img-pr">
              <IconProfile user={this.state.data.userId} />
            </div>
            <div className="nbovtitme">
              <Username link={true} user={this.state.data.userId} />
              <DataPost date={this.state.data.date} />
            </div>
          </div>
          <PostOption
            user={this.props.user}
            item={this.state.data}
            handleSetting={this.props.handleSetting}
            friend={this.state.data.userId}
          />
        </div>
        <BoxMedia
          postId={this.state.data._id}
          mediaDetails={this.state.data.mediaDetails}
        />
        <div className="action">
          <div className="wrp-act">
            <LikeButton
              posterId={this.state.data.userId}
              userId={this.props.user.userId}
              postId={this.state.data._id}
              numberOfLikes={this.state.data.numberOfLikes}
            />

            <div className="comment box-ac">
              <Link className="linjgjc" to={`/comment/${this.state.data._id}`}>
                <div className="icon">
                  <i className="far fa-comment"></i>
                </div>
                <p>{this.nFormatter(this.state.data.numberOfComments)}</p>
              </Link>
            </div>
            <div
              onClick={() => {
                this.props.openBoxCollection(true, this.state.data._id);
              }}
              className="share box-ac"
            >
              <div className="icon">
                <GoPlus />
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              this.props.handleSetting(true, this.state.data._id);
            }}
            className="mmenu-act"
          >
            <i className="fas fa-share"></i>
          </div>
        </div>
        <div className="tgs">
          {this.state.data.tags.map((tag) => {
            return (
              <div key={Math.random() * 5} className="tags">
                <Link to={`/discover/${tag}`}> {tag}</Link>
              </div>
            );
          })}
        </div>
        <div className="caption">
          <p dangerouslySetInnerHTML={{ __html: this.state.data.caption }}></p>
        </div>
      </div>
    ) : (
      ""
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (data) => {
      dispatch({ type: "UPDATE_POSTIST", value: data });
    },
  };
};
const mapstateToProps = (state) => {
  return {
    postList: state.postList,
  };
};
export default connect(mapstateToProps, mapDispatchToProps)(PostCollection);
