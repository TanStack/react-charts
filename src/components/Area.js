import React, { PureComponent } from 'react'
import { Animate } from 'react-move'
import { Connect } from 'react-state'

import { area, line, curveMonotoneX } from 'd3-shape'
//
import Utils from '../utils/Utils'
import {
  selectSeries,
  selectDatum,
  hoverSeries,
  hoverDatum,
} from '../utils/interactionMethods'

import Path from '../primitives/Path'
import Circle from '../primitives/Circle'

const pathDefaultStyle = {
  strokeWidth: 2,
}

const circleDefaultStyle = {
  r: 2,
}

class Area extends PureComponent {
  static defaultProps = {
    showPoints: false,
  }
  constructor () {
    super()
    this.selectSeries = selectSeries.bind(this)
    this.hoverSeries = hoverSeries.bind(this)
    this.selectDatum = selectDatum.bind(this)
    this.hoverDatum = hoverDatum.bind(this)
  }
  render () {
    const {
      series,
      visibility,
      showPoints,
      //
      selected,
      hovered,
      interaction,
    } = this.props

    const status = Utils.seriesStatus(series, hovered, selected)
    const style = Utils.getStatusStyle(status, series.statusStyles)

    const areaFn = area()
      .defined(d => typeof d[0] === 'number' && typeof d[1] === 'number')
      .curve(curveMonotoneX)
      .y0(d => d[2])

    const lineFn = line()
      .defined(d => typeof d[0] === 'number' && typeof d[1] === 'number')
      .curve(curveMonotoneX)

    const data = series.data.map(d => ({
      x: d.x,
      y: d.y,
      r: d.r,
      base: d.base,
    }))

    return (
      <Animate
        default={{
          data,
          visibility: 0,
        }}
        data={{
          data,
          visibility,
        }}
      >
        {inter => {
          const areaPath = areaFn(
            inter.data.map(d => [
              isNaN(d.x) ? null : d.x,
              isNaN(d.y) ? null : d.y,
              isNaN(d.base) ? null : d.base,
            ])
          )
          const linePath = lineFn(
            inter.data.map(d => [
              isNaN(d.x) ? null : d.x,
              isNaN(d.y) ? null : d.y,
            ])
          )

          const seriesInteractionProps = interaction === 'series'
            ? {
              onClick: () => this.selectSeries(series),
              onMouseEnter: () => this.hoverSeries(series),
              onMouseMove: () => this.hoverSeries(series),
              onMouseLeave: () => this.hoverSeries(null),
            }
            : {}

          return (
            <g>
              <Path
                d={areaPath}
                style={{
                  ...pathDefaultStyle,
                  ...style,
                  ...style.area,
                  stroke: 'transparent',
                }}
                opacity={inter.visibility}
                {...seriesInteractionProps}
              />
              <Path
                d={linePath}
                style={{
                  ...pathDefaultStyle,
                  ...style,
                  ...style.line,
                  fill: 'none',
                }}
                opacity={inter.visibility}
                {...seriesInteractionProps}
              />
              {showPoints &&
                series.data.map((datum, i) => {
                  const status = Utils.datumStatus(
                    series,
                    datum,
                    hovered,
                    selected
                  )
                  const dataStyle = Utils.getStatusStyle(
                    status,
                    datum.statusStyles
                  )

                  const datumInteractionProps = interaction === 'element'
                    ? {
                      onClick: () => this.selectDatum(datum),
                      onMouseEnter: () => this.hoverDatum(datum),
                      onMouseMove: () => this.hoverDatum(datum),
                      onMouseLeave: () => this.hoverDatum(null),
                    }
                    : {}

                  return (
                    <Circle
                      key={i}
                      x={inter.data[i].x}
                      y={inter.data[i].y}
                      style={{
                        ...circleDefaultStyle,
                        ...style,
                        ...style.circle,
                        ...dataStyle,
                        ...dataStyle.circle,
                      }}
                      opacity={inter.visibility}
                      {...seriesInteractionProps}
                      {...datumInteractionProps}
                    />
                  )
                })}
            </g>
          )
        }}
      </Animate>
    )
  }
}

export default Connect(
  (state, props) => {
    return {
      hovered: state.hovered,
      selected: state.selected,
      interaction: state.interaction,
    }
  },
  {
    filter: (oldState, newState, meta) => meta.type !== 'cursor',
    statics: {
      SeriesType: 'Area',
    },
  }
)(Area)
