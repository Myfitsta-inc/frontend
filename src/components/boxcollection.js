import React, { useState, useEffect } from "react";
import { BiCheck, BiArrowBack } from "react-icons/bi";
import axios from "axios";
import "style/collection.css";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";

const BoxCollection = () => {
  const dispatch = useDispatch();
  const postId = useSelector((state) => state.postId);
  const isboxCollectionOpen = useSelector((state) => state.isboxCollectionOpen);
  const listCollection = useSelector((state) => state.listCollection);
  const [create, setCreate] = useState(false);
  const [add, setAdd] = useState(true);
  const [newCollection, setNewCollection] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {}, [listCollection]);

  useEffect(() => {
    if (postId.length > 0) {
      getCollection();
    }
  }, [postId]);

  const closeCollectionBox = () => {
    dispatch({ type: "UPDATE_BOXCOLLECTION", value: false });
    dispatch({ type: "UPDATE_SELECTED_POSTID", value: "" });
  };
  const createCollection = () => {
    if (newCollection.length > 0) {
      let detail = {
        collectionName: newCollection,
      };

      axios.post("/api/CreateCollection", detail).then((res) => {
        if (res.data.collectionName) {
          controlcollection(true, false);
          setMessage("");
        } else {
          setMessage("This collection already exists");
        }
      });
    }
  };

  const getCollection = () => {
    axios.get("/api/myCollection").then((res) => {
      if (res.data) {
        dispatch({ type: "UPDATE_COLECTION_BOX", value: res.data });
      }
    });
  };

  const hangleNewCollection = (event) => {
    setNewCollection(event.target.value);
  };

  const controlcollection = (add, create) => {
    setAdd(add);
    getCollection();
    setCreate(create);
  };

  const removeToCollection = (data) => {
    let option = {
      collectionName: data,
      postId: postId,
    };
    axios.post(`/api/delete/WorkoiutCollection`, option).then((res) => {
      getCollection();
    });
  };

  const addtoCollection = (collectionName) => {
    let option = {
      collectionName,
      postId: postId,
    };
    axios.post("/api/add-to-thiscollection", option).then((res) => {
      getCollection();
    });
  };

  return (
    <div
      className={`collection-overlay  ${isboxCollectionOpen ? "active" : ""}`}
    >
      <div className="box-hold-collection">
        <div className={`box-collection-user ${add === false ? "" : "active"}`}>
          <div className="collection-title">
            <button
              onClick={() => {
                closeCollectionBox();
              }}
              className="close-that"
            >
              <IoCloseSharp />
            </button>
            <p>PostCollection</p>
          </div>
          <div className="hold-my-collection">
            {listCollection !== null ? (
              listCollection.length > 0 ? (
                listCollection.map((item) => {
                  return (
                    <div
                      onClick={() => {
                        item.collectionList.some(
                          (collectionListPostId) =>
                            collectionListPostId === postId
                        )
                          ? removeToCollection(item.collectionName)
                          : addtoCollection(item.collectionName);
                      }}
                      className="hold-collection-desi"
                      key={item._id}
                    >
                      <div
                        className={`add-to-this-collection ${
                          item.collectionList.some(
                            (collectionListPostId) =>
                              collectionListPostId === postId
                          )
                            ? "active"
                            : ""
                        }`}
                      >
                        {item.collectionList.some(
                          (collectionListPostId) =>
                            collectionListPostId === postId
                        ) ? (
                          <div className="savethat-ccolelti checkthat-coell">
                            <BiCheck />
                          </div>
                        ) : (
                          <div className="savethat-ccolelti"></div>
                        )}
                      </div>

                      <div className="detail-about-collection">
                        <p className="col-titl">{item.collectionName}</p>
                        <p className="col-titl">
                          {item.collectionList.length} post
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="hold-collection-desi">
                  <div className={`add-to-this-collectrnion `}>
                    <i className="fas fa-plus"></i>
                  </div>

                  <div className="detail-about-collection">
                    <p className="col-titrjrjl">Create a collection</p>
                  </div>
                </div>
              )
            ) : (
              ""
            )}
          </div>

          <div className="add-collection">
            <button
              onClick={() => controlcollection(false, true)}
              className="add-this-col"
            >
              <i className="fas fa-plus ad"></i>NEW COLLECTION
            </button>
          </div>
        </div>
        {create === false ? (
          ""
        ) : (
          <div
            className={`add-tocollection-box ${
              create === false ? "" : "active"
            }`}
          >
            <div className="Create-a-new-list-title abrb">
              <div className="wrieii">
                <div
                  onClick={() => controlcollection(true, false)}
                  className="close-that"
                >
                  <BiArrowBack />
                </div>
                <p>New PostCollection</p>
              </div>
            </div>
            <div className="input-to-name-of-new-collection">
              <div className="edit-box-profile">
                <label htmlFor="username">PostCollection Name</label>
                <input
                  onChange={hangleNewCollection}
                  className="input-fornew-collection"
                  type="text"
                />
              </div>
              <p className="messsage" id="message-username">
                {message}
              </p>
            </div>
            <div className="add-collection-tolist">
              <button onClick={createCollection}>CREATE</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxCollection;
