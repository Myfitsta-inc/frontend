import React, { Component } from "react";
import axios from "axios";
import { convertFromStripe } from "currencyFlow/formatMoneyTopayment";

class SubscriptionType extends Component {
  state = {
    plan: null,
  };
  checkSubscription = () => {
    axios
      .get(`/api/checkSubscriotion/account/${this.props.userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data._id) {
          let plansChoose = this.props.plan.filter(
            (item) => item.planName === res.data.planName
          );
          if (plansChoose.length > 0) {
            this.setState({
              plan: plansChoose[0],
            });
          }
        }
      });
  };

  componentDidMount = () => {
    //this.checkSubscription()
  };
  render() {
    return this.props.plan !== null ? (
      <div className="wraper-the-plankr">
        <div className="div-wirii">
          <p>{this.props.plan.planName}</p>
        </div>
        <div className="wharoor-the-amoiutt">
          <p className="desd">$</p>
          <p className="boififi">
            {convertFromStripe(this.props.plan.price, "USD")}
          </p>
          <span className="title-4hhf4">/</span>
          <p className="title-4hh4">
            {" "}
            {this.props.plan.planName === "silver"
              ? "month"
              : this.props.plan.planName === "platinum"
              ? "3 month"
              : "Year"}
          </p>
        </div>
      </div>
    ) : (
      <div className="wraper-the-plankr">
        <div className="div-wirii">
          <p></p>
        </div>
        <div className="wharoor-the-amoiutt">
          <p className="desd"></p>
          <p className="boififi"></p>
          <span className="title-4hhf4"></span>
          <p className="title-4hh4"> </p>
        </div>
      </div>
    );
  }
}
export default SubscriptionType;
