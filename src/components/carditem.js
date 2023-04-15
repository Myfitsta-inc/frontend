import React, { Component } from "react";
import Rating from "./rating";
import axios from "axios";
import apiUrl from "apiUrl/url";
import { connect } from "react-redux";
import { MdDelete } from "react-icons/md";
class CardItem extends Component {
  state = {
    item: null,
  };

  removeFromCard = (item) => {
    let option = {
      userId: this.props.users.userId,
      programId: item,
    };
    axios.post(`/api/remove-my-card-info`, option).then((result) => {
      this.props.removeFromCard(item);
    });
  };

  getItem = () => {
    axios
      .get(`/api/program-data/${this.props.item.programId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data._id) {
          this.setState({
            item: res.data,
          });
          if (this.props.item.selected) {
            this.props.handleadd(res.data);
          }
        }
      });
  };

  componentDidMount = () => {
    this.getItem();
  };
  render() {
    return this.state.item !== null ? (
      <div
        onClick={() => {
          this.props.handleclick(
            this.props.item.programId,
            this.state.item,
            this.props.item.selected
          );
        }}
        className={`hold-thise-programd-selxtr ${
          this.props.item.selected ? "active" : ""
        }`}
      >
        <div className="box-that-hold0-the-prijfnfjtnbxjfnn">
          <div className="hold-theopreviuew-ofn">
            <img
              className="pect-ppr"
              src={`${apiUrl.content}${this.state.item.file}`}
              loading="lazy"
            />
          </div>
        </div>
        <div className="hokd-infof">
          <div className="holf-thatjrjr">
            <div className="titikrj">{this.state.item.title}</div>
            <div className="privjn">${this.state.item.price / 100}</div>
            <Rating rating={this.state.item.rating} />
          </div>
        </div>
        <div className="rhnwlk">
          <div className="poinrt">
            <i className="fas fa-circle"></i>
          </div>
          <button
            onClick={() => {
              this.removeFromCard(this.state.item.programId);
            }}
            className="tutiuitsjrjsjn"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    ) : (
      ""
    );
  }
}
const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};
export default connect(mapstateToProps)(CardItem);
