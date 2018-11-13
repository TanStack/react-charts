import React from 'react'
import withHooks, { useContext, useMemo } from '../utils/hooks'
import { line } from 'd3-shape'

//

import ChartContext from '../utils/ChartContext'
import Utils from '../utils/Utils'
import Curves from '../utils/Curves'
import {
  selectSeries,
  selectDatum,
  hoverSeries,
  hoverDatum
} from '../utils/interactionMethods'

import Path from '../primitives/Path'
import Circle from '../primitives/Circle'

const pathDefaultStyle = {
  strokeWidth: 2
}

const circleDefaultStyle = {
  r: 2
}

function Line({ series, showPoints, curve }) {
  const [{ hovered, selected, interaction }, setChartState] = useContext(
    ChartContext
  )

  const lineFn = useMemo(
    () =>
      line()
        .x(d => d.x)
        .y(d => d.y)
        .defined(d => d.defined)
        .curve(Curves[curve] || curve),
    [curve]
  )
  const path = useMemo(() => lineFn(series.datums), [series])

  const style = useMemo(
    () => series.getStatusStyle(Utils.getStatus(series, hovered, selected)),
    [series, hovered, selected]
  )

  const interactiveSeries = interaction === 'series'
  const seriesInteractionProps = interactiveSeries
    ? {
      onClick: () => selectSeries(series, { setChartState }),
      onMouseEnter: () => hoverSeries(series, { setChartState }),
      onMouseMove: () => hoverSeries(series, { setChartState }),
      onMouseLeave: () => hoverSeries(null, { setChartState })
    }
    : {}

  const pointerEvents = interactiveSeries ? 'all' : 'none'

  const pathProps = {
    d: path,
    style: {
      ...pathDefaultStyle,
      ...style,
      ...style.line,
      fill: 'none',
      pointerEvents
    },
    ...seriesInteractionProps
  }
  const renderedPath = useMemo(() => <Path {...pathProps} />, [
    JSON.stringify(pathProps)
  ])

  return (
    <g>
      {renderedPath}
      {showPoints &&
        false &&
        series.datums.map((datum, i) => {
          return (
            <Point
              {...{
                key: i,
                datum,
                hovered,
                selected,
                interaction,
                style,
                seriesInteractionProps
              }}
            />
          )
        })}
    </g>
  )
}

Line.defaultProps = {
  showPoints: true,
  curve: 'monotoneX'
}

Line.plotDatum = (datum, { primaryAxis, xAxis, yAxis }) => {
  datum.x = xAxis.scale(datum.xValue)
  datum.y = yAxis.scale(datum.yValue)
  datum.defined =
    Utils.isValidPoint(datum.xValue) && Utils.isValidPoint(datum.yValue)
  datum.base = primaryAxis.vertical
    ? xAxis.scale(datum.baseValue)
    : yAxis.scale(datum.baseValue)

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
    y: datum.y
  }

  // Set the pointer points (used in voronoi)
  datum.pointerPoints = [datum.focus]
}

Line.buildStyles = (series, { getStyles, getDatumStyles, defaultColors }) => {
  const defaults = {
    // Pass some sane defaults
    color: defaultColors[series.index % (defaultColors.length - 1)]
  }

  series.getStatusStyle = status => {
    series.style = Utils.getStatusStyle(series, status, getStyles, defaults)
    return series.style
  }

  // We also need to decorate each datum in the same fashion
  series.datums.forEach(datum => {
    datum.getStatusStyle = status => {
      datum.style = Utils.getStatusStyle(
        datum,
        status,
        getDatumStyles,
        defaults
      )
      return datum.style
    }
  })
}

const Point = withHooks(function Point({
  datum,
  hovered,
  selected,
  interaction,
  style,
  seriesInteractionProps
}) {
  if (!datum.defined) {
    return null
  }

  const [_, setChartState] = useContext(ChartContext)

  const dataStyle = useMemo(
    () => datum.getStatusStyle(Utils.getStatus(datum, hovered, selected)),
    [datum, hovered, selected]
  )

  const interactiveDatum = interaction === 'element'
  const datumInteractionProps = interactiveDatum
    ? {
      onClick: () => selectDatum(datum, { setChartState }),
      onMouseEnter: () => hoverDatum(datum, { setChartState }),
      onMouseMove: () => hoverDatum(datum, { setChartState }),
      onMouseLeave: () => hoverDatum(null, { setChartState })
    }
    : {}

  const circleProps = {
    x: datum ? datum.x : undefined,
    y: datum ? datum.y : undefined,
    style: {
      ...circleDefaultStyle,
      ...style,
      ...style.circle,
      ...dataStyle,
      ...dataStyle.circle,
      pointerEvents: interactiveDatum ? 'all' : 'none'
    }
  }
  return useMemo(
    () => (
      <Circle
        {...circleProps}
        {...{
          ...seriesInteractionProps,
          ...datumInteractionProps
        }}
      />
    ),
    [JSON.stringify(circleProps)]
  )
})

export default withHooks(Line)
