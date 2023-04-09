import React, { Component } from "react";
import MenuMessage from "messaging/messagemenu";
import { connect } from "react-redux";
import apiUrl from "apiUrl/url";
class ImageMessage extends Component {
  state = {
    icon: null,
  };
  componentDidMount = () => {
    document.querySelector(".box-hold-convertion").scrollTop =
      document.querySelector(".box-hold-convertion").scrollHeight;
  };

  render() {
    return (
      <div className="fesjte">
        {this.props.users.userId === this.props.item.sender ? (
          <div className="bfhehbfbhe">
            <MenuMessage
              handleRemove={this.props.handleRemove}
              item={this.props.item}
            />
          </div>
        ) : (
          ""
        )}
        <div className="box-thmerjhr">
          <div className="hold-that-imghjnd">
            <img src={`${apiUrl.content}${this.props.item.content}`} />
          </div>
          <div className="hold-thjat-data"></div>
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

export default connect(mapstateToProps)(ImageMessage);
