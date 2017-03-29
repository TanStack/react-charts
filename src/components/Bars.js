import React from 'react'
import { Animate } from 'react-move'
//
import Connect from '../utils/Connect'
import Selectors from '../utils/Selectors'
import Rectangle from '../primitives/Rectangle'

export default Connect((state, props) => {
  return {
    primaryAxis: Selectors.primaryAxis(state)
  }
})(React.createClass({
  displayName: 'Bars',
  render () {
    const {
      series,
      visibility,
      //
      primaryAxis,
      //
      ...rest
    } = this.props

    const barWidth = primaryAxis.barWidth

    // const seriesPadding = primaryAxis.centerTicks ? primaryAxis.barPaddingOuterSize : 0
    const seriesPadding = 0

    return (
      <Animate
        data={{
          data: series.data
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
                    opacity={visibility}
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
