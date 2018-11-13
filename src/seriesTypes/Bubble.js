import React from 'react'
import withHooks, { useMemo, useContext } from '../utils/hooks'

//

import ChartContext from '../utils/ChartContext'
import Utils from '../utils/Utils'
import {
  selectSeries,
  hoverSeries,
  selectDatum,
  hoverDatum
} from '../utils/interactionMethods'

//
import Circle from '../primitives/Circle'

const circleDefaultStyle = {
  r: 2
}

function Bubble({ series }) {
  const [{ hovered, selected, interaction }, setChartState] = useContext(
    ChartContext
  )

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

  return (
    <g>
      {series.datums.map((datum, i) => {
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

Bubble.plotDatum = (datum, { primaryAxis, xAxis, yAxis }) => {
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
    y: datum.y,
    verticalPadding: datum.r,
    horizontalPadding: datum.r
  }

  // Set the pointer points (used in voronoi)
  datum.pointerPoints = [datum.focus]
}

Bubble.buildStyles = (series, { getStyles, getDatumStyles, defaultColors }) => {
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
      ...(typeof datum.r !== 'undefined'
        ? {
          r: datum.r
        }
        : {}),
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

export default withHooks(Bubble)
