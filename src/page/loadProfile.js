import React, { Component } from "react";
import Nav from "Components/nav";
import Search from "Components/seach";
import PostCollection from "Components/postcollection";
import axios from "axios";
import SharePost from "Components/sharepost";
import Boxcollection from "Components/boxcollection";
import ShareOption from "Components/shareoption";
import { withRouter } from "react-router-dom";
import Report from "Components/report";
import LoadingSpin from "Components/Loadingspin";
import UserPost from "Components/userPost";
import { BiArrowBack } from "react-icons/bi";
let source;
source = axios.CancelToken.source();
class LoadProfile extends Component {
  state = {
    top: null,
    bottom: null,
    search: false,
    setting: false,
    shareoption: false,
    post: null,
    profile: null,
    file: "",
    sharebox: false,
    loading: true,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }

  handlOpen = (data) => {
    this.setState({
      setting: data,
    });
  };
  handlOpenS = (data) => {
    this.setState({
      sharebox: data,
    });
    this.handleSetting(false, this.state.file);
  };

  handleSetting = (data, file) => {
    this.setState({
      shareoption: data,
      file: file,
    });
  };

  openSearch = (data) => {
    this.setState({
      search: data,
    });
  };

  goBack = (e) => {
    this.props.history.goBack();
  };

  getprofile = (e) => {
    axios
      .get(`/api/profile/${this.props.match.params.id}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data) {
          this.setState({
            loading: false,
            post: this.props.match.params.data,
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      });
  };

  componentDidMount = () => {
    this.getprofile();
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
            <div className="wrper-div-hisjn">
              <div className="notification">
                <div className="feedfjjjjjr-wrosf">
                  <div id="head">
                    <div className="wrieii">
                      <div onClick={this.goBack} className="close-that">
                        <BiArrowBack />
                      </div>
                      <p>Post</p>
                    </div>
                    <div id="nt-mes">
                      <div
                        onClick={() => {
                          this.openSearch(true);
                        }}
                        className="serach-pro"
                      >
                        <i className="fas fa-search"></i>
                      </div>
                    </div>
                  </div>
                  <div className="head-active">
                    <div className="njejkjrmmfsr">
                      <div className="wrieii">
                        <div onClick={this.goBack} className="back-button">
                          <BiArrowBack />
                        </div>
                        <p>Post</p>
                      </div>
                    </div>

                    <div className="wjjijnnff">
                      <div
                        onClick={() => {
                          this.openSearch(true);
                        }}
                        className="open-seach"
                      >
                        <i className="fas fa-search"></i>
                      </div>
                    </div>
                  </div>
                  <div className="rfjkernjk">
                    {this.state.post !== null ? (
                      <UserPost postId={this.state.post} />
                    ) : (
                      ""
                    )}
                  </div>
                  {this.state.loading ? (
                    <div className="bixnknfkfjkjrjr">
                      <LoadingSpin />
                    </div>
                  ) : (
                    ""
                  )}
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
        <ShareOption
          handlOpenS={this.handlOpenS}
          handleSetting={this.handleSetting}
          shareoption={this.state.shareoption}
        />
        <SharePost
          user={this.props.user}
          file={this.state.file}
          handlOpenS={this.handlOpenS}
          sharebox={this.state.sharebox}
          kind={"post"}
        />
        <Boxcollection
          user={this.props.user}
          postId={this.props.postId}
          openBoxCollection={this.props.openBoxCollection}
          boxCollection={this.props.boxCollection}
        />
        <Report />
      </div>
    );
  }
}

export default withRouter(LoadProfile);
