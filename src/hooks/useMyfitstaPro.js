import { useReducer } from "react";
import store from "store/store";
import rootReducer from "reducers/rootReducer";
function useMyfitstaPro() {
  const [state, dispatch] = useReducer(rootReducer, store);
  return {
    myfitstapro: state.pro,
    proUpdate: dispatch,
  };
}
export default useMyfitstaPro;
