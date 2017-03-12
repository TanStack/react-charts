import React from 'react'
//
import Animated from './Animated'
import Curve from '../primitives/Curve'

export default React.createClass({
  render () {
    const {
      data,
      scaleX,
      scaleY,
      getX,
      getY,
      height,
      hovered,
      active,
      isRed,
      ...rest
    } = this.props

    // For react-motion to interpolate correctly, it needs to interpolate
    // the x and y values independently for each point. So we create an
    // object that maps to the available points in the data array
    const pathKeyPrefix = 'path_'
    const pathXPrefix = pathKeyPrefix + 'x_'
    const pathYPrefix = pathKeyPrefix + 'y_'

    const color = isRed ? 'red' : 'blue'
    const width = isRed ? '10' : '4'

    return (
      <Animated
        style={spring => {
          const pathSpringMap = {}
          data.forEach((d, i) => {
            // Interpolate each x and y with the default spring
            pathSpringMap[pathXPrefix + i] = spring(scaleX(getX(d)), {damping: 10})
            pathSpringMap[pathYPrefix + i] = spring(scaleY(getY(d)), {damping: 10})
          })
          return {
            // anything being animated should have a key/value here
            ...pathSpringMap,
            color: spring(color, { stiffness: 100 }),
            width: spring(width, { stiffness: 250, damping: 8 })
          }
        }}
      >
        {inter => {
          // Map back through the data, using the inter data point
          const interPoints = data.map((d, i) => [
            inter[pathXPrefix + i],
            inter[pathYPrefix + i]
          ])
          return (
            <g>
              <Curve
                points={interPoints}
                hovered={hovered}
                active={active}
                {...rest}
                stroke={inter.color}
                strokeWidth={inter.width}
              />
            </g>
          )
        }}
      </Animated>
    )
  }
})
