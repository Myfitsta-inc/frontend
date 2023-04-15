import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { connect } from "react-redux";
import AddMethod from "payment/addmethod";
import { GoPlus } from "react-icons/go";
import LoadingSpin from "components/loadingspin";

class PaymentInfo extends Component {
  state = {
    listCard: null,
    button: false,
    addcard: false,
    acountD: {},
  };
  goBack = () => {
    this.props.history.goBack();
  };
  makeDefault = (data) => {
    let option = {
      userId: this.props.users.userId,
      item: data,
    };
    axios.post("/api/update-payment-methode", option).then((result) => {
      window.location.reload();
    });
  };
  removeCard = (data) => {
    let option = {
      userId: this.props.users.userId,
      item: data,
    };
    axios.post("/api/remove-payment-methode", option).then((result) => {
      window.location.reload();
    });
  };
  hnddleclick = () => {
    this.setState({
      addcard: !this.state.addcard,
    });
  };
  getPaymentMethod = () => {
    let option = {
      userId: this.props.users.userId,
    };
    axios.post(`/api/my-payment-methode`, option).then((result) => {
      if (result.data._id) {
        this.setState({
          acountD: result.data,
        });
        if (result.data.paymentMethods.length > 0) {
          this.setState({
            listCard: result.data.paymentMethods,
          });
        } else {
          this.setState({
            listCard: "no",
          });
        }
      } else {
        this.setState({
          listCard: "no",
        });
      }
    });
  };

  componentDidMount = () => {
    this.getPaymentMethod();
  };
  render() {
    return (
      <div className="wrrapeerr-uoirjr-cham">
        <div className="title-edit">
          <div className="before-edit">
            <div onClick={this.goBack} className="close-that">
              <BiArrowBack />
            </div>
            <p>Payment Method</p>
          </div>
        </div>
        <div className="load-the-info-sjdjd"></div>
        <div className="sjcijrjnjir">
          {this.state.listCard !== null ? (
            this.state.listCard !== "no" ? (
              this.state.listCard.map((item) => {
                return (
                  <div key={item._id} className="wrapwediiriri">
                    <div
                      className={`wraskfkfofnj-crsfdnf ${
                        item.default ? "active" : ""
                      } `}
                    >
                      <div className="positf">
                        <button></button>
                      </div>
                      <div className="wiijsjfjjfjfj">
                        <div className="sjsjjfkfkfk speoer">
                          <div className="fsjjfjfjr">
                            <div className="boldsfk">{item.brand}</div>
                            <div className="boldsfk"></div>
                            <div className="boldsfk"></div>
                            <div className="boldsfk">
                              {item.default && "Default"}
                            </div>
                          </div>
                        </div>
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
                            <div className="boldsfk">{item.ending}</div>
                          </div>
                        </div>
                      </div>
                      <div className="skfkfkrjjr"></div>
                    </div>
                    <div className="tabsjdjdj">
                      {!item.default && (
                        <button
                          onClick={() => {
                            this.makeDefault(item);
                          }}
                        >
                          Make Default
                        </button>
                      )}
                      {!item.default && (
                        <button
                          onClick={() => {
                            this.removeCard(item);
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="wraperjf-ffkfkr">
                <p>No Payment Method Addded</p>
                <p>Payment Method are added on the checkout page</p>
              </div>
            )
          ) : (
            <div className="bdoorr">
              <LoadingSpin />
            </div>
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
export default connect(mapstateToProps)(withRouter(PaymentInfo));
