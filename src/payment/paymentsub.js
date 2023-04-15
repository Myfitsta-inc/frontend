import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FaRegCreditCard } from "react-icons/fa";
import { HiOutlineChevronRight } from "react-icons/hi";
import axios from "axios";
import Checkout from "./Checkout";
import PaymentMethodSub from "payment/paymentMethodSub";
import LoadingSpin from "components/loadingspin";
import { convertFromStripe } from "currencyFlow/formatMoneyTopayment";
import { SILVER_PLAN, PLATINUM_PLAN } from "productOptions/plan";

class PaymentSub extends Component {
  instance;
  state = {
    item: null,
    card: true,
    option: false,
    loading: false,
    dropin: false,
    paymentMethod: [],
  };
  componentDidMount() {
    this.getPaymentMethod();
  }

  handleCard = () => {};

  hideoption = () => {
    this.setState({
      card: false,
    });
  };

  getPaymentMethod = () => {
    let option = {
      userId: this.props.users.userId,
    };
    this.setState({
      loading: true,
    });

    axios.post(`/api/my-payment-methode`, option).then((result) => {
      if (result.data._id) {
        if (result.data.paymentMethods.length > 0) {
          let tochoose = result.data.paymentMethods.filter(
            (item) => item.default
          );
          this.setState({
            paymentMethod: tochoose[0],
            card: true,
            loading: false,
            option: true,
          });
        } else {
          this.setState({
            dropin: true,
            loading: false,
          });
        }
      } else {
        this.setState({
          dropin: true,
          loading: false,
        });
      }
    });
  };

  handlePaymentcard = () => {
    this.setState({
      card: !this.state.card,
      option: !this.state.option,
      dropin: !this.state.dropin,
    });
  };
  render() {
    return (
      <div className="card-that-hold-ifr active">
        <div className="wraper-hosmjfr-ifntjje">
          <div className="wraper-thesubscriotion ">
            <div className="wraper-thesubscriotion ">
              <div className={`wrepr-arounbd0the-plan active emprjrk`}>
                <div className="wraofhrjwirrrj">
                  <div className="wrapringt-jgj"></div>
                  <div className="div-wiri">
                    <button className="asdd-sellect"></button>
                  </div>
                  <div className="wraprjr0-rfjrj">
                    <p className="frjrj">{this.props.item.planName}</p>
                    <div className="wharoor-the-amoiut">
                      <span>$</span>
                      <p className="price-itr">
                        {convertFromStripe(this.props.item.price, "USD")}
                      </p>{" "}
                      /{" "}
                      <p className="title-4hh4">
                        {this.props.item.planName === SILVER_PLAN
                          ? "month"
                          : this.props.item.planName === PLATINUM_PLAN
                          ? "3 month"
                          : "Year"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rjhjr">
                  <button onClick={this.props.handlenext}> Change Plan</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.option ? (
          <div className="payment-option">
            <div className="boixbfitjrj">Choose Payment Method</div>
            {this.state.card ? (
              <div className="wroiriitiiir">
                <div onClick={this.handlePaymentcard} className="pay-with-card">
                  <div className="wrtapr">
                    <div className="iconfte">
                      <FaRegCreditCard />
                    </div>
                    <div className="titler">New Credit / Debit card</div>
                  </div>
                  <div className="rkieokr">
                    <HiOutlineChevronRight />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        {this.state.loading && (
          <div className="jietiooegggg">
            {" "}
            <LoadingSpin />
          </div>
        )}

        {this.state.option && (
          <PaymentMethodSub
            user={this.props.users}
            publisherId={this.props.publisherId}
            plan={this.props.item}
            paymentMethod={this.state.paymentMethod}
          />
        )}

        {this.state.dropin && (
          <Checkout
            publisherId={this.props.publisherId}
            plan={this.props.item}
            user={this.props.users}
          />
        )}
      </div>
    );
  }
}
const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};

export default connect(mapstateToProps, null)(withRouter(PaymentSub));
