import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import { BiCheck } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import IconProfile from "../component/iconpicture";
import Username from "../component/username";
import ApiUrl from "../url";

class AddParticipant extends Component {
  state = {
    selected: [],
    members: [],
    loading: false,
  };

  addMembers = () => {
    if (this.state.selected.length > 0) {
      let option = {
        conversationId: this.props.group,
        members: this.state.selected,
      };
      axios.post(`/api/add-members`, option).then((result) => {
        this.props.handleaddParti();
      });
    }
  };

  selectedpeople = (e, data) => {
    let listp = [...this.state.selected];
    if (listp.filter((e) => e.userId === data.userId).length > 0) {
      let list = this.state.selected.filter((item) => {
        return item.userId !== data.userId;
      });
      this.setState({
        selected: list,
      });
    } else {
      let list = [...this.state.selected, data];
      this.setState({
        selected: list,
      });
    }
  };

  seachPeopple = (event) => {
    if (event.target.value.trim().length > 0) {
      axios
        .get(`/api/profilename/${event.target.value}`, {
          withCredentials: true,
        })
        .then((res) => {
          this.setState({
            people: res.data,
          });
        });
    } else {
      this.setState({
        people: [],
      });
    }
  };

  componentDidMount = () => {
    console.log();
  };
  render() {
    return (
      <div className="wjfntjnntt-opver">
        <div className="dnjnnngjkfj">
          <div className="cresjfjf">
            <button onClick={this.props.handleaddParti} className="close-that">
              {" "}
              <IoCloseSharp />
            </button>
            <p>Add Members</p>
          </div>
          <div className="screachfjjjoorjj">
            <div className="iconrjrnr">
              <AiOutlineSearch />
            </div>
            <input
              onChange={this.seachPeopple}
              className="class-inoputoe"
              placeholder="Seach..."
              type="text"
            />
          </div>
          <div className="dnjggjjgjjgg">
            <div className="hold-people-thst-hold-itj">
              {this.state.selected?.map((item) => {
                if (item.userId !== this.props.user.userId) {
                  return (
                    <div className="people-iconfjjnrn " key={item.userId}>
                      <div className="hold-the-icon">
                        <IconProfile user={item.userId} />
                      </div>
                      <Username user={item.userId} />
                      <div
                        onClick={(e) => {
                          this.selectedpeople(e, { userId: item.userId });
                        }}
                        className="hold-the-icon gjtjt"
                      >
                        <IoCloseSharp />
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="box-that-reajfjjjrjrnjttf">
              {this.state.people?.map((item) => {
                return this.props.group.members.some(
                  (data) => data.userId === item.userId
                ) ? (
                  <div className={`list-peopkojr active `} key={item._id}>
                    <div className="inforisjjofjjr">
                      <IconProfile user={item.userId} />
                    </div>
                    <div className="ksiiriijr">
                      <Username user={item.userId} />
                      <div className="fifiiioi">
                        <p className="rjri">is already a members</p>
                      </div>
                    </div>
                    <div className="inforisjjorfjjr">
                      <p className="pinntjsjdjj">
                        <BiCheck />
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={(e) => {
                      this.selectedpeople(e, { userId: item.userId });
                    }}
                    className={`list-peopkojr ${
                      this.state.selected.some((e) => e.userId === item.userId)
                        ? "active"
                        : ""
                    } `}
                    key={item._id}
                  >
                    <div className="inforisjjofjjr">
                      <IconProfile user={item.userId} />
                    </div>
                    <div className="ksiiriijr">
                      <Username user={item.userId} />
                    </div>
                    <div className="inforisjjorfjjr">
                      <p className="pinntjsjdjj">
                        <BiCheck />
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rhhjiushhf">
            <button onClick={this.addMembers} className="add-shch">
              Add Participants
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AddParticipant);
