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
    secondaryAxis: Selectors.secondaryAxis(state)
  }
})(React.createClass({
  displayName: 'Bars',
  render () {
    const {
      data,
      primaryAxis,
      secondaryAxis,
      //
      ...rest
    } = this.props

    if (!primaryAxis || !secondaryAxis) {
      return null
    }

    const barWidth = primaryAxis.barWidth
    const flipped = primaryAxis.isVertical

    const xKey = flipped ? 'y' : 'x'
    const yKey = flipped ? 'x' : 'y'

    const secondaryAxisTrueRange = secondaryAxis.isInverted ? [...secondaryAxis.range()].reverse() : secondaryAxis.range()

    // const seriesPadding = primaryAxis.centerTicks ? primaryAxis.barPaddingOuterSize : 0
    const seriesPadding = 0

    return (
      <Animate
        data={{
          data,
          secondaryAxisTrueRange
        }}
        damping={10}
      >
        {inter => {
          return (
            <g
              className='series bars'
            >
              {inter.data.map((d, i) => {
                let x, y, height, width
                if (primaryAxis.isVertical) {
                  if (primaryAxis.position === 'left') {
                    // Left to right bars
                    x = inter.secondaryAxisTrueRange[0]
                    y = d[yKey] + seriesPadding
                    height = barWidth
                    width = Math.max(inter.secondaryAxisTrueRange[1] - inter.secondaryAxisTrueRange[0] - d[xKey], 0)
                  } else {
                    // Right to left bars
                    x = d[xKey]
                    y = d[yKey] + seriesPadding
                    height = barWidth
                    width = Math.max(inter.secondaryAxisTrueRange[1] - inter.secondaryAxisTrueRange[0] - d[xKey], 0)
                  }
                } else {
                  if (primaryAxis.position === 'bottom') {
                    // Bottom to top bars
                    x = d[xKey] + seriesPadding
                    y = d[yKey]
                    height = Math.max(inter.secondaryAxisTrueRange[0] - d[yKey], 0)
                    width = barWidth
                  } else {
                    // Top to bottom bars
                    x = d[xKey] + seriesPadding
                    y = 0
                    height = Math.max(d[yKey], 0)
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
