import React, { useState, useEffect } from "react";
import Search from "components/seach";
import Post from "components/post";
import Nav from "components/nav";
import axios from "axios";
import { Link } from "react-router-dom";
import Iconpicture from "components/iconpicture";
import SuggectionBox from "components/suggectionbox";
import SharePost from "components/sharepost";
import Menupost from "components/menupost";
import LoadingSpin from "components/loadingspin.js";
import Boxcollection from "components/boxcollection";
import ShareOption from "components/shareoption";
import { GoPlus } from "react-icons/go";
import Report from "components/report";
import DropOption from "components/dropHome";
import Navtop from "components/navtop";
import DeletePost from "components/deletepost";
import Navbom from "components/navbom";
import DropHomeUp from "components/dropHomeUp";
import useUser from "hooks/useUser";

const Home = () => {
  const { user } = useUser();

  const [post, setPost] = useState(null);
  const [search, setSearch] = useState(false);
  const [setting, setSetting] = useState(false);
  const [shareoption, setShareoption] = useState(false);
  const [sharebox, setSharebox] = useState(false);
  const [drop, setDrop] = useState(false);
  const [postId, setPostId] = useState("");
  const [numberToLoad, setNumberToLoad] = useState(10);
  const [loading, setLoading] = useState(false);

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
            if (post !== null) {
              let list = [...new Set([...res.data, ...post])];
              setLoading(false);
              setPost(list);
            } else {
              let list = [...new Set([...res.data])];
              setLoading(false);
              setPost(list);
            }
          } else {
            if (post === null) {
              setLoading(false);
              setPost([]);
            } else {
              setLoading(false);
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
                <Link to="/message" id="notification">
                  <i className="far fa-envelope"></i>
                </Link>
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

                {post !== null ? (
                  post.length > 0 ? (
                    <Post
                      loading={loading}
                      loadmore={loadmore}
                      handleSetting={handleSetting}
                      handlOpen={handlOpen}
                      user={user}
                      feed={post}
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
      <DeletePost />
      {drop ? <DropHomeUp handloption={handloption} drop={drop} /> : ""}

      <div></div>
    </div>
  );
};

export default Home;
