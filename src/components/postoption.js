import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { IoEllipsisVertical } from "react-icons/io5";

const PostOption = ({ friend, item, user, history }) => {
  const container = useRef();
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(false);
  const [report, setReport] = useState({});

  const updataReport = () => {};

  const message = () => {
    let option = {
      id: friend,
      user: user.userId,
      profileGroup: "",
      type: "inbox",
      members: [],
      name: "",
      conversationId: "",
    };

    axios
      .post(`/api/add/to/conversattion`, option, { withCredentials: true })
      .then((result) => {
        history.push(`/message/${friend}`);
      });
  };

  const handleClickOutside = (event) => {
    if (container.current && !container.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const handleSetting = () => {};

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`boxmrjrjerjrjnue ${top ? "top" : "top"}`} ref={container}>
      <div className="title-of--thise-action">
        <button
          onClick={() => {
            setOpen(!open); // Toggle the modal open state
          }}
          className="close-that"
        >
          <IoEllipsisVertical />
        </button>
      </div>
      <div className={`tisjjrjrjr ${open ? "active" : ""}`}>
        {user.userId !== item.userId ? (
          <div
            onClick={() => {
              message();
            }}
            className="box-that-hold-the-setting"
          >
            <div className="hold-thatiocom">
              <i className="far fa-envelope"></i>
            </div>
            <button className="edit-the-program">Send message</button>
          </div>
        ) : (
          ""
        )}

        <div className="box-that-hold-the-setting">
          <div className="hold-thatiocom">
            <i className="fas fa-flag"></i>
          </div>
          <button
            onClick={() => {
              updataReport(report);
            }}
            className="edit-the-program"
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PostOption);
