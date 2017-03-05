import React from 'react'
import { Motion, spring } from 'react-motion'
//
import Curve from '../primitives/Curve'

const getX = d => Array.isArray(d) ? d[0] : d.x
const getY = d => Array.isArray(d) ? d[1] : d.y

export default React.createClass({
  getDefaultProps () {
    return {
      // Set up some default getters for our x and y values
      getX,
      getY
    }
  },
  render () {
    const {
      data,
      getX,
      getY,
      scaleX,
      scaleY,
      height
    } = this.props


    // For react-motion to interpolate correctly, it needs to interpolate
    // the x and y values independently for each point. So we create an
    // object that maps to the available points in the data array
    const pathKeyPrefix = 'path_'
    const pathXPrefix = pathKeyPrefix + 'x_'
    const pathYPrefix = pathKeyPrefix + 'y_'

    const pathSpringMap = {}
    data.forEach((d, i) => {
      // Interpolate each x and y with the default spring
      pathSpringMap[pathXPrefix + i] = spring(scaleX(getX(d)))
      pathSpringMap[pathYPrefix + i] = spring(scaleY(getY(d)))
    })

    return (
      <Motion
        style={{
          // anything being animated should have a key/value here
          ...pathSpringMap
        }}
      >
        {interpolated => {
          // Map back through the data, using the interpolated data point
          const interData = data.map((d, i) => [
            interpolated[pathXPrefix + i],
            interpolated[pathYPrefix + i]
          ])
          return (
            <Curve
              points={interData}
            />
          )
        }}
      </Motion>
    )
  }
})
