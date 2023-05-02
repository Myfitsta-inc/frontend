import React, { useState, useEffect } from "react";
import moment from "moment";
function DataPost({ date }) {
  const [dateFormat, setDateFormat] = useState(moment(date).fromNow());
  useEffect(() => {
    const timer = setInterval(() => {
      setDateFormat(moment(date).fromNow());
    }, 10000);

    return () => clearInterval(timer);
  });
  return <div className="gjjgkkg-overrjjrlay ">{dateFormat}</div>;
}
export default DataPost;
