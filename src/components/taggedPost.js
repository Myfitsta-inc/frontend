import React, { Component } from "react";
import axios from "axios";
import apiUrl from "apiUrl/url";
import Tagggedbox from "./taddedbox";
import { connect } from "react-redux";
import PostVue from "components/postvue";
class TagggedPost extends Component {
  state = {
    list: null,
  };

  loadTagged = () => {
    axios.get(`/api/Taggeg/${this.props.user}`).then((result) => {
      if (result.data !== "null" && result.data.postLists.length) {
        this.setState({
          list: result.data.postLists,
        });
      } else {
        this.setState({
          list: "null",
        });
      }
    });
  };

  componentDidUpdate = () => {};

  componentDidMount = () => {
    this.loadTagged();
  };
  render() {
    return (
      <div className="wraper0the-box-postrns">
        {this.state.list !== null ? (
          this.state.list !== "null" ? (
            <div className="contiantien-post">
              {this.state.list?.map((item) => {
                return <PostVue item={{ _id: item }} key={item} />;
              })}
            </div>
          ) : (
            <div className="wraperififoojfhr">
              <div className="wraperjf-ffkfkr">
                <p>No tags</p>
                {this.props.user !== this.props.users.userId ? (
                  <p>This account was not be tagged yet</p>
                ) : (
                  <p>When someone tag you in a post it will be listed here</p>
                )}
              </div>
            </div>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}
const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};
export default connect(mapstateToProps)(TagggedPost);
