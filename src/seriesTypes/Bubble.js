import React from 'react'
//

import { isValidPoint, buildStyleGetters } from '../utils/Utils'

import useSeriesStyle from '../hooks/useSeriesStyle'
import useDatumStyle from '../hooks/useDatumStyle'

import Circle from '../primitives/Circle'
import useChartState from '../hooks/useChartState'

const circleDefaultStyle = {
  r: 2,
}

export default function Bubble({ series }) {
  const style = useSeriesStyle(series)

  return (
    <g>
      {series.datums.map((datum, i) => {
        return (
          <Point
            {...{
              key: i,
              datum,
              style,
            }}
          />
        )
      })}
    </g>
  )
}

Bubble.plotDatum = (datum, { primaryAxis, secondaryAxis, xAxis, yAxis }) => {
  datum.primaryCoord = primaryAxis.scale(datum.primary)
  datum.secondaryCoord = secondaryAxis.scale(datum.secondary)
  datum.x = xAxis.scale(datum.xValue)
  datum.y = yAxis.scale(datum.yValue)
  datum.defined = isValidPoint(datum.xValue) && isValidPoint(datum.yValue)
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

  // Set the default anchor point
  datum.anchor = {
    x: datum.x,
    y: datum.y,
    verticalPadding: datum.r,
    horizontalPadding: datum.r,
  }

  // Set the pointer points (used in voronoi)
  datum.boundingPoints = [datum.anchor]
}

Bubble.buildStyles = (series, { defaultColors }) => {
  const defaults = {
    // Pass some sane defaults
    color: defaultColors[series.index % (defaultColors.length - 1)],
  }

  buildStyleGetters(series, defaults)
}

function Point({ datum, style }) {
  const dataStyle = useDatumStyle(datum)
  const [, setChartState] = useChartState(() => null)

  const circleProps = {
    x: datum ? datum.x : undefined,
    y: datum ? datum.y : undefined,
    style: {
      ...circleDefaultStyle,
      ...(typeof datum.radius !== 'undefined'
        ? {
            r: datum.radius,
          }
        : {}),
      ...style,
      ...style.circle,
      ...dataStyle,
      ...dataStyle.circle,
    },
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

  if (!datum.defined) {
    return null
  }
  return <Circle {...circleProps} />
}
