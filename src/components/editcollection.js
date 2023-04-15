import React, { Component } from "react";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import { withRouter } from "react-router-dom";

class EditCollection extends Component {
  state = {
    save: false,
    name: "",
  };

  handleChange = (e) => {
    if (e.target.value.length > 0) {
      this.setState({
        name: e.target.value,
        save: true,
      });
    } else {
      this.setState({
        name: e.target.value,
        save: false,
      });
    }
  };
  saveChange = () => {
    if (this.state.save) {
      if (this.state.name !== this.props.collection.collectionName) {
        let option = {
          id: this.props.collection.userId,
          collectionName: this.props.collection.collectionName,
          collectionNewnmae: this.state.name,
        };
        axios.post(`/api/changeCollectionname`, option).then((res) => {
          window.location.reload();
        });
      } else {
      }
    }
  };
  componentDidMount = () => {
    this.setState({
      name: this.props.collection.collectionName,
    });
  };

  render() {
    return (
      <div
        className={`change-collectlection-name ${
          this.props.editCollection ? "active" : ""
        }`}
      >
        <div className="add-tocollection-boxx">
          <div className="Create-a-new-list-title">
            <div
              onClick={() => {
                this.props.optionchange(false, false);
              }}
              className="close-that"
            >
              <IoCloseSharp />
            </div>
            <p>Edit Name</p>
          </div>
          <div className="input-to-name-of-new-collection">
            <div className="edit-box-profile">
              <label htmlFor="username">PostCollection Name</label>
              <input
                onChange={this.handleChange}
                autoComplete="off"
                className="username-profile"
                value={this.state.name}
                type="text"
                name="username"
              />
            </div>
          </div>
          <div className="add-collection-tolistt">
            <button
              onClick={this.saveChange}
              className={`change ${this.state.save ? "active" : ""}`}
            >
              SAVE CHANGE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditCollection);
