import React, { Component } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Shopcard from "components/shopcard";
import Setting from "components/settinglookMyfista";
import axios from "axios";
import ProIcon from "programs/proicon";
import Username from "components/username";
import LoadingSpin from "components/loadingspin";
import PersoCard from "components/persocard";
import { BiArrowBack } from "react-icons/bi";
import { withRouter, Link } from "react-router-dom";
import MessageButton from "components/messageSomeone";
import "style/setup.css";
let source;
source = axios.CancelToken.source();
class Shoping extends Component {
  state = {
    setting: false,
    subscribe: false,
    profile: {},
    subscribeCheck: null,
    plan: [],
    subscribeBox: false,
    program: null,
    card: [],
    tabsprogram: true,
    tabscard: false,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  goback = () => {
    this.props.history.goBack();
  };

  changetabs = (one, two) => {
    this.setState({
      tabsprogram: one,
      tabscard: two,
    });
  };
  getCardInfo = () => {
    axios
      .get("/api/my-card", { withCredentials: true, cancelToken: source.token })
      .then((res) => {
        if (res.data.item) {
          let list = [...res.data.item];
          this.setState({
            card: list,
          });
        }
      });
  };

  getProgram = (e) => {
    axios
      .get(
        `/api/load-my-active-pwo/${this.state.profile.userId}/to/${this.props.user.userId}`,
        { cancelToken: source.token }
      )
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            program: res.data.reverse(),
          });
        } else {
          this.setState({
            program: "no",
          });
        }
      });
  };

  handleSetting = (data) => {
    this.setState({
      setting: data,
    });
  };

  subscribe = (event) => {
    if (this.state.subscribe) {
      let option = {
        pusblisherId: this.state.profile.userId,
        subScriberId: this.props.user.userId,
        planName: "",
        subscriptionType: this.state.profile.accountType,
      };

      axios.post(`/api/newSubcribert`, option).then((res) => {
        window.location.reload();
      });
    } else {
    }
  };

  checkSubscription = () => {
    axios
      .get(`/api/checkSubscriotion/account/${this.state.profile.userId}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.subScriberId) {
          this.setState({
            subscribeCheck: true,
            subscribe: false,
          });
          this.getProgram();
        } else {
          this.setState({
            program: "no",
            subscribeCheck: false,
            subscribe: true,
          });
        }
      });
  };

  getData = () => {
    axios
      .get(`/api/myfitsta/account/${this.props.match.params.id}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.userId) {
          if (res.data.userId === this.props.user.userId) {
            this.props.history.push("/myfitstapro");
          } else {
            this.setState({
              profile: res.data,
            });

            this.checkSubscription();
          }
        } else {
          this.props.history.push("/");
        }
      });
  };

  componentDidMount = () => {
    this.getData();
    this.getCardInfo();
  };

  componentWillUnmount = () => {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
  };

  render() {
    return (
      <div id="body-tabs">
        <div className="wraper-it-baom">
          <div id="profile-box-mone-mak-seach-dude">
            <div className="title-of-prodf">
              <div onClick={this.goback} className="close-that">
                <BiArrowBack />
              </div>
              <Username link={true} user={this.state.profile.userId} />
              <div className="wure">
                <div className="back-button">
                  <Link to={"/card"}>
                    <AiOutlineShoppingCart className="shoiton" />
                  </Link>
                </div>
                <p className="numberr-cardf">{this.state.card.length}</p>
              </div>
            </div>
            <Setting
              handleSetting={this.handleSetting}
              setting={this.state.setting}
            />
            <div className="barnner-propfde"></div>
            <div className="cover-box-on">
              <div className="imga-profile-descp eexr">
                <div className="pro-img-box">
                  <div className="pro-img">
                    {this.state.profile.userId ? (
                      <ProIcon user={this.state.profile.userId} />
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="actine-edit">
                    <Username user={this.state.profile.userId} />

                    <div className="bio-sub-desciption rjjr">
                      <div className="info-acct">
                        <div id="post-nu " className="al">
                          <div id="number-post" className="number-post">
                            {this.state.profile.numberOfProgram}
                          </div>
                          <p>Program</p>
                        </div>
                        <div id="follower-nu" className="al">
                          <div
                            id="number-followers"
                            className="number-followers"
                          >
                            {this.state.profile.numberOfSubscriber ?? 0}
                          </div>
                          <p>Subscribers</p>
                        </div>
                      </div>
                    </div>
                    <div className="action-follow-un-fo disps">
                      {this.state.profile.userId ? (
                        <MessageButton friend={this.state.profile.userId} />
                      ) : (
                        ""
                      )}

                      {this.state.subscribe === false ? (
                        <button className="flo">Subscribe</button>
                      ) : (
                        <button onClick={this.subscribe} className="flo active">
                          Subscribe
                        </button>
                      )}
                    </div>
                    <div className="bio-info">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: this.state.profile.bio,
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
                <div className="action-follow-un-fo mobioe">
                  <div className="wraeoieke">
                    {this.state.profile.userId ? (
                      <MessageButton friend={this.state.profile.userId} />
                    ) : (
                      ""
                    )}
                    {this.state.subscribe === false ? (
                      <button className="flo">Subscribe</button>
                    ) : (
                      <button onClick={this.subscribe} className="flo active">
                        Subscribe
                      </button>
                    )}
                  </div>
                </div>
                <div className="bioo-info">
                  <div className="hol-thieinformation">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: this.state.profile.bio,
                      }}
                    ></p>
                  </div>
                  <div className="bioo-sub-desciption">
                    <div className="info-acct">
                      <div id="post-nu " className="al">
                        <div id="number-post" className="number-post">
                          {this.state.profile.numberOfProgram ?? 0}
                        </div>
                        <p>Program</p>
                      </div>
                      <div id="follower-nu" className="al">
                        <div id="number-followers" className="number-followers">
                          {this.state.profile.numberOfSubscriber ?? 0}
                        </div>
                        <p>Subscribers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*  <div className="tabs">
   
        <div onClick={()=>{this.changetabs(true,false)}}  className={`tabs-tonore ${this.state.tabsprogram==true?"active":""}`}>
            Programs
        </div>
      
        <div className="tabs-tonore">
      
        </div>
    </div>
*/}

            {this.state.subscribeCheck !== null ? (
              this.state.subscribeCheck === false ? (
                <div className="wraperjf-ffkfkr">
                  <p>Subscribe to {this.state.profile.username} </p>
                  <p>
                    TO be able to see all the program relase by this accoount{" "}
                  </p>
                </div>
              ) : this.state.program !== null ? (
                this.state.program !== "no" ? (
                  <div
                    className={`hold-your-work-program ${
                      this.state.tabsprogram ? "active" : ""
                    }`}
                  >
                    {this.state.program !== null
                      ? this.state.program !== "no"
                        ? this.state.program.length > 0
                          ? this.state.program?.map((element) => {
                              return (
                                <Shopcard
                                  card={this.state.card}
                                  addToCard={this.addToCard}
                                  key={element._id}
                                  item={element}
                                />
                              );
                            })
                          : "no"
                        : "ttt"
                      : ""}
                  </div>
                ) : (
                  <div className="wraperjf-ffkfkr">
                    <p>No program</p>
                    <p>
                      When {this.state.profile.username} release a program it
                      will be listed here{" "}
                    </p>
                  </div>
                )
              ) : (
                ""
              )
            ) : (
              <div className="bixnknfkfjkjrjr">
                <LoadingSpin />
              </div>
            )}

            <div
              className={`hiold-my-programs ${
                this.state.tabscard ? "active" : ""
              }`}
            >
              <PersoCard />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Shoping);
