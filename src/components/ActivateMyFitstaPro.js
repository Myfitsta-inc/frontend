import React, { useState } from "react";
import axios from "axios";
import LoadingSpin from "./Loadingspin";
function ActivateMyFitstaPro({ user }) {
  const [loading, setLoading] = useState(false);
  const activate = () => {
    setLoading(true);

    let option = {
      userId: user.userId,
    };
    axios.post(`/api/activate-myfit-sta-pro`, option).then((data) => {
      if (data.data.succes) {
        window.location.href = "/setup";
      }
    });
  };

  return (
    <div>
      {user.myfitstapro ? (
        ""
      ) : (
        <div className="activated-buttobox">
          <div className={`conte-thise-actionrb   ${loading ? "" : "active"}`}>
            <button onClick={activate} className={`create`}>
              {loading ? "" : "ACTIVATE MYFITSTAPRO"}
            </button>
            {loading ? (
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
