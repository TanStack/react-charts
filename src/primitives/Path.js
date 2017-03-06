import React from 'react'
//
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
      <path
        {...this.props}
      />
    )
  }
})
