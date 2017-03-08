import React from 'react'
//
import Text from '../primitives/Text'

const getX = d => Array.isArray(d) ? d[0] : d.x
const getY = d => Array.isArray(d) ? d[1] : d.y

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
