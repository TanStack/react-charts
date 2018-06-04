import React from 'react'
//

const defaultStyle = {
  fontFamily: 'Helvetica',
  fontSize: 10,
  opacity: 1,
  transition: 'all .3s ease-out',
}

export default class Text extends React.Component {
  static defaultProps = {
    opacity: 1,
  }
  render () {
    const { style, opacity, ...rest } = this.props

    const resolvedStyle = {
      ...defaultStyle,
      ...style,
    }

    return <text {...rest} style={resolvedStyle} />
  }
}
