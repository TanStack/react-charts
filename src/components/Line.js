import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
import { Animate } from './ReactMove'

import { line } from 'd3-shape'

import Utils from '../utils/Utils'
import Curves from '../utils/Curves'

import { selectSeries, selectDatum, hoverSeries, hoverDatum } from '../utils/interactionMethods'

//
import Path from '../primitives/Path'
import Circle from '../primitives/Circle'

const pathDefaultStyle = {
  strokeWidth: 2,
}

const circleDefaultStyle = {
  r: 2,
}

class Line extends PureComponent {
  static defaultProps = {
    showPoints: true,
    curve: 'monotoneX',
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
      curve,
      //
      selected,
      hovered,
      interaction,
    } = this.props

    const status = Utils.seriesStatus(series, hovered, selected)
    const style = Utils.getStatusStyle(status, series.statusStyles)

    const lineFn = line()
      .curve(Curves[curve] || curve)
      .defined(d => typeof d[0] === 'number' && typeof d[1] === 'number')

    const data = series.data.map(d => ({
      x: d.x,
      y: d.y,
      r: d.r,
      base: d.base,
    }))

    return (
      <Animate
        start={{
          data,
        }}
        update={{
          data: [data],
        }}
        duration={500}
      >
        {inter => {
          const path = lineFn(
            inter.data.map(d => [Number.isNaN(d.x) ? null : d.x, Number.isNaN(d.y) ? null : d.y])
          )

          const seriesInteractionProps =
            interaction === 'series'
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
                d={path}
                style={{
                  ...pathDefaultStyle,
                  ...style,
                  ...style.line,
                  fill: 'none',
                }}
                opacity={visibility}
                {...seriesInteractionProps}
              />
              {showPoints &&
                series.data.map((datum, i) => {
                  const status = Utils.datumStatus(series, datum, hovered, selected)
                  const dataStyle = Utils.getStatusStyle(status, datum.statusStyles)

                  const datumInteractionProps =
                    interaction === 'element'
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
                      x={inter.data[i] ? inter.data[i].x : undefined}
                      y={inter.data[i] ? inter.data[i].y : undefined}
                      style={{
                        ...circleDefaultStyle,
                        ...style,
                        ...style.circle,
                        ...dataStyle,
                        ...dataStyle.circle,
                      }}
                      opacity={visibility}
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
  state => ({
    hovered: state.hovered,
    selected: state.selected,
    interaction: state.interaction,
  }),
  {
    filter: (oldState, newState, meta) => meta.type !== 'cursor',
    statics: {
      SeriesType: 'Line',
    },
  }
)(Line)
