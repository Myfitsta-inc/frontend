import React, { Component } from "react";
import "style/ui.css";
import _ from "lodash";
import profile from "profile.webp";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Username from "components/username";
import apiUrl from "apiUrl/url";
import LoadingSpin from "components/loadingspin.js";
import { BiArrowBack } from "react-icons/bi";
import Subscribe from "components/subscription";
import MessageButton from "components/messageSomeone";
import SettingMyfiststapro from "components/settingMyfitstapro";
let source;
source = axios.CancelToken.source();
class Myfitstapr extends Component {
  state = {
    setting: false,
    subscribe: false,
    profile: {},
    subscribeCheck: null,
    plan: [],
    subscribeBox: false,
    program: null,
    card: [],
  };

  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  goBack = (e) => {
    this.props.history.goBack();
  };

  subscribe = () => {
    let order = ["silver", "platinum", "gold"];
    let sorted = _.sortBy(this.state.profile.plan, function (obj) {
      return _.indexOf(order, obj.planName);
    });
    this.setState({
      plan: sorted,
      subscribeBox: true,
    });
  };

  closesubscribe = () => {
    this.setState({
      subscribeBox: false,
    });
  };

  handleSetting = (data) => {
    this.setState({
      setting: data,
    });
  };

  handlOpen = (data) => {
    this.setState({
      open: data,
    });
  };

  getProgram = (e) => {
    axios
      .get(
        `/api/load-my-active-pwo/${this.state.profile.userId}/to/${this.props.user.userId}`,
        { cancelToken: source.token }
      )
      .then((res) => {
        if (res.data.success) {
          this.setState({
            program: res.data.result,
          });
        }
      });
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
          });
          this.getProgram();
        } else {
          this.setState({
            subscribeCheck: false,
          });
          this.setState({
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

  componentDidMount = (e) => {
    this.getData();
  };

  componentWillUnmount = () => {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
  };

  render() {
    return (
      <div id="apRp">
        <div id="body-tabs">
          <div className="wraper-it-baom">
            <div id="profile-box-mone-mak-seach-dude">
              <div className="title-of-prodf">
                <div onClick={this.goBack} className="close-that">
                  <BiArrowBack />
                </div>
                <Username link={true} user={this.state.profile.userId} />
                <div className="jjjrrrdd">
                  {/*    <button  onClick={()=>this.handleSetting(true)}  className="add-nrew-progma"> <i className="fas fa-ellipsis-v"></i></button>*/}
                </div>
              </div>
              <SettingMyfiststapro
                handleSetting={this.handleSetting}
                setting={this.state.setting}
                user={this.props.user}
              />
              <div className="barnner-propfde"></div>
              <div className="cover-box-on">
                <div className="imga-profile-descp eexr">
                  <div className="pro-img-box">
                    <div className="pro-img">
                      {this.state.profile.profileUrl ? (
                        <img
                          className="pect-ppr"
                          src={`${apiUrl.content}${this.state.profile.profileUrl}`}
                          loading="lazy"
                        />
                      ) : (
                        <img src={profile} />
                      )}
                    </div>

                    <div className="actine-edit">
                      <Username user={this.state.profile.userId} />

                      <div className="bio-sub-desciption rjjr">
                        <div className="info-acct">
                          <div id="post-nu " className="al">
                            <div id="number-post" className="number-post">
                              {this.state.profile.numberOfProgram ?? 0}
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
                          <button
                            onClick={this.subscribe}
                            className="flo active"
                          >
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
                  </div>
                </div>
              </div>

              {this.state.subscribeCheck !== null ? (
                this.state.subscribeCheck === false ? (
                  <div className="wraperififoojfhr">
                    <div className="wraperjf-ffkfkr">
                      <p>Subscribe to {this.state.profile.username} </p>
                      <p>Select a subcription plan to view all the program </p>
                    </div>
                  </div>
                ) : this.state.program != null ? (
                  this.state.program.length > 0 ? (
                    <div className="hold-your-work-program active">
                      {this.state.program.map((item) => {
                        return (
                          <div className="card-box-program" key={item._id}>
                            <div className="statqusre">
                              <div className="descplr-image-program-ui">
                                <div className="hold-imf">
                                  <Link
                                    className="link0-toorohran"
                                    to={`/program/unlock/${item.programId}`}
                                  ></Link>

                                  {item.previewProgram.previewType.length >
                                  0 ? (
                                    item.previewProgram.previewType.includes(
                                      "image"
                                    ) ? (
                                      <img
                                        src={`${apiUrl.content}${item.previewProgram.previewUrl}`}
                                      />
                                    ) : (
                                      <video>
                                        <source
                                          src={`${apiUrl.content}${item.previewProgram.previewUrl}`}
                                        />
                                      </video>
                                    )
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="waorornngrkrr">
                              <div className="title-of-workot">
                                {item.title}
                              </div>
                            </div>
                          </div>
                        );
                      })}{" "}
                    </div>
                  ) : (
                    <div className="wraperififoojfhr">
                      <div className="wraperjf-ffkfkr">
                        <p>No Program</p>
                        <p>No program was not published in this account yet</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="bixnknfkfjkjrjr">
                    <LoadingSpin />
                  </div>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        {this.state.subscribeBox ? (
          this.state.profile._id ? (
            <Subscribe
              closesubscribe={this.closesubscribe}
              profile={this.state.profile.userId}
              subscribeBox={this.state.subscribeBox}
              plan={this.state.plan}
            />
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(Myfitstapr);
