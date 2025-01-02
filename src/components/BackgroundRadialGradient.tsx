import React from "react";

export const BackgroundRadialGradient = ({
  style,
}: {
  style: React.CSSProperties;
}) => {
  return (
    <>
      <div
        className="absolute  inset-0 pointer-events-none -z-20 rounded-lg"
        style={style}
      ></div>
      <div className="absolute inset-0 pointer-events-none bg-black/80 -z-10 rounded-lg"></div>
    </>
  );
};
