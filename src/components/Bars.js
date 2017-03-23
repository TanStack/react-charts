import React from 'react'
import { Animate } from 'react-move'
//
import Connect from '../utils/Connect'
import Selectors from '../utils/Selectors'
import Rectangle from '../primitives/Rectangle'

import { stackKey } from '../components/Data'

const getDataOrStackData = d => d[stackKey] ? d[stackKey] : d

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

    const barWidth = primaryAxis.barWidth
    const flipped = primaryAxis.isVertical

    // For react-move to interpolate correctly, it needs to interpolate
    // the x and y values independently for each point. So we create an
    // object that maps to the available points in the data array
    const keyPrefix = 'path_'
    const xPrefix = keyPrefix + 'x_'
    const yPrefix = keyPrefix + 'y_'

    const springMap = {}
    data.forEach((d, i) => {
      const resolvedDatum = getDataOrStackData(d)
      // Interpolate each x and y with the default spring
      springMap[xPrefix + i] = flipped ? secondaryAxis(getY(resolvedDatum)) : primaryAxis(getX(resolvedDatum))
      springMap[yPrefix + i] = flipped ? primaryAxis(getX(resolvedDatum)) : secondaryAxis(getY(resolvedDatum))
    })
    const secondaryAxisTrueRange = secondaryAxis.isInverted ? [...secondaryAxis.range()].reverse() : secondaryAxis.range()

    // const seriesPadding = primaryAxis.centerTicks ? primaryAxis.barPaddingOuterSize : 0
    const seriesPadding = 0

    return (
      <Animate
        data={{
          ...springMap,
          secondaryAxisTrueRange
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
                    x = inter.secondaryAxisTrueRange[0]
                    y = d.y + seriesPadding
                    height = barWidth
                    width = Math.max(inter.secondaryAxisTrueRange[1] - inter.secondaryAxisTrueRange[0] - d.x, 0)
                  } else {
                    // Right to left bars
                    x = d.x
                    y = d.y + seriesPadding
                    height = barWidth
                    width = Math.max(inter.secondaryAxisTrueRange[1] - inter.secondaryAxisTrueRange[0] - d.x, 0)
                  }
                } else {
                  if (primaryAxis.position === 'bottom') {
                    // Bottom to top bars
                    x = d.x + seriesPadding
                    y = d.y
                    height = Math.max(inter.secondaryAxisTrueRange[0] - d.y, 0)
                    width = barWidth
                  } else {
                    // Top to bottom bars
                    x = d.x + seriesPadding
                    y = 0
                    height = Math.max(d.y, 0)
                    width = barWidth
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
