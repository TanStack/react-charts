import React from 'react';

const Group = React.forwardRef<SVGGElement, React.ComponentProps<'g'>>(
  (props, ref) => {
    return <g ref={ref} {...props} />;
  }
);

export default Group;
