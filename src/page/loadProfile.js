import React, { Component } from "react";
import Nav from "components/nav";
import Search from "components/seach";
import PostCollection from "components/postcollection";
import axios from "axios";
import SharePost from "components/sharepost";
import Boxcollection from "components/boxcollection";
import ShareOption from "components/shareoption";
import { withRouter } from "react-router-dom";
import Report from "components/report";
import LoadingSpin from "components/loadingspin";
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
        <Nav user={this.props.user} />
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
                      <PostCollection
                        handleSetting={this.handleSetting}
                        handlOpen={this.handlOpen}
                        user={this.props.user}
                        openBoxCollection={this.props.openBoxCollection}
                        item={this.state.post}
                      />
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
