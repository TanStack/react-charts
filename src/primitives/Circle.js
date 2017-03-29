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
      r: 2
    }
  },
  render () {
    const {
      x,
      y,
      r,
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
          ...resolvedStyle
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
