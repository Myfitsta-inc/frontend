import React from "react";
import Nav from "Components/nav";
import VideoPlayer from "ai/VideoPlayer";
function Pageai() {
  return (
    <div className="conatiner">
      <Nav />
      <div id="app">
        <div id="body-tabs">
          <div className="wraperr-box-page">
            <div className="tabss-br">
              <div>SQUAT</div>
              <div>0</div>
              <button>Begin</button>
            </div>
            <div className="wrapepror-br">
              <VideoPlayer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pageai;
