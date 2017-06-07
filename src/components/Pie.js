import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
import { Animate } from 'react-move'
import { pie as makePie, arc as makeArc } from 'd3-shape'

import Selectors from '../utils/Selectors'
import Utils from '../utils/Utils'
import {
  selectSeries,
  selectDatum,
  hoverSeries,
  hoverDatum,
} from '../utils/interactionMethods'

//
import Path from '../primitives/Path'

const Arc = makeArc()

const arcDefaultStyle = {
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
      stackData, // we need this to figure out which level we're on
      //
      selected,
      hovered,
      interaction,
      primaryAxis,
    } = this.props

    const status = Utils.seriesStatus(series, hovered, selected)
    const style = Utils.getStatusStyle(status, series.statusStyles)

    const { radius, cutoutPercentage, cornerRadius, padAngle } = primaryAxis

    const outerRadius = radius
    const innerRadius = radius * cutoutPercentage
    const totalRadius = outerRadius - innerRadius

    const seriesRadius = totalRadius / stackData.length
    const seriesInnerRadius = innerRadius + seriesRadius * series.index
    const seriesOuterRadius = seriesInnerRadius + seriesRadius

    const preData = series.data.map(d => ({
      x: d.x,
      y: d.y,
    }))

    const pie = makePie().sort(null).padAngle(padAngle).value(d => d.y)
    const data = pie(preData)

    return (
      <Animate
        default={{
          data,
          visibility: 0,
          seriesInnerRadius: outerRadius,
          seriesOuterRadius: outerRadius,
          cornerRadius,
        }}
        data={{
          data,
          visibility,
          seriesInnerRadius,
          seriesOuterRadius,
          cornerRadius,
        }}
        duration={500}
        // ignore={['originalData']}
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
            <g
              transform={`translate(${primaryAxis.width / 2}, ${primaryAxis.height / 2})`}
            >
              {series.data.map((datum, i) => {
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

                const path = Arc({
                  ...inter.data[i],
                  innerRadius: inter.seriesInnerRadius,
                  outerRadius: inter.seriesOuterRadius,
                  cornerRadius: inter.cornerRadius,
                  padRadius: 50,
                })

                return (
                  <Path
                    key={i}
                    d={path}
                    style={{
                      ...arcDefaultStyle,
                      ...style,
                      ...style.arc,
                      ...dataStyle,
                      ...dataStyle.arc,
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
  () => {
    const selectors = {
      primaryAxis: Selectors.primaryAxis(),
    }
    return (state, props) => {
      return {
        primaryAxis: selectors.primaryAxis(state),
        hovered: state.hovered,
        selected: state.selected,
        interaction: state.interaction,
      }
    }
  },
  {
    filter: (oldState, newState, meta) => meta.type !== 'cursor',
    statics: {
      SeriesType: 'Pie',
    },
  }
)(Pie)
