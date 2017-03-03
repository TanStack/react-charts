import React from 'react'
import { Motion, spring } from 'react-motion'
import { line, curveBasis } from 'd3-shape'
//
import Circle from './Circle'

const getX = d => Array.isArray(d) ? d[0] : d.x
const getY = d => Array.isArray(d) ? d[1] : d.y

export default React.createClass({
  getDefaultProps () {
    return {
      // Set up some default getters for our x and y values
      getX,
      getY,
      strokeWidth: '2',
      stroke: 'royalblue',
      fill: 'transparent'
    }
  },
  render () {
    const {
      data,
      getX,
      getY,
      scaleX,
      scaleY,
      ...rest
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
          // Create the path using the interpolated data
          const path = line()(interData)
          // .curve(curveBasis)(interData)
          return (
            <g>
              <path
                {...rest}
                d={path}
              />
              {interData.map((d, i) => (
                <Circle
                  key={i}
                  x={d[0]}
                  y={d[1]}
                />
              ))}
            </g>
          )
        }}
      </Motion>
    )
  }
})
