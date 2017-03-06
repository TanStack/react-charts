import React from 'react'
import { Motion, spring } from 'react-motion'

export default React.createClass({
  getDefaultProps () {
    return {
      r: 1,
      strokeWidth: '1',
      stroke: '#000000',
      fill: 'transparent'
    }
  },
  render () {
    const {
      x,
      y,
      r,
      ...rest
    } = this.props
    return (
      // <Motion
      //   style={{
      //     x: spring(x),
      //     y: spring(y),
      //     r: spring(r)
      //   }}
      // >
      //   {({
      //     x,
      //     y,
      //     r
      //   }) => (
          <circle
            {...rest}
            cx={x}
            cy={y}
            r={r}
          />
      //   )}
      // </Motion>
    )
  }
})
