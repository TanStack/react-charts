import React from 'react'
import { Connect } from 'react-state'
import { line } from 'd3-shape'

//

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

class Line extends React.PureComponent {
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

    // Set the pointer points (used in voronoi)
    datum.pointerPoints = [datum.focus]
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
  componentWillMount () {
    this.updatePath(this.props)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.series !== this.props.series) {
      this.updatePath(nextProps)
    }
  }
  updatePath = props => {
    const { curve, series } = props
    const lineFn = line()
      .x(d => d.x)
      .y(d => d.y)
      .defined(d => d.defined)
      .curve(Curves[curve] || curve)

    this.path = lineFn(series.datums)
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

    const status = Utils.getStatus(series, hovered, selected)
    const style = series.getStatusStyle(status)

    const interactiveSeries = interaction === 'series'
    const seriesInteractionProps = interactiveSeries
      ? {
        onClick: () => this.selectSeries(series),
        onMouseEnter: () => this.hoverSeries(series),
        onMouseMove: () => this.hoverSeries(series),
        onMouseLeave: () => this.hoverSeries(null),
      }
      : {}

    const pointerEvents = interactiveSeries ? 'all' : 'none'

    return (
      <g>
        <Path
          d={this.path}
          style={{
            ...pathDefaultStyle,
            ...style,
            ...style.line,
            fill: 'none',
            pointerEvents,
          }}
          opacity={visibility}
          {...seriesInteractionProps}
        />
        {showPoints &&
          series.datums.map((datum, i) => {
            if (!datum.defined) {
              return null
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
                  pointerEvents: interactiveDatum ? 'all' : 'none',
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
    filter: (oldState, newState, meta) => meta.type !== 'pointer',
  }
)(Line)
