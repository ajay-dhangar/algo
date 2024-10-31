import React from "react";

const AnimatedGIF = ({ srcs, alts }) => {
  return (
    <div>
      {srcs.map((src, index) => {
        const isMP4 = src.endsWith('.mp4');
        return isMP4 ? (
          <video key={index} src={src} autoPlay loop muted />
        ) : (
          <img key={index} src={src} alt={alts[index]} className="w-102 h-80 rounded-lg" />
        );
      })}
    </div>
  );
};

export default AnimatedGIF;
