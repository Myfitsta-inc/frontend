import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { SILVER_PLAN, PLATINUM_PLAN, GOLD_PLAN } from "productOptions/plan";
const SelectPlan = ({
  selectplan,
  removePlan,
  goToNectAfterConfifiguration,
}) => {
  const [silver, setsilver] = useState(0);
  const [platinum, setPlatinium] = useState(0);
  const [gold, setGold] = useState(0);

  const [isSilverPlanSelected, setisSilverPlanSelected] = useState(false);
  const [isPlatiniumPlanSelected, setIsPlatiniumPlanSelected] = useState(false);
  const [isGoldPlanSelected, setIsGoldPlanSelected] = useState(false);

  const [silverErrorMessage, setSilverErrorMessage] = useState("");
  const [platiniumErrorMessage, setPlatiniumErrorMessage] = useState("");
  const [goldErrorMessage, setGoldErrorMessage] = useState("");

  const validateInput = (value) => {
    if (value == "") {
      return {
        isValid: false,
        errorMessage: "Enter a value between $0 to $999",
      };
    }
    if (value > 0) {
      if (parseInt(value) > 999) {
        return { isValid: false, errorMessage: "The maximun is 999" };
      } else {
        return { isValid: true };
      }
    } else {
      if (value === 0) {
        return {
          isValid: false,
          errorMessage: "Enter a value between $0 to $999",
        };
      } else {
        return { isValid: true };
      }
    }
  };
  const addPlan = (plan) => {
    const plans = [
      {
        name: SILVER_PLAN,
        value: silver,
        selected: isSilverPlanSelected,
        setter: setisSilverPlanSelected,
      },
      {
        name: PLATINUM_PLAN,
        value: platinum,
        selected: isPlatiniumPlanSelected,
        setter: setIsPlatiniumPlanSelected,
      },
      {
        name: GOLD_PLAN,
        value: gold,
        selected: isGoldPlanSelected,
        setter: setIsGoldPlanSelected,
      },
    ];

    const selectedPlan = plans.find((p) => p.name === plan);

    if (!selectedPlan) return;

    const { value, selected, setter } = selectedPlan;

    if (!selected) {
      const { isValid, errorMessage } = validateInput(value);

      if (!isValid) {
        setErrorMessage(plan, errorMessage);
        return;
      }
      setErrorMessage(plan, "");
      setter(true);
      selectplan({ planName: plan, value });
    } else {
      setter(false);
      removePlan(plan);
    }
  };

  const setErrorMessage = (plan, message) => {
    if (plan === SILVER_PLAN) {
      setSilverErrorMessage(message);
    } else if (plan === PLATINUM_PLAN) {
      setPlatiniumErrorMessage(message);
    } else if (plan === GOLD_PLAN) {
      setGoldErrorMessage(message);
    }
  };

  return (
    <div className="wrpaeorrr">
      <div className="theslider">
        <div className="wwwr-text">Create your Subscription Plan</div>
      </div>

      <div className="sucbrcriotion-thatprice">
        <div className="wraper-thesubscriotion">
          <div
            onClick={() => {
              addPlan(SILVER_PLAN);
            }}
            className={`wrepr-arounbd0the-plan ${
              isSilverPlanSelected && "active"
            }`}
          >
            <div className="div-wiri">
              <button className="asdd-sellect"></button>
              <p>silver</p>
            </div>
            <div className="wharoor-the-amoiut">
              <p className="desd">$</p>
              <input
                onChange={(e) => {
                  setsilver(e.target.value);
                }}
                placeholder="0"
                className="input"
                type="number"
              />
              /<p className="title-4hh4">month</p>
            </div>
          </div>
          <p className={`give-messa ${silverErrorMessage.length && "active"}`}>
            {silverErrorMessage}
          </p>
        </div>

        <div className="wraper-thesubscriotion">
          <div
            onClick={() => {
              addPlan(PLATINUM_PLAN);
            }}
            className={`wrepr-arounbd0the-plan ${
              isPlatiniumPlanSelected && "active"
            }`}
          >
            <div className="div-wiri">
              <button className="asdd-sellect"></button>
              <p>platinum</p>
            </div>
            <div className="wharoor-the-amoiut">
              <p className="desd">$</p>
              <input
                onChange={(e) => {
                  setPlatinium(e.target.value);
                }}
                placeholder="0"
                className="input"
                type="number"
              />
              /<p className="title-4hh4">3 month</p>
            </div>
          </div>
          <p
            className={`give-messa ${platiniumErrorMessage.length && "active"}`}
          >
            {platiniumErrorMessage}
          </p>
        </div>

        <div className="wraper-thesubscriotion">
          <div
            onClick={() => {
              addPlan(GOLD_PLAN);
            }}
            className={`wrepr-arounbd0the-plan ${
              isGoldPlanSelected && "active"
            }`}
          >
            <div className="div-wiri">
              <button className="asdd-sellect"></button>
              <p>gold</p>
            </div>
            <div className="wharoor-the-amoiut">
              <p className="desd">$</p>
              <input
                onChange={(e) => {
                  setGold(e.target.value);
                }}
                placeholder="0"
                className="input"
                type="number"
              />
              /<p className="title-4hh4">years</p>
            </div>
          </div>
          <p className={`give-messa ${goldErrorMessage.length && "active"}`}>
            {goldErrorMessage}
          </p>
        </div>

        <p className="hold-that-mess"></p>
      </div>
      <div className="controil-theaction">
        <div onClick={goToNectAfterConfifiguration} className="add-shch">
          Continue
        </div>
      </div>
    </div>
  );
};

export default SelectPlan;
