import React, { Component } from "react";
import axios from "axios";
import ProgramBought from "programs/programbougth";
import { connect } from "react-redux";
import Username from "Components/Username";

class SubscriptionBougth extends Component {
  state = {
    list: null,
  };

  getProgram = (e) => {
    axios
      .get(
        `/api/load-my-active-pwo/${this.props.user}/to/${this.props.users.userId}`
      )
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.result)) {
          this.setState({
            list: res.data.result.reverse(),
          });
        } else {
          this.setState({
            program: "no",
          });
        }
      });
  };
  componentDidMount = () => {
    this.getProgram();
  };
  render() {
    return this.state.list !== null ? (
      this.state.list !== "no" ? (
        this.state.list.length > 0 ? (
          <div className="row-0tjhat-hold-theprojhfnnf">
            {this.state.list.map((data, index) => {
              return <ProgramBought programId={data.programId} key={index} />;
            })}
          </div>
        ) : (
          <div className="wraperififoojfhr">
            <div className="wraperjf-ffkfkr">
              <p>No Programs</p>
              <p>The author did not published any program yet</p>
            </div>
          </div>
        )
      ) : (
        ""
      )
    ) : (
      <div className="wraperififoojfhr">
        <div className="wraperjf-ffkfkr">
          <p>No Program</p>
          <p>No program was published at the moment</p>
        </div>
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};
export default connect(mapstateToProps)(SubscriptionBougth);
