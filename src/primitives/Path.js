import React from 'react'
//

const defaultStyle = {
  strokeWidth: 2,
  stroke: '#6b6b6b',
  fill: 'transparent',
  opacity: 1,
  transition: 'all .3s ease-out',
}

export default class Path extends React.Component {
  static defaultProps = {
    opacity: 1,
  }
  render () {
    const { style, opacity, ...rest } = this.props

    const resolvedStyle = {
      ...defaultStyle,
      ...style,
    }

    return <path {...rest} style={resolvedStyle} />
  }
}
