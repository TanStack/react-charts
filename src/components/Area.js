import React from 'react'
import { Animate } from 'react-move'
import {
  area,
  line,
  curveCardinal,
  curveMonotoneX
} from 'd3-shape'
//
import Connect from '../utils/Connect'

import Path from '../primitives/Path'
import Circle from '../primitives/Circle'

const pathDefaultStyle = {
  strokeWidth: 2,
  fill: '#b8b8b8'
}

const circleDefaultStyle = {
  strokeWidth: 2
}

export default Connect((state, props) => {
  return {
    hovered: state.hovered
  }
})(React.createClass({
  displayName: 'Line',
  getDefaultProps () {
    return {
      showPoints: true,
      getStyle: d => ({}),
      getActiveDataStyle: d => ({}),
      getInactiveDataStyle: d => ({})
    }
  },
  render () {
    const {
      series,
      visibility,
      showPoints,
      getProps,
      getDataProps,
      //
      hovered
    } = this.props

    const areaFn = area()
    .curve(curveMonotoneX)
    .y0(d => d[2])

    const lineFn = line()
    .curve(curveMonotoneX)

    const isActive = hovered && hovered.seriesID === series.id
    const isInactive = hovered && hovered.seriesID !== series.id

    return (
      <Animate
        data={{
          data: series.data
        }}
        damping={13}
      >
        {inter => {
          const areaPath = areaFn(inter.data.map(d => ([d.x, d.y, d.yBase])))
          const linePath = lineFn(inter.data.map(d => ([d.x, d.y])))
          return (
            <g>
              <Path
                d={areaPath}
                style={{
                  ...pathDefaultStyle,
                  // ...style,
                  stroke: 'transparent'
                }}
                opacity={visibility}
              />
              <Path
                d={linePath}
                style={{
                  ...pathDefaultStyle,
                  // ...style,
                  fill: 'transparent'
                }}
                opacity={visibility}
              />
              {showPoints && inter.data.map((d, i) => {
                const isDatumActive = hovered && hovered.seriesID === series.id && hovered.index === i
                const isDatumInactive = hovered && (hovered.seriesID !== series.id || hovered.index !== i)

                return (
                  <Circle
                    key={i}
                    x={d.x}
                    y={d.y}
                    style={{
                      ...circleDefaultStyle
                    }}
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
