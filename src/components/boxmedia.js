import React, { useState } from "react";
import VideoPost from "./videopost";
import apiUrl from "apiUrl/url";
import { GrNext, GrPrevious } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";

function BoxMedia({ mediaDetails }) {
  const isMultiplePost = mediaDetails.length > 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [begin, setBegin] = useState(false);

  const next = () => {
    if (currentIndex + 1 < mediaDetails.length) {
      setCurrentIndex(currentIndex + 1);
      setPrevious(currentIndex + 1 - 1);
      setBegin(true);
    }
  };

  const back = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setPrevious(currentIndex - 1 + 1);
    }
  };

  return (
    <div className="post-content">
      {mediaDetails.length === 1 ? (
        mediaDetails[0].mimetype.includes("image") ? (
          <img src={`${apiUrl.content}${mediaDetails[0].key}`} alt="workout" />
        ) : (
  <>
  
  <VideoPost src={`${mediaDetails[0].key}`} />
  </>
        )
      ) : (
        <div className="multipla-content">
          {mediaDetails.map(({ key, mimetype }, index) => {
            return currentIndex === index ? (
              <AnimatePresence custom={index} key={index}>
                <motion.div
                  key={index}
                  transition={{
                    type: "spring",
                    damping: 50,
                    stiffness: 500,
                  }}
                  initial="enter"
                  animate="in"
                  exit="exit"
                  variants={{
                    enter: {
                      x: begin  ? (index > previous ? 500 : -500) : "",
                      opacity: 0,
                    },
                    in: { x: 0, opacity: 1 },
                    exit: (_index) => ({
                      x: _index > index ? -500 : 500,
                      opacity: 0,
                    }),
                  }}
                  layout
                  className="media-box active"
                >
                  {mimetype.includes("image") ? (
                    <img src={`${apiUrl.content}${key}`} loading="lazy" />
                  ) : (
                    <VideoPost src={key} />
                  )}
                </motion.div>
              </AnimatePresence>
            ) : (
              ""
            );
          })}
        </div>
      )}

      {isMultiplePost && (
        <div className="state">
          <div className="curent">{currentIndex + 1}</div>/
          <div className="total">{mediaDetails.length}</div>
        </div>
      )}

      {isMultiplePost && (
        <div onClick={back} className="left">
          <GrPrevious />
        </div>
      )}

      {isMultiplePost && (
        <div onClick={next} className="right">
          <GrNext />
        </div>
      )}

      {isMultiplePost && (
        <div className="bottntejjtt">
          <div className="wrparr-lutt">
            {mediaDetails.map((item, index) => {
              return (
                <div
                  className={`wrwsjrp ${
                    currentIndex === index ? "active" : ""
                  }`}
                  key={Math.floor(Math.random() * 1000)}
                >
                  <button
                    onClick={() => {
                      setCurrentIndex(index);
                    }}
                  ></button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default BoxMedia;
