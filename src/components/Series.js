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
      isActive,
      style,
      ...rest
    } = this.props

    // For react-motion to interpolate correctly, it needs to interpolate
    // the x and y values independently for each point. So we create an
    // object that maps to the available points in the data array
    const pathKeyPrefix = 'path_'
    const pathXPrefix = pathKeyPrefix + 'x_'
    const pathYPrefix = pathKeyPrefix + 'y_'

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
            strokeWidth: spring(isActive ? '5' : '2')
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
                style={{
                  ...style,
                  ...inter
                }}
                {...rest}
              />
            </g>
          )
        }}
      </Animated>
    )
  }
})
