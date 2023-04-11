import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import ProfileModal from "./profillemodal";
import logo from "logo/logo.png";
import { Link } from "react-router-dom";
import useUsername from "hooks/useUsername";
const Username = ({ user }) => {
  const link = true;
  const { username, go } = useUsername(user);

  return (
    <div className="usernsmr-the-compoocnf">
      {username !== null ? (
        link  ? (
          <div className="srjhsur">
            {username.username === username ? (
              <Link
                className={`rnwjrkwr ${go !== undefined ? "active" : ""}`}
                to={`/profile`}
              >
                {username.username}
              </Link>
            ) : (
              <Link
                className={`rnwjrkwr ${go !== undefined ? "active" : ""}`}
                to={`/account/${username.username}`}
              >
                {username.username}
              </Link>
            )}
            {username.pro  ? (
              <div className="wfjiriej">
                <img src={logo} />
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <p>{username.username}</p>
        )
      ) : (
        <div className="uisiiirjr"></div>
      )}
    </div>
  );
};

export default Username;
