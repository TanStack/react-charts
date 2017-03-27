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
      style,
      primaryAxis,
      secondaryAxis,
      //
      ...rest
    } = this.props

    if (!primaryAxis || !secondaryAxis) {
      return null
    }

    const barWidth = primaryAxis.barWidth
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
                if (primaryAxis.vertical) {
                  x1 = d.yBase
                  x2 = d.y
                  y1 = d.x + seriesPadding
                  y2 = y1 + barWidth
                } else {
                  x1 = d.x + seriesPadding
                  x2 = x1 + barWidth
                  y1 = d.y
                  y2 = d.yBase
                }
                return (
                  <Rectangle
                    {...rest}
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    style={{
                      fill: style.stroke
                    }}
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
