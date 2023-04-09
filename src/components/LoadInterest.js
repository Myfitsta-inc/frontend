import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ButtonFollow from "./buttonFollow";
import IconProfile from "./iconpicture";
import Username from "./username";
import LoadingSpin from "./loadingspin";
import { MdModeEdit } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import useUser from "hooks/useUser";
import { useSelector, useDispatch } from "react-redux";
function LoadInterest() {
  const dispatch = useDispatch();
  const usernameLists = useSelector((state) => state.usernameLists);
  const [filter, setFilter] = useState("mydf");
  const { user } = useUser();
  const [item, setItem] = useState(null);
  const [list, setList] = useState(null);
  const [account, setAccount] = useState(true);
  const [numberLoad, setNumberLoad] = useState(10);
  const [loading, setLoading] = useState(false);
  const [original, setOriginal] = useState([]);

  const updateInterest = (data) => {
    dispatch({ type: "ADD_TO_INTEREST", value: data });
  };
  const handlefilter = (e) => {
    if (e.target.value.trim().length > 0) {
      setFilter(e.target.value.trim());
      setNumberLoad(10);

      let list = usernameLists.filter((item) => {
        return item.username.includes(e.target.value);
      });
      let arraylist = [];
      list.forEach((item) => {
        arraylist.push(item.userId);
      });
      let newlist = [];
      original.forEach((item) => {
        if (arraylist.includes(item.accountId)) {
          newlist.push(item);
        }
      });
      setList(list);
    } else {
      setNumberLoad(10);
      setFilter("mydf");
    }
  };

  useEffect(() => {
    handleCheck();
  }, [numberLoad, filter]);

  const changetable = () => {
    setAccount(!account);
  };

  const handleLoad = (data) => {
    if (data === true) {
      if (loading === false) {
        setNumberLoad(numberLoad + 10);
      } else {
      }
    }
  };
  const handleCheck = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `/api/connet-interest/${filter}/${numberLoad}`
    );
    if (data.success) {
      let list = data.data.filter((item) => item.accountId !== user.userId);
      setLoading(false);
      setList(list);
    } else {
      setLoading(false);
      setList(null);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transform: "translateY(100%)" }}
        className="subjection-top-folow-box-rjsjr"
      >
        <div className="interesst-rjkwkrk-teitj">
          <p>Suggestion</p>
          <button
            onClick={() => {
              updateInterest({});
            }}
            className="close-that"
          >
            <MdModeEdit />
          </button>
        </div>
        {account ? (
          <div className="kfldkmrkf">
            {list !== null ? (
              list.length ? (
                <div className="reander-listr">
                  {/* <div className="search-bar-chatrejk">
                      <div className="degn-for-chat-ftjdjjr">
                        <i className="fas fa-search"></i>
                      </div>
                      <input
                        onChange={handlefilter}
                        className="find-conrrv"
                        type="text"
                        placeholder="Search..."
                      />
                      {loading ? (
                        <div className="cnjrrjrn">
                          <LoadingSpin />
                        </div>
                      ) : (
                        ""
                      )}
                    </div> */}
                  <div className="ngrejtkj">
                    {list?.map((item) => {
                      return (
                        <motion.div
                          layout
                          className="holsjk-peopkr"
                          key={item._id}
                        >
                          <div className="rjnrjnejrujr">
                            <IconProfile live={true} user={item.accountId} />
                          </div>
                          <div className="rj4j53rj">
                            <Username link={true} user={item.accountId} />
                          </div>
                          <div className="jfjekkk">
                            {/* <ButtonFollow friend={item.accountId} /> */}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="wraperififoojfhr">
                    <div className="wraperjf-ffkfkr">
                      <p>No result</p>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div>
                <div className="wraperififoojfhr">
                  <div className="wraperjf-ffkfkr">
                    <p>No result</p>
                    <p>
                      You can always update your preference to find more users
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default LoadInterest;
