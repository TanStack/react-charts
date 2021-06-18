import React from 'react';
//

const defaultStyle = {
  fontFamily: 'Helvetica',
  fontSize: 10,
  opacity: 1,
};

const Text = React.forwardRef<SVGTextElement, React.ComponentProps<'text'>>(
  ({ style, ...rest }, ref) => {
    const resolvedStyle = {
      ...defaultStyle,
      ...style,
    };

    return <text ref={ref} {...rest} style={resolvedStyle} />;
  }
);

export default Text;
