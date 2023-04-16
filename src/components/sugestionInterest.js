import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpin from "Components/Loadingspin";
import LoadInterest from "Components/LoadInterest";
import SelctedInterest from "Components/seletedInterest";
import { useSelector, useDispatch } from "react-redux";
function Interest({ tabs }) {
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);
  const interest = useSelector((state) => state.interest);
  const handleCreate = (data) => {
    this.setState({
      item: data,
    });
  };

  const handleCheck = async () => {
    const { data } = await axios.get("/api/load-Interest");
    if (data.accountId) {
      dispatch({ type: "ADD_TO_INTEREST", value: data });
    } else {
      dispatch({ type: "ADD_TO_INTEREST", value: {} });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCheck();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`subjection-top-folow-box ${tabs ? "active" : ""}`}>
      {interest !== null ? (
        interest.accountId ? (
          <LoadInterest />
        ) : (
          <SelctedInterest handleCreate={handleCreate} />
        )
      ) : (
        <div className="bixnknfkfjkjrjr">
          <LoadingSpin />
        </div>
      )}
    </div>
  );
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     UpdateInterest: (data) => {
//       dispatch({ type: "ADD_TO_INTEREST", data: data });
//     },
//   };
// };

// const mapstateToProps = (state) => {
//   return {
//     users: state.user,
//     interest: state.interest,
//   };
// };
export default Interest;
