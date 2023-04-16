import React, { Component } from "react";
import Rating from "Components/rating";
import { Link } from "react-router-dom";
import axios from "axios";
import VideoPost from "Components/videopost";
import apiUrl from "apiUrl/url";
class ProgramBought extends Component {
  state = {
    item: null,
  };
  componentDidMount = () => {
    axios.get(`/api/program-bought/${this.props.programId}`).then((result) => {
      if (result.data !== "no") {
        this.setState({
          item: result.data,
        });
      } else {
        this.setState({
          item: "no",
        });
      }
    });
  };
  render() {
    return this.state.item !== null ? (
      this.state.item !== "no" ? (
        <div className="box-thsthstbb">
          <div className="boxrnfnfnbn">
            {this.state.item?.previewProgram?.previewType.includes("image") ? (
              <img
                src={`${apiUrl.content}${this.state.item?.previewProgram?.previewUrl}`}
              />
            ) : (
              <VideoPost src={this.state.item?.previewProgram?.previewUrl} />
            )}
          </div>
          <div className="boxrnfnfnbebnsnnnrn">
            <div className="title-of-workot">{this.state.item.title}</div>
          </div>
          <Link
            className="box-that-link"
            to={`/program/unlock/${this.props.programId}`}
          ></Link>
        </div>
      ) : (
        ""
      )
    ) : (
      ""
    );
  }
}

export default ProgramBought;
