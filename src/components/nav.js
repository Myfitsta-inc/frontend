import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import logoone from "logo/logo.png";
import BoxAccount from "./boxAccoount";
import useUser from "hooks/useUser";
import Notin from "./notin";
function Nav() {
  const { user } = useUser();
  const logout = () => {
    axios.get("/api/logoutt", { withCredentials: true }).then((res) => {
      window.location.reload();
    });
  };

  return (
    user && (
      <div id="overl">
        <div id="side-nav">
          <div>
            <div className="fjejgf">
              <div className="nan-app">
                <img draggable="false" src={logoone} alt="logo" />
              </div>
              <div className="rrjhr">MYFITSTA</div>
            </div>
            <BoxAccount user={user} />

            <div className="nav-side">
              <NavLink
                to="/home"
                className="nav-lii nav-infoo  "
                data-tab-target="#home"
              >
                <div className="ic">
                  <i className="fas fa-home"></i>
                </div>

                <p>Home</p>
              </NavLink>

              <NavLink
                to="/notifications"
                className="nav-lii nav-infoo  "
                data-tab-target="#home"
              >
                <div className="ic">
                  <Notin userId={user.userId} />
                  <i className="far fa-bell"></i>
                </div>
                <p>Notifications</p>
              </NavLink>

              <NavLink
                to="/discover"
                className="nav-lii nav-infoo  "
                data-tab-target="#search"
              >
                <div className="ic">
                  <i className="far fa-compass"></i>
                </div>
                <p>Discover</p>
              </NavLink>

              <NavLink
                to="/profile"
                className="nav-lii nav-infoo   "
                data-tab-target="#account"
              >
                <div className="ic">
                  <i className="far fa-user"></i>
                </div>

                <p>Profile</p>
              </NavLink>

              <NavLink
                to="/myfitstapro"
                className="nav-lii nav-infoo   "
                data-tab-target="#account"
              >
                <div className={`ic ${user.myfitstapro && "pro"}`}>
                  <i className="fas fa-fire-alt"></i>
                </div>
                <p>MyFitstapro</p>
              </NavLink>

              <NavLink
                to="/collection"
                className="nav-lii nav-infoo   "
                data-tab-target="#"
              >
                <div className="ic">
                  <i className="fas fa-folder-plus"></i>
                </div>

                <p>Collection</p>
              </NavLink>

              <NavLink to="/message" className="nav-lii nav-infoo">
                <div className="ic">
                  <i className="far fa-envelope"></i>
                </div>

                <p to="/message">Message</p>
              </NavLink>

              <NavLink to="/setting" className="nav-lii nav-infoo">
                <div className="ic">
                  <i className="fas fa-cog"></i>
                </div>

                <p to="/message">Setting</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Nav;
