import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import LoadingSpin from "components/loadingspin";
import { connect } from "react-redux";
class PaymentmethodSub extends Component {
  state = {
    payment: null,
    button: false,
    loading: false,
    errorMessage: "",
  };

  handleclick = () => {
    this.setState({
      button: true,
    });
    this.props.hideoption();
  };

  handlePay = () => {
    const { paymentMethod, plan, publisherId, user } = this.props;

    let option = {
      token: paymentMethod.token,
      planName: plan.planName,
      publisherId: publisherId,
      subScriberId: user.userId,
      price: plan.price,
    };

    this.setState({
      loading: true,
    });
    axios
      .post("/api/subscription/intent", option)
      .then((result) => {
        if (result.data.success) {
          window.location.reload();
        } else {
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    const { paymentMethod } = this.props;
    return (
      <div className="woffkorkr">
        <div className="wrapfjrr">
          <div
            className={`wraskfkfofnj-crsfdnf ${
              this.state.button  ? "active" : ""
            } `}
          >
            <div className="positf active">
              <button></button>
            </div>
            <div className="wiijsjfjjfjfj">
              <div className="sjsjjfkfkfk">{paymentMethod.brand}</div>
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
                  <div className="boldsfk">{paymentMethod.ending}</div>
                </div>
              </div>
            </div>
            <div className="skfkfkrjjr"></div>
          </div>

          <div className="wraohririirii">
            <div className="controil-theaction">
              <button
                onClick={this.handlePay}
                className={`add-shch ${
                  this.state.loading  ? "active" : ""
                }`}
              >
                {this.state.loading  ? "" : "SUBSCRIBE"}
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
export default connect(mapstateToProps)(withRouter(PaymentmethodSub));
