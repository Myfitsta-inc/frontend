import React, { Component } from "react";
import Mediafind from "./mediafind";

class PostVue extends Component {
  state = {
    posted: [],
    likeks: [],
  };

  render() {
    return (
      <div className="card-tharholdeverujks">
        <Mediafind postId={this.props.item._id} />
      </div>
    );
  }
}
export default PostVue;
