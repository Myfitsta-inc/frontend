import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../url";
import LoadingSpin from "../component/loadingspin";
import Username from "../component/username";
import ProgramBought from "../programs/programbougth";
import ProIcon from "../programs/proicon";
import SubscriptionBougth from "../programs/subscriptionbought";
class Unlocked extends Component {
  state = {
    data: null,
  };
  getdata = () => {
    let option = {
      userId: this.props.user.userId,
    };
    axios.post(`/api/get-my-programm`, option).then((res) => {
      if (res.data !== "no") {
        let list = [];
        res.data.data.forEach((item) => {
          let dataS = list.filter((info) => info.authorId === item.authorId);
          if (dataS.length > 0) {
            list.forEach((data) => {
              if (data.authorId === item.authorId) {
                data.list.push(item.programId);
              }
            });
          } else {
            list.push({
              authorId: item.authorId,
              kind: item.kind,
              list: [item.programId],
            });
          }
        });

        this.setState({
          data: list,
        });
      } else {
        this.setState({
          data: "no",
        });
      }
    });
  };

  componentDidMount = () => {
    this.getdata();
  };

  render() {
    return (
      <div className="tabs-that0-hold-the-unclonnfnj">
        {this.state.data !== null ? (
          this.state.data !== "no" ? (
            this.state.data.map((item) => {
              if (item.kind === 1) {
                return (
                  <div
                    className="box-that-that-hold-the-row"
                    key={item.authorId}
                  >
                    <div className="box-that-holdname">
                      <div className="icon-usnrn">
                        <ProIcon user={item.authorId} />
                      </div>
                      <div className="namebox-that-holdname">
                        <Username user={item.authorId} link={true} />
                      </div>
                    </div>
                    <div className="row-0tjhat-hold-theprojhfnnf">
                      {item.list.map((data, index) => {
                        return <ProgramBought programId={data} key={index} />;
                      })}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className="box-that-that-hold-the-row"
                    key={item.authorId}
                  >
                    <div className="box-that-holdname">
                      <div className="icon-usnrn">
                        <ProIcon user={item.authorId} />
                      </div>
                      <div className="namebox-that-holdname">
                        <Username user={item.authorId} link={true} />
                      </div>
                    </div>
                    <SubscriptionBougth user={item.authorId} />
                  </div>
                );
              }
            })
          ) : (
            <div className="wraperififoojfhr">
              <div className="wraperjf-ffkfkr">
                <p>No Subsciption or Programs</p>
                <p>
                  When you subscribe to someone or buy a program, You will be
                  able to acces it here
                </p>
              </div>
            </div>
          )
        ) : (
          <div className="bixnknfkfjkjrjr">
            <LoadingSpin />
          </div>
        )}
      </div>
    );
  }
}
export default Unlocked;
