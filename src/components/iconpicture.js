import React from "react";
import axios from "axios";

import apiUrl from "apiUrl/url";
import profile from "profile.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useIcon from "hooks/useIcon";
function IconProfile({ user }) {
  const { icon } = useIcon(user);

  const checklive = () => {
    axios.get(`/api/check-live/${this.props.user}`).then((res) => {
      if (res.data !== "no") {
        this.setState({
          isLive: res.data,
        });
      } else {
        this.setState({
          isLive: null,
        });
      }
    });
  };

  return (
    <div className={`wraper-the-component-iocnf`}>
      {icon !== null ? (
        icon.length > 0 ? (
          <LazyLoadImage
            alt={"image.alt"}
            effect="blur"
            height="100%"
            src={`${apiUrl.content}${icon}`}
            width="100%"
          />
        ) : (
          <LazyLoadImage
            alt={"image.alt"}
            effect="blur"
            height="100%"
            src={profile}
            width="100%"
          />
        )
      ) : (
        <div className="jejerjrnnnf"></div>
      )}
    </div>
  );
}

export default IconProfile;
