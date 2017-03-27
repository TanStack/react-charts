import React from 'react'
import { Animate } from 'react-move'
import {
  area,
  curveCardinal,
  curveMonotoneX
} from 'd3-shape'
//
import Path from '../primitives/Path'
import Circle from '../primitives/Circle'

const defaultStyle = {
  strokeWidth: 2
}

export default React.createClass({
  displayName: 'Line',
  getDefaultProps () {
    return {
      showPoints: true
    }
  },
  render () {
    const {
      data,
      style,
      //
      showPoints,
      //
      ...rest
    } = this.props

    const lineFn = area()
    .curve(curveMonotoneX)
    .y0(d => d[2])

    return (
      <Animate
        data={{
          data
        }}
        damping={13}
      >
        {inter => {
          const path = lineFn(inter.data.map(d => ([d.x, d.y, d.yBase])))
          return (
            <g>
              <Path
                {...rest}
                d={path}
                style={{
                  ...defaultStyle,
                  ...style,
                  fill: style.stroke
                }}
              />
              {showPoints && inter.data.map((d, i) => (
                <Circle
                  {...rest}
                  key={i}
                  x={d.x}
                  y={d.y}
                  r={Math.max(d.r, 0)}
                />
              ))}
            </g>
          )
        }}
      </Animate>
    )
  }
})
