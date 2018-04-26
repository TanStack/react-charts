import React, { PureComponent } from 'react'
import { Connect } from 'react-state'

import { area, line } from 'd3-shape'
//
import { Animate } from '../components/ReactMove'
import Utils from '../utils/Utils'
import Curves from '../utils/Curves'
import { selectSeries, selectDatum, hoverSeries, hoverDatum } from '../utils/interactionMethods'

import Path from '../primitives/Path'
import Line from '../primitives/Line'

const lineDefaultStyle = {
  strokeWidth: 3,
}

class Area extends PureComponent {
  static defaultProps = {
    showOrphans: true,
    curve: 'monotoneX',
  }
  constructor (props) {
    super(props)
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
  static plotDatum = (datum, { primaryAxis, xAxis, yAxis }) => {
    datum.x = xAxis.scale(datum.xValue)
    datum.y = yAxis.scale(datum.yValue)
    datum.defined = Utils.isValidPoint(datum.xValue) && Utils.isValidPoint(datum.yValue)
    datum.base = primaryAxis.vertical ? xAxis.scale(datum.baseValue) : yAxis.scale(datum.baseValue)
    // Adjust non-bar elements for ordinal scales
    if (xAxis.type === 'ordinal') {
      datum.x += xAxis.tickOffset
    }
    if (yAxis.type === 'ordinal') {
      datum.y += yAxis.tickOffset
    }

    // Set the default focus point
    datum.focus = {
      x: datum.x,
      y: datum.y,
    }

    // Set the cursor points (used in voronoi)
    datum.cursorPoints = [
      datum.focus,
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
  static buildStyles = (series, { getStyles, getDataStyles, defaultColors }) => {
    const defaults = {
      // Pass some sane defaults
      color: defaultColors[series.index % (defaultColors.length - 1)],
    }

    series.statusStyles = Utils.getStatusStyles(series, getStyles, defaults)

    // We also need to decorate each datum in the same fashion
    series.datums.forEach(datum => {
      datum.statusStyles = Utils.getStatusStyles(datum, getDataStyles, {
        ...series.statusStyles.default,
        ...defaults,
      })
    })
  }
  render () {
    const {
      series,
      visibility,
      showOrphans,
      curve,
      //
      selected,
      hovered,
      interaction,
    } = this.props

    const status = Utils.seriesStatus(series, hovered, selected)
    const style = Utils.getStatusStyle(status, series.statusStyles)

    const areaFn = area()
      .x(d => d.x)
      .y0(d => d.base)
      .y1(d => d.y)
      .defined(d => d.defined)
      .curve(Curves[curve] || curve)

    const lineFn = line()
      .x(d => d.x)
      .y(d => d.y)
      .defined(d => d.defined)
      .curve(Curves[curve] || curve)

    const areaPath = areaFn(series.datums)
    const linePath = lineFn(series.datums)

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
      <g>
        <Path
          d={areaPath}
          style={{
            ...style,
            ...style.area,
            stroke: 'transparent',
            pointerEvents: interactiveSeries ? 'all' : 'none',
          }}
          opacity={visibility}
          {...seriesInteractionProps}
        />
        <Path
          d={linePath}
          style={{
            ...style,
            ...style.line,
            fill: 'none',
            pointerEvents: interactiveSeries ? 'all' : 'none',
          }}
          opacity={visibility}
          {...seriesInteractionProps}
        />
        {showOrphans &&
          series.datums.map((datum, i, all) => {
            // Don't render points on the line, just null data orphans
            const prev = all[i - 1] || { defined: true }
            const next = all[i + 1] || { defined: true }
            if (!datum.defined || (prev.defined && next.defined)) {
              return null
            }
            const status = Utils.datumStatus(series, datum, hovered, selected)
            const dataStyle = Utils.getStatusStyle(status, datum.statusStyles)

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
              <Line
                style={{
                  ...lineDefaultStyle,
                  ...style,
                  ...style.line,
                  ...dataStyle,
                  ...dataStyle.line,
                  pointerEvents: interactiveSeries ? 'all' : 'none',
                }}
                key={i}
                x1={!datum || Number.isNaN(datum.x) ? null : datum.x}
                y1={!datum || Number.isNaN(datum.base) ? null : datum.base}
                x2={!datum || Number.isNaN(datum.x) ? null : datum.x}
                y2={!datum || Number.isNaN(datum.y) ? null : datum.y}
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
  state => ({
    hovered: state.hovered,
    selected: state.selected,
    interaction: state.interaction,
  }),
  {
    filter: (oldState, newState, meta) => meta.type !== 'cursor',
  }
)(Area)
