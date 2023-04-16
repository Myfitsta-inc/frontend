import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "style/program.css";
import ShareOption from "Components/shareoption";
import SharePost from "Components/sharepost";
import Publish from "Components/publish";
import Nav from "Components/nav";
import { AiOutlineStar } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import Cardmdedia from "Components/cardmedia";
import axios from "axios";
import apiUrl from "apiUrl/url";
import Rate from "Components/rate";
import Report from "Components/report";
import UploadInProgram from "Components/uploadProgram";
import Editprogram from "Components/editProgram";
import VideoProgram from "Components/videoProgram";
import { MdModeEdit } from "react-icons/md";
import DeleteProgram from "Components/deleteProgram";
import { BiArrowBack, BiRocket } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { connect } from "react-redux";
import Reviews from "Components/reviews";
let source;
source = axios.CancelToken.source();
class Myprogram extends Component {
  state = {
    setting: false,
    upload: false,
    edit: false,
    program: {},
    item: [],
    save: false,
    published: false,
    rate: false,
    review: 0,
    tabsprogram: true,
    reviewtabs: false,
    shareoption: false,
    file: "",
    sharebox: false,
    counter: 0,
    deleteProgram: false,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  handleSettingg = (data) => {
    this.setState({
      shareoption: data,
    });
  };

  optionchangeP = (data) => {
    this.setState({
      deleteProgram: data,
    });
  };
  handlOpenS = (data) => {
    this.setState({
      sharebox: data,
    });
    this.handleSettingg(false);
  };

  goBack = (e) => {
    this.props.history.goBack();
  };

  changetabs = (one, two) => {
    this.setState({
      tabsprogram: one,
      reviewtabs: two,
    });
  };
  updateRating = (data) => {
    this.setState({
      review: data,
    });
  };

  openRate = (data) => {
    this.setState({
      rate: data,
      setting: false,
    });
  };

  updateReview = () => {
    this.props.updateReviews(this.props.counterReview + 1);
    this.setState({
      //counter: this.state.counter + 1
    });
  };

  changePublichState = () => {
    let program = this.state.program;
    program.published = !this.state.program.published;
    this.setState({
      program: program,
    });
  };

  handlepublish = (data) => {
    this.setState({
      published: data,
      setting: false,
    });
  };
  getProgramInfo = (e) => {
    axios
      .get(`/api/program/${this.props.match.params.id}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.programId) {
          this.setState({
            program: res.data,
            file: res.data.programId,
          });
          this.looadProgram();
        } else {
          this.props.history.push("/myfitstapro");
        }
      });
  };

  looadProgram = () => {
    axios
      .get(
        `/api/loaddMyProgramContainer/${this.state.program.programId}/${this.props.user.userId}`,
        { cancelToken: source.token }
      )
      .then((res) => {
        if (res.data) {
          if (res.data[0].publisherId) {
            this.setState({
              item: res.data.reverse(),
            });
          } else {
          }
        }
      });
  };

  handlOpen = (data) => {
    this.setState({
      setting: false,
      edit: data,
    });
  };
  handlUpload = (data) => {
    this.setState({
      setting: false,
      upload: data,
    });
  };

  handleSetting = (data) => {
    this.setState({
      setting: data,
    });
  };

  componentDidMount = (e) => {
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
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabs">
            <div className="wraper-it-baom">
              <div className="hold-the-program-information">
                <div className="title-of-prodf">
                  <div className="wror-wrr">
                    <div onClick={this.goBack} className="close-that">
                      <BiArrowBack />
                    </div>
                    <p className="tti-rhe">Program</p>
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
                            onClick={() => this.handlOpen(true)}
                            className="wraprjrj"
                          >
                            <div className=" box-accc">
                              <div className="icon">
                                <MdModeEdit />
                              </div>
                            </div>
                            <p className="njr">EDIT</p>
                          </div>

                          <div
                            onClick={() => this.handlUpload(true)}
                            className="wraprjrj"
                          >
                            <div className=" box-accc">
                              <div className="icon">
                                <FiUpload />
                              </div>
                            </div>
                            <p className="njr">UPLOAD</p>
                          </div>

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

                          <div
                            onClick={() => this.handlepublish(true)}
                            className="wraprjrj"
                          >
                            <div className=" box-accc">
                              <div className="icon">
                                <BiRocket />
                              </div>
                            </div>
                            <p className="njr">PUBLISH</p>
                          </div>

                          <div
                            onClick={() => {
                              this.optionchangeP(true);
                            }}
                            className="wraprjrj"
                          >
                            <div className=" box-accc">
                              <div className="icon">
                                <AiFillDelete />
                              </div>
                            </div>
                            <p className="njr">DELETE</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="deaciption-ofthe-program">
                      {this.state.program.description}
                    </div>

                    <div className="name-oftheowner0of-the-workout">
                      {this.state.program.author}
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

                {this.state.item !== null ? (
                  this.state.item.length > 0 ? (
                    <Cardmdedia
                      tabsprogram={this.state.tabsprogram}
                      item={this.state.item}
                    />
                  ) : this.state.tabsprogram ? (
                    <div className="wisiffii">
                      <div className="wraperififoojfhr">
                        <div className="wraperjf-ffkfkr">
                          <p>No Content</p>
                          <p>Upload your program content</p>
                          <div className="wraper-thejr">
                            <button
                              onClick={() => this.handlUpload(true)}
                              className="dijroooeo"
                            >
                              Upload
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}

                <div className="wrapproririrjf">
                  <Reviews
                    counter={this.state.counter}
                    reviewtabs={this.state.reviewtabs}
                    programId={this.state.program.programId}
                  />
                </div>
              </div>

              <div className="wrpaooeiririfjsj">
                <Reviews
                  counter={this.state.counter}
                  reviewtabs={this.state.reviewtabs}
                  programId={this.state.program.programId}
                />
              </div>
            </div>
          </div>
        </div>

        {this.state.program.programId ? (
          this.state.edit ? (
            <Editprogram
              getProgramInfo={this.getProgramInfo}
              handlepublish={this.handlepublish}
              handlOpen={this.handlOpen}
              program={this.state.program}
              edit={this.state.edit}
              user={this.props.user}
            />
          ) : (
            ""
          )
        ) : (
          ""
        )}
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

        {this.state.upload ? (
          this.state.upload ? (
            <UploadInProgram
              looadProgram={this.looadProgram}
              handlUpload={this.handlUpload}
              program={this.state.program}
              user={this.props.user}
              upload={this.state.upload}
            />
          ) : (
            ""
          )
        ) : (
          ""
        )}
        {this.state.program.programId ? (
          this.state.published ? (
            <Publish
              changePublichState={this.changePublichState}
              content={this.state.item}
              item={this.state.program}
              title={this.state.program.title}
              description={this.state.program.description}
              type={this.state.program.programType}
              price={this.state.program.price}
              handlepublish={this.handlepublish}
              published={this.state.published}
            />
          ) : (
            ""
          )
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
        <DeleteProgram
          program={this.state.program}
          deleteProgram={this.state.deleteProgram}
          optionchangeP={this.optionchangeP}
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
      dispatch({ type: "UPDATE_REVIEW", data: data });
    },
  };
};
export default connect(
  mapstateToProps,
  mapDispatchToProps
)(withRouter(Myprogram));
