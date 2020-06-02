import React from 'react'
//

const defaultStyle = {
  strokeWidth: 2,
  stroke: '#6b6b6b',
  fill: 'transparent',
  opacity: 1,
}

export default function Path({ style, ...rest }) {
  const resolvedStyle = {
    ...defaultStyle,
    ...style,
  }

  return <path {...rest} style={resolvedStyle} />
}
