import React, { PureComponent } from 'react'
import { Connect } from 'react-state'

import { area, line } from 'd3-shape'
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

class Area extends PureComponent {
  static defaultProps = {
    showPoints: false,
    curve: 'monotoneX',
  }
  constructor (props) {
    super(props)
    if (!props.hoverGroup) {
      this.props.dispatch(state => ({
        ...state,
        hoverGroup: 'primaryAxis',
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
    datum.cursorPoints = [
      datum.focus,
      {
        x: primaryAxis.vertical
          ? primaryAxis.position === 'left' ? datum.base - 1 : datum.base
          : datum.focus.x,
        y: !primaryAxis.vertical
          ? primaryAxis.position === 'bottom' ? datum.base - 1 : datum.base
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

    const areaFn = area()
      .defined(d => typeof d[0] === 'number' && typeof d[1] === 'number')
      .curve(Curves[curve] || curve)
      .y0(d => d[2])

    const lineFn = line()
      .defined(d => typeof d[0] === 'number' && typeof d[1] === 'number')
      .curve(Curves[curve] || curve)

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
      >
        {inter => {
          const areaPath = areaFn(
            inter.data.map(d => [
              Number.isNaN(d.x) ? null : d.x,
              Number.isNaN(d.y) ? null : d.y,
              Number.isNaN(d.base) ? null : d.base,
            ])
          )
          const linePath = lineFn(
            inter.data.map(d => [Number.isNaN(d.x) ? null : d.x, Number.isNaN(d.y) ? null : d.y])
          )

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
                  ...pathDefaultStyle,
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
                      x={inter.data[i] ? inter.data[i].x : undefined}
                      y={inter.data[i] ? inter.data[i].y : undefined}
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
  }
)(Area)
