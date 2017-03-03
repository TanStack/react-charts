import React from 'react'
import { Motion, spring } from 'react-motion'

export default React.createClass({
  getDefaultProps () {
    return {
      fontFamily: 'Helvetica',
      fontSize: 10
    }
  },
  render () {
    const {
      x,
      y,
      ...rest
    } = this.props

    const animated = {
      x: spring(x),
      y: spring(y)
    }

    return (
      <Motion
        style={{
          // anything being animated should have a key/value here
          ...animated
        }}
      >
        {({
          x,
          y
        }) => (
          <text
            x={x}
            y={y}
            {...rest}
          />
        )}
      </Motion>
    )
  }
})
