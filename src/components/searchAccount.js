import React, { useState, useEffect } from "react";
import axios from "axios";
import { InView } from "react-intersection-observer";
import LoadingSpin from "./loadingspin";
import { IoCloseSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import Username from "./username";
import IconProfile from "./iconpicture";
import useDebounce from "hooks/useDebounce";
const SearchAccount = ({ tabs, openSearch, user }) => {
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const debouncedSearchInput = useDebounce(query, 200);
  const [loadPeople, setLoadPeople] = useState(5);

  const loadMore = (isInView) => {
    if (isInView) {
      setLoadPeople(loadPeople + 5);
    } else {
      setLoadPeople(loadPeople - 5);
    }
  };

  const removerecent = (data) => {
    let option = {
      userId: user.userId,
      accountId: data,
    };
    axios.post("/api/removeRecentprofile", option).then((res) => {
      let list = people.filter((item) => {
        return item.userId != data;
      });
      setPeople(list);
    });
  };

  const recent = () => {
    axios
      .get(`/api/recentSeach/${user.userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          if (res.data.savedUserIds) {
            setPeople(res.data.savedUserIds.reverse());
            setLoading(false);
          } else {
            setPeople([]);
            setLoading(false);
          }
        }
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      const { data } = await axios.get(
        `/api/profilename/${debouncedSearchInput.toLowerCase()}/${loadPeople}`,
        { withCredentials: true, signal }
      );

      setPeople(data);
      return () => controller.abort();
    };
    if (debouncedSearchInput.length) {
      fetchData();
    } else {
      recent();
    }
  }, [debouncedSearchInput, loadPeople]);

  return (
    <>
      <div className={`box-find ${tabs ? "active" : ""}`}>
        <p>
          <i className="fas fa-search"></i>
        </p>
        <input
          onChange={(e) => setQuery(e.target.value)}
          className="seach-prp"
          type="text"
          name="profile"
          placeholder="Search..."
        />
        <div className="close-seaceh">
          <button
            onClick={() => {
              openSearch(false);
            }}
          >
            <IoCloseSharp />
          </button>
        </div>
      </div>
      <div className={`box-profile-session ${tabs === false ? "active" : ""}`}>
        {people !== null
          ? people.length > 0
            ? people.map((item, index) => {
                if (people.length === index + 1) {
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="profile-tofind"
                      key={item._id}
                    >
                      <InView
                        onChange={(inView) => loadMore(inView)}
                        className="profile-tofindt"
                      >
                        <div className="image-pr">
                          <IconProfile live={true} user={item.userId} />
                        </div>
                        <div className="inf-or">
                          <div className="bfjirtnj"></div>
                          <div>
                            <Username link={true} user={item.userId} />
                          </div>
                        </div>
                        <div
                          onClick={(e) => {
                            removerecent(item.userId);
                          }}
                          className="delc-pro"
                        >
                          <IoCloseSharp />
                        </div>
                      </InView>
                    </motion.div>
                  );
                } else {
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="profile-tofind"
                      key={item._id}
                    >
                      <div className="image-pr">
                        <IconProfile live={true} user={item.userId} />
                      </div>
                      <div className="inf-or">
                        <div className="bfjirtnj"></div>
                        <div>
                          <Username link={true} user={item.userId} />
                        </div>
                      </div>
                      <div
                        onClick={(e) => {
                          removerecent(e, item.userId);
                        }}
                        className="delc-pro"
                      >
                        <IoCloseSharp />
                      </div>
                    </motion.div>
                  );
                }
              })
            : !loading && (
                <div className="wraperififoojfhr">
                  <div className="wraperjf-ffkfkr">
                    <p>SEARCH ACCOUNT</p>
                    <p>Search and look for any account</p>
                  </div>
                </div>
              )
          : ""}
        {loading ? (
          <div className="bixnknfkfjkjrjr">
            <LoadingSpin />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default SearchAccount;
