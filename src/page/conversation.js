import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Nav from "Components/nav";
import ProfilePromessage from "Components/profilepromessage";
import axios from "axios";
import apiUrl from "apiUrl/url";
import ProgramMessage from "Components/programMessage";
import ConversationDetail from "Components/conversationdetail";
import ConversationList from "Components/conversation";
import { BsFillInfoCircleFill } from "react-icons/bs";
import VideoMessage from "Components/videomessage";
import Username from "Components/Username";
import IconProfile from "Components/Iconpicture";
import { IoSendSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import ImageMessage from "Components/imagemessage";
import Profilemessage from "Components/profilemessage";
import PostMessage from "Components/postmessage";
import LoadingSpin from "Components/Loadingspin";
import MessageCon from "Components/messagecon";
import socket from "socketConfig";
import { connect } from "react-redux";
let source;
source = axios.CancelToken.source();
class Conversation extends Component {
  state = {
    inbox: [],
    friend: {},
    id: "",
    conversation: [],
    message: "",
    open: false,
    block: null,
    loading: false,
    loader: false,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  handlefile = (event) => {
    let file = event.target.files;
    if (file[0].type.includes("image")) {
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("userId", this.props.user.userId);
      formData.append("friend", this.props.match.params.id);
      formData.append("kind", file[0].type);
      axios.post(`/api/save-image-or-video-message`, formData).then((res) => {
        if (res.data._id) {
          let listt = [...this.props.inbox];
          let foundIndex = listt.findIndex(
            (x) => x.userId === this.props.match.params.id
          );
          if (foundIndex) {
            let message = this.props.inbox[foundIndex];
            message.data = Date.now();
            listt[foundIndex] = message;
            let sorted = listt.sort((a, b) => {
              return parseInt(b.data) - parseInt(a.data);
            });

            this.props.updateInbox(sorted);
          }
          let message = res.data.message[res.data.message.length - 1];
          let list = [...this.state.conversation, message];
          message.friend = this.props.match.params.id;
          socket.emit("new-message", message);
          socket.emit("run-that-conversation", [
            this.props.users.userId,
            this.props.match.params.id,
          ]);
          this.setState({
            message: "",
          });
          document.querySelector(".hold-message").innerText = "";
          document.querySelector(".hold-message").focus();
        } else {
        }
      });
    }
  };

  goBack = (e) => {
    this.props.history.goBack();
  };
  handleDetail = (data) => {
    this.setState({
      open: data,
    });
  };
  renderConversation = () => {
    this.setState({
      loading: true,
    });
    axios
      .get(
        `/api/their-conversation/${this.state.friend.conversationId}/${this.props.user.userId}/${this.props.match.params.id}`,
        { cancelToken: source.token }
      )
      .then((res) => {
        if (res.data.block) {
          this.setState({
            loader: true,
            loading: false,
            block: true,
          });
        } else {
          this.setState({
            loader: true,
            loading: false,
            block: false,
          });
          if (res.data !== "no") {
            res.data.result.forEach((element) => {
              element.message.forEach((item) => {
                let list = [...this.state.conversation, item];
                this.setState({
                  loader: true,
                  loading: false,
                  conversation: list,
                });
              });
            });
          } else {
            this.setState({
              loader: true,
              loading: false,
            });
          }
        }
      });
  };

  handleRemove = (id) => {
    let list = this.state.conversation.filter((item) => item._id !== id);
    this.setState({
      conversation: list,
    });
  };

  handleblock = (data) => {
    this.setState({
      block: data,
    });
  };

  getFriend = (e) => {
    this.setState({
      conversation: [],
    });
    axios
      .get(
        `/api/getinfocon/${this.props.user.userId}/with/${this.props.match.params.id}`,
        { cancelToken: source.token }
      )
      .then((res) => {
        if (res.data.block) {
          this.setState({
            friend: { userId: res.data.userId },
            block: true,
          });
        } else {
          this.setState({
            block: false,
          });
          if (res.data !== "no") {
            this.setState({
              friend: res.data,
              conversation: [],
            });
            if (res.data.conversationId.length > 0) {
              this.renderConversation();
            }
            this.setState({
              inbox: [],
            });
          } else {
            this.props.history.push("/message");
          }
        }
      });
  };

  componentDidMount = (e) => {
    this.getFriend();
    this.messageConnection();
    this.setState({ id: this.props.match.params.id });
  };

  addMessage = (event) => {
    this.setState({
      message: event.target.innerText,
    });
  };

  sendmessage = (event) => {
    if (this.state.message.length > 0) {
      let option = {
        userId: this.props.user.userId,
        friend: this.props.match.params.id,
        message: {
          sender: this.props.user.userId,
          content: this.state.message,
          kind: "message",
        },
      };
      axios.post(`/api/new-message`, option).then((res) => {
        if (res.data._id) {
          let message = res.data.message[res.data.message.length - 1];
          message.friend = this.props.match.params.id;
          socket.emit("new-message", message);
          this.setState({
            message: "",
          });
          document.querySelector(".hold-message").innerText = "";
          document.querySelector(".hold-message").focus();
        } else {
        }
      });
    }
  };

  messageConnection = () => {
    socket.on("your-new-message", (data) => {
      if (
        data.sender === this.props.match.params.id ||
        data.sender === this.props.user.userId
      ) {
        let listt = [...this.props.inbox];
        let foundIndex = listt.findIndex(
          (x) => x.userId === this.props.match.params.id
        );
        if (foundIndex) {
          let message = JSON.parse(
            JSON.stringify(this.props.inbox[foundIndex])
          );
          message.data = Date.now();
          listt[foundIndex] = message;
          let sorted = listt.sort((a, b) => {
            return parseInt(b.data) - parseInt(a.data);
          });
          this.props.updateInbox(sorted);
        }

        let list = [...this.state.conversation, data];
        this.setState({
          conversation: list,
        });
      }
    });
  };

  componentDidUpdate(prevProps) {
    if (this.state.id !== this.props.match.params.id) {
      this.getFriend();
      this.setState({ id: this.props.match.params.id, loader: false });
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
          <div id="body-tabss">
            <div className="mesage-box-sessiinon">
              <ConversationList data={true} user={this.props.user} />
              <div className="conversation-seesion-box">
                <div className="bandadat-toshownp-profile">
                  <div onClick={this.goBack} className="close-that">
                    <BiArrowBack />
                  </div>
                  <div className="showhis-pp">
                    {this.state.friend.userId ? (
                      <IconProfile user={this.state.friend.userId} />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="show-his-her-name">
                    <div className="rkfjrkfmffn">
                      {this.state.friend.userId ? (
                        <Username user={this.state.friend.userId} />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      this.handleDetail(true);
                    }}
                    className="infoitjfj"
                  >
                    <BsFillInfoCircleFill />
                  </div>
                </div>

                <div
                  className={`box-hold-convertion  ${
                    this.state.loader ? "active" : ""
                  } `}
                >
                  {this.state.loading ? (
                    <div className="bixnknfkfjkjrjr">
                      <LoadingSpin />
                    </div>
                  ) : (
                    ""
                  )}
                  {this.state.block === false
                    ? this.state.conversation?.map((item) => {
                        return (
                          <div
                            key={item._id}
                            className={`${
                              item.sender === this.props.user.userId
                                ? "box-other-me"
                                : "box-other-freind"
                            }`}
                          >
                            {item.sender === this.props.user.userId ? (
                              ""
                            ) : (
                              <div className="box-that-holf-theico">
                                <IconProfile user={item.sender} />
                              </div>
                            )}
                            {item.kind === "message" ? (
                              <MessageCon
                                handleRemove={this.handleRemove}
                                message={item}
                              />
                            ) : item.kind === "post" ? (
                              <PostMessage
                                handleRemove={this.handleRemove}
                                item={item}
                              />
                            ) : item.kind === "profile" ? (
                              <Profilemessage
                                handleRemove={this.handleRemove}
                                item={item}
                              />
                            ) : item.kind === "program" ? (
                              <ProgramMessage
                                handleRemove={this.handleRemove}
                                item={item}
                              />
                            ) : item.kind === "profilepro" ? (
                              <ProfilePromessage
                                handleRemove={this.handleRemove}
                                item={item}
                              />
                            ) : item.kind.includes("image") ? (
                              <ImageMessage
                                handleRemove={this.handleRemove}
                                item={item}
                              />
                            ) : item.kind.includes("video") ? (
                              <VideoMessage
                                handleRemove={this.handleRemove}
                                item={item}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      })
                    : ""}
                  {this.state.block ? (
                    <div className="wraperififoojfhr">
                      <div className="wraperjf-ffkfkr">
                        <p>You block this account</p>
                        <p>
                          Share with your community your best workout or fitness
                          activity
                        </p>
                        <div className="wraper-thejr">
                          <button className="dijroooeo">Deblock</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {this.state.block !== null ? (
                  this.state.block === false ? (
                    <div className="type-message-box">
                      <div className="watpr-contnr-mem">
                        <div className="wrappe-mmeshe">
                          {/* <div className="send-hold  fnjjrjr butieh">
                            <button>
                              <label htmlFor="file-profilee">
                                <AiOutlinePlus />
                              </label>
                              <input
                                onChange={this.handlefile}
                                id="file-profilee"
                                type="file"
                                accept="image/x-png,image/gif,image/jpeg"
                              />
                            </button>
                          </div> */}
                          <div
                            contentEditable="true"
                            onKeyUp={this.addMessage}
                            data-placeholder="Type a message..."
                            className="hold-message noped"
                          ></div>
                          <div className="send-hold fnjjrjr">
                            <button onClick={this.sendmessage}>
                              <IoSendSharp />
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
                {this.state.open ? (
                  <ConversationDetail
                    handleblock={this.handleblock}
                    block={this.state.block}
                    handleDetail={this.handleDetail}
                    open={this.state.open}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    users: state.user,
    inbox: state.inbox,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateInbox: (data) => {
      dispatch({ type: "UPDATE_INBOX", value: data });
    },
  };
};
export default connect(
  mapstateToProps,
  mapDispatchToProps
)(withRouter(Conversation));
