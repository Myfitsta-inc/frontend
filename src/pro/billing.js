import React, { Component } from "react";
import { AiFillBank } from "react-icons/ai";
import axios from "axios";
import Banking from "bank/banking";
import { convertFromStripe } from "currencyFlow/formatMoneyTopayment";

class Billing extends Component {
  state = {
    wallet: null,
    bank: false,
    data: {
      accountNumber: "",
      routingNumber: "",
      accountName: "",
      accountType: "",
    },
  };

  removeMethode = () => {
    let data = this.state.wallet;
    data.wallet = [];
    this.setState({
      wallet: data,
    });

    axios.post("/api/remove-bank-data").then((data) => {});
  };
  getData = () => {
    axios
      .get("/api/load-my-finanicial/data-fic", { withCredentials: true })
      .then((result) => {
        if (result.data.success ) {
          this.setState({
            wallet: result.data,
          });
        }
      });
  };
  hnddleclick = () => {
    this.setState({
      bank: !this.state.bank,
    });
  };
  componentDidMount = () => {
    this.getData();
  };

  render() {
    return this.state.wallet !== null ? (
      <div className="wraffffjfj">
        <div className="wrapajiriri">
          <div className="wraoann-the-paysnb">
            <div className="wtapa-the-titlew">Eanings</div>

            <div className="wisjfjfhw">
              <span>$</span>
              <p>
                {convertFromStripe(this.state.wallet.ToPay, "USD").toFixed(2)}
              </p>
            </div>
          </div>
          <div className="sjfiejsfkjfj">
            <div className="wtapa-the-titlew">Payment Method</div>
            <div className="tisit">
              <div className="hoskl-the-cars-icond">
                <AiFillBank />
              </div>
              <div className="wiirr">
                {this.state.wallet.wallet.length > 0 ? (
                  <div>
                    <div>Email: {this.state.wallet.wallet[0].email}</div>
                  </div>
                ) : (
                  "Add your PayPal email to get Paid"
                )}
              </div>
            </div>
            {this.state.wallet.wallet.length > 0 ? (
              <button onClick={this.removeMethode} className="jkwiriur">
                Edit PayPal Email
              </button>
            ) : (
              <button onClick={this.hnddleclick} className="jkwiriur">
                PayPal Email
              </button>
            )}
          </div>
        </div>

        <div className="wraknnfjrjrj">
          <div className="pwituturur">Payment Histoty</div>
          <div className="billing-tabss">
            <div>Amount</div>
            <div>Satus</div>
            <div>Date</div>
          </div>
          <div className="tabs-wra-this-hsotosrir">
            <div className="wraperififoojfhr">
              <div className="wraperjf-ffkfkr">
                <p>No Transaction</p>
                <p>Every transaction will be listed here</p>
              </div>
            </div>
          </div>
        </div>
        {this.state.bank  ? (
          <Banking
            getData={this.getData}
            data={this.state.data}
            handleChange={this.handleChange}
            hnddleclick={this.hnddleclick}
          />
        ) : (
          ""
        )}
      </div>
    ) : (
      ""
    );
  }
}

export default Billing;
