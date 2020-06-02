import React from 'react'
//
import ChartContext from '../utils/ChartContext'
import Utils from '../utils/Utils'

import useSeriesStyle from '../hooks/useSeriesStyle'
import useDatumStyle from '../hooks/useDatumStyle'

import Rectangle from '../primitives/Rectangle'

export default function Bar({ series }) {
  const [{ primaryAxes }] = React.useContext(ChartContext)

  const style = useSeriesStyle(series)

  const { barOffset } = series.primaryAxisID
    ? primaryAxes.find(d => d.id === series.primaryAxisID)
    : primaryAxes[0]

  return (
    <g className="series bar">
      {series.datums.map((datum, i) => {
        return (
          <BarPiece
            key={i}
            {...{
              datum,
              barOffset,
              style,
            }}
          />
        )
      })}
    </g>
  )
}

function BarPiece({ datum, barOffset, style }) {
  const [{ primaryAxes }, setChartState] = React.useContext(ChartContext)

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

  const dataStyle = useDatumStyle(datum)

  const rectangleProps = {
    style: {
      pointerEvents: 'all',
      ...style,
      ...style.rectangle,
      ...dataStyle,
      ...dataStyle.rectangle,
    },
    x1: Number.isNaN(x1) ? null : x1,
    y1: Number.isNaN(y1) ? null : y1,
    x2: Number.isNaN(x2) ? null : x2,
    y2: Number.isNaN(y2) ? null : y2,
    onMouseEnter: React.useCallback(
      e =>
        setChartState(state => ({
          ...state,
          element: datum,
        })),
      [datum, setChartState]
    ),
    onMouseLeave: React.useCallback(
      e =>
        setChartState(state => ({
          ...state,
          element: null,
        })),
      [setChartState]
    ),
  }

  return <Rectangle {...rectangleProps} />
}

Bar.plotDatum = (datum, { xAxis, yAxis, primaryAxis, secondaryAxis }) => {
  // Turn clamping on for secondaryAxis
  secondaryAxis.scale.clamp(true)

  datum.primaryCoord = primaryAxis.scale(datum.primary)
  datum.secondaryCoord = secondaryAxis.scale(datum.secondary)
  datum.x = xAxis.scale(datum.xValue)
  datum.y = yAxis.scale(datum.yValue)
  datum.defined =
    Utils.isValidPoint(datum.xValue) && Utils.isValidPoint(datum.yValue)
  datum.base = secondaryAxis.scale(datum.baseValue)
  datum.size = primaryAxis.barSize

  // Turn clamping back off for secondaryAxis
  secondaryAxis.scale.clamp(false)

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

  // Set the default anchor point
  datum.anchor = {
    x: datum.x,
    y: datum.y,
    horizontalPadding: secondaryAxis.vertical ? datum.size / 2 : 0,
    verticalPadding: secondaryAxis.vertical ? 0 : datum.size / 2,
  }

  // Adjust the anchor point for bars
  if (!primaryAxis.vertical) {
    datum.anchor.x += primaryAxis.type !== 'ordinal' ? 0 : datum.size / 2
  } else {
    datum.anchor.y += primaryAxis.type !== 'ordinal' ? 0 : datum.size / 2
  }

  // Set the pointer points (used in voronoi)
  datum.boundingPoints = [
    // End of bar
    datum.anchor,
    // Start of bar
    {
      x: primaryAxis.vertical
        ? primaryAxis.position === 'left'
          ? datum.base + 1
          : datum.base
        : datum.anchor.x,
      y: !primaryAxis.vertical
        ? primaryAxis.position === 'bottom'
          ? datum.base - 1
          : datum.base
        : datum.anchor.y,
    },
  ]
}

Bar.buildStyles = (series, { defaultColors }) => {
  const defaults = {
    // Pass some sane defaults
    color: defaultColors[series.index % (defaultColors.length - 1)],
  }

  Utils.buildStyleGetters(series, defaults)
}
