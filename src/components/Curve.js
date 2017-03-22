import React from 'react'
import { Animate } from 'react-move'
import {
  line,
  curveCardinal,
  curveMonotoneX
} from 'd3-shape'
//
import Selectors from '../utils/Selectors'

import Connect from '../utils/Connect'
import Path from '../primitives/Path'
import Circle from '../primitives/Circle'

const defaultStyle = {
  strokeWidth: 2
}

export default Connect((state, props) => {
  return {
    primaryAxis: Selectors.primaryAxis(state),
    secondaryAxis: Selectors.secondaryAxis(state),
    getX: state.getX,
    getY: state.getY,
    getR: state.getR
  }
})(React.createClass({
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
      primaryAxis,
      secondaryAxis,
      getX,
      getY,
      getR,
      showPoints,
      //
      ...rest
    } = this.props

    if (!primaryAxis || !secondaryAxis) {
      return null
    }

    const flipped = primaryAxis.isVertical

    const keyPrefix = 'path_'
    const xPrefix = keyPrefix + 'x_'
    const yPrefix = keyPrefix + 'y_'
    const rPrefix = keyPrefix + 'r_'

    const springMap = {}
    data.forEach((d, i) => {
      // Interpolate each x and y with the default spring
      springMap[xPrefix + i] = flipped ? secondaryAxis(getY(d)) : primaryAxis(getX(d))
      springMap[yPrefix + i] = flipped ? primaryAxis(getX(d)) : secondaryAxis(getY(d))
      springMap[rPrefix + i] = getR(d)
    })

    const lineFn = line()
    // .curve(curveCardinal)
    .curve(curveMonotoneX)

    return (
      <Animate
        data={{
          ...springMap
        }}
        damping={10}
      >
        {inter => {
          const points = data.map((d, i) => {
            return {
              x: inter[xPrefix + i],
              y: inter[yPrefix + i],
              r: inter[rPrefix + i]
            }
          })
          const path = lineFn(points.map(point => ([point.x, point.y])))

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
              {showPoints && points.map((point, i) => (
                <Circle
                  {...rest}
                  key={i}
                  x={point.x}
                  y={point.y}
                  r={Math.max(point.r, 0)}
                />
              ))}
            </g>
          )
        }}
      </Animate>
    )
  }
}))
