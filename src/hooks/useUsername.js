import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function useUsername(userId) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(null);
  const usernameLists = useSelector((state) => state.usernameLists);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (userId) {
      const fetchName = async () => {
        let userFind = usernameLists.find((item) => item.userId === userId);
        if (userFind) {
          setUsername(userFind);
        } else {
          const { data } = await axios.get(`/api/username/${userId}`, signal);
          if (data.success) {
            data.userId = userId;
            setUsername(data);
            let list = [...usernameLists, data];
            dispatch({ type: "UPDATE_USERNAME", value: list });
          }
        }
      };
      fetchName();
    }
    return () => controller.abort();
  }, [userId, usernameLists]);

  return {
    username,
  };
}
export default useUsername;
