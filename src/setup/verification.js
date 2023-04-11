import React, { Component } from "react";
import axios from "axios";
import BaxBar from "components/barbox";
import { connect } from "react-redux";

let x;
class Verification extends Component {
  state = {
    data: {},
    loading: false,
    verify: null,
  };

  getdata = () => {
    axios
      .get(`/api/request-my-walelet-data/${this.props.user.userId}`)
      .then((result) => {
        if (result.data._id) {
          this.setState({
            data: result.data,
            verify: result.data.verification,
          });

          if (result.data.verification ) {
            x = setInterval(() => {
              this.checkVerification();
            }, 3000);
          }
        }
      });
  };

  componentWillUnmount = () => {
    clearInterval(x);
  };
  lanchVerification = () => {
    let data = {
      username: this.props.user.username,
      data: this.state.data.privateWallet[0],
    };
    this.setState({
      verify: true,
    });
    axios.post(`/api/lanch-verification`, data).then((result) => {});
  };

  checkVerification = () => {
    let data = {
      username: this.props.user.username,
      data: this.state.data.privateWallet[0],
    };
    axios.post(`/api/verify-if-succes-indentity`, data).then((result) => {
      if (result.data.verification === "passed") {
        this.props.move(4);
      }
    });
  };
  componentDidMount = () => {
    this.getdata();
  };
  render() {
    return (
      <div className="werpooor">
        <div className="welcom-title">Let's verify your identity</div>
        <div className="jsjfoijeif">
          Ooof we are amost done with steuoing your myfitsta , now we just need
          your verify you identity for legal purposes , and ban you will be
          couple steop away to create your fitnes world
        </div>
        {this.state.verify === false ? (
          <div className="controil-theaction">
            <button
              onClick={() => this.lanchVerification()}
              className="next agreen"
            >
              VERIFY IDENTITY
            </button>
          </div>
        ) : (
          <div className="controil-theaction">
            <button className="next agreen">VERIFING</button>
          </div>
        )}
      </div>
    );
  }
}
const mapstateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapstateToProps)(Verification);
