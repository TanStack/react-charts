import React from 'react'
import { line, curveBasis } from 'd3-shape'
//
import Circle from './Circle'

export default React.createClass({
  getDefaultProps () {
    return {
      strokeWidth: '2',
      stroke: 'royalblue',
      fill: 'transparent'
    }
  },
  render () {
    const {
      points,
      ...rest
    } = this.props
    const path = line()(points)
    // const path = line().curve(curveBasis)(points)
    return (
      <g>
        <path
          {...rest}
          d={path}
        />
        {points.map((d, i) => (
          <Circle
            key={i}
            x={d[0]}
            y={d[1]}
          />
        ))}
      </g>
    )
  }
})
