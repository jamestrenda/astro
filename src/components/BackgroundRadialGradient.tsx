import React from 'react';

export const BackgroundRadialGradient = ({
  style,
}: {
  style: React.CSSProperties;
}) => {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 -z-20 rounded-lg"
        style={style}
      ></div>
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-lg bg-zinc-950/80"></div>
    </>
  );
};
