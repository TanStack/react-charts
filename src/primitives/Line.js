import React from 'react'
import { Motion, spring } from 'react-motion'
import { line } from 'd3-shape'

export default React.createClass({
  getDefaultProps () {
    return {
      strokeWidth: '2',
      stroke: 'black',
      fill: 'transparent'
    }
  },
  render () {
    const {
      x1,
      y1,
      x2,
      y2,
      ...rest
    } = this.props

    const animated = {
      x1: spring(x1),
      y1: spring(y1),
      x2: spring(x2),
      y2: spring(y2)
    }

    return (
      <Motion
        style={{
          // anything being animated should have a key/value here
          ...animated
        }}
      >
        {({
          x1,
          y1,
          x2,
          y2
        }) => (
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            {...rest}
          />
        )}
      </Motion>
    )
  }
})
