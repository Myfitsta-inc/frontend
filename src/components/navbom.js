import React from "react";
import "style/discover.css";
import { GoPlus } from "react-icons/go";
import { NavLink } from "react-router-dom";
import Notin from "./notin";
import useUser from "hooks/useUser";
function Navbom({ handloption }) {
  const { user } = useUser();
  return (
    user && (
      <div id="navigation">
        <NavLink to={"/home"} className="navvf">
          <div className="djrjnkrke">
            <i className="fas fa-home"></i>
          </div>
        </NavLink>
        <NavLink to={"/discover"} className="navvf" data-tab-target="#search">
          <div className="djrjnkrke">
            <i className="far fa-compass"></i>
          </div>
        </NavLink>
        <div className="navvf">
          <button onClick={() => handloption(true)} className="open-seachrr">
            <GoPlus />
          </button>
        </div>
        <NavLink to={"/notifications"} className="navvf">
          <div className="djrjnkrke">
            <Notin userId={user.userId} />
            <i className="far fa-bell"></i>
          </div>
        </NavLink>
        <NavLink to={"/collection"} className="navvf">
          <div className="djrjnkrke">
            <i className="fas fa-folder-plus"></i>
          </div>
        </NavLink>

        <NavLink
          to={"/myfitstapro"}
          className="nav-li nav-info  "
          data-tab-target="#account"
        >
          <i className="fas fa-fire-alt"></i>
        </NavLink>
      </div>
    )
  );
}

export default Navbom;
