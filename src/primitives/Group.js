import React from "react";

export default React.forwardRef(function Group(props, ref) {
  return <g {...props} ref={ref} />;
});
