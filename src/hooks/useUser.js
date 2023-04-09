import { useSelector } from "react-redux";
function useUser() {
  const user = useSelector((state) => state.user);
  const myfitstapro = useSelector((state) => state.myfitstapro);
  return {
    user,
    myfitstapro,
  };
}
export default useUser;
