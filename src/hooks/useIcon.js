import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
function useIcon(userId) {
  const dispatch = useDispatch();
  const [icon, setIcon] = useState(null);
  const iconList = useSelector((state) => state.iconList);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const loadImage = async () => {
      const foundIcon = iconList[userId];
      if (foundIcon) {
        setIcon(foundIcon);
      } else {
        const { data } = await axios.get(`/api/icon/${userId}`, signal);
        setIcon(data);
        const newOject = { ...iconList };
        newOject[userId] = data;
        dispatch({ type: "UPDATE_ICON", value: newOject });
      }
      return () => controller.abort();
    };
    if (userId) loadImage();
  }, []);
  return {
    icon,
  };
}

export default useIcon;
