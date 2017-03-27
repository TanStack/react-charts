import React from 'react'
import { Animate } from 'react-move'
//
import Connect from '../utils/Connect'
import Selectors from '../utils/Selectors'
import Rectangle from '../primitives/Rectangle'

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
    const yStacked = secondaryAxis.stacked

    const secondaryAxisTrueRange = secondaryAxis.isInverted ? [...secondaryAxis.scale.range()].reverse() : secondaryAxis.scale.range()

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
                let x1, y1, x2, y2
                if (primaryAxis.isVertical) {
                  if (primaryAxis.position === 'left') {
                    // Left to right bars
                    x1 = inter.secondaryAxisTrueRange[0]
                    x2 = Math.max(d.x, 0)
                    y1 = d.y + seriesPadding
                    y2 = y1 + barWidth
                  } else {
                    // Right to left bars
                    x1 = d.x
                    x2 = Math.max(inter.secondaryAxisTrueRange[1] - inter.secondaryAxisTrueRange[0] - d.x, 0)
                    y1 = d.y + seriesPadding
                    y2 = y1 + barWidth
                  }
                } else {
                  if (primaryAxis.position === 'bottom') {
                    // Bottom to top bars
                    x1 = d.x + seriesPadding
                    x2 = x1 + barWidth
                    y1 = d.y
                    y2 = d.yBase
                    // y2 = Math.max(inter.secondaryAxisTrueRange[0] - d.y, 0)
                  } else {
                    // Top to bottom bars
                    x1 = d.x + seriesPadding
                    x2 = x1 + barWidth
                    y1 = 0
                    y2 = Math.max(d.y, 0)
                  }
                }
                return (
                  <Rectangle
                    {...rest}
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
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
