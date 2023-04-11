import React, { Component } from "react";
import axios from "axios";
class Notin extends Component {
  state = {
    number: 0,
  };
  check = () => {
    axios
      .get(`/api/load-number-of-notification/${this.props.userId}`)
      .then((result) => {
        if (result.data.succes ) {
          this.setState({
            number: result.data.data,
          });
        } else {
        }
      });
  };
  componentDidMount = () => {
    this.check();
  };
  render() {
    return this.state.number > 0 ? (
      <div className="consjji0jr">{this.state.number}</div>
    ) : (
      ""
    );
  }
}

export default Notin;
