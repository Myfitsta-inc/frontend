import React, { useState, useEffect } from "react";
import Nav from "components/nav";
import axios from "axios";
import "style/loadp.css";
import { MdModeEdit } from "react-icons/md";
import { withRouter, NavLink } from "react-router-dom";
import Video from "components/video";
import LoadingSpin from "components/loadingspin";
import { GrPlayFill } from "react-icons/gr";
import ProIcon from "programs/proicon";
import { BiArrowBack } from "react-icons/bi";
import apiUrl from "apiUrl/url";
import { AiFillDelete } from "react-icons/ai";
import DeleteContent from "components/deleteContentP";
import { useParams } from "react-router-dom";
import useUser from "hooks/useUser";
function Loadprogram({ history }) {
  const { id } = useParams();
  const { user, myfitstapro } = useUser();
  const [playing, setPlaying] = useState(false);
  const [media, setMedia] = useState({});
  const [related, setRelated] = useState(null);
  const [comment, setComment] = useState(false);
  const [lecture, setLecture] = useState(true);
  const [deleteContent, setDeleteContent] = useState(false);

  const optionchangeP = (data) => {
    setDeleteContent(data);
  };
  const goBack = (e) => {
    history.goBack();
  };

  const changlepage = (one, two) => {
    setComment(one);
    setLecture(two);
  };

  const getProgramInfo = () => {
    axios
      .get(`/api/program/workoutt/course/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.publisherId) {
          if (res.data.publisherId !== user.userId) {
            history.push("/home");
          } else {
            setMedia(res.data);

            if (playing === false) {
              loadRelater(res.data.programId, res.data.publisherId);
              setPlaying(true);
            }
          }
        } else {
          history.push("/home");
        }
      });
  };

  const loadRelater = (programId, user) => {
    axios
      .get(`/api/loaddMyProgramContainer/${programId}/${user}`, {})
      .then((res) => {
        setRelated(res.data.reverse());
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getProgramInfo();
    // setState({ id: id });
  }, [id]);

  return (
    <div className="conatiner">
      <Nav user={user} />
      <div id="app">
        <div id="body-tabs">
          {media._id ? (
            <div className="hold-the-program-player-coterrool">
              <div className="control-back tobabrbfb">
                <div className="wrieii">
                  <div onClick={goBack} className="close-that">
                    <BiArrowBack />
                  </div>
                  <p>Program</p>
                </div>
              </div>
              <div className="gjrdkjgkf"></div>
              <div className="wrrpaorjwwko">
                <div className="video--image-elmnebnt-player">
                  <div className="box-player-elment">
                    {media?.mediaInfo?.mediaType ? (
                      media?.mediaInfo?.mediaType.includes("image") ? (
                        <img
                          src={`${apiUrl.content}${media.mediaInfo.mediaUrl}`}
                        />
                      ) : (
                        <Video data={media.mediaInfo.mediaUrl} />
                      )
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="ejtcondigjojr">
                    <div className="iondoftjkfjjf">
                      <div className="hoilt-tje-titlem">{media.title}</div>
                      <div className="rjengtnjr4">
                        <div className="wraprjttrjr-infofo"></div>
                      </div>
                    </div>
                  </div>

                  <div className="ejwkjrtngnej"></div>
                  <div className="info-abour-thedub">
                    <div className="box-the-hold-your-info">
                      <div className="rjfnvvbnf">
                        <div className="iconnrhrjrjjr">
                          <ProIcon user={user.userId} />
                        </div>
                        <div className="info-about-him">
                          <p className="hfhrudru">{myfitstapro.username}</p>
                          <p className="hfhrurdru">
                            {myfitstapro.numberOfSubscriber} subscribers
                          </p>
                        </div>
                      </div>

                      <div className="wrsk-follow">
                        <button>
                          <NavLink
                            className="fjkjetj"
                            to={`/setting/myfitstapro/subscriber`}
                          >
                            Subscribers
                          </NavLink>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="the-boxjjrjr">
                    {media.description.length > 0 ? (
                      <div className="holthw">{media.description}</div>
                    ) : (
                      ""
                    )}

                    <div className="bar-tha-th4botomnn">
                      <div className="two-onnrnn">
                        {
                          <NavLink
                            to={`/program/myfitsta/course/edit/${media._id}`}
                            className="Wtrpsrirjtns"
                          >
                            <div className="iocnidjnn">
                              <MdModeEdit />
                            </div>
                            <p>EDIT</p>
                          </NavLink>
                        }
                        <div
                          onClick={() => {
                            optionchangeP(true);
                          }}
                          className="Wtrpsrirjtns"
                        >
                          <div className="iocnidjnn">
                            <AiFillDelete />
                          </div>
                          <p>DELETE</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="tabhsjfj-jr">
                      <div
                        onClick={() => {
                          changlepage(false, true);
                        }}
                        className={`tabs-vjoor  ${
                          lecture===true ? "active" : ""
                        }`}
                      >
                        Content
                      </div>

                      <div
                        onClick={() => {
                          changlepage(true, false);
                        }}
                        className={`tabs-vjoor  ${
                          comment===true ? "active" : ""
                        }`}
                      >
                        Comment
                      </div>
                    </div> */}
                  <div
                    className={`commnentnjntjn ${
                      comment  ? "active" : ""
                    }`}
                  >
                    {/* <div className="load-the-comnent-title">
                        <p>{media.numberOfComments} Comment</p>
                      </div>
                      <CommentMedia
                        userId={myfitstapro.userId}
                        user={user}
                        media={media}
                      /> */}
                  </div>
                </div>

                <div
                  className={`showthebar-of-theother-element-player ${
                    lecture  ? "active" : ""
                  }`}
                >
                  <div className="fjejdgrrfje">
                    <div className="titketntkjej">Up Next</div>
                  </div>
                  <div className="load-sjjkr">
                    {related !== null ? (
                      related.map((item) => {
                        return (
                          <div
                            className={`box-that-hold-theinfo-next-program-c ${
                              item.file === id ? "active" : ""
                            }`}
                            key={item._id}
                          >
                            <div className="info-afachi">
                              <NavLink
                                className="infjgjttgjjff"
                                to={`/program/myfitsta/course/edit/${item._id}`}
                              >
                                <MdModeEdit />
                              </NavLink>
                              <div className="rro4gjgjjgttjrr"></div>
                              <NavLink
                                to={`/program/myfitsta/course/${item._id}`}
                                className="read-load"
                              ></NavLink>
                              {item.mediaInfo.mediaType.includes("image") ? (
                                <img
                                  src={`${apiUrl.content}${item.mediaInfo.mediaUrl}`}
                                />
                              ) : (
                                <div className="wraprorpsmmr">
                                  <video>
                                    <source
                                      src={`${apiUrl.content}${item.mediaInfo.mediaUrl}`}
                                    />
                                  </video>
                                  <div className="jfjfnnerbb">
                                    <GrPlayFill
                                      style={{ fill: "white" }}
                                      size={20}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="prohram-description">
                              <div className="rhrjjrjr-of-workot ">
                                <p className="title-of-workot fbfjjr">
                                  {" "}
                                  {item.title}
                                </p>
                              </div>
                              <div className="hold-descroptionr-rn">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="bixnknfkfjkjrjr">
                        <LoadingSpin />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bixnknfkfjkjrjr">
              <LoadingSpin />
            </div>
          )}
        </div>
      </div>

      <DeleteContent
        optionchangeP={optionchangeP}
        deleteContent={deleteContent}
      />
    </div>
  );
}

export default withRouter(Loadprogram);
