import React from 'react'
import { Animate } from 'react-move'
import {
  line,
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

    const lineFn = line()
    // .curve(curveCardinal)
    .curve(curveMonotoneX)

    return (
      <Animate
        data={{
          data
        }}
        damping={10}
      >
        {inter => {
          const path = lineFn(inter.data.map(d => ([d.x, d.y])))
          return (
            <g>
              <Path
                {...rest}
                d={path}
                style={{
                  ...defaultStyle,
                  ...style
                }}
              />
              {showPoints && inter.data.map((d, i) => (
                <Circle
                  {...rest}
                  key={i}
                  x={d.x}
                  y={d.y}
                  style={{
                    ...defaultStyle,
                    ...style
                  }}
                />
              ))}
            </g>
          )
        }}
      </Animate>
    )
  }
})
