import React from 'react'

export default React.createClass({
  render () {
    const {
      children
    } = this.props

    return (
      <g>
        {children}
      </g>
    )
  }
})
