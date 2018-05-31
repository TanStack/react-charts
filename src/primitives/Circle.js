import React from 'react'
//

const defaultStyle = {
  r: 2,
  strokeWidth: '1',
  stroke: '#000000',
  fill: '#000000',
  opacity: 1,
  transition: 'all .3s ease-out',
}

export default class Circle extends React.Component {
  static defaultProps = {
    opacity: 1,
  }
  render () {
    const {
      x, y, r, style, opacity, ...rest
    } = this.props

    if (typeof x !== 'number' || typeof y !== 'number' || Number.isNaN(x) || Number.isNaN(y)) {
      return null
    }

    const resolvedStyle = {
      ...defaultStyle,
      ...style,
    }

    return <circle {...rest} cx={x || 0} cy={y || 0} r={1} style={resolvedStyle} />
  }
}
