import { connect } from "react-redux";
const useUser = (props) => {
  console.log(props);
  return "jkjj";
};

const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};

export default connect(mapstateToProps, null)(useUser);
