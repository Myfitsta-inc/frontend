import React, { Component } from "react";
import axios from "axios";
import SuggectionBox from "./suggectionbox";
import ButtonFollow from "./ButtonFollow";
import IconProfile from "./Iconpicture";
import LoadingSpin from "./Loadingspin";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import Username from "./Username";
import { InView } from "react-intersection-observer";
import { AiOutlineSearch } from "react-icons/ai";
class Follower extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      follower: null,
      original: null,
      loading: false,
      numberToLoad: 10,
      value: "myfitsta",
    };
  }

  seachPeopple = (number) => {
    this.setState({
      loading: true,
    });
    axios
      .get(`/api/Myfollowers/${this.props.user}/${this.state.value}/${number}`)
      .then((result) => {
        this.setState({
          loading: false,
          follower: result.data,
        });
      });
  };
  checkLoad = (data) => {
    if (data) {
      if (this.state.loading === false) {
        this.setState(
          {
            numberLoad: this.state.numberLoad + 10,
          },
          () => {
            this.seachPeopple(this.state.numberToLoad);
          }
        );
      }
    }
  };
  handleFind = (e) => {
    if (e.target.value.trim().length > 0) {
      this.setState(
        {
          value: e.target.value,
        },
        () => {
          this.seachPeopple(this.state.numberToLoad);
        }
      );
      this.seachPeopple(e.target.value, this.state.numberLoad);
    } else {
      this.setState(
        {
          value: "myfitsta",
        },
        () => {
          this.seachPeopple(this.state.numberToLoad);
        }
      );
    }
  };
  componentDidMount = () => {
    this.seachPeopple(this.state.numberToLoad);
  };

  render() {
    return (
      <div className="wraprtr-thos-foloeor">
        <div className="hold-theseachffur">
          {this.state.follower !== null ? (
            this.state.follower !== "no" ? (
              <div className="screachfjjjoorjj">
                <div className="iconrjrnr">
                  <AiOutlineSearch />
                </div>
                <input
                  onChange={this.handleFind}
                  className="class-inoputoe"
                  placeholder="Seach..."
                  type="text"
                />
                {this.state.loading ? (
                  <div className="cnjrrjrn">
                    <LoadingSpin />
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
        <div className="tharjrngnjfjfj">
          {this.state.follower !== null ? (
            this.state.follower !== "no" ? (
              this.state.follower?.map((item, index) => {
                if (this.state.follower.length === index + 1) {
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="wrprtit-peoplrkr"
                      key={item.followerId}
                    >
                      <InView
                        onChange={(inView, entry) => this.checkLoad(inView)}
                        className="jkrikskfjjr"
                      >
                        <div className="jkrikskfjjr">
                          <div className="iconnf">
                            <IconProfile user={item.followerId} />
                          </div>
                          <div className="wirjsjjfkkfkf">
                            <Username link={true} user={item.followerId} />
                          </div>
                        </div>
                      </InView>

                      <div className="wrsokf">
                        <ButtonFollow
                          user={this.props.user}
                          friend={item.followerId}
                        />
                      </div>
                    </motion.div>
                  );
                } else {
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="wrprtit-peoplrkr"
                      key={item.followerId}
                    >
                      <div className="jkrikskfjjr">
                        <div className="iconnf">
                          <IconProfile user={item.followerId} />
                        </div>
                        <div className="wirjsjjfkkfkf">
                          <Username link={true} user={item.followerId} />
                        </div>
                      </div>
                      <div className="wrsokf">
                        <ButtonFollow
                          user={this.props.user}
                          friend={item.followerId}
                        />
                      </div>
                    </motion.div>
                  );
                }
              })
            ) : (
              <div className="werptort">
                <div className="tnntntn">
                  <p>No Follower Yet</p>
                </div>
                <div className="wrapoririir">
                  <SuggectionBox />
                </div>
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
const mapstateToProps = (state) => {
  return {
    users: state.user,
    usernameLists: state.usernameLists,
  };
};
export default connect(mapstateToProps)(Follower);
