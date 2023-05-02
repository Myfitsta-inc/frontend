import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "style/program.css";
import Nav from "Components/nav";
import Cardmdedia from "Components/cardmedia";
import axios from "axios";
import Username from "Components/Username";
import ShareOption from "Components/shareoption";
import SharePost from "Components/sharepost";
import { AiOutlineStar } from "react-icons/ai";
import apiUrl from "apiUrl/url";
import ProIcon from "programs/proicon";
import { BiArrowBack } from "react-icons/bi";
import VideoProgram from "Components/videoProgram";
import Reviews from "Components/reviews";
import Rate from "Components/rate";
import Report from "Components/report";
import { connect } from "react-redux";
import Rating from "Components/rating";
let source;
source = axios.CancelToken.source();
class Lookprogram extends Component {
  state = {
    setting: false,
    program: {},
    item: [],
    rate: false,
    tabsprogram: true,
    reviewtabs: false,
    shareoption: false,
    file: "",
    sharebox: false,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  handlOpenS = (data) => {
    this.setState({
      sharebox: data,
    });
    this.handleSettingg(false);
  };

  openRate = (data) => {
    this.setState({
      rate: data,
      setting: false,
    });
  };

  updateRating = (data) => {
    this.setState({
      review: data,
    });
  };

  changetabs = (one, two) => {
    this.setState({
      tabsprogram: one,
      reviewtabs: two,
    });
  };

  updateReview = () => {
    this.props.updateReviews(this.props.counterReview + 1);
    this.setState({
      //counter: this.state.counter + 1
    });
  };

  handleSettingg = (data) => {
    this.setState({
      shareoption: data,
    });
  };

  goBack = (e) => {
    this.props.history.goBack();
  };
  handleSetting = (data) => {
    this.setState({
      setting: data,
    });
  };

  loadContainer = (programId, user) => {
    axios
      .get(`/api/loaddMyProgramContainer/${programId}/${user}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data[0].publisherId) {
          this.setState({
            item: res.data,
          });
        } else {
        }
      });
  };

  getProgramInfo = (data) => {
    axios
      .get(`/api/accountt/program/myfitsta/${this.props.match.params.id}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.bougth && res.data.program.published) {
          this.setState({
            program: res.data.program,
          });

          this.loadContainer(
            this.props.match.params.id,
            res.data.program.publisherId
          );
        } else {
          this.props.history.push("/");
        }
      });
  };

  componentDidMount = () => {
    this.getProgramInfo();
  };

  componentWillUnmount = () => {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
  };
  render() {
    return (
      <div className="conatiner">
        <Nav />
        <div id="app">
          <div id="body-tabs">
            <div className="wraper-it-baom">
              <div className="hold-the-program-information">
                <div className="title-of-prodf">
                  <div className="wror-wrr">
                    <div onClick={this.goBack} className="close-that">
                      <BiArrowBack />
                    </div>
                    <p className="tti-rhe">Programm</p>
                  </div>
                  <div className="hold-the-upload"></div>
                </div>

                <div className="banner-that-hold-the-information">
                  <div className="box-that-hold-theafihe-url">
                    {this.state.program?.previewProgram?.previewType ? (
                      this.state.program.previewProgram.previewType.includes(
                        "image"
                      ) ? (
                        <img
                          src={`${apiUrl.content}${this.state.program.previewProgram.previewUrl}`}
                        />
                      ) : (
                        <VideoProgram
                          src={this.state.program.previewProgram.previewUrl}
                        />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="box-hod-theinfomation">
                    <div className="hold-the-title-ofthe-program">
                      {this.state.program.title}
                    </div>

                    <div className="livehhrn">
                      <div className="jjrwre">
                        <div className="wrp-actt rjhebt active">
                          <div
                            onClick={() => {
                              this.openRate(true);
                            }}
                            className="wraprjrj"
                          >
                            <div className=" box-accc">
                              <div className="icon">
                                <AiOutlineStar />
                              </div>
                            </div>
                            <p className="njr">RATE</p>
                          </div>

                          {/* <div
                            onClick={() => {
                              this.handleSettingg(true, this.state.file);
                            }}
                            className="wraprjrj"
                          >
                            <div className=" box-accc">
                              <div className="icon">
                                <IoIosShareAlt />
                              </div>
                            </div>
                            <p className="njr">SHARE</p>
                          </div> */}

                          <div
                            onClick={() => {
                              this.props.updataReport({
                                open: true,
                                file: this.state.file.filename,
                                kind: "Program-Contains",
                              });
                            }}
                            className="wraprjrj"
                          >
                            <div className=" box-accc">
                              <div className="icon">
                                <AiOutlineStar />
                              </div>
                            </div>
                            <p className="njr">REPORT</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="deaciption-ofthe-program">
                      {this.state.program.description}
                    </div>
                    <Rating
                      people={this.state.program.numberOfPeopleRating}
                      rating={this.state.program.rating}
                    />
                    <div className="name-oftheowner0of-the-workout">
                      <div className="fjjekfke">
                        {this.state.program.publisherId ? (
                          <ProIcon user={this.state.program.publisherId} />
                        ) : (
                          ""
                        )}
                      </div>
                      {this.state.program.publisherId ? (
                        <Username user={this.state.program.publisherId} />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                {this.state.program.published ? (
                  <p className="published rr">Publish</p>
                ) : (
                  <p className="draft rr">Draft</p>
                )}

                <div className="tbd-kfks">
                  <div
                    onClick={() => {
                      this.changetabs(true, false);
                    }}
                    className={`tabs-tonore ${
                      this.state.tabsprogram ? "active" : ""
                    }`}
                  >
                    Content
                  </div>
                  <div
                    onClick={() => {
                      this.changetabs(false, true);
                    }}
                    className={`tabs-tonore ${
                      this.state.reviewtabs ? "active" : ""
                    }`}
                  >
                    Reviews
                  </div>
                </div>

                {this.state.item.length > 0 ? (
                  <Cardmdedia
                    acount={true}
                    tabsprogram={this.state.tabsprogram}
                    item={this.state.item}
                  />
                ) : (
                  ""
                )}

                <div className="wrapproririrjf">
                  <Reviews
                    reviewtabs={this.state.reviewtabs}
                    programId={this.state.program.programId}
                  />
                </div>
              </div>

              <div className="wrpaooeiririfjsj">
                {this.state.program._id ? (
                  <Reviews
                    reviewtabs={this.state.reviewtabs}
                    programId={this.state.program.programId}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        {this.state.program.programId ? (
          <Rate
            updateReview={this.updateReview}
            profile={this.props.user.profile}
            programId={this.state.program.programId}
            username={this.props.user.username}
            userId={this.props.user.userId}
            updateRating={this.updateRating}
            review={this.state.review}
            openRate={this.openRate}
            rate={this.state.rate}
          />
        ) : (
          ""
        )}

        <ShareOption
          handlOpenS={this.handlOpenS}
          handleSetting={this.handleSettingg}
          shareoption={this.state.shareoption}
        />
        <SharePost
          user={this.props.user}
          file={this.state.file}
          handlOpenS={this.handlOpenS}
          sharebox={this.state.sharebox}
          kind={"program"}
        />
        <Report />
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    counterReview: state.counterReview,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateReviews: (data) => {
      dispatch({ type: "UPDATE_REVIEW", value: data });
    },
    updataReport: (data) => {
      dispatch({ type: "UPDATE_REPORT", value: data });
    },
  };
};
export default connect(
  mapstateToProps,
  mapDispatchToProps
)(withRouter(Lookprogram));
