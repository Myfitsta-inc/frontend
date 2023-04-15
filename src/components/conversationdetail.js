import React, { Component } from "react";
import axios from "axios";
import apiUrl from "apiUrl/url";
import { Link, withRouter } from "react-router-dom";
import { BiBlock } from "react-icons/bi";
import { IoCloseSharp, IoFlagSharp } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import profile from "profile.webp";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import ButtonFollow from "./buttonFollow";
class ConversationDetail extends Component {
  state = {
    id: "",
    open: false,
    friend: {},
  };

  handleDelete = () => {
    let option = {
      userId: this.props.user.userId,
      friend: this.props.match.params.id,
    };
    axios.post(`/api/delete-conversation`, option).then((result) => {
      let list = this.props.inbox.filter(
        (item) => item.userId !== this.props.match.params.id
      );
      this.props.updateInbox(list);
      this.props.history.goBack();
    });
  };

  handleBlock = () => {
    let option = {
      userId: this.props.user.userId,
      blocked: this.props.match.params.id,
    };
    this.props.handleDetail(false);
    this.props.handleblock(true);
    axios.post(`/api/block-this-dude`, option).then((result) => {});
  };

  handleDeblock = () => {
    let option = {
      userId: this.props.user.userId,
      blocked: this.props.match.params.id,
    };
    this.props.handleDetail(false);
    this.props.handleblock(false);
    axios.post(`/api/remove-this-dude-block`, option).then((result) => {});
  };

  getinfo = () => {
    axios.get(`/api/profile/${this.props.match.params.id}`).then((res) => {
      if (res.data.email) {
        this.setState({
          friend: res.data,
        });
      }
    });
  };

  componentDidMount = () => {
    this.getinfo();
  };
  componentDidUpdate(prevProps) {
    if (this.state.id !== this.props.match.params.id) {
      this.getinfo();
      this.setState({ id: this.props.match.params.id });
    }
  }

  render() {
    return (
      <motion.div
        initial={{ opacity: 0, transform: "translateX(500px)" }}
        animate={{ opacity: 1, transform: "translateX(0px)" }}
        exit={{ opacity: 0 }}
        className={`box-about-your-info  ${
          this.props.open === false ? "" : "active"
        }`}
      >
        <div className="title-ofthe-tjhrjrj">
          <div
            onClick={() => {
              this.props.handleDetail(false);
            }}
            className="close-that"
          >
            <IoCloseSharp className="whitegeb" />
          </div>
          <p>Details</p>
        </div>

        <div className="box-thath-rhjdjnkjjrj">
          <Link
            to={`/account/${this.state.friend.username}`}
            className="box-hold-prooof"
          >
            {this.state.friend.profile ? (
              <img
                alt={this.state.friend.username}
                src={`${apiUrl.content}${this.state.friend.profile}`}
              />
            ) : (
              <img alt={this.state.friend.username} src={profile} />
            )}
          </Link>
          <div className="name-jrjnrn">{this.state.friend.username}</div>
          <div className="name-jrjnrn-nfoo">
            {this.state.friend.userId ? (
              <ButtonFollow friend={this.state.friend.userId} />
            ) : (
              ""
            )}
          </div>
          <div className="bosjjnjrjrjj">
            <div className="wraoekr">
              <div className="bondji-thsjjr">
                <p> {this.state.friend.numberOfPosts}</p>
                <p>Post</p>
              </div>
              <div className="bondji-thsjjr">
                <p>{this.state.friend.numberOfFollowers}</p>
                <p>Follower</p>
              </div>
              <div className="bondji-thsjjr">
                <p>{this.state.friend.numberOfFollowings}</p>
                <p>Following</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bosnjrjr-persofm">
          {this.props.block ? (
            <div onClick={this.handleDeblock} className="bloafjfkfjj">
              <div className="iconjgjjgj">
                <BiBlock />
              </div>
              <div className="fgejdjgnf">Deblock Kenneth</div>
            </div>
          ) : (
            <div onClick={this.handleBlock} className="bloafjfkfjj">
              <div className="iconjgjjgj">
                <BiBlock />
              </div>
              <div className="fgejdjgnf">Block Kenneth</div>
            </div>
          )}

          <div className="bloafjfkfjj">
            <div className="iconjgjjgj">
              <IoFlagSharp />
            </div>
            <div className="fgejdjgnf">Report Kenneth</div>
          </div>

          <div onClick={this.handleDelete} className="bloafjfkfjj">
            <div className="iconjgjjgj">
              <AiFillDelete />
            </div>
            <div className="fgejdjgnf">Delete Conversation</div>
          </div>
        </div>
      </motion.div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    user: state.user,
    inbox: state.inbox,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateInbox: (data) => {
      dispatch({ type: "UPDATE_INBOX", value: data });
    },
  };
};
export default connect(
  mapstateToProps,
  mapDispatchToProps
)(withRouter(ConversationDetail));
