import { useReducer } from "react";

const reducer = (state, action) => {
  let { type } = action || {};
  switch (type) {
    case "UPDATE_USER":
      return { ...state, blurValue: action.value };
    default:
      throw new Error("Did you misspell an action type?");
  }
};

function useUser() {
  const [state, dispatch] = useReducer(reducer, { blurValue: 0 });
  return {
    state,
    dispatch,
  };
}
export default useUser;
