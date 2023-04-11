import React, { Component } from "react";
import axios from "axios";
import apiUrl from "apiUrl/url";
import { AiOutlineSearch } from "react-icons/ai";
import LoadingSpin from "./loadingspin";
import { InView } from "react-intersection-observer";
import IconProfile from "./iconpicture";
import Username from "./username";
import { motion } from "framer-motion";
import Subinfo from "./subinfo";
import ButtonFollow from "./buttonFollow";
class SubscriberList extends Component {
  state = {
    list: null,
    loading: false,
    numberToLoad: 10,
    value: "myfitsta",
  };
  loadPeople = (number) => {
    this.setState({
      loading: true,
    });
    axios
      .get(
        `/api/load-my-subscriber/${this.props.user}/${this.state.value}/${number}`
      )
      .then((result) => {
        if (result.data !== "no") {
          this.setState({
            loading: false,
            list: result.data,
          });
        }
      });
  };

  checkLoad = (data) => {
    if (data ) {
      if (this.state.loading === false) {
        this.setState(
          {
            numberLoad: this.state.numberLoad + 10,
          },
          () => {
            this.loadPeople(this.state.numberToLoad);
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
          this.loadPeople(this.state.numberToLoad);
        }
      );
      this.loadPeople(e.target.value, this.state.numberLoad);
    } else {
      this.setState(
        {
          value: "myfitsta",
        },
        () => {
          this.loadPeople(this.state.numberToLoad);
        }
      );
    }
  };

  componentDidMount = () => {
    this.loadPeople(this.state.numberToLoad);
  };
  render() {
    return (
      <div className="hilt-thenrjfenjsfjnn">
        <div className="hold-theseachffur">
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
            {this.state.loading  ? (
              <div className="cnjrrjrn">
                <LoadingSpin />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="rwfhjghjtth">
          {this.state.list !== null ? (
            this.state.list !== "no" ? (
              this.state.list?.map((item, index) => {
                return (
                  <motion.div
                    layout
                    className="wrprtit-peoplrkr"
                    key={item.subScriberId}
                  >
                    {this.state.list.length === index + 1 ? (
                      <InView
                        className="jkrikskfjjr"
                        onChange={(inView, entry) => this.checkLoad(inView)}
                      >
                        <div className="jkrikskfjjr">
                          <div className="iconnf">
                            <IconProfile user={item.subScriberId} />
                          </div>
                          <div className="wirjsjjfkkfkf">
                            <Username link={true} user={item.subScriberId} />
                            {/*<Subinfo user={item.subScriberId} />*/}
                          </div>
                        </div>
                      </InView>
                    ) : (
                      <div className="jkrikskfjjr">
                        <div className="iconnf">
                          <IconProfile user={item.subScriberId} />
                        </div>
                        <div className="wirjsjjfkkfkf">
                          <Username link={true} user={item.subScriberId} />
                          {/*<Subinfo user={item.subScriberId} />*/}
                        </div>
                      </div>
                    )}

                    <div className="wrsokf">
                      <ButtonFollow friend={item.subScriberId} />
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="tnntntn">
                <p>No Subscriber Yet</p>
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
export default SubscriberList;
