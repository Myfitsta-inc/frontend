import React, { Component } from "react";
import { FaRegClone } from "react-icons/fa";
import axios from "axios";
import Username from "Components/Username";
import LoadingSpin from "Components/Loadingspin";
import IconProfile from "Components/Iconpicture";
import { GoPlus } from "react-icons/go";
import LikeButton from "Components/likeButton";
import VideoPost from "Components/videopost";
import Nav from "Components/nav";
import apiUrl from "apiUrl/url";
import { BiArrowBack } from "react-icons/bi";
import Navtop from "Components/navtop";
import Navbom from "Components/navbom";
import Boxcollection from "Components/boxcollection";
import UpdateDiscover from "Components/updatediscover";
import "style/discover.css";
import DropHomeUp from "Components/dropHomeUp";
import { InView } from "react-intersection-observer";
import { Link, withRouter } from "react-router-dom";
let source;
source = axios.CancelToken.source();
class Discover extends Component {
  state = {
    id: "",
    post: [],
    numberLoad: 10,
    loading: false,
  };
  handloption = (data) => {
    this.setState({
      drop: data,
    });
  };

  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  loadGalery = (number) => {
    this.setState({
      loading: true,
    });
    axios
      .get(
        `/api/discover-tags/${this.state.id.replace("#", "")}/${
          this.props.user.userId
        }/${number}`,
        { cancelToken: source.token }
      )
      .then((res) => {
        this.setState({
          loading: false,
        });
        let list = [];
        res.data.forEach((element) => {
          element.engagementScore =
            element.numberOfComments * element.numberOfLikes;
          list.push(element);
        });
        let updated = list.sort((a, b) => {
          return parseInt(b.engagementScore) - parseInt(a.engagementScore);
        });
        this.setState({
          post: updated,
        });
      });
  };

  nFormatter = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

  handleSeach = (e) => {
    if (e.target.value.length > 0) {
      this.setState({ id: e.target.value }, () => {
        this.loadGalery(this.state.numberLoad);
      });
    } else {
      this.setState({ id: "All kind" }, () => {
        this.loadGalery(this.state.numberLoad);
      });
    }
  };
  checkLoad = (data) => {
    if (data) {
      if (this.state.loading === false) {
        this.setState({
          numberLoad: this.state.numberLoad + 10,
        });
        this.loadGalery(this.state.numberLoad);
      }
    }
  };
  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.setState(
        {
          id: this.props.match.params.id,
        },
        () => {
          this.loadGalery(this.state.numberLoad);
        }
      );
    } else {
      this.setState(
        {
          id: "All kind",
        },
        () => {
          this.loadGalery(this.state.numberLoad);
        }
      );
    }
  };
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id) {
      if (this.state.id !== this.props.match.params.id) {
        this.setState({ id: this.props.match.params.id }, () => {
          this.loadGalery(this.state.numberLoad);
        });
      }
    }
  }
  goBack = (e) => {
    this.props.history.goBack();
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
            <div id="search">
              <div className="head-diss">
                <div onClick={this.goBack} className="close-that">
                  <BiArrowBack />
                </div>
                <p className="dirs">Discover</p>
              </div>
              <div className="head-dis">
                <p className="dis">Discover</p>
                <UpdateDiscover loadGalery={this.loadGalery} />
              </div>
              <div className="box-seach-result">
                <div className="reseult-sceach"></div>
              </div>
              <div className="wraperrrfnnf-efnv">
                {this.state.post.length > 0 ? (
                  <div className="contiantien-post">
                    {this.state.post?.map((post, index) => {
                      if (this.state.post.length === index + 1) {
                        return (
                          <div key={post._id} className="box-media-box">
                            {post.mediaDetails.length > 1 ? (
                              <div className="box-thjjsjjjr">
                                <FaRegClone />
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="box-that-hold-the-media">
                              <div className="wraorjrkncnfrh">
                                {post.mediaDetails[0].mimetype.includes(
                                  "image"
                                ) ? (
                                  <img
                                    src={`${apiUrl.content}${post.mediaDetails[0].key}`}
                                    loading="lazy"
                                  />
                                ) : (
                                  <VideoPost src={post.mediaDetails[0].key} />
                                )}
                              </div>
                            </div>
                            <div className="info-about-the-person">
                              <div className="ifinsfkifkr">
                                <div className="icon-of-people">
                                  <IconProfile live={true} user={post.userId} />
                                </div>
                                <div className="particular-info-about-the-person">
                                  <Username user={post.userId} />
                                </div>
                              </div>

                              <div className="pjdjj"></div>
                            </div>
                            <Link
                              className="rj0ojrj-rjosl"
                              to={`/dis/${post._id}`}
                            ></Link>

                            <InView
                              onChange={(inView, entry) =>
                                this.checkLoad(inView)
                              }
                            ></InView>
                          </div>
                        );
                      } else {
                        return (
                          <div className="box-media-box" key={post._id}>
                            {post.mediaDetails.length > 1 ? (
                              <div className="box-thjjsjjjr">
                                <FaRegClone />
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="box-that-hold-the-media">
                              <div className="wraorjrkncnfrh">
                                {post.mediaDetails[0].mimetype.includes(
                                  "image"
                                ) ? (
                                  <img
                                    src={`${apiUrl.content}${post.mediaDetails[0].key}`}
                                    loading="lazy"
                                  />
                                ) : (
                                  <VideoPost src={post.mediaDetails[0].key} />
                                )}
                              </div>
                            </div>
                            <div className="info-about-the-person">
                              <div className="ifinsfkifkr">
                                <div className="icon-of-people">
                                  <IconProfile live={true} user={post.userId} />
                                </div>
                                <div className="particular-info-about-the-person">
                                  <Username user={post.userId} />
                                </div>
                              </div>

                              <div className="pjdjj">
                                {/* <div className="wrp-actt">
                                  <LikeButton
                                    userId={this.props.user.userId}
                                    mediaDetails={post.mediaDetails}
                                    numberOfLikes={post.numberOfLikes}
                                  />
                                  <Link
                                    className="rjetrjjrj"
                                    to={`/comment/${post._id}`}
                                  >
                                    <div className="icon">
                                      <i className="far fa-comment"></i>
                                    </div>
                                    <p>
                                      {this.nFormatter(post.numberOfComments)}
                                    </p>
                                  </Link>
                                </div> */}
                              </div>
                            </div>
                            <Link
                              className="rj0ojrj-rjosl"
                              to={`/dis/${post._id}`}
                            ></Link>
                            {/* <button
                              onClick={() => {
                                this.props.openBoxCollection(true, post._id);
                              }}
                              className="alodjrr"
                            >
                              <GoPlus />
                            </button> */}
                          </div>
                        );
                      }
                    })}
                  </div>
                ) : (
                  ""
                )}
                {this.state.loading ? (
                  <div className="bixnknfkfjkjrjr">
                    <LoadingSpin />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <Navtop />
            <Navbom handloption={this.handloption} />
            <Boxcollection
              user={this.props.user}
              postId={this.props.postId}
              openBoxCollection={this.props.openBoxCollection}
              boxCollection={this.props.boxCollection}
            />
          </div>
        </div>
        {this.state.drop ? (
          <DropHomeUp handloption={this.handloption} drop={this.state.drop} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(Discover);
