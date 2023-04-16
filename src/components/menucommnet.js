import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { connect } from "react-redux";
import socket from "socketConfig";
class MenuComment extends Component {
  container = React.createRef();
  state = {
    open: false,
    delete: false,
    option: {
      open: true,
      file: "",
      kind: "comment",
    },
  };
  removeComment = async () => {
    this.setState({
      delete: true,
    });
    const option = {
      commentId: this.props.commentId,
      postId: this.props.item.postId,
      action: "removeComment",
    };
    await axios.post("/api/remove-this-comment", option);
    const postToRemoveDetails = {
      action: "removeComment",
      commentId: this.props.commentId,
    };
    socket.emit("comment:sent", postToRemoveDetails);
  };
  handleclick = (data, e) => {
    if (e != null) {
      if (e.currentTarget.parentElement.parentElement !== null) {
        let box = e.currentTarget.parentElement.parentElement;
        if (window.innerHeight - box.getBoundingClientRect().bottom <= 200) {
          this.setState({
            top: false,
          });
        } else {
          this.setState({
            top: true,
          });
        }
      }
    }

    this.setState({
      open: data,
    });
  };

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.handleclick(false, null);
    } else {
    }
  };
  componentDidMount = () => {
    this.setState({
      option: {
        open: true,
        file: "",
        kind: "Comment",
      },
    });

    document.addEventListener("mousedown", this.handleClickOutside);
  };
  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleClickOutside);
  };

  render() {
    return (
      <div
        className={`boxmrjrjerjrjnue ${this.state.top ? "top" : "bottom"}`}
        ref={this.container}
      >
        <div className="title-of--thise-action">
          <button
            onClick={(e) => {
              this.handleclick(true, e);
            }}
            className="close-that"
          >
            <IoEllipsisHorizontalSharp />
          </button>
        </div>
        <div className={`tisjjrjrjr ${this.state.open ? "active" : ""}`}>
          {this.props.users.userId === this.props.item.userId ? (
            <div className="box-that-hold-the-setting">
              <div className="hold-thatiocom">
                <MdDelete />
              </div>
              <button
                disabled={this.state.delete}
                onClick={this.removeComment}
                className="edit-the-program"
              >
                Delete
              </button>
            </div>
          ) : (
            ""
          )}

          <div className="box-that-hold-the-setting">
            <div className="hold-thatiocom">
              <i className="fas fa-flag"></i>
            </div>
            <button
              onClick={() => {
                this.props.updataReport(this.state.option);
              }}
              className="edit-the-program"
            >
              Report
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updataReport: (data) => {
      dispatch({ type: "UPDATE_REPORT", value: data });
    },
  };
};

const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};

export default connect(
  mapstateToProps,
  mapDispatchToProps
)(withRouter(MenuComment));
