import React from 'react'
//
export default React.createClass({
  getDefaultProps () {
    return {
      strokeWidth: '1',
      stroke: 'black',
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
