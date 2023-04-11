import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import LoadingSpin from "components/loadingspin";
import { connect } from "react-redux";
class Paymentmethod extends Component {
  state = {
    payment: null,
    button: false,
    loading: false,
  };

  handleclick = () => {
    this.setState({
      button: true,
    });
    this.props.hideoption();
  };

  getPaymentMethod = () => {
    let option = {
      userId: this.props.users.userId,
    };

    axios.post(`/api/my-payment-methode`, option).then((result) => {
      if (result.data._id) {
        const { paymentMethods } = result.data;
        if (paymentMethods.length > 0) {
          let tochoose = paymentMethods.filter((item) => item.default );
          this.setState({
            payment: tochoose[0],
          });
        } else {
          this.setState({
            payment: "no",
          });
        }
      } else {
        this.setState({
          payment: "no",
        });
      }
    });
  };

  handlePay = () => {
    let option = {
      program: this.props.item,
      userId: this.props.users.userId,
    };
    this.setState({
      loading: true,
    });
    axios.post(`/api/braintree/v1/sandbox`, option).then((result) => {
      if (result.data.success ) {
        this.props.history.push(`/program/unlock/${option.program.programId}`);
      }
    });
  };

  componentDidMount = () => {
    this.getPaymentMethod();
  };

  render() {
    return (
      <div className="woffkorkr">
        <div className="wrapfjrr">
          {this.state.payment !== null ? (
            this.state.payment !== "no" ? (
              <div
                onClick={this.handleclick}
                className={`wraskfkfofnj-crsfdnf ${
                  this.state.button  ? "active" : ""
                } `}
              >
                <div className="positf active">
                  <button></button>
                </div>
                <div className="wiijsjfjjfjfj">
                  <div className="sjsjjfkfkfk">{this.state.payment.kind}</div>
                  <div className="sjsjjfkfkfk">
                    <div className="fsjjfjfjr">
                      <div className="boldsfk">
                        <button></button>
                        <button></button>
                        <button></button>
                        <button></button>
                      </div>
                      <div className="boldsfk">
                        <button></button>
                        <button></button>
                        <button></button>
                        <button></button>
                      </div>
                      <div className="boldsfk">
                        <button></button>
                        <button></button>
                        <button></button>
                        <button></button>
                      </div>
                      <div className="boldsfk">{this.state.payment.ending}</div>
                    </div>
                  </div>
                </div>
                <div className="skfkfkrjjr"></div>
              </div>
            ) : (
              ""
            )
          ) : (
            <div className="jietiooeoe">
              {" "}
              <LoadingSpin />
            </div>
          )}
          {this.state.button  ? (
            <div className="wraohririirii">
              <div className="controil-theaction">
                <button
                  onClick={this.handlePay}
                  className={`add-shch ${
                    this.state.loading  ? "active" : ""
                  }`}
                >
                  {this.state.loading  ? "" : "PURCHACE"}
                </button>
                {this.state.loading  ? (
                  <div className="jietiooeo">
                    {" "}
                    <LoadingSpin />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
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
export default connect(mapstateToProps)(withRouter(Paymentmethod));
