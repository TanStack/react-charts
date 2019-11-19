import React from "react";
//
import onResize from "../utils/detectElementResize";

export default function useHyperResponsive(ref) {
  const [{ width, height }, setState] = React.useState({
    width: 0,
    height: 0
  });

  const dimsRef = React.useRef();
  dimsRef.current = {
    width,
    height
  };

  const resize = React.useCallback(
    () => {
      if (!ref.current) {
        return;
      }

      const computed = window.getComputedStyle(ref.current.parentElement);

      const {
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        boxSizing,
        borderTopWidth,
        borderLeftWidth,
        borderRightWidth,
        borderBottomWidth
      } = computed;

      let { width: newWidth, height: newHeight } = computed;

      newWidth = parseInt(newWidth);
      newHeight = parseInt(newHeight);

      if (boxSizing === "border-box") {
        newWidth -= parseInt(paddingLeft);
        newWidth -= parseInt(paddingRight);
        newHeight -= parseInt(paddingTop);
        newHeight -= parseInt(paddingBottom);

        newWidth -= parseInt(borderLeftWidth);
        newWidth -= parseInt(borderRightWidth);
        newHeight -= parseInt(borderTopWidth);
        newHeight -= parseInt(borderBottomWidth);
      }

      if (
        newWidth !== dimsRef.current.width ||
        newHeight !== dimsRef.current.height
      ) {
        setState(() => ({
          width: newWidth,
          height: newHeight
        }));
      }
    },
    [ref]
  );

  React.useEffect(
    () => {
      const stopListening = onResize(ref.current.parentElement, resize);
      return () => {
        stopListening();
      };
    },
    [ref, resize]
  );

  return [{ width, height }];
}
