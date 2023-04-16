import React, { Component } from "react";
import axios from "axios";
import LoadingSpin from "Components/Loadingspin";
import { Link } from "react-router-dom";
let source;
source = axios.CancelToken.source();
class One extends Component {
  state = {
    email: "",
    messageusername: "",
    loading: false,
  };

  componentDidMount = () => {};
  handleChange = (e) => {
    this.setState({
      email: e.target.value,
    });

    this.props.updateEmail(e.target.value);
  };

  handeSubmit = (e) => {
    e.preventDefault();
    let option = {
      email: this.state.email,
    };
    this.setState({
      loading: true,
    });

    axios.post(`/api/recover-my-account`, option).then((result) => {
      if (result.data.succes) {
        this.props.move(2);
      }
    });
  };
  render() {
    return (
      <form onSubmit={this.handeSubmit} id="loginBox">
        <div className="sign">
          Recover your account
          <div className="hajfffu"></div>{" "}
        </div>

        <div className="smal-descritptp">
          We can assist you with resetting your password. First, enter the email
          that is connected to your account 
        </div>

        <div className="edit-box-profile">
          <label htmlFor="username">Email</label>
          <input
            required
            onChange={this.handleChange}
            className="username-profile"
            type="email"
            name="username"
            placeholder="Example@gmail.com"
          />
        </div>
        <p className="messsage" id="message-username">
          {this.state.messageusername}
        </p>

        {this.state.loading ? (
          <div className="controil-theaction">
            <button
              className={`next agreen   ${
                this.state.loading ? "loading" : ""
              }  `}
            >
              {this.state.loading ? <LoadingSpin /> : "NEXT"}
            </button>
          </div>
        ) : (
          <input id="login" type="submit" name="submit" value="SEND CODE" />
        )}

        <div id="agreement">
          <div className="warer-sin">
            <p>Remember your login?</p>
            <Link to="/login">Click here</Link>
          </div>
        </div>
      </form>
    );
  }
}

export default One;
