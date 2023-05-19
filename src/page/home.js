import React, { useState, useEffect } from "react";
import Search from "Components/seach";
import HomePageFeed from "Components/HomePageFeed";
import Nav from "Components/nav";
import axios from "axios";
import { Link } from "react-router-dom";
import Iconpicture from "Components/Iconpicture";
import SuggectionBox from "Components/suggectionbox";
import SharePost from "Components/sharepost";
import Menupost from "Components/menupost";
import LoadingSpin from "Components/Loadingspin.js";
import Boxcollection from "Components/boxcollection";
import ShareOption from "Components/shareoption";
import { GoPlus } from "react-icons/go";
import Report from "Components/report";
import DropOption from "Components/dropHome";
import Navtop from "Components/navtop";
import Navbom from "Components/navbom";
import DropHomeUp from "Components/dropHomeUp";
import useUser from "hooks/useUser";
import { useSelector, useDispatch } from "react-redux";
const Home = () => {
  const { user } = useUser();
  const userFeeds = useSelector((state) => state.userFeeds);
  const [search, setSearch] = useState(false);
  const [setting, setSetting] = useState(false);
  const [shareoption, setShareoption] = useState(false);
  const [sharebox, setSharebox] = useState(false);
  const [drop, setDrop] = useState(false);
  const [numberToLoad, setNumberToLoad] = useState(10);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handloption = (data) => {
    setDrop(data);
  };

  const handlOpen = (data) => {
    setSetting(data);
  };

  const handlOpenS = (data) => {
    setSharebox(data);

    handleSetting(false);
  };

  const handleSetting = (data) => {
    setShareoption(data);
  };

  const loadmore = (data) => {
    setNumberToLoad(numberToLoad + 10);
    getfeed(numberToLoad);
  };

  const openSearch = (data) => {
    setSearch(data);
  };

  const getfeed = (data) => {
    setLoading(true);
    axios
      .get(`/api/Show-Feed/${user.userId}/${data}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          if (res.data.length > 0) {
            if (userFeeds !== null) {
              let list = [...new Set([...res.data, ...userFeeds])];
              setLoading(false);
              dispatch({ type: "UPDATE_FEED", value: list });
            } else {
              let list = [...new Set([...res.data])];
              setLoading(false);
              dispatch({ type: "UPDATE_FEED", value: list });
            }
          } else {
            if (userFeeds === null) {
              setLoading(false);
              dispatch({ type: "UPDATE_FEED", value: [] });
            } else {
              setLoading(false);
              dispatch({ type: "UPDATE_FEED", value: userFeeds });
            }
          }
        }
      });
  };

  useEffect(() => {
    getfeed(numberToLoad);
  }, [numberToLoad]);

  return (
    <div className="conatiner">
      <Nav user={user} />
      <div id="app">
        <div id="body-tabs">
          <div id="home">
            <div id="head">
              <Link to={"/profile"} className="iconsnr">
                <Iconpicture user={user.userId} />
              </Link>

              <div id="nt-mes">
                <div
                  onClick={() => {
                    openSearch(true);
                  }}
                  className="serach-pro"
                >
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>
            <div className="big-wraper">
              <div className="wraper-po">
                <div className="head-active">
                  <p>Home</p>
                  <div className="wjjijnnff">
                    <button
                      onClick={() => handloption(true)}
                      className="open-seachr"
                    >
                      <GoPlus />
                    </button>
                    <div
                      onClick={() => {
                        openSearch(true);
                      }}
                      className="open-seach"
                    >
                      <i className="fas fa-search"></i>
                    </div>
                  </div>
                  <DropOption handloption={handloption} drop={drop} />
                </div>

                {userFeeds !== null ? (
                  userFeeds.length > 0 ? (
                    <HomePageFeed
                      loading={loading}
                      loadmore={loadmore}
                      handleSetting={handleSetting}
                      handlOpen={handlOpen}
                    />
                  ) : (
                    <div className="sfhej">
                      <div className="jfjfrhrhrhhj">
                        <SuggectionBox />
                      </div>
                      <div className="ffkfkfkk">
                        <div className="wraperififoojfhr">
                          <div className="wraperjf-ffkfkr">
                            <div className="jrkjkr">
                              Welcome, {user.username}
                            </div>
                            <p>
                              Share with your community your favorite workout or
                              fitness activity
                            </p>
                            <div className="wraper-thejr">
                              <Link className="dijroooeo" to={"/post"}>
                                New Post
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="bixnknfkfjkjrjr">
                    <LoadingSpin />
                  </div>
                )}
              </div>
            </div>
            <Search user={user} openSearch={openSearch} seach={search} />
          </div>

          <Navtop />

          <Navbom handloption={handloption} />
        </div>
      </div>
      <Boxcollection />
      <Menupost handlOpen={handlOpen} setting={setting} />
      {shareoption ? (
        <ShareOption
          handlOpenS={handlOpenS}
          handleSetting={handleSetting}
          shareoption={shareoption}
        />
      ) : (
        ""
      )}
      {sharebox ? (
        <SharePost
          user={user}
          handlOpenS={handlOpenS}
          sharebox={sharebox}
          kind={"post"}
        />
      ) : (
        ""
      )}
      <Report />
      {drop ? <DropHomeUp handloption={handloption} drop={drop} /> : ""}

      <div></div>
    </div>
  );
};

export default Home;
