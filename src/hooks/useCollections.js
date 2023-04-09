import { useReducer, useEffect } from "react";
import store from "store/store";
import axios from "axios";
import rootReducer from "reducers/rootReducer";
import { useSelector, useDispatch } from "react-redux";
function useCollections() {
  const [state, dispatch] = useReducer(rootReducer, store);
  const postId = useSelector((state) => state.postId);
  const { isboxCollectionOpen, listCollection } = state;
  const getCollection = () => {
    axios.get("/api/myCollection").then((res) => {
      if (res.data) {
        dispatch({ type: "UPDATE_COLECTION_BOX", value: res.data });
      }
    });
  };

  const openBoxCollection = (add, postId) => {
    dispatch({ type: "UPDATE_BOXCOLLECTION", value: add });
    dispatch({ type: "UPDATE_SELECTED_POSTID", value: postId });
  };

  useEffect(() => {
    getCollection();
  }, [postId, isboxCollectionOpen]);

  return {
    postId,
    listCollection,
    isboxCollectionOpen,
    openBoxCollection,
  };
}
export default useCollections;
