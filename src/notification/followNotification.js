import React, { Component } from "react";

import IconProfile from "Components/Iconpicture";
import Username from "Components/Username";
import ButtonFollow from "Components/buttonFollow";
class FollowNotification extends Component {
  render() {
    return (
      <div className="div-hold-hold-thenotification">
        <div className="wjsjrhrnnff ">
          <div className="icon-of-thedube">
            {this.props.item ? (
              <IconProfile user={this.props.item.notifiyiId} />
            ) : (
              ""
            )}
          </div>
          <div className="messahrhrn-nott">
            <div className="ejwjjr"></div>{" "}
            {this.props.item ? (
              <Username link={true} user={this.props.item.notifiyiId} />
            ) : (
              ""
            )}
            <div className="bmhjn"> Sarted following you</div>
          </div>

          <div className="div-that-wraper-the-imga3-btotnjrn">
            <ButtonFollow friend={this.props.item.notifiyiId} />
          </div>
        </div>
      </div>
    );
  }
}

export default FollowNotification;
