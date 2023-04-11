import React, { useState, useEffect } from "react";
import "style/ui.css";
import Nav from "components/nav";
import SharePost from "components/sharepost";
import ShareOption from "components/shareoption";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { GoPlus } from "react-icons/go";
import profile from "profile.webp";
import Username from "components/username";
import apiUrl from "apiUrl/url";
import LoadingSpin from "components/loadingspin.js";
import Addprogram from "components/addProgram";
import { BiArrowBack } from "react-icons/bi";
import ActivateMyfitsta from "components/ActivateMyFitstaPro";
import SettingMyfiststapro from "components/settingMyfitstapro";
import useUser from "hooks/useUser";

function Myfitstapro({ history }) {
  const [setting, setSetting] = useState(false);
  const { user, myfitstapro } = useUser();
  const [open, setOpen] = useState(false);
  const [program, setProgram] = useState(null);
  const [shareOption, setShareOption] = useState(false);
  const [shareBox, setShareBox] = useState(false);

  const goBack = (e) => {
    history.goBack();
  };

  const handleSettingg = (data) => {
    setShareOption(data);
  };

  const handlOpenS = (data) => {
    setShareBox(data);

    handleSettingg(false);
  };
  const handleSetting = (data) => {
    setSetting(data);
  };

  const handlOpen = (data) => {
    setOpen(data);
  };

  const getProgram = (e) => {
    axios.get(`/api/load-my-pwo/${user.userId}`, {}).then((res) => {
      setProgram(res.data.reverse());
    });
  };

  useEffect(() => {
    getProgram();
  }, []);

  return (
    <div className="conatiner">
      <Nav user={user} />
      <div id="app">
        <div id="body-tabs">
          <div className="wraper-it-baom">
            <div id="profile-box-mone-mak-seach-dude">
              <div className="title-of-prodf">
                <div onClick={goBack} className="close-that">
                  <BiArrowBack />
                </div>
                <Username link={true} user={user.userId} />
                <div className="jjjrrrdd">
                  <button
                    onClick={() => handlOpen(true)}
                    className="close-that"
                  >
                    {" "}
                    <GoPlus />
                  </button>
                </div>
              </div>
              <SettingMyfiststapro
                handlOpen={handlOpen}
                handleSettingg={handleSettingg}
                handleSetting={handleSetting}
                setting={setting}
                user={user}
              />
              <div className="barnner-propfde">
                {myfitstapro.banner?.length > 0 ? (
                  <img
                    className="pect-ppr"
                    src={`${apiUrl.content}${myfitstapro.banner}`}
                    loading="lazy"
                  />
                ) : (
                  ""
                )}
              </div>

              <div className="cover-box-on">
                <div className="imga-profile-descp eexr">
                  <div className="pro-img-box">
                    <div className="pro-img">
                      {myfitstapro.profileUrl?.length > 0 ? (
                        <img
                          className="imag-pro"
                          src={`${apiUrl.content}${myfitstapro.profileUrl}`}
                        />
                      ) : (
                        <img className="imag-pro" src={profile} />
                      )}
                    </div>

                    <div className="actine-edit">
                      <div className="name-action">
                        <div className="name-pr">
                          <p>{user.username}</p>{" "}
                          {user.verified  ? (
                            <p className="cheh">
                              <i className="fas fa-check"></i>
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <p className="name-prr">@{user.username}</p>
                      <div className="bio-sub-desciption rjjr">
                        <div className="info-acct">
                          <div id="post-nu " className="al">
                            <div id="number-post" className="number-post">
                              {myfitstapro.numberOfProgram ?? 0}
                            </div>
                            <p>program</p>
                          </div>
                          <div id="follower-nu" className="al">
                            <div
                              id="number-followers"
                              className="number-followers"
                            >
                              {myfitstapro.numberOfSubscriber ?? 0}
                            </div>
                            <p>subscribers</p>
                          </div>
                        </div>
                      </div>
                      <div className="bio-info">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: myfitstapro.bio,
                          }}
                        ></p>
                      </div>
                    </div>
                  </div>
                  <div className="bioo-info">
                    <div className="hol-thieinformation">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: myfitstapro.bio,
                        }}
                      ></p>
                    </div>
                    <div className="bioo-sub-desciption">
                      <div className="info-acct vbvb">
                        <div id="post-nu " className="al ll">
                          <div id="number-post" className="number-post">
                            {myfitstapro.numberOfProgram ?? 0}
                          </div>
                          <p>program</p>
                        </div>
                        <div id="follower-nu" className="al ll">
                          <div
                            id="number-followers"
                            className="number-followers"
                          >
                            {myfitstapro.numberOfSubscriber ?? 0}
                          </div>
                          <p>subscribers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="wosjfijitjid">
                {program != null ? (
                  program.length > 0 ? (
                    <div className="hold-your-work-program active">
                      {program.map((item) => {
                        return (
                          <div className="card-box-program" key={item._id}>
                            <div className="statqusre">
                              <div className="descplr-image-program-ui">
                                <div className="hold-imf">
                                  <Link
                                    to={`/program/myfitsta/${item?.programId}`}
                                    className="link0-toorohran"
                                  ></Link>
                                  {item.previewProgram.previewType.length >
                                  0 ? (
                                    item.previewProgram.previewType?.includes(
                                      "image"
                                    ) ? (
                                      <img
                                        src={`${apiUrl.content}${item.previewProgram.previewUrl}`}
                                      />
                                    ) : (
                                      <video>
                                        <source
                                          src={`${apiUrl.content}${item.previewProgram.previewUrl}`}
                                        />
                                      </video>
                                    )
                                  ) : (
                                    <div className="wkffkfkjkf"></div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="waorornngrkrr">
                              <div className="title-of-workot">
                                {item.title}
                              </div>

                              <div className="action-postf-desing">
                                {item.programType === 0 ? (
                                  ""
                                ) : (
                                  <div className="mmenu-act5">
                                    <span>${item.price}</span>
                                  </div>
                                )}
                              </div>

                              {item.published  ? (
                                <p className="published">Publish</p>
                              ) : (
                                <p className="draft">Draft</p>
                              )}
                            </div>
                          </div>
                        );
                      })}{" "}
                    </div>
                  ) : user.myfitstapro ? (
                    <div className="wraperififoojfhr">
                      <div className="wraperjf-ffkfkr">
                        <p>Create a Program</p>
                        <p> Create your program and publish it to the world</p>
                        <div className="wraper-thejr">
                          <button
                            onClick={() => handlOpen(true)}
                            className="dijroooeo"
                            to={"/post"}
                          >
                            Add Program
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <ActivateMyfitsta user={user} />
                  )
                ) : (
                  <div className="bixnknfkfjkjrjr">
                    <LoadingSpin />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Addprogram
        type={myfitstapro.accountType}
        user={user}
        handlOpen={handlOpen}
        open={open}
      />
      <ShareOption
        handlOpenS={handlOpenS}
        handleSetting={handleSettingg}
        shareoption={shareOption}
      />
      <SharePost
        user={user}
        file={"tttt"}
        handlOpenS={handlOpenS}
        sharebox={shareBox}
        kind={"profilepro"}
      />
    </div>
  );
}

// const mapstateToProps = (state) => {
//   return {
//     pro: state.pro,
//   };
// };

export default withRouter(Myfitstapro);
