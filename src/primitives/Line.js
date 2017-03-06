import React from 'react'
import { line } from 'd3-shape'

export default React.createClass({
  getDefaultProps () {
    return {
      strokeWidth: '1',
      stroke: '#aaa',
      fill: 'transparent'
    }
  },
  render () {
    return (
      <line
        {...this.props}
      />
    )
  }
})
