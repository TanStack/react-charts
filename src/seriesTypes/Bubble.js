import React from 'react'

//

import { ChartConnect } from '../utils/Context'
import Utils from '../utils/Utils'
import { selectSeries, hoverSeries, selectDatum, hoverDatum } from '../utils/interactionMethods'

//
import Circle from '../primitives/Circle'

const circleDefaultStyle = {
  r: 2,
}

class Line extends React.PureComponent {
  constructor (props) {
    super(props)
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
      verticalPadding: datum.r,
      horizontalPadding: datum.r,
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
  render () {
    const {
      series,
      visibility,
      //
      selected,
      hovered,
      interaction,
    } = this.props

    const style = series.getStatusStyle(Utils.getStatus(series, hovered, selected))

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
        {series.datums.map((datum, i) => {
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
                ...(typeof datum.r !== 'undefined'
                  ? {
                      r: datum.r,
                    }
                  : {}),
                pointerEvents: interactiveSeries || interactiveDatum ? 'all' : 'none',
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

export default ChartConnect(state => ({
  hovered: state.hovered,
  selected: state.selected,
  interaction: state.interaction,
}))(Line)
