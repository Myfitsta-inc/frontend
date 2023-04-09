import { useReducer } from "react";
import store from "store/store";
import rootReducer from "reducers/rootReducer";

function useLikes() {
  const [state, dispatch] = useReducer(rootReducer, store);
  return {
    likes: state.likes,
    adddLikes: dispatch,
  };
}
export default useLikes;
