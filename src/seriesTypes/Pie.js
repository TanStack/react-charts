import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
import { pie as makePie, arc as makeArc } from 'd3-shape'

import { Animate } from '../components/ReactMove'
import Selectors from '../utils/Selectors'
import Utils from '../utils/Utils'
import { selectSeries, selectDatum, hoverSeries, hoverDatum } from '../utils/interactionMethods'

//
import Path from '../primitives/Path'

const Arc = makeArc

const arcDefaultStyle = {
  r: 2,
}

class Pie extends PureComponent {
  static defaultProps = {
    showPoints: true,
  }
  constructor (props) {
    super(props)
    if (!props.interaction) {
      this.props.dispatch(state => ({
        ...state,
        interaction: 'element',
      }))
    }
    if (!props.hoverMode) {
      this.props.dispatch(state => ({
        ...state,
        hoverMode: 'closestPoint',
      }))
    }
    this.selectSeries = selectSeries.bind(this)
    this.hoverSeries = hoverSeries.bind(this)
    this.selectDatum = selectDatum.bind(this)
    this.hoverDatum = hoverDatum.bind(this)
  }
  static plotDatum = (datum, { primaryAxis }) => {
    // Set the focus point
    const coords = primaryAxis.scale(datum)

    // Add the x and y coords to the datum
    datum = {
      ...datum,
      ...coords,
    }

    // Set the focus point
    datum.focus = coords

    // Set the cursor points (used in voronoi)
    datum.cursorPoints = [datum.focus]

    // Return the new datum
    return datum
  }
  static buildStyles = (series, { getStyles, getDataStyles, defaultColors }) => {
    // Series styles
    series.statusStyles = Utils.getStatusStyles(series, getStyles)

    // Datum styles
    series.data.forEach(datum => {
      datum.statusStyles = Utils.getStatusStyles(datum, getDataStyles, {
        ...series.statusStyles.default,
        // Default color each slice
        color: defaultColors[datum.index % (defaultColors.length - 1)],
      })
    })
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

    const {
      radius, cutoutPercentage, cornerRadius, arcPadding, seriesPadding,
    } = primaryAxis

    const outerRadius = radius
    const innerRadius = radius * cutoutPercentage
    const totalRadius = outerRadius - innerRadius
    const seriesRadius = totalRadius / stackData.length
    const seriesInnerRadius = innerRadius + seriesRadius * series.index
    const seriesOuterRadius = seriesInnerRadius + seriesRadius

    const arcPaddingRadius = outerRadius * arcPadding * 20
    const seriesPaddingRadius = totalRadius * seriesPadding / 2.5

    const preData = series.data.map(d => ({
      x: d.primary,
      y: d.secondary,
    }))

    const pie = makePie()
      .sort(null)
      .padAngle(0.01)
      .value(d => d.y)
    const data = pie(preData)

    return (
      <Animate
        start={{
          data,
          visibility: 0,
          seriesPaddingRadius: 0,
          seriesInnerRadius: outerRadius,
          seriesOuterRadius: outerRadius,
          cornerRadius,
          arcPaddingRadius,
        }}
        update={{
          data: [data],
          visibility: [visibility],
          seriesPaddingRadius: [seriesPaddingRadius],
          seriesInnerRadius: [seriesInnerRadius],
          seriesOuterRadius: [seriesOuterRadius],
          cornerRadius: [cornerRadius],
          arcPaddingRadius: [arcPaddingRadius],
        }}
        duration={500}
      >
        {inter => {
          const interactiveSeries = interaction === 'series'
          const seriesInteractionProps = interactiveSeries
            ? {
                onClick: () => this.selectSeries(series),
                onMouseEnter: () => this.hoverSeries(series),
                onMouseMove: () => this.hoverSeries(series),
                onMouseLeave: () => this.hoverSeries(null),
              }
            : {}

          return (
            <g transform={`translate(${primaryAxis.width / 2}, ${primaryAxis.height / 2})`}>
              {series.data.map((datum, i) => {
                const status = Utils.datumStatus(series, datum, hovered, selected)
                const dataStyle = Utils.getStatusStyle(status, datum.statusStyles)

                if (!inter.data[i]) {
                  return null
                }

                const iteractiveDatum = interaction === 'element'
                const datumInteractionProps = iteractiveDatum
                  ? {
                      onClick: () => this.selectDatum(datum),
                      onMouseEnter: () => this.hoverDatum(datum),
                      onMouseMove: () => this.hoverDatum(datum),
                      onMouseLeave: () => this.hoverDatum(null),
                    }
                  : {}

                const arc = Arc()
                  .startAngle(inter.data[i].startAngle)
                  .endAngle(inter.data[i].endAngle)
                  .padAngle(inter.data[i].padAngle)
                  .padRadius(inter.arcPaddingRadius)
                  .innerRadius(inter.seriesInnerRadius + seriesPaddingRadius)
                  .outerRadius(inter.seriesOuterRadius)
                  .cornerRadius(inter.cornerRadius)

                return (
                  <Path
                    key={i}
                    d={arc()}
                    style={{
                      ...arcDefaultStyle,
                      ...style,
                      ...style.arc,
                      ...dataStyle,
                      ...dataStyle.arc,
                      pointerEvents: iteractiveDatum ? 'all' : 'none',
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
    return state => ({
      primaryAxis: selectors.primaryAxis(state),
      hovered: state.hovered,
      selected: state.selected,
      interaction: state.interaction,
    })
  },
  {
    filter: (oldState, newState, meta) => meta.type !== 'cursor',
  }
)(Pie)
