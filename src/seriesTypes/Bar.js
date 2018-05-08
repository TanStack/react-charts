import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
import { Animate } from '../components/ReactMove'
//
import Utils from '../utils/Utils'
import Selectors from '../utils/Selectors'
import { selectSeries, hoverSeries, selectDatum, hoverDatum } from '../utils/interactionMethods'

import Rectangle from '../primitives/Rectangle'

class Bar extends PureComponent {
  static isBar = true
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
        hoverMode: 'primary',
      }))
    }
    this.selectSeries = selectSeries.bind(this)
    this.hoverSeries = hoverSeries.bind(this)
    this.selectDatum = selectDatum.bind(this)
    this.hoverDatum = hoverDatum.bind(this)
  }
  static plotDatum = (datum, {
    xAxis, yAxis, primaryAxis, secondaryAxis,
  }) => {
    datum.x = xAxis.scale(datum.xValue)
    datum.y = yAxis.scale(datum.yValue)
    datum.defined = Utils.isValidPoint(datum.xValue) && Utils.isValidPoint(datum.yValue)
    datum.base = secondaryAxis.scale(datum.baseValue)
    datum.size = primaryAxis.barSize

    if (!secondaryAxis.stacked) {
      datum.size = primaryAxis.seriesBarSize
      // Use the seriesTypeIndex here in case we have mixed types.
      const seriesBandScaleOffset = primaryAxis.seriesBandScale(datum.seriesTypeIndex)
      if (secondaryAxis.vertical) {
        datum.x += seriesBandScaleOffset
      } else {
        datum.y += seriesBandScaleOffset
      }
    }

    // Set the default focus point
    datum.focus = {
      x: datum.x,
      y: datum.y,
    }

    // Adjust the focus point for bars
    if (!primaryAxis.vertical) {
      datum.focus.x += datum.size / 2
    } else {
      datum.focus.y += datum.size / 2
    }

    // Set the pointer points (used in voronoi)
    datum.pointerPoints = [
      // End of bar
      datum.focus,
      // Start of bar
      {
        x: primaryAxis.vertical
          ? primaryAxis.position === 'left'
            ? datum.base - 1
            : datum.base
          : datum.focus.x,
        y: !primaryAxis.vertical
          ? primaryAxis.position === 'bottom'
            ? datum.base - 1
            : datum.base
          : datum.focus.y,
      },
    ]
  }
  static buildStyles = (series, { getStyles, getDatumStyles, defaultColors }) => {
    const defaults = {
      // Pass some sane defaults
      color: defaultColors[series.index % (defaultColors.length - 1)],
    }

    series.getStatusStyle = status => {
      series.style = Utils.getStatusStyle(series, status, getStyles, defaults)
      return series.style
    }

    // We also need to decorate each datum in the same fashion
    series.datums.forEach(datum => {
      datum.getStatusStyle = status => {
        datum.style = Utils.getStatusStyle(datum, status, getDatumStyles, defaults)
        return datum.style
      }
    })
  }
  render () {
    const {
      series,
      visibility,
      //
      primaryAxes,
      selected,
      hovered,
      interaction,
    } = this.props

    const style = series.getStatusStyle(Utils.getStatus(series, hovered, selected))

    const { barOffset } = series.primaryAxisID
      ? primaryAxes.find(d => d.id === series.primaryAxisID)
      : primaryAxes[0]

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
      <g className="series bar">
        {series.datums.map((datum, i) => {
          const x = datum ? datum.x : 0
          const y = datum ? datum.y : 0
          const base = datum ? datum.base : 0
          const size = datum ? datum.size : 0
          let x1
          let y1
          let x2
          let y2
          if (primaryAxes.find(d => d.vertical)) {
            x1 = base
            x2 = x
            y1 = y + barOffset
            y2 = y1 + size
          } else {
            x1 = x + barOffset
            x2 = x1 + size
            y1 = y
            y2 = base
          }

          const dataStyle = datum.getStatusStyle(Utils.getStatus(datum, hovered, selected))

          const interactiveDatum = interaction === 'element'
          const datumInteractionProps = interactiveDatum
            ? {
                onClick: () => this.selectDatum(datum),
                onMouseEnter: () => this.hoverDatum(datum),
                onMouseMove: () => this.hoverDatum(datum),
                onMouseLeave: () => this.hoverDatum(null),
              }
            : {}

          return (
            <Rectangle
              style={{
                ...style,
                ...style.rectangle,
                ...dataStyle,
                ...dataStyle.rectangle,
                pointerEvents: interactiveSeries || interactiveDatum ? 'all' : 'none',
              }}
              key={i}
              x1={Number.isNaN(x1) ? null : x1}
              y1={Number.isNaN(y1) ? null : y1}
              x2={Number.isNaN(x2) ? null : x2}
              y2={Number.isNaN(y2) ? null : y2}
              opacity={visibility}
              {...seriesInteractionProps}
              {...datumInteractionProps}
            />
          )
        })}
      </g>
    )
  }
}

export default Connect(
  () => {
    const selectors = {
      primaryAxes: Selectors.primaryAxes(),
    }
    return state => ({
      primaryAxes: selectors.primaryAxes(state),
      hovered: state.hovered,
      selected: state.selected,
      interaction: state.interaction,
    })
  },
  {
    filter: (oldState, newState, meta) => meta.type !== 'pointer',
  }
)(Bar)
