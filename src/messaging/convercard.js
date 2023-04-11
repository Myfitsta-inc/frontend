import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import LastMessage from "components/lastmessage";
import IconProfile from "components/iconpicture";
import Username from "components/username";

class Convercard extends Component {
  componentDidMount = () => {};

  render() {
    return (
      <div
        className={`box-hold-friend-totalkwith ${
          this.props.item.userId === this.props.match.params.id ? "active" : ""
        }`}
        key={this.props.data}
      >
        <Link
          to={`/message/${this.props.item.userId}`}
          className="redirec-toconver"
        ></Link>
        <div className="profie-img">
          <IconProfile live={true} user={this.props.item.userId} />
        </div>
        <div className="info-about-conversation">
          <div className="name-of-fiend">
    
            <Username user={this.props.item.userId} />
            <p className="daytn"></p>
          </div>
          <div className="last-conversation">
            {/* <LastMessage item={this.props.item} /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Convercard);
