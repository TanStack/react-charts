import React from 'react';
//

const defaultStyle = {
  strokeWidth: 2,
  stroke: '#6b6b6b',
  fill: 'transparent',
  opacity: 1,
};

const Path = React.forwardRef<SVGPathElement, React.ComponentProps<'path'>>(
  ({ style, ...rest }, ref) => {
    const resolvedStyle = {
      ...defaultStyle,
      ...style,
    };

    return <path ref={ref} {...rest} style={resolvedStyle} />;
  }
);

export default Path;
