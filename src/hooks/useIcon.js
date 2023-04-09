import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
function useIcon(userId) {
  const dispatch = useDispatch();
  const [icon, setIcon] = useState(null);
  const iconList = useSelector((state) => state.iconList);
  useEffect(() => {
    if (userId) {
      const loadImage = async () => {
        let userFind = iconList.find((item) => item.userId === userId);
        if (userFind) {
          setIcon(userFind.icon);
        } else {
          const { data } = await axios.get(`/api/icon/${userId}`);
          setIcon(data);
          let option = { userId, icon: data };
          const list = [...iconList, option];
          dispatch({ type: "UPDATE_ICON", value: list });
        }
      };
      loadImage();
    }
  }, [iconList, userId]);
  return {
    icon,
  };
}

export default useIcon;
