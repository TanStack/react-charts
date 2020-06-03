import React from 'react'
import { area, line } from '../../d3'
//

import ChartContext from '../utils/ChartContext'
import Utils from '../utils/Utils'
import { curveLinear } from '../utils/Curves'

import useSeriesStyle from '../hooks/useSeriesStyle'
import useDatumStyle from '../hooks/useDatumStyle'

import Path from '../primitives/Path'
import Line from '../primitives/Line'
import Circle from '../primitives/Circle'

const defaultAreaStyle = {
  strokeWidth: 0,
}

const defaultLineStyle = {
  strokeWidth: 2,
}

const circleDefaultStyle = {
  r: 1.5,
}

export default function Area({ series, showOrphans, showPoints, curve }) {
  const areaFn = React.useMemo(
    () =>
      area()
        .x(d => d.x)
        .y0(d => d.base)
        .y1(d => d.y)
        .defined(d => d.defined)
        .curve(curve),
    [curve]
  )

  const lineFn = React.useMemo(
    () =>
      line()
        .x(d => d.x)
        .y(d => d.y)
        .defined(d => d.defined)
        .curve(curve),
    [curve]
  )

  const areaPath = React.useMemo(() => areaFn(series.datums), [
    areaFn,
    series.datums,
  ])

  const linePath = React.useMemo(() => lineFn(series.datums), [
    lineFn,
    series.datums,
  ])

  const style = useSeriesStyle(series)

  const areaPathProps = {
    d: areaPath,
    style: {
      ...defaultAreaStyle,
      ...style,
      ...style.area,
    },
  }

  const linePathProps = {
    d: linePath,
    style: {
      ...defaultLineStyle,
      ...style,
      ...style.line,
      fill: 'none',
    },
  }

  return (
    <g>
      <Path {...areaPathProps} />
      <Path {...linePathProps} />
      {showOrphans &&
        series.datums.map((datum, index, all) => {
          return (
            <OrphanLine
              {...{
                key: index,
                datum,
                style,
                all,
                index,
              }}
            />
          )
        })}
      {showPoints &&
        series.datums.map((datum, i) => {
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

Area.defaultProps = {
  showOrphans: true,
  showLine: true,
  showPoints: true,
  curve: curveLinear,
}

Area.plotDatum = (datum, { primaryAxis, secondaryAxis, xAxis, yAxis }) => {
  // Turn clamping on for secondaryAxis
  secondaryAxis.scale.clamp(true)

  datum.primaryCoord = primaryAxis.scale(datum.primary)
  datum.secondaryCoord = secondaryAxis.scale(datum.secondary)
  datum.x = xAxis.scale(datum.xValue)
  datum.y = yAxis.scale(datum.yValue)
  datum.defined =
    Utils.isValidPoint(datum.xValue) && Utils.isValidPoint(datum.yValue)
  datum.base = primaryAxis.vertical
    ? xAxis.scale(datum.baseValue)
    : yAxis.scale(datum.baseValue)

  // Turn clamping back off for secondaryAxis
  secondaryAxis.scale.clamp(false)

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
  }

  // Set the pointer points (used in voronoi)
  datum.boundingPoints = [
    datum.anchor,
    {
      x: primaryAxis.vertical
        ? primaryAxis.position === 'left'
          ? datum.base - 1
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

Area.buildStyles = (series, { defaultColors }) => {
  const defaults = {
    // Pass some sane defaults
    color: defaultColors[series.index % (defaultColors.length - 1)],
  }

  Utils.buildStyleGetters(series, defaults)
}

const OrphanLine = function OrphanLine({ datum, style, all, index }) {
  const prev = all[index - 1] || { defined: false }
  const next = all[index + 1] || { defined: false }

  const dataStyle = useDatumStyle(datum)

  const lineProps = {
    x1: !datum || Number.isNaN(datum.x) ? null : datum.x,
    y1: !datum || Number.isNaN(datum.base) ? null : datum.base,
    x2: !datum || Number.isNaN(datum.x) ? null : datum.x,
    y2: !datum || Number.isNaN(datum.y) ? null : datum.y,
    style: {
      ...defaultLineStyle,
      ...style,
      ...style.line,
      ...dataStyle,
      ...dataStyle.line,
    },
  }

  if (!datum.defined || prev.defined || next.defined) {
    return null
  }

  return <Line {...lineProps} />
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
