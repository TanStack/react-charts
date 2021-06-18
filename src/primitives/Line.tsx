import React from 'react';
//

const defaultStyle = {
  strokeWidth: 1,
  fill: 'transparent',
  opacity: 1,
};

const Line = React.forwardRef<SVGLineElement, React.ComponentProps<'line'>>(
  ({ style, ...rest }, ref) => {
    const resolvedStyle = {
      ...defaultStyle,
      ...style,
    };

    return <line ref={ref} {...rest} style={resolvedStyle} />;
  }
);

export default Line;
