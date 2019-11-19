import React from "react";
import Utils from "../utils/Utils";
//
import ChartContext from "../utils/ChartContext";

export default function Brush() {
  const [{ pointer, brush, gridX, gridY, gridHeight, dark }] = React.useContext(
    ChartContext
  );

  if (!brush) {
    return null;
  }

  return (
    <div
      className="Brush"
      style={{
        pointerEvents: "none",
        position: "absolute",
        left: 0,
        top: 0,
        transform: Utils.translate(gridX, gridY),
        opacity: pointer.dragging
          ? Math.abs(pointer.sourceX - pointer.x) < 20
            ? 0.5
            : 1
          : 0
      }}
    >
      <div
        style={{
          position: "absolute",
          transform: Utils.translate(Math.min(pointer.x, pointer.sourceX), 0),
          width: `${Math.abs(pointer.x - pointer.sourceX)}px`,
          height: `${gridHeight}px`,
          background: dark ? "rgba(255,255,255,.3)" : "rgba(0, 26, 39, 0.3)",
          ...brush.style
        }}
      />
    </div>
  );
}

Brush.defaultProps = {
  onSelect: () => {}
};
