import React from 'react'
import { Animate } from 'react-move'
//

const defaultStyle = {
  strokeWidth: '1',
  stroke: '#000000',
  fill: '#000000',
  opacity: 1
}

export default React.createClass({
  getDefaultProps () {
    return {
      r: 1
    }
  },
  render () {
    const {
      x,
      y,
      r,
      isActive,
      isInactive,
      visible,
      style,
      ...rest
    } = this.props

    const resolvedStyle = {
      ...defaultStyle,
      ...style
    }
    return (
      <Animate
        data={{
          ...resolvedStyle,
          stroke: isActive ? 'red' : resolvedStyle.stroke,
          fill: isActive ? 'red' : resolvedStyle.fill,
          opacity: visible * resolvedStyle.opacity
        }}
      >
        {(inter) => {
          return (
            <circle
              {...inter}
              {...rest}
              cx={x}
              cy={y}
              r={r}
            />
          )
        }}
      </Animate>
    )
  }
})
