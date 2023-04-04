import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { HiCheck } from "react-icons/hi";
import axios from "axios";
import ActivateMyFitstaPro from "../component/ActivateMyFitstaPro";
import { BsArrowRepeat, BsGraphUp } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import LoadingSpin from "../component/loadingspin";
import Account from "../pro/account";
import { connect } from "react-redux";
import Billing from "../pro/billing";
import SubscriberList from "../component/SubscriberList";
class MyfistaProAc extends Component {
  state = {
    edit: false,
    button: false,
    loading: false,
    id: "",
  };
  goBack = () => {
    this.props.history.goBack();
  };

  activate = () => {
    if (
      this.props.users.postnumber >= 0 &&
      this.props.users.numberfollowings >= 0
    ) {
      this.setState({
        loading: true,
      });
      let option = {
        userId: this.props.users.userId,
      };
      axios.post(`/api/activate-myfit-sta-pro`, option).then((data) => {
        if (data.data.succes === true) {
          this.props.history.push("/setup");
        } else {
        }
      });
    }
  };
  componentDidUpdate(prevProps) {
    if (this.state.id !== this.props.match.params.id) {
      if (this.props.match.params.id === "myfitstapropro") {
      }
      this.setState({ id: this.props.match.params.id });
    }
  }

  componentDidMount = () => {
    //this.activate()
    if (this.props.match.params.id === "myfitstapropro") {
    }
    if (
      this.props.users.postnumber >= 10 &&
      this.props.users.numberfollowings >= 100
    ) {
      this.setState({
        button: true,
      });
    }
  };
  render() {
    return (
      <div className="wrrapeerr-uoirjr-cham">
        <div className="title-edit">
          <div className="before-edit">
            <div onClick={this.goBack} className="close-that">
              <BiArrowBack />
            </div>
            <p>MyFitstapro</p>
          </div>
        </div>
        {this.props.users.myfitstapro === true ? (
          <div className="fjejtietii">
            <div className="wrpajna-thetabshs">
              <div
                className={`tabshjjjr ${
                  this.props.match.params.data === undefined ? "active" : ""
                }`}
              >
                <Link to={"/setting/myfitstapropro"}>Account</Link>
              </div>
              <div
                className={`tabshjjjr ${
                  this.props.match.params.data
                    ? this.props.match.params.data === "subscriber"
                      ? "active"
                      : ""
                    : ""
                }`}
              >
                <Link to={"/setting/myfitstapropro/subscriber"}>
                  Subscriber
                </Link>
              </div>
              <div
                className={`tabshjjjr ${
                  this.props.match.params.data
                    ? this.props.match.params.data === "subscriber"
                      ? ""
                      : "active"
                    : ""
                } `}
              >
                <Link to={"/setting/myfitstapropro/billing"}>Payment</Link>
              </div>
            </div>
            {this.props.match.params.data ? (
              this.props.match.params.data === "subscriber" ? (
                <SubscriberList user={this.props.users.userId} />
              ) : (
                <Billing />
              )
            ) : (
              <Account />
            )}
          </div>
        ) : (
          <div className="wrpefrirrrj">
            <div className="tifiooif">What can you do with MyFitstapro?</div>

            <div className="wtapthensjjfjt">
              <div className="class-boxx">
                <div className="eldtoo"></div>
                <div className="rrjjsjeje">
                  <div className="wrieii">
                    <div className="wrpsjiirir-icocod">
                      <BsArrowRepeat />
                    </div>
                    <div className="djfrjir">Create Subsciption</div>
                  </div>
                </div>
                <div className="decrioirbe">
                  <div className="wrapeiirr">
                    <div className="fjsifojdisf">
                      <HiCheck />
                    </div>
                    <div className="ksffkfkkf">
                      Create your own Subsciption plan
                    </div>
                  </div>
                  <div className="wrapeiirr">
                    <div className="fjsifojdisf">
                      <HiCheck />
                    </div>
                    <div className="ksffkfkkf">
                      Recuring payment from subscriber
                    </div>
                  </div>
                  <div className="wrapeiirr">
                    <div className="fjsifojdisf">
                      <HiCheck />
                    </div>
                    <div className="ksffkfkkf">
                      Quick and easy implimentation
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ActivateMyFitstaPro user={this.props.users} />
          </div>
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
export default connect(mapstateToProps)(withRouter(MyfistaProAc));
