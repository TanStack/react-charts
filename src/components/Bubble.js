import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
import { Animate } from 'react-move'

import Utils from '../utils/Utils'
import {
  selectSeries,
  hoverSeries,
  selectDatum,
  hoverDatum,
} from '../utils/interactionMethods'

//
import Circle from '../primitives/Circle'

const circleDefaultStyle = {
  r: 2,
}

class Line extends PureComponent {
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
              {inter.data.map((datum, i) => {
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
                    r={inter.data[i].r}
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
              })})}
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
  }
)(Line)
