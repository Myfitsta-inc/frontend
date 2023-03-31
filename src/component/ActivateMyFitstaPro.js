import React, { useState } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import LoadingSpin from "../component/loadingspin";
function ActivateMyFitstaPro({ user }) {
  console.log(user);
  const [loading, setLoading] = useState(false);
  const activate = () => {
    setLoading(true);

    let option = {
      userid: user.userid,
    };
    axios.post(`/api/activate-myfit-sta-pro`, option).then((data) => {
      if (data.data.succes === true) {
        window.location.href = "/setup";
      } else {
      }
    });
  };

  return (
    <div>
      {user.myfista == true ? (
        ""
      ) : (
        <div className="activated-buttobox">
          <div
            className={`conte-thise-actionrb   ${
              loading == true ? "" : "active"
            }`}
          >
            <button onClick={activate} className={`create`}>
              {loading ? "" : "ACTIVATE MYFITSTAP"}
            </button>
            {loading == true ? (
              <div className="jietiooeo">
                {" "}
                <LoadingSpin />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivateMyFitstaPro;
