import React, { Component } from "react";
import axios from "axios";
import Subinfo from "./subinfo";
import { InView } from "react-intersection-observer";
import LoadingSpin from "./Loadingspin";
import Interest from "./sugestionInterest";
import { IoCloseSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import Username from "./Username";
import IconProfile from "./Iconpicture";
import SearchAccount from "./searchAccount";
class Search extends Component {
  state = {
    people: null,
    loading: true,
    tabs: false,
    loadPeople: 5,
    query: "",
  };
  swicthTab = (data) => {
    this.setState({
      tabs: data,
    });
  };

  removerecent = (e, data) => {
    let target = e.currentTarget;
    let option = {
      userId: this.props.user.userId,
      accountId: data,
    };
    axios.post("/api/removeRecentprofile", option).then((res) => {
      let list = this.state.people.filter((item) => {
        return item.userId != data;
      });
      this.setState({
        people: list,
      });
    });
  };

  loadMore = (data) => {
    if (data) {
      this.setState(
        {
          loadPeople: this.state.loadPeople + 5,
        },
        () => {
          if (this.state.query.length > 0) {
            this.filerLoad(this.state.query);
          }
        }
      );
    }
  };
  filerLoad = (data) => {
    if (data.trim().length > 0) {
      this.setState({
        loadPeople: 5,
        query: data.trim(),
      });
      axios
        .get(`/api/profilename/${data}/${this.state.loadPeople}`, {
          withCredentials: true,
        })
        .then((res) => {
          this.setState({
            people: res.data,
          });
        })
        .catch((err) => {
          return;
        });
    } else {
      this.setState(
        {
          query: "",
          people: [],
        },
        () => {
          this.recent();
        }
      );
    }
  };
  filterbar = (event) => {
    if (event.target.value.trim().length > 0) {
      this.setState({
        query: event.target.value.trim().toLowerCase(),
      });
      axios
        .get(
          `/api/profilename/${event.target.value.toLowerCase()}/${
            this.state.loadPeople
          }`,
          { withCredentials: true }
        )
        .then((res) => {
          this.setState({
            people: res.data,
          });
        })
        .catch((err) => {
          return;
        });
    } else {
      this.setState(
        {
          query: "",
          people: [],
        },
        () => {
          this.recent();
        }
      );
    }
  };
  recent = (e) => {
    axios
      .get(`/api/recentSeach/${this.props.user.userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          if (res.data.savedUserIds) {
            this.setState({
              people: res.data.savedUserIds.reverse(),
              loading: false,
            });
          } else {
            this.setState({
              people: [],
              loading: false,
            });
          }
        }
      })
      .catch((err) => {
        return;
      });
  };

  componentDidMount = () => {
    this.recent();
  };

  render() {
    return (
      <div
        className={`profile-session font-link  ${
          this.props.seach === false ? "" : "active"
        }`}
      >
        <SearchAccount
          user={this.props.user}
          openSearch={this.props.openSearch}
          tabs={this.state.tabs}
        />

        <Interest tabs={this.state.tabs} />
      </div>
    );
  }
}

export default Search;
