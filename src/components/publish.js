import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import apiUrl from "apiUrl/url";
import { IoCloseSharp } from "react-icons/io5";
import LoadingSpin from "./Loadingspin";
import VideoPost from "./videopost";
class Publish extends Component {
  state = {
    people: [],
    published: false,
    canpublih: false,
    loading: false,
  };

  published = () => {
    if (this.state.canpublih) {
      let option = {
        publisherId: this.props.users.userId,
        programId: this.props.item.programId,
        published: !this.state.published,
        loading: true,
      };

      axios
        .post(`/api/published-a-program`, option)
        .then((result) => {
          this.props.changePublichState();
          this.props.handlepublish(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };

  checkPublich = () => {
    if (this.state.published === false) {
      if (this.props.type === 0) {
        if (this.props.title.length > 5 && this.props.description.length > 5) {
          this.setState({
            canpublih: true,
          });
        } else {
        }
      } else {
        if (
          this.props.title.length > 5 &&
          this.props.description.length > 5 &&
          this.props.price > 0
        ) {
          this.setState({
            canpublih: true,
          });
        } else {
        }
      }
    } else {
    }
  };

  componentDidMount = () => {
    this.setState({
      published: this.props.item.published,
      canpublih: this.props.item.published,
    });
    this.checkPublich();
  };
  render() {
    return (
      <div
        className={`box-sggbdd  ${
          this.props.published === false ? "" : "active"
        }`}
      >
        <div className="bodnfkror">
          <div className="title-of--thise-action gjtjtjtj">
            <div className="wriettii">
              <button
                onClick={() => this.props.handlepublish(false)}
                className="close-that"
              >
                <IoCloseSharp />
              </button>
              <p>Publish Program</p>
            </div>

            {/* <div className="wrapiroirr">
              {this.props.item.fileType ? (
                this.props.item.fileType.includes("image") ? (
                  <img src={`${apiUrl.content}${this.props.item.file}`} />
                ) : (
                  <VideoPost src={this.props.item.file} />
                )
              ) : (
                ""
              )}
            </div> */}
          </div>
          <div className="wjfjrjjn">
            <div className="edit-box-profile">
              <p htmlFor="title">Title</p>
              <div className="jjrjr">{this.props.title}</div>
            </div>
            <div className="edit-box-profile">
              <p htmlFor="title">Description</p>
              <div className="jjrjr">{this.props.description}</div>
            </div>

            {this.props.type !== undefined ? (
              this.props.type === 0 ? (
                ""
              ) : (
                <div className="edit-box-profile">
                  <p htmlFor="title">Price</p>
                  <div className="jjrjr">${this.props.price}</div>
                </div>
              )
            ) : (
              ""
            )}
          </div>

          {this.state.published === false ? (
            <div
              onClick={this.published}
              className={`conte-thise-action  ${
                this.state.canpublih === false ? "" : "active"
              }  ${this.state.loading ? "loading" : ""}`}
            >
              <button className="save">
                {this.state.loading ? "Publishing" : "Publish"}
              </button>
              {this.state.loading ? (
                <div className="wraprroro">
                  <LoadingSpin />
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {this.state.published ? (
            <div
              onClick={this.published}
              className={`conte-thise-action  ${
                this.state.canpublih === false ? "" : "activefjf"
              }  ${this.state.loading ? "loading" : ""}`}
            >
              <button className="save">
                {this.state.loading ? "UnPublishing" : "UnPublish"}
              </button>
              {this.state.loading ? (
                <div className="wraprroro">
                  <LoadingSpin />
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};

export default connect(mapstateToProps)(Publish);
