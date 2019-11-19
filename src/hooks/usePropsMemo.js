import React from "react";
//
import Utils from "../utils/Utils";

export default function usePropsMemo(fn, obj = {}) {
  const watchRef = React.useRef({
    style: {},
    props: {}
  });
  const valueRef = React.useRef();

  const { style = {}, ...props } = obj;
  if (
    Utils.shallowDiff(watchRef.current.style, style) ||
    Utils.shallowDiff(watchRef.current.props, props)
  ) {
    watchRef.current = obj;
    valueRef.current = fn();
  }
  return valueRef.current;
}
