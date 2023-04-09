import React, { Component } from "react";
import Nav from "components/nav";
import Search from "components/seach";
import SubscriberList from "components/SubscriberList";
import Following from "components/following";
import { motion } from "framer-motion";
import Follower from "components/follower";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
let source;
source = axios.CancelToken.source();
class LoadConnection extends Component {
  state = {
    search: false,
    profile: null,
  };

  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  goBack = (e) => {
    this.props.history.goBack();
  };

  loadProfile = () => {
    axios
      .get(`/api/accountt/${this.props.match.params.id}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.username) {
          this.setState({
            profile: res.data,
          });
        } else {
          this.props.history.push("/home");
        }
      });
  };
  openSearch = (data) => {
    this.setState({
      search: data,
    });
  };

  componentDidMount = () => {
    this.loadProfile();
  };

  componentWillUnmount = () => {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
  };
  render() {
    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabs">
            <div className="wrpart-therjgjrj">
              <div className="notification">
                <div className="big-wrapert">
                  <div className="wrpartt-titlee">
                    <div className="wrieii">
                      <div onClick={this.goBack} className="close-that">
                        <BiArrowBack />
                      </div>
                      <p className="tjtjjt">{this.props.match.params.id}</p>
                    </div>
                  </div>

                  <div className="box-bsfijijwjej">
                    {this.state.profile !== null ? (
                      <div className="wrperr-arjjrwjroi-rje">
                        <div className="tabs0dkke">
                          <div
                            className={`tsgfhjked ${
                              this.props.match.params.data === "follower"
                                ? "active"
                                : ""
                            }`}
                          >
                            <Link
                              to={`/user/${this.props.match.params.id}/follower`}
                            >
                              Follower
                            </Link>
                          </div>
                          <div
                            className={`tsgfhjked ${
                              this.props.match.params.data === "followingId"
                                ? "active"
                                : ""
                            }`}
                          >
                            <Link
                              to={`/user/${this.props.match.params.id}/followingId`}
                            >
                              Following
                            </Link>
                          </div>
                          {/* {this.state.profile.myfitstapro === true ? (
                            <div
                              className={`tsgfhjked ${
                                this.props.match.params.data === "subscriber"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <Link
                                to={`/user/${this.props.match.params.id}/subscriber`}
                              >
                                Subscriber
                              </Link>
                            </div>
                          ) : (
                            ""
                          )} */}
                        </div>
                        <div className="wrpskrijkjrkkrkrkkr">
                          <motion.div
                            className={`wfijiwrjwkjrnr ${
                              this.props.match.params.data === "follower"
                                ? "active"
                                : ""
                            } `}
                          >
                            {this.props.match.params.data === "follower" ? (
                              this.state.profile !== null ? (
                                <Follower user={this.state.profile.userId} />
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                          </motion.div>
                          <motion.div
                            className={`wfijiwrjwkjrnr ${
                              this.props.match.params.data === "followingId"
                                ? "active"
                                : ""
                            }`}
                          >
                            {this.props.match.params.data === "followingId" ? (
                              this.state.profile !== null ? (
                                <Following user={this.state.profile.userId} />
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                          </motion.div>

                          {/* {this.state.profile.myfitstapro === true ? (
                            <motion.div
                              className={`wfijiwrjwkjrnr ${
                                this.props.match.params.data === "subscriber"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              {this.props.match.params.data === "subscriber" ? (
                                this.state.profile !== null ? (
                                  <SubscriberList
                                    user={this.state.profile.userId}
                                  />
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}
                            </motion.div>
                          ) : (
                            ""
                          )} */}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <Search
                user={this.props.user}
                openSearch={this.openSearch}
                seach={this.state.search}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoadConnection);
