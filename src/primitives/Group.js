import React from 'react'
//

export default class Group extends React.Component {
  render () {
    const { style, innerRef, ...rest } = this.props

    const resolvedStyle = {
      transition: 'all .3s ease-out',
      ...style,
    }

    return <g {...rest} ref={innerRef} style={resolvedStyle} />
  }
}
