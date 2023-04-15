import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiUrl from "apiUrl/url";
import { GrPlayFill } from "react-icons/gr";
class Cardmdedia extends Component {
  render() {
    let media = this.props.item?.map((data) => {
      const { title, mediaInfo } = data;
      const { mediaType, mediaUrl, _id } = mediaInfo;
      return (
        <div className="card-program-video-image" key={data._id}>
          <div className="hold-thedesign-affiche">
            <Link
              to={`${
                this.props.acount ? "/account" : ""
              }/program/myfitsta/course/${data._id}`}
              className="read-load"
            ></Link>
            {mediaType.includes("image") ? (
              <img src={`${apiUrl.content}${mediaUrl}`} />
            ) : (
              <div className="wraprorpsmmr">
                <video playsInline={true}>
                  <source src={`${apiUrl.content}${mediaUrl}`} />
                </video>
                <div className="jfjfnnerbb">
                  <GrPlayFill style={{ fill: "white" }} size={20} />
                </div>
              </div>
            )}
          </div>
          <div className="title-of-workot">{title}</div>
        </div>
      );
    });
    return (
      <div
        className={`hold-the-program-media ${
          this.props.tabsprogram ? "active" : ""
        }`}
      >
        {media}
      </div>
    );
  }
}

export default Cardmdedia;
