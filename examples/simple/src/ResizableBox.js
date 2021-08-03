import React from "react";
import { ResizableBox as ReactResizableBox } from "react-resizable";

import "react-resizable/css/styles.css";

export default function ResizableBox({
  children,
  width = 600,
  height = 300,
  resizable = true,
  style = {},
  className = "",
}) {
  return (
    <div style={{ marginLeft: 20 }}>
      {resizable ? (
        <ReactResizableBox width={width} height={height}>
          <div
            style={{
              boxShadow: "0 20px 40px rgba(0,0,0,.1)",
              ...style,
              width: "100%",
              height: "100%",
            }}
            className={className}
          >
            {children}
          </div>
        </ReactResizableBox>
      ) : (
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            boxShadow: "0 20px 40px rgba(0,0,0,.1)",
            ...style,
          }}
          className={className}
        >
          {children}
        </div>
      )}
    </div>
  );
}
