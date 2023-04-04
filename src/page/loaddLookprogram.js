import React, { Component } from "react";
import Nav from "../component/nav";
import axios from "axios";
import "../style/loadp.css";
import { withRouter, NavLink } from "react-router-dom";
import Video from "../component/video";
import Username from "../component/username";
import { BiArrowBack } from "react-icons/bi";
import LoadingSpin from "../component/loadingspin";
import ApiUrl from "../url";
import { GrPlayFill } from "react-icons/gr";
import ProIcon from "../programs/proicon";
import Report from "../component/report";
import { connect } from "react-redux";
let source;
source = axios.CancelToken.source();
class LoadlookProgram extends Component {
  state = {
    playing: false,
    media: {},
    relaterd: null,
    id: this.props.match.params.id,
    comment: false,
    lecture: true,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }

  goBack = (e) => {
    this.props.history.goBack();
  };
  getProgramInfo = () => {
    axios
      .get(
        `/api/account/program/workoutt/course/${this.props.match.params.id}`,
        { withCredentials: true, cancelToken: source.token }
      )
      .then((res) => {
        if (res.data.Author) {
          this.setState({
            media: res.data,
          });
          if (this.state.playing === false) {
            this.loadRelater(res.data.programId, res.data.authorId);
            this.setState({
              playing: true,
            });
          }
        } else {
          this.props.history.push("/home");
        }
      });
  };

  changlepage = (one, two) => {
    this.setState({
      comment: one,
      lecture: two,
    });
  };

  loadRelater = (programId, user) => {
    axios
      .get(`/api/loaddMyProgramContainer/${programId}/${user}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        this.setState({
          relaterd: res.data,
        });
      });
  };

  componentDidMount = () => {
    this.getProgramInfo();
  };
  componentDidUpdate(prevProps) {
    if (this.state.id !== this.props.match.params.id) {
      this.getProgramInfo();
      this.setState({ id: this.props.match.params.id });
    }
  }

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
            {this.state.media._id ? (
              <div className="hold-the-program-player-coterrool">
                <div className="control-back tobabrbfb">
                  <div className="wrieii">
                    <div onClick={this.goBack} className="close-that">
                      <BiArrowBack />
                    </div>
                    <p>Program</p>
                  </div>
                </div>
                <div className="wrrpaorjwwko">
                  <div className="video--image-elmnebnt-player">
                    <div className="box-player-elment">
                      {this.state.media.fileKind ? (
                        this.state.media.fileKind.includes("image") ? (
                          <img
                            src={`${ApiUrl.content}${this.state.media.file}`}
                          />
                        ) : (
                          <Video data={this.state.media.file} />
                        )
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="ejtcondigjojr">
                      <div className="iondoftjkfjjf">
                        <div className="hoilt-tje-titlem">
                          {this.state.media.title}
                        </div>
                        <div className="rjengtnjr4">
                          <div className="wraprjttrjr-infofo">
                            <div className="titlejkr-ifnfifjfjfjtegj"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ejwkjrtngnej"></div>
                    <div className="info-abour-thedub">
                      <div className="box-the-hold-your-info">
                        <div className="rjfnvvbnf">
                          <div className="iconnrhrjrjjr">
                            {this.state.media.authorId ? (
                              <ProIcon user={this.state.media.authorId} />
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="info-about-him">
                            <Username
                              user={this.state.media.authorId}
                              link={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="the-boxjjrjr">
                      {this.state.media.description.length > 0 ? (
                        <div className="holthw">
                          {this.state.media.description}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div
                      className={`commnentnjntjn ${
                        this.state.comment === true ? "active" : ""
                      }`}
                    ></div>
                  </div>

                  <div
                    className={`showthebar-of-theother-element-player ${
                      this.state.lecture === true ? "active" : ""
                    }`}
                  >
                    <div className="fjejdgrrfje">
                      <div className="titketntkjej">Up Next</div>
                    </div>
                    <div className="load-sjjkr">
                      {this.state.relaterd !== null ? (
                        this.state.relaterd?.map((item) => {
                          return (
                            <div
                              className={`box-that-hold-theinfo-next-program-c ${
                                item.file === this.props.match.params.id
                                  ? "active"
                                  : ""
                              }`}
                              key={item._id}
                            >
                              <div className="info-afachi">
                                <div className="rro4jrr"></div>

                                <NavLink
                                  to={`/account/program/workout/course/${item.file}`}
                                  className="read-load"
                                ></NavLink>
                                {item.fileKind.includes("image") ? (
                                  <img src={`${ApiUrl.content}${item.file}`} />
                                ) : (
                                  <div className="wraprorpsmmr">
                                    <video>
                                      <source
                                        src={`${ApiUrl.content}${item.file}`}
                                      />
                                    </video>
                                    <div className="jfjfnnerbb">
                                      <GrPlayFill
                                        style={{ fill: "white" }}
                                        size={20}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="prohram-description">
                                <div className="rhrjjrjr-of-workot ">
                                  <p className="title-of-workot fbfjjr">
                                    {" "}
                                    {item.title}
                                  </p>
                                </div>

                                <div className="hold-descroptionr-rn">
                                  {item.description}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="bixnknfkfjkjrjr">
                          <LoadingSpin />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bixnknfkfjkjrjr">
                <LoadingSpin />
              </div>
            )}
          </div>
        </div>

        <Report />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updataReport: (data) => {
      dispatch({ type: "UPDATE_REPORT", data: data });
    },
  };
};
export default connect(null, mapDispatchToProps)(withRouter(LoadlookProgram));
