import React from 'react'
//

const defaultStyle = {
  fontFamily: 'Helvetica',
  fontSize: 10,
  opacity: 1,
}

export default function Text({ style, opacity = 1, ...rest }) {
  const resolvedStyle = {
    ...defaultStyle,
    ...style,
  }

  return <text {...rest} style={resolvedStyle} />
}
