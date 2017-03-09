import React from 'react'
//
import Text from '../primitives/Text'

const noop = () => null

export default React.createClass({
  getDefaultProps () {
    return {
      onHover: noop,
      onActivate: noop
    }
  },
  getInitialState () {
    return {
      tooltip: null
    }
  },
  render () {
    const {
      hovered,
      scaleX,
      scaleY
    } = this.props

    return (
      <div
        className='tooltip'
      >

      </div>
    )
  }
})
