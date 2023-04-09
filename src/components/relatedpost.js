import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import PostBox from "./postbox";
import apiUrl from "apiUrl/url";
import { InView } from "react-intersection-observer";
import LoadingSpin from "./loadingspin";
import UserPost from "components/userPost";
class RelatedPost extends Component {
  state = {
    tags: null,
    list: [],
    number: 10,
    loading: true,
  };

  shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
    return array;
  };

  checkLoad = (data) => {
    if (data === true) {
      if (this.state.loading === false) {
        this.setState(
          {
            number: this.state.number + 10,
          },
          () => {
            this.loadRelater(this.state.number);
          }
        );
      } else {
      }
    }
  };
  loadRelater = (data) => {
    this.setState({
      loading: true,
    });
    axios
      .get(
        `/api/query-discover/${this.props.item.tags
          .toString()
          .replace("#", "")}/${data}`
      )
      .then((res) => {
        if (res.data) {
          let filter = res.data.filter(
            (item) => item._id !== this.props.item._id
          );
          this.setState({
            loading: false,
            list: filter,
          });
        } else {
        }
      });
  };

  componentDidMount = () => {
    this.loadRelater(this.state.number);
  };
  render() {
    return (
      <div className="wrsnrkoeoeood">
        {this.state.list?.map((item, index) => {
          if (this.state.list.length === index + 1) {
            return (
              <InView
                key={item._id}
                onChange={(inView, entry) => this.checkLoad(inView)}
              >
                <UserPost postId={item._id} />
              </InView>
            );
          } else {
            return <UserPost postId={item._id} />;
          }
        })}
        {this.state.loading === true ? (
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

export default withRouter(RelatedPost);
