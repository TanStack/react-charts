import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
import { Animate } from 'react-move'
import { pie as makePie } from 'd3-shape'

import Utils from '../utils/Utils'
import {
  selectSeries,
  selectDatum,
  hoverSeries,
  hoverDatum,
} from '../utils/interactionMethods'

//
import Path from '../primitives/Path'
import Circle from '../primitives/Circle'

const pathDefaultStyle = {
  strokeWidth: 2,
}

const circleDefaultStyle = {
  r: 2,
}

class Pie extends PureComponent {
  static defaultProps = {
    showPoints: true,
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

    const data = series.data.map(d => ({
      x: d.x,
      y: d.y,
      r: d.r,
      base: d.base,
    }))

    const pie = makePie().sort(null).value(d => d.y)

    console.log(pie(data))
    return null

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
        duration={500}
        ignore={['originalData']}
      >
        {inter => {
          const path = pie(
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
                d={path}
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
      SeriesType: 'Pie',
    },
  }
)(Pie)
