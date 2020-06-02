import React from 'react'
//

const defaultStyle = {
  strokeWidth: 1,
  fill: 'transparent',
  opacity: 1,
}

export default function Line({ style, ...rest }) {
  const resolvedStyle = {
    ...defaultStyle,
    ...style,
  }

  return <line {...rest} style={resolvedStyle} />
}
