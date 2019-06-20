import React from 'react'
import { line } from 'd3-shape'

//
import ChartContext from '../utils/ChartContext'
import Utils from '../utils/Utils'
import { curveMonotoneX } from '../utils/Curves'

import usePropsMemo from '../hooks/usePropsMemo'
import useSeriesStyle from '../hooks/useSeriesStyle'
import useDatumStyle from '../hooks/useDatumStyle'

import Path from '../primitives/Path'
import Circle from '../primitives/Circle'

const pathDefaultStyle = {
  strokeWidth: 2
}

const circleDefaultStyle = {
  r: 2
}

export default function Line({ series, showPoints, curve }) {
  const lineFn = React.useMemo(
    () =>
      line()
        .x(d => d.x)
        .y(d => d.y)
        .defined(d => d.defined)
        .curve(curve),
    [curve]
  )
  const path = React.useMemo(() => lineFn(series.datums), [
    lineFn,
    series.datums
  ])

  const style = useSeriesStyle(series)

  const pathProps = {
    d: path,
    style: {
      ...pathDefaultStyle,
      ...style,
      ...style.line,
      fill: 'none'
    }
  }
  const renderedPath = usePropsMemo(() => <Path {...pathProps} />, pathProps)

  return React.useMemo(
    () => (
      <g>
        {renderedPath}
        {showPoints &&
          series.datums.map((datum, i) => {
            return (
              <Point
                {...{
                  key: i,
                  datum,
                  style
                }}
              />
            )
          })}
      </g>
    ),
    [renderedPath, series.datums, showPoints, style]
  )
}

Line.defaultProps = {
  curve: curveMonotoneX
}

Line.plotDatum = (datum, { primaryAxis, secondaryAxis, xAxis, yAxis }) => {
  datum.primaryCoord = primaryAxis.scale(datum.primary)
  datum.secondaryCoord = secondaryAxis.scale(datum.secondary)
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

  // Set the default anchor point
  datum.anchor = {
    x: datum.x,
    y: datum.y
  }

  // Set the pointer points (used in voronoi)
  datum.boundingPoints = [datum.anchor]
}

Line.buildStyles = (series, { defaultColors }) => {
  const defaults = {
    // Pass some sane defaults
    color: defaultColors[series.index % (defaultColors.length - 1)]
  }

  Utils.buildStyleGetters(series, defaults)
}

function Point({ datum, style }) {
  const [, setChartState] = React.useContext(ChartContext)

  const dataStyle = useDatumStyle(datum)

  const circleProps = {
    x: datum ? datum.x : undefined,
    y: datum ? datum.y : undefined,
    style: {
      ...circleDefaultStyle,
      ...style,
      ...style.circle,
      ...dataStyle,
      ...dataStyle.circle
    },
    onMouseEnter: e =>
      setChartState(state => ({
        ...state,
        element: datum
      })),
    onMouseLeave: e =>
      setChartState(state => ({
        ...state,
        element: null
      }))
  }
  return usePropsMemo(() => {
    if (!datum.defined) {
      return null
    }
    return <Circle {...circleProps} />
  }, circleProps)
}
