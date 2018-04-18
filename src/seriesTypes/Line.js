import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
import { line } from 'd3-shape'

//

import { Animate } from '../components/ReactMove'

import Utils from '../utils/Utils'
import Curves from '../utils/Curves'
import { selectSeries, selectDatum, hoverSeries, hoverDatum } from '../utils/interactionMethods'

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
  static plotDatum = (datum, {
    xScale, yScale, primaryAxis, xAxis, yAxis,
  }) => {
    datum.x = xScale(datum.xValue)
    datum.y = yScale(datum.yValue)
    datum.defined = Utils.isValidPoint(datum.xValue) && Utils.isValidPoint(datum.yValue)
    datum.base = primaryAxis.vertical ? xScale(datum.baseValue) : yScale(datum.baseValue)

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
    datum.cursorPoints = [datum.focus]
  }
  static buildStyles = (series, { getStyles, getDataStyles, defaultColors }) => {
    const defaults = {
      // Pass some sane defaults
      color: defaultColors[series.index % (defaultColors.length - 1)],
    }

    series.statusStyles = Utils.getStatusStyles(series, getStyles, defaults)

    // We also need to decorate each datum in the same fashion
    series.data.forEach(datum => {
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
      .x(d => d.x)
      .y(d => d.y)
      .defined(d => d.defined)
      .curve(Curves[curve] || curve)

    const path = lineFn(series.data)

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
          d={path}
          style={{
            ...pathDefaultStyle,
            ...style,
            ...style.line,
            fill: 'none',
            pointerEvents: interactiveSeries ? 'all' : 'none',
          }}
          opacity={visibility}
          {...seriesInteractionProps}
        />
        {showPoints &&
          series.data.map((datum, i) => {
            if (!datum.defined) {
              return null
            }
            const status = Utils.datumStatus(series, datum, hovered, selected)
            const dataStyle = Utils.getStatusStyle(status, datum.statusStyles)

            const iteractiveDatum = interaction === 'element'
            const datumInteractionProps = iteractiveDatum
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
                x={datum ? datum.x : undefined}
                y={datum ? datum.y : undefined}
                style={{
                  ...circleDefaultStyle,
                  ...style,
                  ...style.circle,
                  ...dataStyle,
                  ...dataStyle.circle,
                  pointerEvents: iteractiveDatum ? 'all' : 'none',
                }}
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
)(Line)
