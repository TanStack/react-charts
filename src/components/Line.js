import React, { PureComponent } from 'react'
import { Connect } from 'codux'
import { Animate } from 'react-move'

import {
  line,
  // curveCardinal,
  curveMonotoneX
} from 'd3-shape'

import Utils from '../utils/Utils'
import { selectSeries, selectDatum, hoverSeries, hoverDatum } from '../utils/interactionMethods'

//
import Path from '../primitives/Path'
import Circle from '../primitives/Circle'

const pathDefaultStyle = {
  strokeWidth: 2
}

const circleDefaultStyle = {
  r: 2
}

class Line extends PureComponent {
  render () {
    const {
      series,
      visibility,
      style,
      getDataStyles,
      //
      hovered: chartHovered,
      selected: chartSelected,
      interaction
    } = this.props

    const lineFn = line()
    .curve(curveMonotoneX)

    return (
      <Animate
        default={{
          data: series.data,
          visibility: 0
        }}
        data={{
          data: series.data,
          visibility
        }}
      >
        {inter => {
          const path = lineFn(inter.data.map(d => ([d.x, d.y])))

          const seriesInteractionProps = interaction === 'series' ? {
            onClick: selectSeries.bind(this, series),
            onMouseEnter: hoverSeries.bind(this, series),
            onMouseMove: hoverSeries.bind(this, series),
            onMouseLeave: hoverSeries.bind(this, null)
          } : {}

          return (
            <g>
              <Path
                d={path}
                style={{
                  ...pathDefaultStyle,
                  ...style,
                  fill: 'none'
                }}
                opacity={inter.visibility}
                {...seriesInteractionProps}
              />
              {inter.data.map((d, i) => {
                const {
                  selected,
                  hovered,
                  otherSelected,
                  otherHovered
                } = Utils.datumStatus(series, d, chartHovered, chartSelected)

                let dataStyle = Utils.extractColor(getDataStyles({
                  ...d,
                  series,
                  selected,
                  hovered,
                  otherSelected,
                  otherHovered,
                  type: 'circle'
                }))

                const datumInteractionProps = interaction === 'element' ? {
                  onClick: selectDatum.bind(this, d),
                  onMouseEnter: hoverDatum.bind(this, d),
                  onMouseMove: hoverDatum.bind(this, d),
                  onMouseLeave: hoverDatum.bind(this, null)
                } : {}

                return (
                  <Circle
                    key={i}
                    x={d.x}
                    y={d.y}
                    style={{
                      ...circleDefaultStyle,
                      ...style,
                      ...dataStyle
                    }}
                    opacity={inter.visibility}
                    {...seriesInteractionProps}
                    {...datumInteractionProps}
                  />
                )
              }
              )}
            </g>
          )
        }}
      </Animate>
    )
  }
}

export default Connect((state, props) => {
  return {
    hovered: state.hovered,
    selected: state.selected,
    interaction: state.interaction
  }
})(Line)
