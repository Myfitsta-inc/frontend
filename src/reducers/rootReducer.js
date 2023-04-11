import store from "store/store";

const rootReducer = (state = store, action) => {
  let { type, value } = action || {};
  switch (type) {
    case "UPDATE_COLECTION_BOX":
      return { ...state, listCollection: value };
    case "UPDATE_USER":
      return { ...state, user: value };
    case "UPDATE_BOXCOLLECTION":
      return { ...state, isboxCollectionOpen: value };
    case "UPDATE_SELECTED_POSTID":
      return { ...state, postId: value };
    case "ADD_LIKES":
      return { ...state, likes: value };
    case "UPDATE_PRO":
      return { ...state, myfitstapro: value };
    case "ADD_TO_COLLECTION":
      return { ...state, listCollection: value };
    case "ADD_TO_INTEREST":
      return { ...state, interest: value };
    case "UPDATE_REVIEW":
      return {
        ...state,
        counterReview: value,
      };
    case "UPDATE_REPORT":
      return {
        ...state,
        report: value,
      };
    case "DELETE_POST":
      return {
        ...state,
        report: value,
      };
    case "UPDATE_INBOX":
      return {
        ...state,
        inbox: value,
      };
    case "UPDATE_USERNAME":
      return {
        ...state,
        usernameLists: value,
      };
    case "UPDATE_ICON":
      return {
        ...state,
        iconList: value,
      };
    case "UPDATE_FOLLOWER":
      return {
        ...state,
        followLists: value,
      };
    case "UPDATE_POSTIST":
      return {
        ...state,
        postList: value,
      };
    case "OPEN_DELETE_POST_MODAL":
      return {
        ...state,
        deletePost: value,
      };
    case "UPDATE_FEED":
      return {
        ...state,
        userFeeds: value,
      };
    default:
      return state;
  }
};

export default rootReducer;
