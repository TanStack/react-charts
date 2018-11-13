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

import Rectangle from '../primitives/Rectangle'

function Bar({ series }) {
  const [
    { hovered, selected, interaction, primaryAxes },
    setChartState
  ] = useContext(ChartContext)

  const style = useMemo(
    () => series.getStatusStyle(Utils.getStatus(series, hovered, selected)),
    [series, hovered, selected]
  )

  const { barOffset } = series.primaryAxisID
    ? primaryAxes.find(d => d.id === series.primaryAxisID)
    : primaryAxes[0]

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

  return (
    <g className='series bar'>
      {series.datums.map((datum, i) => {
        return (
          <BarPiece
            key={i}
            {...{
              datum,
              primaryAxes,
              barOffset,
              hovered,
              selected,
              interaction,
              style,
              pointerEvents,
              seriesInteractionProps
            }}
          />
        )
      })}
    </g>
  )
}

Bar.plotDatum = (datum, { xAxis, yAxis, primaryAxis, secondaryAxis }) => {
  datum.x = xAxis.scale(datum.xValue)
  datum.y = yAxis.scale(datum.yValue)
  datum.defined =
    Utils.isValidPoint(datum.xValue) && Utils.isValidPoint(datum.yValue)
  datum.base = secondaryAxis.scale(datum.baseValue)
  datum.size = primaryAxis.barSize

  if (!secondaryAxis.stacked) {
    datum.size = primaryAxis.seriesBarSize
    // Use the seriesTypeIndex here in case we have mixed types.
    const seriesBandScaleOffset = primaryAxis.seriesBandScale(
      datum.seriesTypeIndex
    )
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
    horizontalPadding: secondaryAxis.vertical ? datum.size / 2 : 0,
    verticalPadding: secondaryAxis.vertical ? 0 : datum.size / 2
  }

  // Adjust the focus point for bars
  if (!primaryAxis.vertical) {
    datum.focus.x += primaryAxis.type !== 'ordinal' ? 0 : datum.size / 2
  } else {
    datum.focus.y += primaryAxis.type !== 'ordinal' ? 0 : datum.size / 2
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
        : datum.focus.y
    }
  ]
}

Bar.buildStyles = (series, { getStyles, getDatumStyles, defaultColors }) => {
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

const BarPiece = withHooks(function BarPiece({
  datum,
  primaryAxes,
  barOffset,
  hovered,
  selected,
  interaction,
  style,
  pointerEvents,
  seriesInteractionProps
}) {
  const [_, setChartState] = useContext(ChartContext)

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

  const rectangleProps = {
    style: {
      ...style,
      ...style.rectangle,
      ...dataStyle,
      ...dataStyle.rectangle,
      pointerEvents
    },
    x1: Number.isNaN(x1) ? null : x1,
    y1: Number.isNaN(y1) ? null : y1,
    x2: Number.isNaN(x2) ? null : x2,
    y2: Number.isNaN(y2) ? null : y2
  }

  return useMemo(
    () => (
      <Rectangle
        {...rectangleProps}
        {...seriesInteractionProps}
        {...datumInteractionProps}
      />
    ),
    [JSON.stringify(rectangleProps)]
  )
})

export default withHooks(Bar)
