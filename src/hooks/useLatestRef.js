import React from "react";

export default function useLatestRef(latest) {
  const ref = React.useRef();
  ref.current = latest;
  return ref;
}
