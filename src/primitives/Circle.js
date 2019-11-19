import React from "react";
//

const defaultStyle = {
  r: 2,
  strokeWidth: "1",
  stroke: "#000000",
  fill: "#000000",
  opacity: 1
};

export default function Circle({ x, y, r, style, ...rest }) {
  const resolvedStyle = {
    ...defaultStyle,
    ...style
  };

  return (
    <circle {...rest} cx={x || 0} cy={y || 0} r={1} style={resolvedStyle} />
  );
}
