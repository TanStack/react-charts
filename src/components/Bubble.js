import React, { PureComponent } from 'react'
import { Connect } from 'react-state'

//

import { Animate } from './ReactMove'
import Utils from '../utils/Utils'
import { selectSeries, hoverSeries, selectDatum, hoverDatum } from '../utils/interactionMethods'

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
      padding: datum.r,
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
        start={{
          data,
        }}
        update={{
          data: [data],
        }}
      >
        {inter => {
          const seriesInteractionProps =
            interaction === 'series'
              ? {
                  onClick: () => this.selectSeries(series),
                  onMouseEnter: () => this.hoverSeries(series),
                  onMouseMove: () => this.hoverSeries(series),
                  onMouseLeave: () => this.hoverSeries(null),
                }
              : {}
          return (
            <g>
              {series.data.map((datum, i) => {
                const status = Utils.datumStatus(series, datum, hovered, selected)
                const dataStyle = Utils.getStatusStyle(status, datum.statusStyles)

                const datumInteractionProps =
                  interaction === 'element'
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
                      ...(typeof datum.r !== 'undefined'
                        ? {
                            r: datum.r,
                          }
                        : {}),
                    }}
                    opacity={visibility}
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
  state => ({
    hovered: state.hovered,
    selected: state.selected,
    interaction: state.interaction,
  }),
  {
    filter: (oldState, newState, meta) => meta.type !== 'cursor',
  }
)(Line)
