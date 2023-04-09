import React, { Component } from "react";
import moment from "moment";
import Username from "components/username";
import IconProfile from "components/iconpicture";
import { convertFromStripe } from "currencyFlow/formatMoneyTopayment";
class OrderSubscription extends Component {
  state = {
    list: null,
  };
  componentDidMount = () => {};
  render() {
    return (
      <div className="hold-the-box-of-shit-bjf">
        <div className="the-theh-titklen-than">
          <p>Subscriptions History</p>
        </div>
        <div className="rjrnjmrkesr sjrwkjrj">
          <div className="rjer3lwr3w">Subscriber</div>
          <div className="rjer3lwr3w">Subscription</div>
          <div className="rjer3lwr3w">Date</div>
          <div className="rjer3lwr3w">Price</div>
        </div>
        <div className="wrpsoofoof">
          {this.props.data !== null ? (
            this.props.data.length > 0 ? (
              this.props.data.map((item) => {
                return (
                  <div key={item._id} className="ifiirkjjr">
                    <div className="rjer3lwr3w">
                      <div className="jeirir">
                        <div className="chhfjf-sfufr">
                          <IconProfile user={item.customerId} />
                        </div>
                        <Username user={item.customerId} />
                      </div>
                    </div>
                    <div className="rjer3lwr3w">
                      <div className="fjeijsgijijf">{item.programId}</div>
                    </div>
                    <div className="rjer3lwr3w">
                      {moment(item.date).format("L")}
                    </div>
                    <div className="rjer3lwr3w">
                      <span>$</span>
                      {convertFromStripe(
                        item.earnings + item.takeCut,
                        "USD"
                      ).toFixed(2)}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="wraperififoojfhr">
                <div className="wraperjf-ffkfkr">
                  <p>Create a new post</p>
                  <p>
                    Share with your community your best workout or fitness
                    activity
                  </p>
                </div>
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default OrderSubscription;
