import React from 'react'
import { Animate } from 'react-move'
import {
  line,
  curveCardinal,
  curveMonotoneX
} from 'd3-shape'
//
//
import Connect from '../utils/Connect'
import Path from '../primitives/Path'
import Circle from '../primitives/Circle'

const defaultStyle = {
  strokeWidth: 2
}

export default Connect((state, props) => {
  const {
    type
  } = props

  return {
    scales: state.scales,
    getX: state.getX,
    getY: state.getY,
    getR: state.getR,
    scale: state.scales && state.scales[type]
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
      scales: {
        x: scaleX,
        y: scaleY
      } = {},
      getX,
      getY,
      getR,
      showPoints,
      //
      ...rest
    } = this.props

    if (!scaleX || !scaleY) {
      return null
    }

    // For react-motion to interpolate correctly, it needs to interpolate
    // the x and y values independently for each point. So we create an
    // object that maps to the available points in the data array
    const pathKeyPrefix = 'path_'
    const pathXPrefix = pathKeyPrefix + 'x_'
    const pathYPrefix = pathKeyPrefix + 'y_'
    const pathRPrefix = pathKeyPrefix + 'r_'

    const pathSpringMap = {}
    data.forEach((d, i) => {
      // Interpolate each x and y with the default spring
      pathSpringMap[pathXPrefix + i] = scaleX(getX(d))
      pathSpringMap[pathYPrefix + i] = scaleY(getY(d))
      pathSpringMap[pathRPrefix + i] = getR(d)
    })

    const lineFn = line()
    .curve(curveCardinal)
    // .curve(curveMonotoneX)

    return (
      <Animate
        data={{
          ...pathSpringMap
        }}
        // tension={50}
        damping={10}
      >
        {inter => {
          const points = data.map((d, i) => {
            return {
              x: inter[pathXPrefix + i],
              y: inter[pathYPrefix + i],
              r: inter[pathRPrefix + i]
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
              {/* {showPoints && inter.points.map((d, i) => (
                <Circle
                  {...rest}
                  key={i}
                  x={d.x}
                  y={d.y}
                  r={d.r}
                />
              ))} */}
            </g>
          )
        }}
      </Animate>
    )
  }
}))
