import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
class SelctedInterest extends Component {
  state = {
    list: [
      "aerobics",
      "archery",
      "badminton",
      "baseball",
      "basketball",
      "beach volleyball",
      "bodybuilding",
      "boxing",
      "canoeing",
      "cardio",
      "circuit training",
      "climbing",
      "cricket",
      "crossfit",
      "cycling",
      "dance",
      "diving",
      "fencing",
      "football",
      "golf",
      "gymnastics",
      "handball",
      "hiking",
      "HIIT",
      "hockey",
      "horseback riding",
      "jogging",
      "judo",
      "karate",
      "kickboxing",
      "kite surfing",
      "lacrosse",
      "martial arts",
      "mountain biking",
      "paddleboarding",
      "pilates",
      "rock climbing",
      "rowing",
      "rugby",
      "running",
      "sailing",
      "skiing",
      "snowboarding",
      "soccer",
      "softball",
      "squash",
      "surfing",
      "swimming",
      "table tennis",
      "tennis",
      "TRX",
      "ultimate frisbee",
      "volleyball",
      "walking",
      "weightlifting",
      "windsurfing",
      "wrestling",
      "yoga",
      "zumba",
      "full body workout",
      "upper body workout",
      "lower body workout",
      "core workout",
      "abs workout",
      "back workout",
      "chest workout",
      "arm workout",
      "leg workout",
      "glutes workout",
      "shoulder workout",
      "cardio workout",
      "strength training workout",
      "HIIT workout",
      "pilates workout",
      "yoga workout",
      "circuit training workout",
      "bootcamp workout",
      "TRX workout",
      "endurance training",
      "functional training",
      "plyometric training",
      "interval training",
      "speed training",
      "power training",
      "agility training",
      "flexibility training",
      "balance training",
      "crosstraining",
      "cycling classes",
      "spin classes",
      "barre classes",
      "boxing classes",
      "kickboxing classes",
      "yoga classes",
      "pilates classes",
      "dance classes",
      "bootcamp classes",
      "body pump classes",
      "circuit classes",
      "TRX classes",
      "strength and conditioning",
      "weight training",
      "kettlebell training",
      "tabata workout",
      "Tabata classes",
      "calisthenics workout",
      "bodyweight workout",
      "meditation",
      "mindfulness",
      "nutrition",
      "health and wellness",
      "recovery",
      "stretching",
      "foam rolling",
      "yin yoga",
      "restorative yoga",
      "hot yoga",
      "power yoga",
      "vinyasa yoga",
      "ashtanga yoga",
      "Aerobics",
      "Aquatics",
      "Athletics",
      "Badminton",
      "Baseball",
      "Basketball",
      "Bodybuilding",
      "Boxing",
      "Calisthenics",
      "Cardio",
      "Climbing",
      "Cricket",
      "CrossFit",
      "Cycling",
      "Dance",
      "Diving",
      "Equestrian",
      "Fencing",
      "FieldHockey",
      "Football",
      "Golf",
      "Gymnastics",
      "Handball",
      "HIIT",
      "Hiking",
      "Hockey",
      "Judo",
      "Karate",
      "Kickboxing",
      "MartialArts",
      "Meditation",
      "Motorsports",
      "MountainBiking",
      "Netball",
      "Nutrition",
      "Pilates",
      "Powerlifting",
      "Rowing",
      "Rugby",
      "Running",
      "Sailing",
      "Skateboarding",
      "Skiing",
      "Snowboarding",
      "Soccer",
      "Softball",
      "Squash",
      "StrengthTraining",
      "Surfing",
      "Swimming",
      "TableTennis",
      "Taekwondo",
      "TaiChi",
      "Tennis",
      "TrackAndField",
      "Triathlon",
      "Volleyball",
      "Walking",
      "WaterPolo",
      "Weightlifting",
      "Wrestling",
      "Yoga",
      "Zumba",
    ],

    shown: [],
    selected: [],
    item: null,
  };

  handleNext = (data) => {
    if (this.state.selected.length <= 6) {
      let option = {
        accountId: this.props.users.userId,
        tags: this.state.selected,
      };
      axios.post(`/api/save-Interest`, option).then((result) => {
        this.props.UpdateInterest(result.data);
      });
    }
  };

  handleClik = (data) => {
    let listp = [...this.state.selected];
    if (listp.filter((e) => e === data).length > 0) {
      let list = this.state.selected.filter((item) => {
        return item !== data;
      });
      this.setState({
        selected: list,
      });
    } else {
      if (this.state.selected.length <= 5) {
        let list = [...this.state.selected, data];
        this.setState({
          selected: list,
        });
      }
    }
  };
  handlefilter = (e) => {
    let list = this.state.list.map((item) => {
      if (
        item.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
      ) {
        return item;
      } else {
        return "";
      }
    });

    this.setState({
      shown: [...new Set(list.filter(Boolean))],
    });
  };

  componentDidMount = () => {
    this.setState({
      shown: [...new Set(this.state.list)],
    });
  };

  render() {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: `${0.3}s ease` }}
          exit={{ opacity: 0, transform: "translateY(-100%)" }}
          className="wrpannr-rnr"
        >
          <div className="hold-the-subjection">
            <div className="hold-screajd">
              <div className="search-bar-chatrejk">
                <div className="degn-for-chat-ftjdjjr">
                  <i className="fas fa-search"></i>
                </div>
                <input
                  onChange={this.handlefilter}
                  className="find-conrrv"
                  type="text"
                  placeholder="Search Interest..."
                />
              </div>
            </div>
            <div className="holt-the-subsbrri">
              <div className="fjejfjjj">
                <div className="jferof">Select Your Interest:</div>
                <div className="nfjenrj">
                  {this.state.selected?.map((item, index) => {
                    return (
                      <button
                        onClick={() => {
                          this.handleClik(item);
                        }}
                        className={`wraprhjrj `}
                        key={index}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="fjejfjjjejt">
                {this.state.shown?.map((item, index) => {
                  return (
                    <button
                      onClick={() => {
                        this.handleClik(item);
                      }}
                      className={`wraprhjrj ${
                        this.state.selected.some((e) => e === item)
                          ? "active"
                          : ""
                      }`}
                      key={index}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="nexjur-fje">
              <button
                onClick={this.handleNext}
                className={`rj3jejtrjn ${
                  this.state.selected.length >= 6 ? "active" : ""
                }`}
              >
                NEXT
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateInterest: (data) => {
      dispatch({ type: "ADD_TO_INTEREST", data: data });
    },
  };
};

const mapstateToProps = (state) => {
  return {
    users: state.user,
    interest: state.interest,
  };
};
export default connect(mapstateToProps, mapDispatchToProps)(SelctedInterest);
