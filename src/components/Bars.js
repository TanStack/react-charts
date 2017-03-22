import React from 'react'
import { Animate } from 'react-move'
//
import Connect from '../utils/Connect'
import Selectors from '../utils/Selectors'
import Rectangle from '../primitives/Rectangle'

export default Connect((state, props) => {
  return {
    primaryAxis: Selectors.primaryAxis(state),
    secondaryAxis: Selectors.secondaryAxis(state),
    getX: state.getX,
    getY: state.getY
  }
})(React.createClass({
  displayName: 'Bars',
  render () {
    const {
      data,
      primaryAxis,
      secondaryAxis,
      getX,
      getY,
      //
      ...rest
    } = this.props

    if (!primaryAxis || !secondaryAxis) {
      return null
    }

    // For react-motion to interpolate correctly, it needs to interpolate
    // the x and y values independently for each point. So we create an
    // object that maps to the available points in the data array
    const keyPrefix = 'path_'
    const xPrefix = keyPrefix + 'x_'
    const yPrefix = keyPrefix + 'y_'

    const flipped = primaryAxis.isVertical

    const springMap = {}
    data.forEach((d, i) => {
      // Interpolate each x and y with the default spring
      springMap[xPrefix + i] = flipped ? secondaryAxis(getY(d)) : primaryAxis(getX(d))
      springMap[yPrefix + i] = flipped ? primaryAxis(getX(d)) : secondaryAxis(getY(d))
    })
    const secondaryAxisTrueRange = secondaryAxis.isInverted ? [...secondaryAxis.range()].reverse() : secondaryAxis.range()

    return (
      <Animate
        data={{
          ...springMap
        }}
        damping={10}
      >
        {inter => {
          const rectangles = data.map((d, i) => {
            return {
              x: inter[xPrefix + i],
              y: inter[yPrefix + i]
            }
          })
          return (
            <g
              className='series bars'
            >
              {rectangles.map((d, i) => {
                let x, y, height, width
                if (primaryAxis.isVertical) {
                  if (primaryAxis.position === 'left') {
                    // Left to right bars
                    x = secondaryAxisTrueRange[0]
                    y = d.y
                    height = 5
                    width = Math.max(secondaryAxisTrueRange[1] - secondaryAxisTrueRange[0] - d.x, 0)
                  } else {
                    // Right to left bars
                    x = d.x
                    y = d.y
                    height = 5
                    width = Math.max(secondaryAxisTrueRange[1] - secondaryAxisTrueRange[0] - d.x, 0)
                  }
                } else {
                  if (primaryAxis.position === 'bottom') {
                    // Bottom to top bars
                    x = d.x
                    y = d.y
                    height = Math.max(secondaryAxisTrueRange[0] - d.y, 0)
                    width = 5
                  } else {
                    // Top to bottom bars
                    x = d.x
                    y = 0
                    height = Math.max(d.y, 0)
                    width = 5
                  }
                }
                return (
                  <Rectangle
                    {...rest}
                    key={i}
                    x={x}
                    y={y}
                    height={height}
                    width={width}
                  />
                )
              })}
            </g>
          )
        }}
      </Animate>
    )
  }
}))
