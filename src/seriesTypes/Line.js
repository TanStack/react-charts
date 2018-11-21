import React from 'react'
import withHooks, {
  useMemo,
  useDeepMemo,
  useSeriesStyle,
  useDatumStyle
} from '../utils/hooks'
import { line } from 'd3-shape'

//

import Utils from '../utils/Utils'
import Curves from '../utils/Curves'

import Path from '../primitives/Path'
import Circle from '../primitives/Circle'

const pathDefaultStyle = {
  strokeWidth: 2
}

const circleDefaultStyle = {
  r: 2
}

function Line({ series, showPoints, curve }) {
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
  const renderedPath = useDeepMemo(() => <Path {...pathProps} />, pathProps)

  return (
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
  )
}

Line.defaultProps = {
  curve: 'monotoneX'
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

const Point = withHooks(function Point({ datum, style }) {
  if (!datum.defined) {
    return null
  }

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
    }
  }
  return useDeepMemo(() => <Circle {...circleProps} />, circleProps)
})

export default withHooks(Line)
