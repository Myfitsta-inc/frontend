import React, { Component } from "react";
import axios from "axios";
import logoone from "logo/logo.png";
import Fade from "react-reveal/Fade";
import LoadingSpin from "components/loadingspin";
class RegisterOne extends Component {
  state = {
    message: "",
    loading: false,
  };

  handleRegister = (e) => {
    e.preventDefault();
    let option = {
      email: this.props.email,
    };

    this.setState({
      loading: true,
    });

    axios.post(`/api/recover-my-account`, option).then((result) => {
      if (result.data.succes ) {
        this.props.handleNext(1);
      }
    });
  };
  render() {
    return (
      <form id="registerbox" onSubmit={this.handleRegister}>
        <div className="sign">
          <Fade left cascade>
            Sign Up
          </Fade>
          <div className="hajfffu">
            <img src={logoone} />
          </div>{" "}
        </div>
        <div className="edit-box-profile">
          <label htmlFor="username">Email</label>
          <input
            onChange={this.props.handleChange}
            required
            className="username-profile"
            type="email"
            name="email"
            placeholder="Example@gmail.com"
            autoComplete="off"
          />
        </div>
        <p className="messsage" id="message-username">
          {this.state.message}
        </p>
        {this.state.loading === false ? (
          <input id="register" type="submit" value="CONTINUE" />
        ) : (
          <button
            className={`next agreen   ${
              this.state.loading  ? "loading" : ""
            }  `}
          >
            {this.state.loading  ? <LoadingSpin /> : ""}
          </button>
        )}
      </form>
    );
  }
}
export default RegisterOne;
